
export const NOT_LOADED = "NOT_LOADED"; // 未加载
export const LOAD_ERROR = "LOAD_ERROR"; // 加载失败
export const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE"; // 加载中
export const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED"; // 加载成功，等待开始
export const BOOTSTRAPPING = "BOOTSTRAPPING"; // 初始化中
export const NOT_MOUNTED = "NOT_MOUNTED"; // 初始成功，等待挂载或者销毁成功
export const MOUNTING = "MOUNTING"; // 挂载中
export const MOUNTED = "MOUNTED"; // 挂载成功
export const UNMOUNTING = "UNMOUNTING"; // 销毁中
export const UNLOADING = "UNLOADING"; // 卸载中

export const isActive = (app) => app.status === MOUNTED; // 应用是否已激活挂载
export const shouldBeActive = (app) => app.activeWhen(window.location); // activewhen:激活条件

// 根据不同状态分类需要load、mount、unmount的app
export const getAppChanges = (apps) => {
  const appsToLoad = [],
    appsToMount = [],
    appsToUnmount = [];
  apps.forEach((app) => {
    const appShouldBeActive = shouldBeActive(app);
    switch (app.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE:
        if (appShouldBeActive) {
          appsToLoad.push(app);
        }
        break;
      case NOT_BOOTSTRAPPED: // toMount
      case BOOTSTRAPPING:
      case NOT_MOUNTED:
        if (appShouldBeActive) {
          appsToMount.push(app);
        }
        break;
      case MOUNTED:
        if (!appShouldBeActive) {
          appsToUnmount.push(app);
        }
        break;
    }
  });
  return { appsToLoad, appsToMount, appsToUnmount };
};

/**
 * @description 状态机
 */

// 加载NOT_LOADED =》 LOADING_SOURCE_CODE =》 NOT_BOOTSTRAPPED
export const toLoadPromise = async function (app) {
  if (app.status !== NOT_LOADED) {
    return app;
  }
  app.status = LOADING_SOURCE_CODE;
  let { bootstrap, mount, unmount } = await app.loadApp();
  app.bootstrap = flattenFnArray(bootstrap);
  app.mount = flattenFnArray(mount);
  app.unmount = flattenFnArray(unmount);
  return Promise.resolve().then(async () => {
    app.status = NOT_BOOTSTRAPPED; // 加载成功，等待开始；只改变状态，未执行函数
    return app;
  });
};

// NOT_BOOTSTRAPPED =》 NOT_MOUNTED
export const toBootstrapPromise = async function (app) {
  if (app.status !== NOT_BOOTSTRAPPED) {
    return app;
  }
  app.status = BOOTSTRAPPING;
  await app.bootstrap(app.customProps); // 调用bootstrap钩子
  app.status = NOT_MOUNTED;
  return app;
};

// NOT_MOUNTED =》 MOUNTED
export const toMountPromise = async function (app) {
  if (app.status !== NOT_MOUNTED) {
    return app;
  }
  app.status = MOUNTING;
  await app.mount(app.customProps); // 调用bootstrap钩子
  app.status = MOUNTED;
  return app;
};

// MOUNTED =》 NOT_MOUNTED
export const toUnmountPromise = async function (app) {
  if (app.status !== MOUNTED) {
    return app;
  }
  app.status = UNMOUNTING;
  await app.unmount(app.customProps); // 调用bootstrap钩子
  app.status = NOT_MOUNTED;
  return app;
};

// unload
const appsToUnload = {};
export const toUnloadPromise = async function (app) {
  if (!appsToUnload[app.name]) {
    return app;
  }
  app.status = UNLOADING;
  delete app.bootstrap;
  delete app.mount;
  delete app.unmount;
  app.status = NOT_LOADED;
};




// 扁平化顺序执行fns
export const flattenFnArray = (fns) => {
  fns = Array.isArray(fns) ? fns : [fns];
  return async function (props) {
    return fns.reduce(
      (preFn, fn) => preFn.then((res) => fn(props, res)),
      Promise.resolve()
    );
  };
};

