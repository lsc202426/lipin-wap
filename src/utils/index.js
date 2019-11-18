/**
 * 清除会话储存内容，除了token
 * 使用示例：
 * 1、引入：import * as utils from '@/utils/index';
 *    或者：import {clearSession} from '@/utils/index';
 * 2、使用：utils.clearSession();
 *    或者：clearSession();
 */
export const clearSession = () => {
  if (sessionStorage.token) {
    let token = sessionStorage.token
    sessionStorage.clear()
    localStorage.clear()
    sessionStorage.token = token
  }
}
