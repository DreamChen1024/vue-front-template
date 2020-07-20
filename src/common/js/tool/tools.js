function getFormData (obj = {}) { // 参数序列化
  let formData = new FormData()
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key])
  })
  return formData
}

function deepClone (obj) {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (e) {
    console.log(e)
    return {}
  }
}

function copy (className) {
  let clipboard = new Clipboard(className)
  clipboard.on('success', e => {
    Toast.success('复制成功')
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    // 不支持复制
    console.log('该浏览器不支持自动复制')
    // 释放内存
    clipboard.destroy()
  })
}

function wxInput () {
  (/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
    // 这里加了个类型判断，因为a等元素也会触发blur事件
    ['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
  }, true)
}

export default {
  getFormData,
  deepClone,
  copy,
  wxInput
}