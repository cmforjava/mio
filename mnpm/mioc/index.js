/**
 * Created by Mio on 2019/3/14.
 * Updated by Mio on 2020/3/18.
 */

let mioc = {
  /*
   * data: 数据源
   * indexstr: 下标字符串
   * nil: 默认值 不填为''
   */
  mget: (data, indexstr, nil = '') => {
    let arr
    if (typeof indexstr === 'string') {
      arr = indexstr.split('.')
    }
    let result
    try {
      arr.map(p => {
        data = data[p]
      })
      result = data || nil
    } catch (e) {
      result = nil
    }
    return result
  }
}

module.exports = mioc
