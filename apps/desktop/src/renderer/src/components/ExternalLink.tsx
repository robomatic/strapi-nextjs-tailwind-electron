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

export default ExternalLink
