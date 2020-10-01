/* eslint-disable */
import rootReducers from 'store/reducers/AdminReducers';
// import HospitalReducers from 'store/reducers/HospitalReducers';
import UploadReducers from 'store/reducers/uploadMediaReducers';

const files = require.context('.', false, /\.js$/)
const modules = {};
files.keys().forEach(key => {
    if (key === './index.js') return
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
export default { ...modules, ...rootReducers, ...UploadReducers }