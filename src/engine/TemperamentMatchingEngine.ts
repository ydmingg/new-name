/**
 * 华夏命名 - 气质风格匹配引擎
 * 根据气质风格优化名字生成
 */

import { TemperamentStyleDef } from '../data/temperamentStyles'

export interface TemperamentCharacteristics {
  name: string
  keywords: string[]
  preferredCharacters: string[]
  avoidCharacters: string[]
  meanings: string[]
  examples: string[]
}

/**
 * 男孩气质特征库
 */
export const MALE_TEMPERAMENT_CHARS: Record<string, TemperamentCharacteristics> = {
  '君子': {
    name: '君子',
    keywords: ['修养', '品德', '温和', '高洁', '谦逊'],
    preferredCharacters: ['修', '端', '允', '谦', '德', '仁', '义', '礼', '智', '信'],
    avoidCharacters: ['凶', '暴', '狂', '妄', '贪', '欲'],
    meanings: ['修身养性', '品德高洁', '温文尔雅'],
    examples: ['修身', '端正', '允信', '谦德']
  },
  '弘毅': {
    name: '弘毅',
    keywords: ['坚毅', '远志', '果决', '担当', '领导力'],
    preferredCharacters: ['弘', '毅', '远', '志', '刚', '强', '勇', '武', '峻', '岳'],
    avoidCharacters: ['弱', '柔', '软', '怯', '懦'],
    meanings: ['志向远大', '坚毅果决', '勇往直前'],
    examples: ['弘毅', '远志', '刚强', '勇武']
  },
  '文臣': {
    name: '文臣',
    keywords: ['文采', '智慧', '谋略', '治理', '学问'],
    preferredCharacters: ['文', '章', '衡', '辅', '智', '思', '学', '书', '言', '理'],
    avoidCharacters: ['武', '暴', '粗', '野', '蛮'],
    meanings: ['文采斐然', '治国理政', '谋略深远'],
    examples: ['文章', '衡平', '辅国', '智远']
  },
  '儒雅': {
    name: '儒雅',
    keywords: ['温和', '雅正', '修养', '文化', '气质'],
    preferredCharacters: ['雅', '儒', '温', '和', '正', '文', '礼', '书', '诗', '画'],
    avoidCharacters: ['粗', '俗', '野', '蛮', '暴'],
    meanings: ['温和雅正', '文化修养', '举止得体'],
    examples: ['雅正', '儒文', '温雅', '和气']
  },
  '山岳': {
    name: '山岳',
    keywords: ['沉稳', '厚重', '坚定', '端严', '安定'],
    preferredCharacters: ['岳', '岱', '山', '峰', '石', '厚', '沉', '稳', '定', '安'],
    avoidCharacters: ['轻', '浮', '薄', '浅', '动'],
    meanings: ['沉稳厚重', '气象端严', '如山般坚定'],
    examples: ['岳峰', '岱石', '厚沉', '稳定']
  },
  '隐士': {
    name: '隐士',
    keywords: ['超然', '清高', '独立', '精神', '品格'],
    preferredCharacters: ['逸', '玄', '林', '泉', '云', '月', '隐', '闲', '静', '空'],
    avoidCharacters: ['俗', '浮', '贪', '欲', '妄'],
    meanings: ['超然物外', '清高孤傲', '追求精神'],
    examples: ['逸民', '玄远', '林泉', '隐闲']
  },
  '武将': {
    name: '武将',
    keywords: ['英勇', '果敢', '刚毅', '气势', '勇武'],
    preferredCharacters: ['武', '昭', '峻', '策', '烈', '威', '勇', '刚', '强', '雄'],
    avoidCharacters: ['柔', '弱', '软', '怯', '懦'],
    meanings: ['英勇果敢', '气势磅礴', '勇武刚毅'],
    examples: ['武烈', '昭勇', '峻强', '策雄']
  },
  '经世': {
    name: '经世',
    keywords: ['责任', '使命', '治世', '安民', '经世'],
    preferredCharacters: ['济', '安', '康', '治', '民', '邦', '国', '世', '经', '纲'],
    avoidCharacters: ['私', '贪', '欲', '妄', '狂'],
    meanings: ['经世致用', '济世安民', '社会责任'],
    examples: ['济民', '安邦', '康治', '世经']
  },
  '侠客': {
    name: '侠客',
    keywords: ['正义', '侠义', '冒险', '胆识', '扶弱'],
    preferredCharacters: ['侠', '义', '勇', '烈', '武', '刚', '强', '胆', '志', '气'],
    avoidCharacters: ['奸', '诈', '贪', '欲', '怯'],
    meanings: ['侠肝义胆', '扶弱济困', '正义感'],
    examples: ['侠义', '勇烈', '刚胆', '志气']
  },
  '帝王': {
    name: '帝王',
    keywords: ['恢宏', '领导', '气势', '远见', '统治'],
    preferredCharacters: ['帝', '皇', '龙', '天', '尧', '舜', '禹', '汤', '武', '文'],
    avoidCharacters: ['小', '弱', '卑', '微', '低'],
    meanings: ['气势恢宏', '领导力强', '统治气质'],
    examples: ['帝龙', '皇天', '尧舜', '文武']
  },
  '清正': {
    name: '清正',
    keywords: ['廉洁', '正直', '清廉', '操守', '道德'],
    preferredCharacters: ['清', '正', '廉', '洁', '直', '诚', '信', '德', '操', '节'],
    avoidCharacters: ['贪', '欲', '邪', '奸', '诈'],
    meanings: ['廉洁正直', '清廉守法', '道德高度'],
    examples: ['清正', '廉洁', '直诚', '德操']
  },
  '风流': {
    name: '风流',
    keywords: ['潇洒', '风度', '艺术', '审美', '倜傥'],
    preferredCharacters: ['风', '流', '雅', '潇', '洒', '云', '月', '诗', '画', '琴'],
    avoidCharacters: ['粗', '俗', '野', '蛮', '暴'],
    meanings: ['潇洒倜傥', '风度翩翩', '艺术气质'],
    examples: ['风流', '潇洒', '雅云', '诗月']
  },
  '潇洒': {
    name: '潇洒',
    keywords: ['自在', '从容', '个性', '自由', '洒脱'],
    preferredCharacters: ['潇', '洒', '自', '在', '闲', '逸', '云', '风', '月', '空'],
    avoidCharacters: ['束', '缚', '拘', '谨', '严'],
    meanings: ['不拘小节', '自在从容', '独特个性'],
    examples: ['潇洒', '自在', '闲逸', '云风']
  },
  '神童': {
    name: '神童',
    keywords: ['聪慧', '天赋', '才华', '学问', '非凡'],
    preferredCharacters: ['聪', '慧', '智', '思', '学', '书', '才', '华', '奇', '异'],
    avoidCharacters: ['愚', '钝', '笨', '蠢', '懒'],
    meanings: ['聪慧过人', '天赋异禀', '非凡才华'],
    examples: ['聪慧', '智思', '学才', '奇华']
  },
  '将军': {
    name: '将军',
    keywords: ['威武', '雄壮', '指挥', '才能', '领导'],
    preferredCharacters: ['将', '军', '威', '武', '雄', '壮', '刚', '强', '勇', '烈'],
    avoidCharacters: ['柔', '弱', '软', '怯', '懦'],
    meanings: ['威武雄壮', '指挥若定', '军事才能'],
    examples: ['将军', '威武', '雄壮', '刚烈']
  },
  '名士': {
    name: '名士',
    keywords: ['名望', '才华', '影响力', '地位', '文化'],
    preferredCharacters: ['名', '士', '文', '章', '才', '华', '雅', '德', '望', '誉'],
    avoidCharacters: ['无', '默', '籍', '籍', '微'],
    meanings: ['名满天下', '才华横溢', '社会影响力'],
    examples: ['名士', '文章', '才华', '雅德']
  }
}

