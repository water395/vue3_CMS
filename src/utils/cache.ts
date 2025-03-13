enum CancheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CancheType) {
    this.storage = CancheType.Local === type ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
const LocalCache = new Cache(CancheType.Local)
const sessionCache = new Cache(CancheType.Session)
export { LocalCache, sessionCache }
