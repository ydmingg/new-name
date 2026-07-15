/**
 * 华夏命名 - 收藏系统
 * 支持：收藏、删除、排序、备注、分享
 */

export interface CollectedName {
  id: number
  surname: string
  fullName: string
  systemId: string
  systemName: string
  temperament: string
  nameMeaning: string
  overallMeaning: string
  source: string
  poeticLine?: string
  notes?: string
  collectedAt: string
  rating?: number // 1-5 stars
}

export interface CollectionStats {
  totalCount: number
  bySystem: Record<string, number>
  byTemperament: Record<string, number>
  lastCollectedAt?: string
}

/**
 * 收藏管理器
 */
export class CollectionManager {
  private collections: CollectedName[] = []
  private storageKey = 'huaxia_naming_collections'

  constructor() {
    this.loadFromStorage()
  }

  /**
   * 添加到收藏
   */
  add(name: CollectedName): void {
    // 检查是否已收藏
    if (this.collections.some(c => c.id === name.id)) {
      return
    }

    this.collections.push({
      ...name,
      collectedAt: new Date().toISOString()
    })
    this.saveToStorage()
  }

  /**
   * 从收藏中移除
   */
  remove(id: number): void {
    this.collections = this.collections.filter(c => c.id !== id)
    this.saveToStorage()
  }

  /**
   * 检查是否已收藏
   */
  isCollected(id: number): boolean {
    return this.collections.some(c => c.id === id)
  }

  /**
   * 获取所有收藏
   */
  getAll(): CollectedName[] {
    return [...this.collections]
  }

  /**
   * 获取收藏数量
   */
  getCount(): number {
    return this.collections.length
  }

  /**
   * 按系统筛选
   */
  filterBySystem(systemId: string): CollectedName[] {
    return this.collections.filter(c => c.systemId === systemId)
  }

  /**
   * 按气质筛选
   */
  filterByTemperament(temperament: string): CollectedName[] {
    return this.collections.filter(c => c.temperament === temperament)
  }

  /**
   * 按收藏时间排序（最新在前）
   */
  sortByTime(descending = true): CollectedName[] {
    const sorted = [...this.collections].sort((a, b) => {
      const timeA = new Date(a.collectedAt).getTime()
      const timeB = new Date(b.collectedAt).getTime()
      return descending ? timeB - timeA : timeA - timeB
    })
    return sorted
  }

  /**
   * 按评分排序
   */
  sortByRating(descending = true): CollectedName[] {
    const sorted = [...this.collections].sort((a, b) => {
      const ratingA = a.rating ?? 0
      const ratingB = b.rating ?? 0
      return descending ? ratingB - ratingA : ratingA - ratingB
    })
    return sorted
  }

  /**
   * 按名字拼音排序
   */
  sortByName(descending = false): CollectedName[] {
    const sorted = [...this.collections].sort((a, b) => {
      const cmp = a.fullName.localeCompare(b.fullName, 'zh-CN')
      return descending ? -cmp : cmp
    })
    return sorted
  }

  /**
   * 更新备注
   */
  updateNotes(id: number, notes: string): void {
    const item = this.collections.find(c => c.id === id)
    if (item) {
      item.notes = notes
      this.saveToStorage()
    }
  }

  /**
   * 更新评分
   */
  updateRating(id: number, rating: number): void {
    const item = this.collections.find(c => c.id === id)
    if (item) {
      item.rating = Math.max(0, Math.min(5, rating))
      this.saveToStorage()
    }
  }

  /**
   * 获取统计信息
   */
  getStats(): CollectionStats {
    const stats: CollectionStats = {
      totalCount: this.collections.length,
      bySystem: {},
      byTemperament: {}
    }

    for (const collection of this.collections) {
      stats.bySystem[collection.systemName] = (stats.bySystem[collection.systemName] ?? 0) + 1
      stats.byTemperament[collection.temperament] = (stats.byTemperament[collection.temperament] ?? 0) + 1
      
      if (!stats.lastCollectedAt || new Date(collection.collectedAt) > new Date(stats.lastCollectedAt)) {
        stats.lastCollectedAt = collection.collectedAt
      }
    }

    return stats
  }

  /**
   * 导出收藏为 JSON
   */
  export(): string {
    return JSON.stringify(this.collections, null, 2)
  }

  /**
   * 导入收藏
   */
  import(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData)
      if (Array.isArray(imported)) {
        this.collections = imported
        this.saveToStorage()
        return true
      }
      return false
    } catch (e) {
      console.error('Failed to import collections:', e)
      return false
    }
  }

  /**
   * 清空所有收藏
   */
  clear(): void {
    this.collections = []
    this.saveToStorage()
  }

  /**
   * 从本地存储加载
   */
  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(this.storageKey)
      if (data) {
        this.collections = JSON.parse(data)
      }
    } catch (e) {
      console.error('Failed to load collections from storage:', e)
      this.collections = []
    }
  }

  /**
   * 保存到本地存储
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.collections))
    } catch (e) {
      console.error('Failed to save collections to storage:', e)
    }
  }
}

export const collectionManager = new CollectionManager()
