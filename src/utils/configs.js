// 定义全局变量
export default {
  api: {
    // 客服电话
    link_phone: '400-628-1118',
    // 本地连接
    public_domain: process.env.NODE_ENV === 'development' ? 'http://api.lipin.com' : 'http://lipin-api.itmnic.cn',
    // 线上连接
    public_domain_line: 'http://lipin-api.itmnic.cn'
  }
}
