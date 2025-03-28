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
    if (typeof value == 'string') {
      this.storage.setItem(key, value)
    } else {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return typeof key === 'string' ? value : JSON.parse(value)
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
