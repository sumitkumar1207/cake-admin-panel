/* eslint-disable */
const files = require.context('.', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
  if (key === './index.js') return
  modules['Upload' + key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
// console.log('modules :', modules);
export default modules
