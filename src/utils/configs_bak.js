// 定义全局变量
export default {
  api: {
    // 客服电话
    link_phone: '400-628-1118',
    // 本地连接http://api.lipin.com
    public_domain: process.env.NODE_ENV === 'development' ? 'http://10.100.5.126:88' : 'https://lipin-api.itmnic.com',
    // 线上连接
    public_domain_line: 'https://lipin-api.itmnic.com',
    // 中文地址
    public_chinese_url: 'https://礼品.商标',
    // 英文地址
    public_english_url: 'https://lipin.itmnic.com'
  }
}
