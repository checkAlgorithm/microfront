// 为了保证应用加载逻辑被最先执行，对路由的一系列方法进行重写劫持。
// 如果当前应用正在加载时，并且用户频繁切换路由，我们会将此时的reroute方法暂存起来，等待当前应用加载完毕后再次出发reroute渲染应用，从而节约性能。
import { reroute } from "./app";
const routingEventsListeningTo = ['hashchange', 'popstate']

const capturedEventListeners = {
    hashchange: [],
    popstate: []
}

function urlReroute() {
    reroute([], arguments)
}

// 劫持路由变化
window.addEventListener(routingEventsListeningTo[0], urlReroute);
window.addEventListener(routingEventsListeningTo[1], urlReroute);

const originalAddEventListener = window.addEventListener
const originalRemoveEventListener = window.removeEventListener

// 重写pushState 和 repalceState方法
window.history.pushState = patchedUpdateState(window.history.pushState, 'pushState');
window.history.replaceState = patchedUpdateState(window.history.replaceState, 'replaceState');

// 重写addEventListener方法
window.addEventListener = function (eventName, fn) {
    // 记录后面'hashchange', 'popstate'的listener，但不监听
    if (routingEventsListeningTo.indexOf(eventName) > -1 && !capturedEventListeners[eventName].some(listener => listener == fn)) {
        console.log(eventName, capturedEventListeners[eventName], 'addEventListener')
        capturedEventListeners[eventName].push(fn);
        return;
    }
    return originalAddEventListener.apply(this, arguments)
}
window.removeEventListener = function (eventName, listenerFn) {
    if (routingEventsListeningTo.indexOf(eventName) > -1) {
        console.log(eventName, capturedEventListeners[eventName], 'removeEventListener')
        capturedEventListeners[eventName] = capturedEventListeners[
            eventName
        ].filter((fn) => fn !== listenerFn);
        return;
    }
    return originalRemoveEventListener.apply(this, arguments)
}

function patchedUpdateState(updateState, methodName) {
    console.log('patchedUpdateState methodName:', methodName)
    return function () {
        const urlBefore = window.location.href;
        const result = updateState.apply(this, arguments); // 调用原有pushState,replaceState方法
        const urlAfter = window.location.href;
        // pushState,replaceState时，也触发popstate
        if (urlBefore !== urlAfter) {
            const state = window.history.state;
            urlReroute(new PopStateEvent('popstate', { state }));
        }
        return result;
    }
}
// 在子应用加载完毕后调用此方法，执行拦截的逻辑（保证子应用加载完后执行）
export function callCapturedEventListeners(eventArguments) {
    if (eventArguments) { // eventArguments => [{type: 'popstate'}, ...]
        const eventType = eventArguments[0].type; // popstate hashchange
        if (routingEventsListeningTo.indexOf(eventType) >= 0) {
            // 调用保存的函数队列
            capturedEventListeners[eventType].forEach((listener) => {
                listener.apply(this, eventArguments);
            });
        }
    }
}