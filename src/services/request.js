import axios from 'axios';
import { Loading } from 'element-ui';

let cancel = {};
const headerConf = {'X-Requested-With': 'XMLHttpRequest'};
let promiseArr = {};
const CancelToken = axios.CancelToken;
// 请求拦截器
axios.interceptors.request.use((config) => {
  // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
    promiseArr[config.url] = cancel;
  } else {
    promiseArr[config.url] = config;
  }
  return promiseArr[config.url];
}, error => Promise.reject(error));
// 响应拦截器即异常处理
axios.interceptors.response.use(response => response, err => {
  if (err && err.response) {
    switch (err.response.status) {
    case 400:
      err.message = '错误请求';
      break;
    case 401:
      err.message = '未授权，请重新登录';
      break;
    case 403:
      err.message = '拒绝访问';
      break;
    case 404:
      err.message = '请求错误,未找到该资源';
      break;
    case 405:
      err.message = '请求方法未允许';
      break;
    case 408:
      err.message = '请求超时';
      break;
    case 500:
      err.message = '服务器端出错';
      break;
    case 501:
      err.message = '网络未实现';
      break;
    case 502:
      err.message = '网络错误';
      break;
    case 503:
      err.message = '服务不可用';
      break;
    case 504:
      err.message = '网络超时';
      break;
    case 505:
      err.message = 'http版本不支持该请求';
      break;
    default:
      err.message = `连接错误${err.response.status}`;
    }
  } else {
    err.message = '连接到服务器失败';
  }
  return Promise.resolve(err.response);
});
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/';
// 设置默认请求头
axios.defaults.headers = headerConf;
axios.defaults.timeout = 10000;
const _this = Window;
let loading = null;

function starteLoading() {
  if (!loading) {
    loading = Loading.service({
      lock: true,
      text: '加载中...',
    });
  }
}

function closeLoading() {
  if (loading) {
    loading.close();
    loading = null;
  }
}

const call = function (res, err, solve) {
  closeLoading();
  promiseArr = {};
  if (!err) {
    if (res.code === '0') {
      solve(res);
    } else {
      _this.$message.error(res.message);
    }
  } else {
    // rej(err);
    _this.$message.error(err.toString());
  }
};

export default {
  // get请求
  get(url, param = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      }).then((res, err) => {
        res = res.data;
        call(res, err, resolve, reject);
      }).catch(err => {
        reject(err);
      });
    });
  },
  // post请求
  post(url, param = {}, conf = {}) {
    const params = {
      method: 'post',
      url,
      data: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    };
    if (conf) {
      params.headers = {
        ...headerConf,
        ...conf,
      };
    }
    return new Promise((resolve, reject) => {
      starteLoading();
      axios(params).then((res, err) => {
        if (res) {
          res = res.data;
          call(res, err, resolve, reject);
        }
      }).catch(err => {
        closeLoading();
        _this.$message.error(err.toString());
      });
    });
  },
};
