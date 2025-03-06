import { spawn } from 'child_process'
import { join } from 'path'

const retryInterval = 1000

export function launchApp(dir: string, command = 'dev'): void {
  const spawnProcess = spawn('npm', ['run', command], {
    cwd: join(__dirname, '../../../', dir),
    stdio: 'inherit'
  })

  spawnProcess.on('close', (code) => {
    console.log(`Applocation process exited with code ${code}`)
  })

  spawnProcess.on('error', (error) => {
    console.error('Failed to start application process:', error)
  })

  process.on('exit', () => {
    spawnProcess.kill()
  })
  process.on('SIGINT', () => {
    spawnProcess.kill()
  })
  process.on('SIGTERM', () => {
    spawnProcess.kill()
  })
}

export function checkApplicationServerStatus(serverUrl: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const check = async (): Promise<void> => {
      try {
        const response = await fetch(serverUrl)
        if (response) {
          console.log('Application server is up. Ready to perform additional actions.')
          resolve()
        }
      } catch {
        console.log('Application server is not yet up. Retrying in ' + retryInterval + 'ms...')
        setTimeout(check, retryInterval)
      }
    }

    check()
  })
}
