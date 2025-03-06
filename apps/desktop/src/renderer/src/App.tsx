import Versions from './components/Versions'
import './assets/main.css'
import { useEffect, useState } from 'react'
import ExternalLink from './components/ExternalLink'
import AppStatusIndicator from './components/AppStatusIndicator'

function Plus(): JSX.Element {
  return <span className="text-slate-400 font-normal">+</span>
}

function App(): JSX.Element {
  const [appState, setAppState] = useState<AppStatus>({ admin: 'pending', web: 'pending' })

  useEffect(() => {
    const appStatus = async (): Promise<void> => {
      const status = await window.api.checkAppStatus()
      setAppState(status)
    }

    let interval: NodeJS.Timeout | null = null

    if (appState.admin !== 'running' || appState.web !== 'running') {
      interval = setInterval(appStatus, 1000)
    }

    return (): void => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [appState])

  return (
    <div className="max-w-xl mx-auto p-8 flex gap-y-12 flex-col">
      <div className="text-blue-500">Powered by electron-vite</div>
      <div className="text-3xl font-bold text-gray-500">
        Strapi <Plus /> NextJS <Plus /> Tailwind <Plus /> Electron
      </div>
      <p className="text-center">
        Please try pressing <code className="font-mono px-2 text-slate-400">F12</code> to open the
        devTool
      </p>
      <div className="actions">
        <div className="flex gap-4 py-8 justify-center">
          <AppStatusIndicator label="Admin" appState={appState.admin}>
            <ExternalLink href="http://localhost:1337">Launch Admin</ExternalLink>
          </AppStatusIndicator>
          <AppStatusIndicator label="Web" appState={appState.web}>
            <ExternalLink href="http://localhost:3000">Launch Web</ExternalLink>
          </AppStatusIndicator>
        </div>
      </div>
      <Versions></Versions>
    </div>
  )
}

export default App
