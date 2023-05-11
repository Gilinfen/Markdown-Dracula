import path from 'path'
import { markdown } from '../dist/index.cjs'
import { readFileSync } from 'fs'

async function name() {
  const file = readFileSync('./test/test.md', 'utf-8')
  const res = await markdown(file)
  console.log(res)
}
name()
