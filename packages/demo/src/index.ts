import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { markdown } from 'markdown-dracula'
import path from 'path'
import express from 'express'
// 启动服务器
const port = 5000

async function render() {
  const app = express()

  // 指定静态资源目录
  app.use(express.static(path.join(process.cwd())))

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/public`)
  })
}

async function main() {
  const defaultPath = path.join(process.cwd(), '/public')
  const docsPath = path.join(process.cwd(), '/src/docs/content.md')

  try {
    mkdirSync(defaultPath)
  } catch (error) {}

  const { code, sidebar, frontmatter } = await markdown(
    readFileSync(docsPath, 'utf-8')
  )

  writeFileSync(
    `${defaultPath}/index.html`,
    `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Markdwond</title>
      <link
        rel="stylesheet"
        href=" http://localhost:${port}/node_modules/markdown-dracula/dist/styles/index.css"
      />
      <link
        rel="stylesheet"
        href="http://localhost:${port}/node_modules/markdown-dracula/dist/styles/dracula.css"
      />
    </head>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        margin: 0 auto;
      }
    </style>
    <body>
      <body>
        ${code}
      </body>
      <script
        type="text/javascript"
        defer
        src="http://localhost:${port}/node_modules/markdown-dracula/dist/lib/copy.js"
      ></script>
    </body>
  </html>
  `
  )

  await render()
}

main()
