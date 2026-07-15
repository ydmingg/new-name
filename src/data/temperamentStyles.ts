/**
 * 华夏命名 - 人物气质风格定义
 * 男女各16+种气质风格，精准匹配用户需求
 */

export type Gender = 'male' | 'female'
export type TemperamentStyle = string

export interface TemperamentStyleDef {
  name: string
  description: string
  characteristics: string[]
  suitable_systems: string[]
  gender: Gender
}

export const MALE_TEMPERAMENTS: Record<string, TemperamentStyleDef> = {
  junzi: {
    name: '君子',
    description: '温文尔雅，修身养性，品德高洁，是传统文人的理想形象',
    characteristics: ['修养', '品德', '温和', '高洁', '谦逊'],
    suitable_systems: ['hanwei', 'shijing', 'chuci', 'junzi'],
    gender: 'male'
  },
  hongyi: {
    name: '弘毅',
    description: '志向远大，坚毅果决，能担当重任，具有领导气质',
    characteristics: ['坚毅', '远志', '果决', '担当', '领导力'],
    suitable_systems: ['hanwei', 'tangshi', 'junzi'],
    gender: 'male'
  },
  wenchen: {
    name: '文臣',
    description: '文采斐然，治国理政，具有谋略和智慧，适合从政从学',
    characteristics: ['文采', '智慧', '谋略', '治理', '学问'],
    suitable_systems: ['hanwei', 'shijing', 'tangshi', 'ruya'],
    gender: 'male'
  },
  ruya: {
    name: '儒雅',
    description: '温和雅正，文化修养深厚，举止得体，气质优雅',
    characteristics: ['温和', '雅正', '修养', '文化', '气质'],
    suitable_systems: ['hanwei', 'shijing', 'ruya'],
    gender: 'male'
  },
  shangyue: {
    name: '山岳',
    description: '沉稳厚重，如山般坚定，气象端严，给人安全感',
    characteristics: ['沉稳', '厚重', '坚定', '端严', '安定'],
    suitable_systems: ['hanwei', 'chuci'],
    gender: 'male'
  },
  yinshi: {
    name: '隐士',
    description: '超然物外，清高孤傲，追求精神境界，有独特品格',
    characteristics: ['超然', '清高', '独立', '精神', '品格'],
    suitable_systems: ['chuci', 'tangshi', 'xiandai'],
    gender: 'male'
  },
  wujiang: {
    name: '武将',
    description: '英勇果敢，气势磅礴，具有军人气质，勇武刚毅',
    characteristics: ['英勇', '果敢', '刚毅', '气势', '勇武'],
    suitable_systems: ['hanwei', 'tangshi'],
    gender: 'male'
  },
  jingshi: {
    name: '经世',
    description: '经世致用，济世安民，具有社会责任感和使命感',
    characteristics: ['责任', '使命', '治世', '安民', '经世'],
    suitable_systems: ['hanwei', 'shijing', 'junzi'],
    gender: 'male'
  },
  xiake: {
    name: '侠客',
    description: '侠肝义胆，扶弱济困，具有正义感和冒险精神',
    characteristics: ['正义', '侠义', '冒险', '胆识', '扶弱'],
    suitable_systems: ['tangshi', 'chuci'],
    gender: 'male'
  },
  diwang: {
    name: '帝王',
    description: '气势恢宏，领导力强，具有统治气质和远大视野',
    characteristics: ['恢宏', '领导', '气势', '远见', '统治'],
    suitable_systems: ['hanwei', 'tangshi', 'junzi'],
    gender: 'male'
  },
  qingzheng: {
    name: '清正',
    description: '廉洁正直，清廉守法，具有道德高度和操守',
    characteristics: ['廉洁', '正直', '清廉', '操守', '道德'],
    suitable_systems: ['hanwei', 'shijing', 'junzi'],
    gender: 'male'
  },
  fengliu: {
    name: '风流',
    description: '潇洒倜傥，风度翩翩，具有艺术气质和审美品味',
    characteristics: ['潇洒', '风度', '艺术', '审美', '倜傥'],
    suitable_systems: ['tangshi', 'songci', 'xiandai'],
    gender: 'male'
  },
  xiaosa: {
    name: '潇洒',
    description: '不拘小节，自在从容，具有独特个性和自由精神',
    characteristics: ['自在', '从容', '个性', '自由', '洒脱'],
    suitable_systems: ['tangshi', 'chuci', 'xiandai'],
    gender: 'male'
  },
  shentong: {
    name: '神童',
    description: '聪慧过人，天赋异禀，具有非凡才华和学问',
    characteristics: ['聪慧', '天赋', '才华', '学问', '非凡'],
    suitable_systems: ['shijing', 'tangshi', 'ruya'],
    gender: 'male'
  },
  jiangjun: {
    name: '将军',
    description: '威武雄壮，指挥若定，具有军事才能和领导气质',
    characteristics: ['威武', '雄壮', '指挥', '才能', '领导'],
    suitable_systems: ['hanwei', 'tangshi'],
    gender: 'male'
  },
  mingshi: {
    name: '名士',
    description: '名满天下，才华横溢，具有社会影响力和文化地位',
    characteristics: ['名望', '才华', '影响力', '地位', '文化'],
    suitable_systems: ['hanwei', 'shijing', 'tangshi', 'ruya'],
    gender: 'male'
  }
}

