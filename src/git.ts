import { spawn } from 'cross-spawn'

export function getGitFileInfo(filePath: string) {
  return new Promise<object>(r => {
    const result = {
      commit_sha: '',
      commit_author: '',
      commit_date: '',
      create_date: '',
      create_author: ''
    }

    const gitLog = spawn('git', [
      'log',
      '-1',
      '--pretty=format:%H%n%an%n%ad%n',
      '--date=local',
      '--',
      filePath
    ])

    let stdoutData = ''

    gitLog.stdout.on('data', data => {
      stdoutData += data
    })

    gitLog.on('close', code => {
      if (code !== 0) {
        console.error(`Failed to get git log for ${filePath}.`)
        return
      }

      const dataArr = stdoutData.trim().split('\n')
      result.commit_sha = dataArr[0]
      result.commit_author = dataArr[1]
      result.commit_date = dataArr[2]

      const gitLogAll = spawn('git', [
        'log',
        '--pretty=format:%an%n%ad%n',
        '--date=local',
        '--reverse',
        '--',
        filePath
      ])

      let allStdoutData = ''

      gitLogAll.stdout.on('data', data => {
        allStdoutData += data
      })

      gitLogAll.on('close', code => {
        if (code !== 0) {
          console.error(`Failed to get git log for ${filePath}.`)
          return
        }

        const allDataArr = allStdoutData.trim().split('\n')
        result.create_author = allDataArr[0]
        result.create_date = allDataArr[1]

        r(result)
      })
    })
  })
}
