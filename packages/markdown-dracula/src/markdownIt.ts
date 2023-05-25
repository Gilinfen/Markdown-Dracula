import markdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import emoji from 'markdown-it-emoji'
import container from 'markdown-it-container'
import matter from 'gray-matter'
import Prism from './prismjs'
import readingTime from 'reading-time'
import { MarkdownItPost } from './types'

function generateUniqueId(n: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let uniqueId = ''

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    uniqueId += chars[randomIndex]
  }

  return uniqueId
}

const highlight: markdownIt.Options['highlight'] = function (str, lang): string {
  const copyDom = (text: string) =>
    `<div copyCodeKey id="${generateUniqueId(
      8
    )}" class="code-tyoe">${text}</div>`
  const reg = /\{(\d+|(\d+-\d+))(,(\d+|(\d+-\d+)))*\}/gi
  const strArr = lang.match(reg)?.[0]
  lang = lang.replace(reg, '')

  let code = ''

  try {
    if (lang && Prism.languages[lang]) {
      code = Prism.highlight(str, Prism.languages[lang], lang)
    } else {
      code = this.utils.escapeHtml(str)
    }
  } catch (__) {}

  const codeList = (render: (i: number) => string) => {
    const lines = code.split(/\r?\n/).length - 1
    return [...Array(lines)].map((_, i) => render(i)).join('')
  }

  const lineDiv = codeList(i => `<span class="code-line">${i + 1}</span>`)
  let maskDiv = ''
  if (strArr) {
    const strList = strArr.replace(/{|}/gi, '').split(',')

    const mask = strList
      .map(e => {
        if (/-/g.test(e)) {
          const list = e.split('-')
          const fillArr = new Array(parseInt(list[list.length - 1]))
            .fill(1)
            .map((_, i) => i + 1)

          return fillArr.slice(parseInt(list[0]) - 1)
        }
        return e
      })
      .flatMap((e: any) => {
        if (typeof e === 'string') return parseInt(e)
        return e
      })
    maskDiv = codeList(i => {
      return mask.includes(i)
        ? '<div class="code-mask-row"></div>'
        : `<br/>`
    })
  }

  return `<pre class="code-pre-box"><pre class="code-line-container" ><code class="language-${lang}">${lineDiv}</code></pre><div class="code-mask">${maskDiv}</div>${copyDom(
    lang.length ? lang : 'txt'
  )}<pre class="code-markdown line-numbers language-${lang}"><code class="language-${lang}">${code}</code></pre></pre>`
}

export const mdItmarkdownExample = async () => {
  const { nanoid } = await import('nanoid')
  let tag = 'div'

  const mdIt = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    highlight
  })
    .use(anchor, {
      permalink: true,
      permalinkBefore: true,
      permalinkSpace: true,
      permalinkSymbol: '#',
      level: [1, 2, 3, 4],
      slugify: function (s: any) {
        return `${decodeURIComponent(
          String(s).trim().toLowerCase().replace(/\s+/g, '-')
        )}`
      }
    })
    .use(emoji)
    .use(container, 'custom', {
      validate(params: string) {
        const types = ['tip', 'warning', 'danger', 'details']
        const m = params.trim().split(/\s/)
        if (!types.includes(m[0])) return false
        return m
      },
      render(tokens: any, idx: any) {
        const m = tokens[idx].info.trim().split(/\s/)
        const isD = m[0] === 'details'
        if(isD) {
          tag = 'details'
        }else {
          tag = 'div'
        }
        if (tokens[idx].nesting === 1) {
          // 处理开头标记
          return `<div class="custom-container ${
            m[0]
          }">${isD ? '':`<p class="custom-container-title" >${mdIt.utils.escapeHtml(
            m[1] ?? m[0]
          )}\n</p>`}<${tag}>`
        } else {
          // 处理结尾标记
          return `</${tag}></div>\n`
        }
      }
    })

  // 替换内联代码的处理函数
  mdIt.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    // 首先获取要渲染的代码内容
    let code = tokens[idx].content
    code = code.replace(/</g, '&lt;')
    code = code.replace(/>/g, '&gt;')
    // 最后将高亮后的代码包装在一个 <code> 标签中，并添加自定义的 'codes' 类名
    return `<code class="inline-code">${code}</code>`
  }

  mdIt.renderer.rules.image = function (tokens, idx, options, env, self) {
    const code = tokens[idx].attrs
    const str = code?.reduce((pre: string, item: string[]) => {
      if (item[0] === 'src') {
        return pre + ' ' + `src="${item[1]}"`
      }
      const attr = `${item[0]}="${item[1]}"`
      return pre + ' ' + attr
    }, '')
    return `<img class="markdown-image" ${str} />`
  }
  const sidebar: MarkdownItPost['sidebar'] = []
  mdIt.renderer.rules.heading_open = function (
    tokens,
    idx,
    options,
    env,
    self
  ) {
    const token = tokens[idx]
    const level = token.tag.slice(1)
    const tag = 'h' + level
    const attrs = token.attrs?.reduce((pre: string, item: string[]) => {
      if (item[0] === 'id') {
        sidebar.push({
          id: nanoid(),
          tag,
          level,
          value: item[1]
        })
      }
      const attr = `${item[0]}="${item[1]}"`
      return pre + ' ' + attr
    }, '')

    const hslub = `<${tag} ${attrs} class="header-anchor-h" data-id="${
      sidebar[sidebar.length - 1].id
    }">`
    return hslub
  }

  return {
    mdIt,
    sidebar
  }
}

export const mdFrontmatter = async (
  source: string,
  postSlug: string
): Promise<MarkdownItPost['frontmatter']> => {
  const { nanoid } = await import('nanoid')
  const { mdIt } = await mdItmarkdownExample()

  const { data, content } = matter(source)

  const partHtml = mdIt.render(content)

  return {
    ...(data as MarkdownItPost['frontmatter']),
    slug: postSlug.replace('.md', ''),
    tags: data.tags.split(','),
    title_id: nanoid(),
    readingTime: readingTime(source),
    partHtml
  }
}

export default async function markdown(test: string): Promise<MarkdownItPost> {
  const { data, content } = matter(test)

  const { mdIt, sidebar } = await mdItmarkdownExample()

  mdIt.render(`# ${data.title}`)

  const html = mdIt.render(content)

  return {
    // code: `<div class="markdown-content">${html}</div>`,
    code: html,
    sidebar,
    frontmatter: {
      ...(data as MarkdownItPost['frontmatter']),
      title_id: sidebar[0].id,
      readingTime: readingTime(content)
    }
  }
}
