declare global {
  type AppStatus = {
    admin: 'pending' | 'loading' | 'running' | 'error'
    web: 'pending' | 'loading' | 'running' | 'error'
  }
}

export {}