/**
 * 女孩气质特征库
 */
export const FEMALE_TEMPERAMENT_CHARS: Record<string, TemperamentCharacteristics> = {
  '清雅': {
    name: '清雅',
    keywords: ['清新', '雅致', '高洁', '清爽', '舒适'],
    preferredCharacters: ['清', '雅', '芬', '芳', '香', '兰', '竹', '梅', '菊', '茉'],
    avoidCharacters: ['浊', '俗', '粗', '野', '蛮'],
    meanings: ['清新雅致', '气质高洁', '给人清爽感'],
    examples: ['清雅', '芬芳', '兰竹', '梅菊']
  },
  '知书': {
    name: '知书',
    keywords: ['学问', '智慧', '修养', '达理', '文化'],
    preferredCharacters: ['知', '书', '文', '章', '学', '诗', '画', '琴', '棋', '理'],
    avoidCharacters: ['愚', '钝', '笨', '蠢', '懒'],
    meanings: ['知书达理', '文化修养深厚', '学问和智慧'],
    examples: ['知书', '文章', '学诗', '琴棋']
  },
  '婉约': {
    name: '婉约',
    keywords: ['温婉', '柔和', '含蓄', '柔美', '温度'],
    preferredCharacters: ['婉', '约', '温', '柔', '和', '软', '甜', '蜜', '娇', '媚'],
    avoidCharacters: ['硬', '冷', '凶', '暴', '粗'],
    meanings: ['温婉柔和', '委婉含蓄', '女性的柔美'],
    examples: ['婉约', '温柔', '和甜', '娇媚']
  },
  '大家闺秀': {
    name: '大家闺秀',
    keywords: ['大气', '得体', '修养', '名门', '风范'],
    preferredCharacters: ['雅', '贵', '淑', '仪', '容', '德', '礼', '香', '玉', '瑾'],
    avoidCharacters: ['俗', '粗', '野', '蛮', '暴'],
    meanings: ['大家风范', '举止得体', '名门气质'],
    examples: ['雅贵', '淑仪', '容德', '玉瑾']
  },
  '才女': {
    name: '才女',
    keywords: ['才华', '聪慧', '文采', '学问', '横溢'],
    preferredCharacters: ['才', '华', '聪', '慧', '文', '章', '诗', '书', '思', '智'],
    avoidCharacters: ['愚', '钝', '笨', '蠢', '懒'],
    meanings: ['才华横溢', '聪慧过人', '文采斐然'],
    examples: ['才华', '聪慧', '文诗', '思智']
  },
  '兰心': {
    name: '兰心',
    keywords: ['高洁', '幽香', '品格', '内涵', '蕙质'],
    preferredCharacters: ['兰', '蕙', '芷', '香', '清', '洁', '高', '雅', '心', '质'],
    avoidCharacters: ['浊', '俗', '粗', '野', '蛮'],
    meanings: ['兰心蕙质', '高洁幽香', '高尚品格'],
    examples: ['兰心', '蕙质', '芷香', '清洁']
  },
  '温婉': {
    name: '温婉',
    keywords: ['温柔', '婉约', '体贴', '温度', '柔情'],
    preferredCharacters: ['温', '婉', '柔', '和', '甜', '蜜', '娇', '媚', '软', '柔'],
    avoidCharacters: ['硬', '冷', '凶', '暴', '粗'],
    meanings: ['温柔婉约', '体贴入微', '女性的温度'],
    examples: ['温婉', '柔和', '甜蜜', '娇媚']
  },
  '明媚': {
    name: '明媚',
    keywords: ['明媚', '动人', '光彩', '活力', '魅力'],
    preferredCharacters: ['明', '媚', '美', '丽', '光', '彩', '灿', '烂', '活', '泼'],
    avoidCharacters: ['暗', '沉', '闷', '呆', '木'],
    meanings: ['明媚动人', '光彩照人', '活力和魅力'],
    examples: ['明媚', '美丽', '光彩', '灿烂']
  },
  '高洁': {
    name: '高洁',
    keywords: ['高洁', '清廉', '守正', '品格', '操守'],
    preferredCharacters: ['高', '洁', '清', '廉', '正', '直', '诚', '信', '德', '操'],
    avoidCharacters: ['贪', '欲', '邪', '奸', '诈'],
    meanings: ['高洁自守', '清廉守正', '高尚品格'],
    examples: ['高洁', '清廉', '正直', '德操']
  },
  '仙气': {
    name: '仙气',
    keywords: ['仙气', '超凡', '脱俗', '神秘', '梦幻'],
    preferredCharacters: ['仙', '云', '月', '星', '梦', '幻', '空', '灵', '飘', '渺'],
    avoidCharacters: ['俗', '浊', '粗', '野', '蛮'],
    meanings: ['仙气飘飘', '超凡脱俗', '神秘梦幻'],
    examples: ['仙云', '月星', '梦幻', '灵飘']
  },
  '灵秀': {
    name: '灵秀',
    keywords: ['灵秀', '聪慧', '灵动', '神采', '飞扬'],
    preferredCharacters: ['灵', '秀', '聪', '慧', '动', '飞', '扬', '神', '采', '气'],
    avoidCharacters: ['呆', '木', '钝', '笨', '蠢'],
    meanings: ['灵秀聪慧', '神采飞扬', '灵动聪慧'],
    examples: ['灵秀', '聪慧', '飞扬', '神采']
  },
  '飒爽': {
    name: '飒爽',
    keywords: ['飒爽', '英气', '坚强', '独立', '英姿'],
    preferredCharacters: ['飒', '爽', '英', '气', '强', '坚', '独', '立', '勇', '武'],
    avoidCharacters: ['柔', '弱', '软', '怯', '懦'],
    meanings: ['飒爽英姿', '英气逼人', '女性的坚强'],
    examples: ['飒爽', '英气', '坚强', '独立']
  },
  '古典': {
    name: '古典',
    keywords: ['古典', '优雅', '韵味', '传统', '魅力'],
    preferredCharacters: ['古', '典', '雅', '韵', '传', '统', '诗', '画', '琴', '棋'],
    avoidCharacters: ['新', '潮', '俗', '浮', '躁'],
    meanings: ['古典优雅', '韵味悠长', '传统文化魅力'],
    examples: ['古典', '优雅', '韵味', '传统']
  },
  '书香': {
    name: '书香',
    keywords: ['书香', '修养', '学问', '文化', '风范'],
    preferredCharacters: ['书', '香', '文', '章', '学', '诗', '画', '琴', '棋', '德'],
    avoidCharacters: ['俗', '粗', '野', '蛮', '暴'],
    meanings: ['书香气质', '文化修养深厚', '学者风范'],
    examples: ['书香', '文章', '学诗', '琴棋']
  },
  '宫廷': {
    name: '宫廷',
    keywords: ['贵气', '高贵', '优雅', '宫廷', '气质'],
    preferredCharacters: ['宫', '廷', '贵', '雅', '皇', '后', '妃', '嫔', '玉', '瑾'],
    avoidCharacters: ['卑', '微', '低', '俗', '粗'],
    meanings: ['宫廷气质', '贵气十足', '高贵优雅'],
    examples: ['宫廷', '贵雅', '皇妃', '玉瑾']
  },
  '山水': {
    name: '山水',
    keywords: ['灵秀', '自然', '优雅', '宁静', '美感'],
    preferredCharacters: ['山', '水', '云', '月', '林', '泉', '溪', '涧', '石', '竹'],
    avoidCharacters: ['俗', '浊', '粗', '野', '蛮'],
    meanings: ['山水灵秀', '自然优雅', '宁静和美感'],
    examples: ['山水', '云月', '林泉', '溪涧']
  }
}

