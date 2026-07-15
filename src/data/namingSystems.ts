/**
 * 华夏命名 - 10大命名体系定义
 * 每个体系都有独立的算法、特点和文化来源
 */

export type NamingSystemType = 
  | 'hanwei'        // 汉魏古法
  | 'shijing'       // 诗经命名
  | 'chuci'         // 楚辞命名
  | 'tangshi'       // 唐诗命名
  | 'songci'        // 宋词命名
  | 'junzi'         // 君子风格
  | 'ruya'          // 儒雅风格
  | 'nvzi'          // 女子风格
  | 'xiandai'       // 现代简约
  | 'aiwen'         // AI文化命名

export interface NamingSystem {
  id: NamingSystemType
  name: string
  description: string
  features: string[]
  source: string
  era: string
  suitable_for: ('male' | 'female' | 'both')[]
  algorithm_type: 'classical' | 'poetic' | 'cultural' | 'modern' | 'ai'
}

export const NAMING_SYSTEMS: Record<NamingSystemType, NamingSystem> = {
  hanwei: {
    id: 'hanwei',
    name: '汉魏古法',
    description: '借东汉至三国士人命名传统，以规则引擎生成符合古典审美的「名 + 字」方案。',
    features: [
      '名以立志，字以明德',
      '名字相辅相成',
      '体现士人修养',
      '突出东汉、三国、魏晋风格'
    ],
    source: '东汉、三国、魏晋',
    era: '汉魏时期',
    suitable_for: ['male', 'female'],
    algorithm_type: 'classical'
  },
  shijing: {
    id: 'shijing',
    name: '诗经命名',
    description: '从《诗经》中精选诗句，提取寓意深远的字词组合，每个名字都有明确的出处和文化内涵。',
    features: [
      '出自《诗经》经典诗句',
      '寓意深远优美',
      '文化底蕴深厚',
      '适合传统文化爱好者'
    ],
    source: '《诗经》',
    era: '先秦时期',
    suitable_for: ['male', 'female'],
    algorithm_type: 'poetic'
  },
  chuci: {
    id: 'chuci',
    name: '楚辞命名',
    description: '汲取《楚辞》的浪漫主义精神，融合屈原等诗人的高洁品格，创作富有意境的名字。',
    features: [
      '出自《楚辞》经典篇章',
      '浪漫主义精神',
      '高洁品格象征',
      '意境深远唯美'
    ],
    source: '《楚辞》',
    era: '先秦战国时期',
    suitable_for: ['male', 'female'],
    algorithm_type: 'poetic'
  },
  tangshi: {
    id: 'tangshi',
    name: '唐诗命名',
    description: '精选唐诗佳句，提取意象优美、寓意美好的字词，展现盛唐文化的气韵。',
    features: [
      '出自唐诗名篇',
      '意象优美清新',
      '盛唐气韵',
      '适合现代审美'
    ],
    source: '唐诗',
    era: '唐代',
    suitable_for: ['male', 'female'],
    algorithm_type: 'poetic'
  },
  songci: {
    id: 'songci',
    name: '宋词命名',
    description: '采撷宋词精华，融合婉约与豪放两大流派，特别适合女孩命名，体现文雅气质。',
    features: [
      '出自宋词名篇',
      '婉约与豪放兼备',
      '文雅高洁',
      '特别适合女孩'
    ],
    source: '宋词',
    era: '宋代',
    suitable_for: ['female', 'male'],
    algorithm_type: 'poetic'
  },
  junzi: {
    id: 'junzi',
    name: '君子风格',
    description: '体现儒家君子理想，强调修身养性、品德高洁，适合追求传统文化修养的家庭。',
    features: [
      '儒家君子理想',
      '修身养性',
      '品德高洁',
      '传统文化修养'
    ],
    source: '儒家文化',
    era: '古代传统',
    suitable_for: ['male'],
    algorithm_type: 'cultural'
  },
  ruya: {
    id: 'ruya',
    name: '儒雅风格',
    description: '融合儒家文化精髓，强调温和雅正、文采斐然，适合文化家庭的男孩命名。',
    features: [
      '儒家文化精髓',
      '温和雅正',
      '文采斐然',
      '适合文化家庭'
    ],
    source: '儒家文化',
    era: '古代传统',
    suitable_for: ['male'],
    algorithm_type: 'cultural'
  },
  nvzi: {
    id: 'nvzi',
    name: '女子风格',
    description: '专为女孩设计，融合温婉、高洁、灵秀等气质，展现女性的优雅与智慧。',
    features: [
      '温婉柔和',
      '高洁灵秀',
      '优雅智慧',
      '专为女孩设计'
    ],
    source: '传统女性美德',
    era: '古代传统',
    suitable_for: ['female'],
    algorithm_type: 'cultural'
  },
  xiandai: {
    id: 'xiandai',
    name: '现代简约',
    description: '避免过度古文，融合现代审美，适合年轻父母，既有文化底蕴又不失时代气息。',
    features: [
      '现代审美',
      '简约易记',
      '易于书写',
      '适合年轻父母'
    ],
    source: '现代文化',
    era: '当代',
    suitable_for: ['male', 'female'],
    algorithm_type: 'modern'
  },
  aiwen: {
    id: 'aiwen',
    name: 'AI文化命名',
    description: '利用AI深度学习，融合传统文化规则与现代命名趋势，创作兼具传统韵味和现代感的名字。',
    features: [
      'AI深度学习',
      '传统规则融合',
      '现代命名趋势',
      '个性化定制'
    ],
    source: 'AI算法',
    era: '当代',
    suitable_for: ['male', 'female'],
    algorithm_type: 'ai'
  }
}

export const NAMING_SYSTEMS_ORDER: NamingSystemType[] = [
  'hanwei',
  'shijing',
  'chuci',
  'tangshi',
  'songci',
  'junzi',
  'ruya',
  'nvzi',
  'xiandai',
  'aiwen'
]

/**
 * 获取特定性别的命名体系列表
 */
export function getNamingSystemsByGender(gender: 'male' | 'female'): NamingSystem[] {
  return NAMING_SYSTEMS_ORDER
    .map(id => NAMING_SYSTEMS[id])
    .filter(system => system.suitable_for.includes(gender))
}

/**
 * 获取所有命名体系
 */
export function getAllNamingSystems(): NamingSystem[] {
  return NAMING_SYSTEMS_ORDER.map(id => NAMING_SYSTEMS[id])
}
