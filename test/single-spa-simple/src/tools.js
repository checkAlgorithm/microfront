export const flattenFnArray = (fns) => {
  fns = Array.isArray(fns) ? fns : [fns];
  return async function (props) {
    return fns.reduce(
      (preFn, fn) => preFn.then(() => fn(props)),
      Promise.resolve()
    );
  };
};
