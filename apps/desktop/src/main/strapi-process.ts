import { spawn } from 'child_process'
import { join } from 'path'

const serverUrl = 'http://127.0.0.1:1337'
const retryInterval = 1000

export function launchStrapi(): void {
  const strapiProcess = spawn('npm', ['run', 'dev:spawn'], {
    cwd: join(__dirname, '../../../admin'),
    stdio: 'inherit'
  })

  strapiProcess.on('close', (code) => {
    console.log(`Strapi server exited with code ${code}`)
  })

  strapiProcess.on('error', (error) => {
    console.error('Failed to start Strapi server:', error)
  })

  process.on('exit', () => {
    strapiProcess.kill()
  })
  process.on('SIGINT', () => {
    strapiProcess.kill()
  })
  process.on('SIGTERM', () => {
    strapiProcess.kill()
  })
}

export function checkStrapiServerStatus(): Promise<void> {
  return new Promise<void>((resolve) => {
    const check = async (): Promise<void> => {
      try {
        const response = await fetch(serverUrl)
        if (response) {
          console.log('Strapi server is up. Ready to perform additional actions.')
          resolve()
        }
      } catch {
        console.log('Strapi server is not yet up. Retrying in ' + retryInterval + 'ms...')
        setTimeout(check, retryInterval)
      }
    }

    check()
  })
}
