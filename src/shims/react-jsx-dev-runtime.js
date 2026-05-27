import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

function jsxDEV(type, props, key, isStaticChildren) {
  return (isStaticChildren ? jsxs : jsx)(type, props, key);
}

export { Fragment, jsxDEV };
export default { Fragment, jsxDEV };
