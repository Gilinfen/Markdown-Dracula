(()=>{
  if(window) {
    function copyToClipboard(
      text,
      collback
    ) {
      // 创建一个 textarea 元素
      const textArea = document.createElement('textarea')

      // 隐藏 textarea 元素
      textArea.style.cssText = 'opacity:0; position:fixed; top:0; right:100%;'

      // 设置元素内容
      textArea.value = text

      // 将 textarea 添加到 dom
      document.body.appendChild(textArea)

      // 选区元素中的内容
      textArea.select()

      try {
        // 执行复制到剪贴板操作
        document.execCommand('copy')
        collback?.('success')
      } catch (err) {
        collback?.('error', err)
      }

      // 移除 textarea 元素
      document.body.removeChild(textArea)
    }

     const dom = document.querySelectorAll('[copycodekey]')
     const copydom = Array.from(document.querySelectorAll('[data-copyid]'))

     for (let i = 0; i < dom.length; i++) {
      const item = dom[i];
      item.addEventListener('click',(e)=>{
        let id = null
        if(e.target.nodeName === 'path') {
          id = e.target.parentNode.getAttribute('id')
        } else {
          id = e.target.getAttribute('id')
        }
        const val = [...copydom].find(e=>e.getAttribute('data-copyid') === id)
        copyToClipboard(val.innerText)
      })
     }
  }
})()
