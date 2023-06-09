---
title: Markdronw 语法测试
description: 腾讯前端实习面试总结与复盘
publishedAt: '2020-05-26'
lastUpdated: '2022-09-18'
tags: 'react,nextjs,umijs,electron,vue,three,sass,less,ecmascript6,javascript,eslint,prettier,stylelint,npm,webpack,vite,nestjs,node,python,linux,nginx,docker,kubernetes,gitlab,jenkins,mysql,git,http,typescript,css,html,webapi'
---

## 321312

这是一段 **粗体** 和 _斜体_ 的文本。

## 2

### 3

### 31

### 32

#### 4

#### 41

#### 42

## 列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表列表

无序列表：

- 项目 1
- 项目 2
- 项目 3

有序列表：

1. 项目 1
2. 项目 2
3. 项目 3

## 公式

$$
a+b=12
$$

## 自定义容器

::: tip 成功

```ts
// 声明（含有子属性的）全局对象
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
```

:::

::: warning 警告
这是一个成功的容器
:::

::: danger 失败
| 1 | 3 | 312 |
| --- | ------ | ---- |
| 2 | 213123 | 321 |
| 3 | 12321 | 3123 |
| 3 | 3 | 123 |
:::

::: details
这是一个成功的容器
:::

## 表格

| 1   | 3      | 312  |
| --- | ------ | ---- |
| 2   | 213123 | 321  |
| 3   | 12321  | 3123 |
| 3   | 3      | 123  |

## Emoji

:smile: :heart: :rocket:

## Blockquotes

> This is a blockquote.

## Horizontal Rule

---

## Task Lists

- [ ] 11321
- [ ] 33213
- [ ] 123
- [ ] 123

## 链接和图片

这是一个链接到 [Google](https://www.google.com/) 的文本。

https://www.google.com/

这是一个图片：
![image-20220618173422200](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201015367.png)

## 代码块

`sssssddasd`

这是一个代码块：

```py{2,4,3-5}
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
print("排序后的数组：")
for i in range(len(arr)):
    print("%d" % arr[i])
```

```
## 链接和图片

这是一个链接到 [Google](https://www.google.com/) 的文本。

https://www.google.com/

这是一个图片：
![image-20220618173422200](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201015367.png)
```

```sh
docker ps
```

```dockerfile{1,4,6,7,9}
# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM node:alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn turbo run build --filter=web...

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js
```

```nginx
# docs.glinfem.com
server {
  listen 80;
  server_name docs.glinfen.com;
  return 301 https://$server_name$request_uri;
}

# docs.glinfen.com
server {
  #配置HTTPS的默认访问端口为443。
  #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
  #如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
  listen 443 ssl;

  #填写证书绑定的域名
  server_name docs.glinfen.com;
  root /etc/nginx/html/docs.glinfen.com/dist;
  index index.html index.htm;

  #填写证书文件名称
  ssl_certificate /etc/nginx/ssl/docs.glinfen.com/docs.glinfen.com.pem;
  #填写证书私钥文件名称
  ssl_certificate_key /etc/nginx/ssl/docs.glinfen.com/docs.glinfen.com.key;

  ssl_session_timeout 5m;
  #表示使用的加密套件的类型
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  #表示使用的TLS协议的类型，您需要自行评估是否配置TLSv1.1协议。
  ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;

  ssl_prefer_server_ciphers on;

  location / {
    proxy_pass http://glinfen-docs:3000/;
  }

  location ^~ /frame/ {
    proxy_pass http://frame/;
  }
  location ^~ /javascript/ {
    proxy_pass http://javascript/;
  }
  location ^~ /lints/ {
    proxy_pass http://lints/;
  }
  location ^~ /paks/ {
    proxy_pass http://paks/;
  }
  location ^~ /server/ {
    proxy_pass http://server/;
  }
  location ^~ /service/ {
    proxy_pass http://service/;
  }
  location ^~ /typescript/ {
    proxy_pass http://typescript/;
  }
  location ^~ /webapp/ {
    proxy_pass http://webapp/;
  }
}
```

```ts
// 声明（含有子属性的）全局对象
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
const a = 11
```

```javascript
String.prototype.repeatify = function (n) {
  let res = ''
  while (n--) {
    res += this
  }
  return res
}
console.log('hello'.repeatify(3))
const a = 11
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

```less
.code-tyoe {
  position: absolute;
  top: 0.6rem;
  right: 1.1rem;
  padding: 0.3rem 0.5rem;
  z-index: 1;
  color: var(--code-type-text);
  border: 1px solid var(--c-copy-br);
  border-radius: 6px;
  transition: all 0.3s ease;
  overflow: auto !important;

  &:hover {
    cursor: pointer;
    --c-copy-br: #4b4b4e;
  }
  > div {
  }
}
```

```scss
.code-tyoe {
  position: absolute;
  top: 0.6rem;
  right: 1.1rem;
  padding: 0.3rem 0.5rem;
  z-index: 1;
  color: var(--code-type-text);
  border: 1px solid var(--c-copy-br);
  border-radius: 6px;
  transition: all 0.3s ease;
  overflow: auto !important;

  &:hover {
    cursor: pointer;
    --c-copy-br: #4b4b4e;
  }
  > div {
  }

  @mixin left {
    　　float: left;
    　　margin-left: 10px;
  }

  /*!
　　重要注释！
*/
}
```

```css
pre {
  line-height: 1.375;
  padding: 1.3rem 1.5rem;
  margin: 0.85rem 0;
  border-radius: 6px;
  overflow: auto !important;
  background: #282a35;
  border: 1px solid var(--c-copy-br);
}

.css {
}
#sss:hover {
}

.code-line:nth-child() {
  display: block;
}
```

```tsx
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  static getAnalyticsTag = () => {
    return {
      __html: ``
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <script dangerouslySetInnerHTML={MyDocument.getAnalyticsTag()} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```