export const FEMALE_TEMPERAMENTS: Record<string, TemperamentStyleDef> = {
  qingya: {
    name: '清雅',
    description: '清新雅致，气质高洁，给人清爽舒适的感受',
    characteristics: ['清新', '雅致', '高洁', '清爽', '舒适'],
    suitable_systems: ['shijing', 'songci', 'nvzi'],
    gender: 'female'
  },
  zhishu: {
    name: '知书',
    description: '知书达理，文化修养深厚，具有学问和智慧',
    characteristics: ['学问', '智慧', '修养', '达理', '文化'],
    suitable_systems: ['shijing', 'tangshi', 'ruya'],
    gender: 'female'
  },
  wanyue: {
    name: '婉约',
    description: '温婉柔和，委婉含蓄，具有女性的柔美和温度',
    characteristics: ['温婉', '柔和', '含蓄', '柔美', '温度'],
    suitable_systems: ['songci', 'chuci', 'nvzi'],
    gender: 'female'
  },
  dajia: {
    name: '大家闺秀',
    description: '大家风范，举止得体，具有名门气质和修养',
    characteristics: ['大气', '得体', '修养', '名门', '风范'],
    suitable_systems: ['hanwei', 'shijing', 'songci'],
    gender: 'female'
  },
  cainu: {
    name: '才女',
    description: '才华横溢，聪慧过人，具有文采和学问',
    characteristics: ['才华', '聪慧', '文采', '学问', '横溢'],
    suitable_systems: ['shijing', 'tangshi', 'songci'],
    gender: 'female'
  },
  lanxin: {
    name: '兰心',
    description: '兰心蕙质，高洁幽香，具有高尚品格和内涵',
    characteristics: ['高洁', '幽香', '品格', '内涵', '蕙质'],
    suitable_systems: ['chuci', 'songci', 'nvzi'],
    gender: 'female'
  },
  wenwan: {
    name: '温婉',
    description: '温柔婉约，体贴入微，具有女性的温度和柔情',
    characteristics: ['温柔', '婉约', '体贴', '温度', '柔情'],
    suitable_systems: ['songci', 'nvzi', 'xiandai'],
    gender: 'female'
  },
  mingmei: {
    name: '明媚',
    description: '明媚动人，光彩照人，具有活力和魅力',
    characteristics: ['明媚', '动人', '光彩', '活力', '魅力'],
    suitable_systems: ['tangshi', 'songci', 'xiandai'],
    gender: 'female'
  },
  gaojie: {
    name: '高洁',
    description: '高洁自守，清廉守正，具有高尚品格和操守',
    characteristics: ['高洁', '清廉', '守正', '品格', '操守'],
    suitable_systems: ['shijing', 'chuci', 'junzi'],
    gender: 'female'
  },
  xianqi: {
    name: '仙气',
    description: '仙气飘飘，超凡脱俗，具有神秘和梦幻感',
    characteristics: ['仙气', '超凡', '脱俗', '神秘', '梦幻'],
    suitable_systems: ['chuci', 'tangshi', 'xiandai'],
    gender: 'female'
  },
  lingxiu: {
    name: '灵秀',
    description: '灵秀聪慧，神采飞扬，具有灵动和聪慧',
    characteristics: ['灵秀', '聪慧', '灵动', '神采', '飞扬'],
    suitable_systems: ['shijing', 'songci', 'xiandai'],
    gender: 'female'
  },
  shashuang: {
    name: '飒爽',
    description: '飒爽英姿，英气逼人，具有女性的坚强和独立',
    characteristics: ['飒爽', '英气', '坚强', '独立', '英姿'],
    suitable_systems: ['tangshi', 'chuci', 'xiandai'],
    gender: 'female'
  },
  gudian: {
    name: '古典',
    description: '古典优雅，韵味悠长，具有传统文化的魅力',
    characteristics: ['古典', '优雅', '韵味', '传统', '魅力'],
    suitable_systems: ['hanwei', 'shijing', 'songci'],
    gender: 'female'
  },
  shuxiang: {
    name: '书香',
    description: '书香气质，文化修养深厚，具有学者风范',
    characteristics: ['书香', '修养', '学问', '文化', '风范'],
    suitable_systems: ['shijing', 'tangshi', 'ruya'],
    gender: 'female'
  },
  gongtingfu: {
    name: '宫廷',
    description: '宫廷气质，贵气十足，具有高贵和优雅',
    characteristics: ['贵气', '高贵', '优雅', '宫廷', '气质'],
    suitable_systems: ['hanwei', 'songci', 'junzi'],
    gender: 'female'
  },
  shanshui: {
    name: '山水',
    description: '山水灵秀，自然优雅，具有山水的宁静和美感',
    characteristics: ['灵秀', '自然', '优雅', '宁静', '美感'],
    suitable_systems: ['chuci', 'tangshi', 'xiandai'],
    gender: 'female'
  }
}

export const ALL_TEMPERAMENTS = {
  male: MALE_TEMPERAMENTS,
  female: FEMALE_TEMPERAMENTS
}

/**
 * 获取特定性别的所有气质风格
 */
export function getTemperamentsByGender(gender: Gender): TemperamentStyleDef[] {
  const temperaments = gender === 'male' ? MALE_TEMPERAMENTS : FEMALE_TEMPERAMENTS
  return Object.values(temperaments)
}

/**
 * 获取特定气质风格的详细信息
 */
export function getTemperamentStyle(gender: Gender, style: string): TemperamentStyleDef | undefined {
  const temperaments = gender === 'male' ? MALE_TEMPERAMENTS : FEMALE_TEMPERAMENTS
  return temperaments[style]
}

/**
 * 获取气质风格的所有名称（用于 UI 显示）
 */
export function getTemperamentNames(gender: Gender): string[] {
  const temperaments = gender === 'male' ? MALE_TEMPERAMENTS : FEMALE_TEMPERAMENTS
  return Object.keys(temperaments).map(key => temperaments[key].name)
}