/**
 * 气质匹配引擎
 */
export class TemperamentMatchingEngine {
  /**
   * 根据气质选择合适的字
   */
  selectCharacterByTemperament(temperament: TemperamentCharacteristics, index: number): string {
    const preferred = temperament.preferredCharacters
    return preferred[index % preferred.length]
  }

  /**
   * 检查字是否符合气质
   */
  isCharacterSuitable(character: string, temperament: TemperamentCharacteristics): boolean {
    if (temperament.avoidCharacters.includes(character)) {
      return false
    }
    if (temperament.preferredCharacters.includes(character)) {
      return true
    }
    return true // 默认允许
  }

  /**
   * 获取气质的推荐字列表
   */
  getRecommendedCharacters(temperament: TemperamentCharacteristics, count: number = 10): string[] {
    return temperament.preferredCharacters.slice(0, count)
  }

  /**
   * 生成符合气质的名字组合
   */
  generateNamesByTemperament(
    surname: string,
    temperament: TemperamentStyleDef,
    gender: 'male' | 'female',
    count: number = 18
  ): string[] {
    const charDb = gender === 'male' ? MALE_TEMPERAMENT_CHARS : FEMALE_TEMPERAMENT_CHARS
    const tempChars = charDb[temperament.name]
    
    if (!tempChars) {
      return []
    }

    const names: string[] = []
    const preferred = tempChars.preferredCharacters

    for (let i = 0; i < count; i++) {
      const char1 = preferred[i % preferred.length]
      const char2 = preferred[(i + 1) % preferred.length]
      
      // 避免重复
      if (char1 !== char2) {
        names.push(`${surname}${char1}${char2}`)
      } else {
        names.push(`${surname}${char1}`)
      }
    }

    return names
  }

  /**
   * 获取气质的描述
   */
  getTemperamentDescription(temperament: TemperamentStyleDef): string {
    const charDb = MALE_TEMPERAMENT_CHARS // 可以是任何一个
    const tempChars = charDb[temperament.name]
    
    if (!tempChars) {
      return temperament.description
    }

    return `${temperament.description}。特点：${tempChars.meanings.join('、')}。`
  }
}

export const temperamentMatchingEngine = new TemperamentMatchingEngine()
