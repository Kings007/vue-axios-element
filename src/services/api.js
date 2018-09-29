import $http from './request';

export default {
  test: {
    getTest(param = {}) {
      return $http.get('manage/customer/getOrderdetailByOrderNo', param);
    },
    postTest(param = {}) {
      return $http.post('v1/sc/goods/sku/instruction', param);
    },
  },
};
