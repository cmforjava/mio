const storage = {
  get: (key, nil = '') => {
    let value
    try {
      value = JSON.parse(localStorage.getItem(key)).value
    } catch (e) {
      value = nil
    }
    return value
  },
  set: (key, value, outtime) => {
    const time = new Date().getTime()
    // let despiretime = time + outtime
    const data = {
      time,
      value
    }
    if (outtime) {
      data.outtime = outtime
    }
    localStorage.setItem(key, JSON.stringify(data))
  },
  multiset: (params, outtime) => {
    for (const item in params) {
      storage.set(item, params[item], outtime)
    }
  },
  multiget: (...params) => {
    return params.map((item) => {
      return storage.get(item)
    })
  },
  remove: (key) => {
    localStorage.removeItem(key)
  },
  clear: () => {
    localStorage.clear()
  },
  multiremove: (...params) => {
    params.forEach((item) => {
      storage.remove(item)
    })
  }
}
export default storage
