import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { markdown } from 'markdown-dracula'
import path from 'path'
import express from 'express'

async function render() {
  const app = express()

  // 指定静态资源目录
  app.use(express.static('public'))

  // 启动服务器
  const port = 3000
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
  })
}

async function main() {
  const defaultPath = path.join(process.cwd(), '/public')
  const docsPath = path.join(process.cwd(), '/docs/content.md')

  try {
    mkdirSync(defaultPath)
  } catch (error) {}

  const { code } = await markdown(readFileSync(docsPath, 'utf-8'))

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
        href="../node_modules/markdown-dracula/dist/styles/index.css"
      />
      <link
        rel="stylesheet"
        href="../node_modules/markdown-dracula/dist/styles/dracula.css"
      />
    </head>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        width: 1200px;
        margin: 0 auto;
      }
    </style>
    <body>
      ${code}
    </body>
  </html>
  `
  )

  await render()
}

main()
