import { ReadTimeResults } from 'reading-time'

export type BlogFrontmatter = {
  /**
   * 文章简介
   */
  description: string
  /**
   * 图片
   */
  imgUrl?: string
  /**
   * 最后更新时间
   */
  lastUpdated: string
  /**
   * 发布时间
   */
  publishedAt: string
  /**
   * 标签
   */
  tags: string
  /**
   * 页面路径
   */
  slug: string
  /**
   * 文章 title
   */
  title: string
  /**
   * 文章标题 id
   */
  title_id: string
  /**
   * blog 部分内容
   */
  partHtml?: string
  /**
   * 阅读时间
   */
  readingTime: ReadTimeResults
  /**
   * git message
   */
  git?: {
    /**
     * commit sha
     */
    commit_sha: string
    /**
     * 最后一次提交作者
     */
    commit_author: string
    /**
     * 最后一次提交时间
     */
    commit_date: string
    /**
     * 创建时间
     */
    create_date: string
    /**
     * 创建作者
     */
    create_author: string
  }
}

export type MarkdownItPost = {
  /**
   * Markdown 转换的 Html 字符串
   */
  code: string
  /**
   * 文章侧边栏导航
   */
  sidebar: {
    /**
     * 每个标题 id
     */
    id: string
    /**
     * 标签级别，以 h2 开始
     */
    tag: string
    /**
     * 标题级别
     */
    level: string
    /**
     * 标签值
     */
    value: string
  }[]
  /**
   * 文章 frontmatter
   */
  frontmatter: BlogFrontmatter
}
