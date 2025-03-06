import Versions from './components/Versions'
import './assets/main.css'
import { useEffect, useState } from 'react'

function ExternalLink({
  href,
  children,
  onClick
}: {
  href?: string
  children: string
  onClick?: () => void
}): JSX.Element {
  return (
    <a
      href={href}
      target={href ?? '_blank'}
      rel={href ?? 'noreferrer'}
      onClick={onClick}
      className="px-4 py-2 text-white bg-slate-700 rounded-md hover:bg-indigo-600 flex items-center text-center"
    >
      {children}
    </a>
  )
}

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  )
}

function AppStatusIndicator({
  label,
  appState,
  children
}: {
  label: string
  appState: string
  children: JSX.Element
}): JSX.Element {
  return (
    <div className="text-amber-600 flex flex-col justify-center text-center">
      {appState === 'running' ? (
        children
      ) : (
        <>
          <span className="whitespace-nowrap">{label}</span>
          <span className="inline-flex gap-2 items-center justify-center animate-pulse">
            {appState}
            <Spinner />
          </span>
        </>
      )}
    </div>
  )
}

function Plus() {
  return <span className="text-slate-400 font-normal">+</span>
}

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [appState, setAppState] = useState({ admin: 'pending', web: 'pending' })

  useEffect(() => {
    const appStatus = async (): Promise<void> => {
      const status = await window.electronAPI.checkAppStatus()
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
        Strapi <Plus /> NextJS <Plus /> Tailwind
        <Plus /> Electron
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
