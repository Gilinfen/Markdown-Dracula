import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-less'

const Css = Prism.languages.css
const Scss = Prism.languages.scss
const Less = Prism.languages.less

const selectorDef = {
  'selector-class': /\.([a-zA-Z0-9_-]+)|#([a-zA-Z0-9_-]+)/,
  'selector-punctuation': /:|\(|\)/
}

// 更新 selector 规则
Prism.languages.css = {
  ...Css,
  selector: {
    ...Css.selector,
    inside: {
      ...selectorDef
    }
  }
}
Prism.languages.scss = {
  ...Scss,
  selector: {
    ...Scss.selector,
    inside: {
      ...selectorDef
    }
  }
}
Prism.languages.less = {
  ...Less,
  selector: {
    ...Less.selector,
    inside: {
      ...selectorDef
    }
  }
}

const defaultCss = {
  'css-type': {
    pattern: /rem|px|vm|vh/,
    alias: 'keyword'
  },
  'css-var-text': {
    pattern: /-([a-z]+)-([a-z]+)-([a-z]+)/,
    alias: 'text',
    inside: {
      // 指定在匹配到关键字后，再去匹配 .classname 这样的类选择器
    }
  }
}

// 添加自定义 token
Prism.languages.insertBefore('css', 'property', defaultCss)
Prism.languages.insertBefore('scss', 'property', {
  ...defaultCss
})
Prism.languages.insertBefore('less', 'property', defaultCss)
