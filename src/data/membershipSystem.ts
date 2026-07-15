/**
 * 华夏命名 - 会员体系
 * 免费用户：每天 3 次生成
 * VIP 用户：无限生成 + 全部功能
 */

export type MembershipLevel = 'free' | 'vip'

export interface UserMembership {
  level: MembershipLevel
  dailyGenerations: number
  maxDailyGenerations: number
  lastResetDate: string
  features: {
    allNamingSystems: boolean
    aiDeepAnalysis: boolean
    namePK: boolean
    collectionSystem: boolean
    sharePosters: boolean
    customFonts: boolean
    ancientPosters: boolean
  }
}

export interface VIPPlan {
  id: string
  name: string
  price: number
  currency: string
  period: 'month' | 'year' | 'lifetime'
  features: string[]
  description: string
}

export const FREE_MEMBERSHIP: UserMembership = {
  level: 'free',
  dailyGenerations: 0,
  maxDailyGenerations: 3,
  lastResetDate: new Date().toISOString().split('T')[0],
  features: {
    allNamingSystems: false,
    aiDeepAnalysis: false,
    namePK: false,
    collectionSystem: true,
    sharePosters: false,
    customFonts: false,
    ancientPosters: false
  }
}

export const VIP_MEMBERSHIP: UserMembership = {
  level: 'vip',
  dailyGenerations: 0,
  maxDailyGenerations: 999999,
  lastResetDate: new Date().toISOString().split('T')[0],
  features: {
    allNamingSystems: true,
    aiDeepAnalysis: true,
    namePK: true,
    collectionSystem: true,
    sharePosters: true,
    customFonts: true,
    ancientPosters: true
  }
}

export const VIP_PLANS: VIPPlan[] = [
  {
    id: 'monthly',
    name: '月卡',
    price: 29,
    currency: 'CNY',
    period: 'month',
    features: [
      '无限生成名字',
      '全部 10 大命名体系',
      'AI 深度解析（800字）',
      '名字 PK 功能',
      '古风分享海报',
      '专属字体',
      '无广告体验'
    ],
    description: '按月订阅，随时取消'
  },
  {
    id: 'continuous',
    name: '连续包月',
    price: 19,
    currency: 'CNY',
    period: 'month',
    features: [
      '无限生成名字',
      '全部 10 大命名体系',
      'AI 深度解析（800字）',
      '名字 PK 功能',
      '古风分享海报',
      '专属字体',
      '无广告体验'
    ],
    description: '首月 19 元，续费 29 元/月'
  },
  {
    id: 'lifetime',
    name: '终身卡',
    price: 99,
    currency: 'CNY',
    period: 'lifetime',
    features: [
      '无限生成名字',
      '全部 10 大命名体系',
      'AI 深度解析（800字）',
      '名字 PK 功能',
      '古风分享海报',
      '专属字体',
      '无广告体验',
      '终身免费更新'
    ],
    description: '一次购买，永久使用'
  }
]

/**
 * 权限检查工具
 */
export class PermissionChecker {
  /**
   * 检查是否可以生成名字
   */
  static canGenerate(membership: UserMembership): boolean {
    return membership.dailyGenerations < membership.maxDailyGenerations
  }

  /**
   * 检查是否可以访问 AI 深度解析
   */
  static canAccessAIAnalysis(membership: UserMembership): boolean {
    return membership.features.aiDeepAnalysis
  }

  /**
   * 检查是否可以使用名字 PK
   */
  static canUsePK(membership: UserMembership): boolean {
    return membership.features.namePK
  }

  /**
   * 检查是否可以分享海报
   */
  static canSharePoster(membership: UserMembership): boolean {
    return membership.features.sharePosters
  }

  /**
   * 检查是否可以访问所有命名体系
   */
  static canAccessAllSystems(membership: UserMembership): boolean {
    return membership.features.allNamingSystems
  }

  /**
   * 获取 AI 分析的字数限制
   */
  static getAIAnalysisLimit(membership: UserMembership): number {
    return membership.level === 'vip' ? 800 : 100
  }

  /**
   * 获取剩余生成次数
   */
  static getRemainingGenerations(membership: UserMembership): number {
    return Math.max(0, membership.maxDailyGenerations - membership.dailyGenerations)
  }

  /**
   * 检查是否需要升级
   */
  static needsUpgrade(membership: UserMembership, feature: string): boolean {
    switch (feature) {
      case 'ai_analysis':
        return !membership.features.aiDeepAnalysis
      case 'name_pk':
        return !membership.features.namePK
      case 'share_poster':
        return !membership.features.sharePosters
      case 'all_systems':
        return !membership.features.allNamingSystems
      default:
        return false
    }
  }
}

/**
 * 会员管理器
 */
export class MembershipManager {
  /**
   * 增加生成次数
   */
  static addGeneration(membership: UserMembership): UserMembership {
    const today = new Date().toISOString().split('T')[0]
    
    // 检查是否需要重置计数
    if (membership.lastResetDate !== today) {
      return {
        ...membership,
        dailyGenerations: 1,
        lastResetDate: today
      }
    }

    return {
      ...membership,
      dailyGenerations: membership.dailyGenerations + 1
    }
  }

  /**
   * 升级到 VIP
   */
  static upgradeToVIP(membership: UserMembership): UserMembership {
    return {
      ...VIP_MEMBERSHIP,
      dailyGenerations: 0,
      lastResetDate: new Date().toISOString().split('T')[0]
    }
  }

  /**
   * 降级到免费
   */
  static downgradeToFree(membership: UserMembership): UserMembership {
    return {
      ...FREE_MEMBERSHIP,
      dailyGenerations: 0,
      lastResetDate: new Date().toISOString().split('T')[0]
    }
  }

  /**
   * 重置每日计数
   */
  static resetDailyCount(membership: UserMembership): UserMembership {
    return {
      ...membership,
      dailyGenerations: 0,
      lastResetDate: new Date().toISOString().split('T')[0]
    }
  }
}

/**
 * 获取会员级别的显示名称
 */
export function getMembershipLevelName(level: MembershipLevel): string {
  return level === 'vip' ? 'VIP 会员' : '免费用户'
}

/**
 * 获取会员级别的描述
 */
export function getMembershipDescription(level: MembershipLevel): string {
  if (level === 'vip') {
    return '尊享 VIP 会员，无限生成名字，解锁全部功能'
  }
  return '免费用户，每天可生成 3 次名字'
}
