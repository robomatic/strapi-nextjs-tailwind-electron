import Versions from './components/Versions'
import './assets/main.css'

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
      className="px-4 py-2 mt-4 text-white bg-slate-700 rounded-md hover:bg-indigo-600"
    >
      {children}
    </a>
  )
}

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="max-w-lg mx-auto p-8 flex gap-y-12 flex-col">
      <div className="text-blue-500">Powered by electron-vite</div>
      <div className="text-4xl text-gray-500">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="text-center">
        Please try pressing <code className="font-mono px-2 text-slate-400">F12</code> to open the
        devTool
      </p>
      <div className="actions">
        <div className="flex gap-4 py-8 justify-center">
          <ExternalLink href="https://electron-vite.org/">Documentation</ExternalLink>
          <ExternalLink onClick={ipcHandle}>Send IPC</ExternalLink>
          <ExternalLink href="http://localhost:1337">Launch Admin</ExternalLink>
        </div>
      </div>
      <Versions></Versions>
    </div>
  )
}

export default App
