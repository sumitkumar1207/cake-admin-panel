/* eslint-disable */
// import loginReducers from './loginReducers';
// import userReducers from './userReducers';
// import loaderReducers from './loaderReducers';

// export default {
//     auth: loginReducers,
//     userReducers,
//     loaderReducers,
//     hospitalReducers
// };
const files = require.context('.', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
    if (key === './index.js') return
    modules['Admin' + key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
// console.log('modules :', modules);
export default modules
