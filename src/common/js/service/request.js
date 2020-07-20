/**
 * 请求方法 2020/07/20 
 */

import apis from './apis';

export async function advance (payload = {}) {
  try {
    let { data } = await axios.post(apis.advance, payload)
    return data
  } catch (e) {
    console.log(e)
  }
}