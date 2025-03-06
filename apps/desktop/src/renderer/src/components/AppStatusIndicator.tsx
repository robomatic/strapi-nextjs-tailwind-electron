import Spinner from './Spinner'

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

export default AppStatusIndicator
