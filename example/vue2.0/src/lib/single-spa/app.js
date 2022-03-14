import {
  NOT_LOADED,
  getAppChanges,
  toLoadPromise,
  toUnmountPromise,
  toUnloadPromise,
  toMountPromise,
  toBootstrapPromise,
  shouldBeActive
} from "./app.helper";
import { callCapturedEventListeners } from './navigation-event';
var apps = []; // 作为全局变量保存registerApplication
export let started = false; // 判断是否为第一次开始
var peopleWaitingOnAppChange = [] // 排队队列中的任务
var appChangeUnderway = false

/**
 *
 * @description 完成mount前的所有事件
 *
 * @param {*} appName // 应用名，防止重复加载
 * @param {*} loadApp // 加载异步函数(bootstrap, mount, unmount)
 * @param {*} activeWhen // 激活应用的条件，参数location
 * @param {*} customProps // 父应用传入的common data
 */
export const registerApplication = function (
  appName,
  loadApp,
  activeWhen,
  customProps
) {
  var registration = {
    appName,
    loadApp,
    activeWhen,
    customProps,
    status: NOT_LOADED,
  };
  apps.push(registration);

  // 注册完成后，需要重新加载应用
  reroute();
};

// 启动
export function start() {
  started = true;
  reroute();
}

export function reroute(pendingPromises = [], eventArguments) {
  if (appChangeUnderway) {
    return new Promise((resolve, reject) => {
      peopleWaitingOnAppChange.push({
        resolve,
        reject,
        eventArguments
      })
    });
  }
  let { appsToLoad, appsToMount, appsToUnmount } = getAppChanges(apps); // 每次启动前，得根据状态分类apps
  if (started) {
    appChangeUnderway = true
    return performAppChanges(); // 调用start后，执行start后续任务
  }
  return loadApps(); // 未执行start的时候,执行registerApplication后续任务

  async function loadApps() {
    // load app source code，还不进行初始化
    await Promise.all(appsToLoad.map(toLoadPromise))
  }

  async function performAppChanges() {
    // 每次bootstrap前，需要将unmount的app卸载完成再执行。
    const unmountPromises = await appsToUnmount
      .map(toUnmountPromise)
      .map((unmountPromise) => unmountPromise.then(toUnloadPromise));

    // 匹配到没有加载过的应用 (加载=> 启动 => 挂载)
    const loadThenMountPromises = appsToLoad.map(async (app) => {
      app = await toLoadPromise(app); // 返回的是app
      return tryToBootstrapAndMount(app) //  返回的是promise
    });

    // 已经加载过了的应用 (启动 => 挂载)
    const mountPromises = appsToMount.map(async (app) => {
      return tryToBootstrapAndMount(app);
    });

    // 等待先卸载完成后触发路由方法
    await Promise.all(unmountPromises);
    // callAllEventListeners();

    // 加载后触发路由方法
    await Promise.all([...loadThenMountPromises, ...mountPromises]);
    callAllEventListeners();

    appChangeUnderway = false
    // 调用路由方法
    function callAllEventListeners() {
      pendingPromises.forEach((pendingPromise) => {
        callCapturedEventListeners(pendingPromise.eventArguments);
      });
      callCapturedEventListeners(eventArguments);
    }
  }

  async function tryToBootstrapAndMount(app) {
    if (shouldBeActive(app)) {
      app = await toBootstrapPromise(app);
      return toMountPromise(app);
    }
    return app;
  }
}