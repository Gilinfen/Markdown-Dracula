import markdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import emoji from 'markdown-it-emoji'
import container from 'markdown-it-container'
import matter from 'gray-matter'
import Prism from './prismjs'
import readingTime from 'reading-time'
import { MarkdownIt  } from './types'

type MarkdownItPost = MarkdownIt.MarkdownItPost

function generateUniqueId(n: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let uniqueId = ''

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    uniqueId += chars[randomIndex]
  }

  return uniqueId
}

export const mdItmarkdownExample = async (isHeader:boolean = true) => {
  const { nanoid } = await import('nanoid')

  const mdIt = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    highlight(str, lang): string {
      const copyDom = (text: string) =>
        `<div class="code-tyoe">${text}</div>`
      const reg = /\{(\d+|(\d+-\d+))(,(\d+|(\d+-\d+)))*\}/gi
      const strArr = lang.match(reg)?.[0]
      lang = lang.replace(reg, '')

      let code = ''

      try {
        if (lang && Prism.languages[lang]) {
          code = Prism.highlight(str, Prism.languages[lang], lang)
        } else {
          code = mdIt.utils?.escapeHtml(str)
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
      const header = `
      <div class="code-pre-header">
        <div class="code-pre-header-tools">
          <div class="code-pre-header-tool red" id="code-tool-down" ></div>
          <div class="code-pre-header-tool yellow" id="code-tool-small"></div>
          <div class="code-pre-header-tool green" id="code-tool-big" ></div>
        </div>
        <div class="copy-box">
          <svg viewBox="0 0 512 512"
            copyCodeKey id="${generateUniqueId(
              8
            )}"
            class="copy"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 472c-119.3 0-216-96.7-216-216S136.7 40 256 40s216 96.7 216 216-96.7 216-216 216z"/>
            <path d="M144 192h160v192H144z"/>
            <path d="M368 128H208v48h112v144h48z"/>
          </svg>
          ${copyDom(
            lang.length ? lang : 'txt'
          )}
        </div>
      </div>`

      return `<pre class="code-pre-box">${isHeader ? header.replace(/\n/g,''):''}<div class="code-pre-container"><pre class="code-line-container" ><code class="language-${lang}">${lineDiv}</code></pre><div class="code-mask">${maskDiv}</div><pre class="code-markdown line-numbers language-${lang}"><code class="language-${lang}">${code}</code></pre></div></pre>`
    }
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
        if (tokens[idx].nesting === 1) {
          // 处理开头标记
          return `<div ${isD ? 'id="details"':""}  class="custom-container ${
            m[0]
          }">${isD ? '':`<p class="custom-container-title" >${mdIt.utils.escapeHtml(
            m[1] ?? m[0]
          )}\n</p>`}`
        } else {
          // 处理结尾标记
          return `</div>\n`
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
): Promise<MarkdownIt.MarkdownItPost['frontmatter']> => {
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

export default async function markdown(test: string,options:MarkdownIt.markdownOptions = {}): Promise<MarkdownItPost> {
  const {isHeader} = options
  const { data, content } = matter(test)

  const { mdIt, sidebar } = await mdItmarkdownExample(isHeader)

  mdIt.render(`# ${data.title}`)

  const html = mdIt.render(content)

  return {
    code: `<div class="markdown-dracula">${html.replace(/<div id="details"(.*?)<\/div>/gs, '<details$1</details>')}</div>`,
    sidebar,
    frontmatter: {
      ...(data as MarkdownItPost['frontmatter']),
      title_id: sidebar[0].id,
      readingTime: readingTime(content)
    }
  }
}
