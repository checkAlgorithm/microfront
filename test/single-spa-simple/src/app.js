import {
  NOT_LOADED,
  getAppChanges,
  toLoadPromise,
  toUnmountPromise,
  toUnloadPromise,
  toMountPromise,
  toBootstrapPromise,
} from "./app.helper.js";
var apps = []; // 作为全局变量保存registerApplication
export let started = false; // 判断是否为第一次开始

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

function reroute() {
  let { appsToLoad, appsToMount, appsToUnmount } = getAppChanges(apps); // 每次启动前，得根据状态分类apps
  if (started) {
    return performAppChanges(); // 调用start后，执行start后续任务
  }
  return loadApps(); // 未执行start的时候,执行registerApplication后续任务

  async function loadApps() {
    // load app source code，还不进行初始化
    debugger;
    return await Promise.all(appsToLoad.map(toLoadPromise));
  }

  async function performAppChanges() {
    console.log(apps);
    debugger;
    // 进行初始化bootstrap
    await appsToUnmount
      .map(toUnmountPromise)
      .map((unmountPromise) => unmountPromise.then(toUnloadPromise));
    appsToLoad.map((app) => {
      debugger;
      console.log(app);
    });
  }
}

/**
 * @registerApplication 参数整理/loadApp平铺/匹配active app/记录app状态
 *
 * @start 加载
 */
