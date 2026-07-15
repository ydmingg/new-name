/**
 * 华夏命名 - 详情页分析引擎
 * 包括：音律分析、笔画分析、书写结构、现代评价等
 */

export interface PinyinInfo {
  character: string
  pinyin: string
  tone: number // 1-4 for 四声, 0 for 轻声
  toneType: '阴平' | '阳平' | '上声' | '去声' | '轻声'
}

export interface StrokeInfo {
  character: string
  strokes: number
  structure: '独体' | '左右' | '上下' | '左中右' | '上中下' | '其他'
}

export interface PhoneticAnalysis {
  characters: PinyinInfo[]
  smoothness: number // 0-100
  smoothnessDesc: string
  recommendation: string
}

export interface WritingAnalysis {
  characters: StrokeInfo[]
  totalStrokes: number
  structureBalance: string
  recommendation: string
}

export interface ModernRating {
  modernCareer: number // 0-5 stars
  culturalQuality: number
  distinctiveness: number
  writingDifficulty: number
  overallScore: number
}

export interface NameAnalysis {
  fullName: string
  pinyin: PhoneticAnalysis
  writing: WritingAnalysis
  modernRating: ModernRating
  englishSpelling: string
}

/**
 * 音律分析引擎
 */
export class PhoneticAnalysisEngine {
  private pinyinMap: Record<string, { pinyin: string; tone: number }> = {
    // 常见姓氏
    张: { pinyin: 'zhang', tone: 1 },
    王: { pinyin: 'wang', tone: 2 },
    李: { pinyin: 'li', tone: 3 },
    赵: { pinyin: 'zhao', tone: 4 },
    陈: { pinyin: 'chen', tone: 2 },
    刘: { pinyin: 'liu', tone: 2 },
    杨: { pinyin: 'yang', tone: 2 },
    黄: { pinyin: 'huang', tone: 2 },
    周: { pinyin: 'zhou', tone: 1 },
    吴: { pinyin: 'wu', tone: 2 },
    // 常见名字
    修: { pinyin: 'xiu', tone: 1 },
    端: { pinyin: 'duan', tone: 1 },
    允: { pinyin: 'yun', tone: 3 },
    毅: { pinyin: 'yi', tone: 4 },
    远: { pinyin: 'yuan', tone: 3 },
    卓: { pinyin: 'zhuo', tone: 2 },
    清: { pinyin: 'qing', tone: 1 },
    婉: { pinyin: 'wan', tone: 3 },
    兰: { pinyin: 'lan', tone: 2 },
    芷: { pinyin: 'zhi', tone: 3 },
    云: { pinyin: 'yun', tone: 2 },
    月: { pinyin: 'yue', tone: 4 },
    风: { pinyin: 'feng', tone: 1 },
    雨: { pinyin: 'yu', tone: 3 },
    // 补充更多
    敬: { pinyin: 'jing', tone: 4 },
    伯: { pinyin: 'bo', tone: 2 },
    仲: { pinyin: 'zhong', tone: 4 },
    信: { pinyin: 'xin', tone: 4 },
    季: { pinyin: 'ji', tone: 4 },
    弘: { pinyin: 'hong', tone: 2 },
    坚: { pinyin: 'jian', tone: 1 },
    雍: { pinyin: 'yong', tone: 1 },
    烈: { pinyin: 'lie', tone: 4 },
    威: { pinyin: 'wei', tone: 1 },
    典: { pinyin: 'dian', tone: 3 },
    平: { pinyin: 'ping', tone: 2 },
    弼: { pinyin: 'bi', tone: 3 },
    嵩: { pinyin: 'song', tone: 1 },
    岑: { pinyin: 'cen', tone: 2 },
    民: { pinyin: 'min', tone: 2 },
    治: { pinyin: 'zhi', tone: 4 },
    宁: { pinyin: 'ning', tone: 2 },
    闲: { pinyin: 'xian', tone: 2 },
    微: { pinyin: 'wei', tone: 1 },
    泉: { pinyin: 'quan', tone: 2 },
    淑: { pinyin: 'shu', tone: 1 },
    娴: { pinyin: 'xian', tone: 2 },
    静: { pinyin: 'jing', tone: 4 },
    仪: { pinyin: 'yi', tone: 2 },
    贞: { pinyin: 'zhen', tone: 1 },
    澄: { pinyin: 'cheng', tone: 2 },
    书: { pinyin: 'shu', tone: 1 },
    知: { pinyin: 'zhi', tone: 1 },
    慧: { pinyin: 'hui', tone: 4 },
    柔: { pinyin: 'rou', tone: 2 },
    嘉: { pinyin: 'jia', tone: 1 },
    和: { pinyin: 'he', tone: 2 },
    令: { pinyin: 'ling', tone: 4 },
    容: { pinyin: 'rong', tone: 2 },
    昭: { pinyin: 'zhao', tone: 1 },
    峻: { pinyin: 'jun', tone: 4 },
    策: { pinyin: 'ce', tone: 4 },
    章: { pinyin: 'zhang', tone: 1 },
    衡: { pinyin: 'heng', tone: 2 },
    辅: { pinyin: 'fu', tone: 3 },
    岱: { pinyin: 'dai', tone: 4 },
    峦: { pinyin: 'luan', tone: 2 },
    岳: { pinyin: 'yue', tone: 4 },
    济: { pinyin: 'ji', tone: 4 },
    安: { pinyin: 'an', tone: 1 },
    逸: { pinyin: 'yi', tone: 4 },
    玄: { pinyin: 'xuan', tone: 2 },
    芳: { pinyin: 'fang', tone: 1 },
    德: { pinyin: 'de', tone: 2 },
    则: { pinyin: 'ze', tone: 2 },
    言: { pinyin: 'yan', tone: 2 },
    然: { pinyin: 'ran', tone: 2 },
    明: { pinyin: 'ming', tone: 2 },
    之: { pinyin: 'zhi', tone: 1 },
    元: { pinyin: 'yuan', tone: 2 },
    景: { pinyin: 'jing', tone: 3 },
    徽: { pinyin: 'hui', tone: 1 },
    达: { pinyin: 'da', tone: 2 },
    简: { pinyin: 'jian', tone: 3 },
    深: { pinyin: 'shen', tone: 1 },
    渊: { pinyin: 'yuan', tone: 1 },
    朗: { pinyin: 'lang', tone: 3 },
    素: { pinyin: 'su', tone: 4 }
  }

  private toneTypeMap: Record<number, '阴平' | '阳平' | '上声' | '去声' | '轻声'> = {
    1: '阴平',
    2: '阳平',
    3: '上声',
    4: '去声',
    0: '轻声'
  }

  analyze(fullName: string): PhoneticAnalysis {
    const characters: PinyinInfo[] = []
    
    for (const char of fullName) {
      const info = this.pinyinMap[char]
      if (info) {
        characters.push({
          character: char,
          pinyin: info.pinyin,
          tone: info.tone,
          toneType: this.toneTypeMap[info.tone]
        })
      }
    }

    // 计算顺畅度
    let smoothness = 100
    const tones = characters.map(c => c.tone)
    
    // 检查相邻声调是否过于相似
    for (let i = 0; i < tones.length - 1; i++) {
      if (tones[i] === tones[i + 1]) {
        smoothness -= 10
      }
    }

    // 检查是否有好的声调组合
    if (tones.length >= 3) {
      const hasGoodPattern = 
        (tones[0] !== tones[1] && tones[1] !== tones[2]) ||
        (tones[0] === 1 && tones[1] === 3 && tones[2] === 4) ||
        (tones[0] === 2 && tones[1] === 1 && tones[2] === 4)
      if (hasGoodPattern) {
        smoothness += 10
      }
    }

    smoothness = Math.max(0, Math.min(100, smoothness))

    let smoothnessDesc = ''
    if (smoothness >= 80) {
      smoothnessDesc = '音律顺畅，读音流畅优美'
    } else if (smoothness >= 60) {
      smoothnessDesc = '音律基本顺畅，读音较为舒适'
    } else if (smoothness >= 40) {
      smoothnessDesc = '音律一般，建议调整'
    } else {
      smoothnessDesc = '音律不够顺畅，读音生硬'
    }

    return {
      characters,
      smoothness,
      smoothnessDesc,
      recommendation: smoothness >= 70 ? '✓ 推荐使用' : '△ 可考虑其他方案'
    }
  }
}

/**
 * 书写分析引擎
 */
export class WritingAnalysisEngine {
  private strokeMap: Record<string, number> = {
    张: 11, 王: 4, 李: 7, 赵: 9, 陈: 11, 刘: 15, 杨: 13, 黄: 12, 周: 8, 吴: 7,
    修: 10, 端: 14, 允: 4, 毅: 15, 远: 7, 卓: 8, 清: 11, 婉: 11, 兰: 5, 芷: 10,
    云: 4, 月: 4, 风: 9, 雨: 8, 敬: 12, 伯: 7, 仲: 6, 信: 9, 季: 5, 弘: 5,
    坚: 11, 雍: 12, 烈: 10, 威: 9, 典: 8, 平: 5, 弼: 12, 嵩: 13, 岑: 8, 民: 5,
    治: 8, 宁: 5, 闲: 12, 微: 13, 泉: 9, 淑: 11, 娴: 10, 静: 14, 仪: 5, 贞: 9,
    澄: 15, 书: 4, 知: 8, 慧: 15, 柔: 9, 嘉: 14, 和: 8, 令: 5, 容: 10, 昭: 9,
    峻: 10, 策: 12, 章: 11, 衡: 16, 辅: 14, 岱: 8, 峦: 10, 岳: 8, 济: 9, 安: 6,
    逸: 11, 玄: 5, 芳: 7, 德: 15, 则: 9, 言: 7, 然: 12, 明: 8, 之: 3, 元: 4,
    景: 12, 徽: 15, 达: 16, 简: 13, 深: 12, 渊: 10, 朗: 11, 素: 10
  }

  private structureMap: Record<string, '独体' | '左右' | '上下' | '左中右' | '上中下' | '其他'> = {
    张: '左右', 王: '独体', 李: '上下', 赵: '左右', 陈: '左右', 刘: '左右', 杨: '左右', 黄: '左右', 周: '左右', 吴: '左右',
    修: '左右', 端: '左右', 允: '独体', 毅: '左右', 远: '左右', 卓: '上下', 清: '左右', 婉: '左右', 兰: '独体', 芷: '左右',
    云: '独体', 月: '独体', 风: '独体', 雨: '独体', 敬: '左右', 伯: '左右', 仲: '左右', 信: '左右', 季: '独体', 弘: '独体',
    坚: '左右', 雍: '上下', 烈: '左右', 威: '左右', 典: '上下', 平: '独体', 弼: '左右', 嵩: '上下', 岑: '上下', 民: '独体',
    治: '左右', 宁: '独体', 闲: '左右', 微: '左右', 泉: '上下', 淑: '左右', 娴: '左右', 静: '左右', 仪: '左右', 贞: '上下',
    澄: '左右', 书: '独体', 知: '左右', 慧: '左右', 柔: '左右', 嘉: '上下', 和: '左右', 令: '独体', 容: '独体', 昭: '左右',
    峻: '左右', 策: '左右', 章: '左右', 衡: '左右', 辅: '左右', 岱: '独体', 峦: '左右', 岳: '独体', 济: '左右', 安: '独体',
    逸: '左右', 玄: '独体', 芳: '左右', 德: '左右', 则: '左右', 言: '独体', 然: '左右', 明: '左右', 之: '独体', 元: '独体',
    景: '左右', 徽: '左右', 达: '左右', 简: '左右', 深: '左右', 渊: '左右', 朗: '左右', 素: '左右'
  }

  analyze(fullName: string): WritingAnalysis {
    const characters: StrokeInfo[] = []
    let totalStrokes = 0

    for (const char of fullName) {
      const strokes = this.strokeMap[char] || 8
      const structure = this.structureMap[char] || '其他'
      characters.push({
        character: char,
        strokes,
        structure
      })
      totalStrokes += strokes
    }

    // 分析结构平衡
    const structures = characters.map(c => c.structure)
    const leftRightCount = structures.filter(s => s === '左右').length
    const upDownCount = structures.filter(s => s === '上下').length
    const singleCount = structures.filter(s => s === '独体').length

    let structureBalance = '结构多样'
    if (leftRightCount === structures.length) {
      structureBalance = '⚠️ 全为左右结构，建议调整'
    } else if (upDownCount === structures.length) {
      structureBalance = '⚠️ 全为上下结构，建议调整'
    } else if (singleCount === structures.length) {
      structureBalance = '✓ 全为独体字，简洁有力'
    } else {
      structureBalance = '✓ 结构均衡，视觉舒适'
    }

    let recommendation = '✓ 书写难度适中'
    if (totalStrokes > 50) {
      recommendation = '⚠️ 笔画较多，书写复杂'
    } else if (totalStrokes < 15) {
      recommendation = '✓ 笔画简洁，易于书写'
    }

    return {
      characters,
      totalStrokes,
      structureBalance,
      recommendation
    }
  }
}

/**
 * 现代评价引擎
 */
export class ModernRatingEngine {
  rate(fullName: string, temperament: string): ModernRating {
    // 基础评分
    let modernCareer = 3
    let culturalQuality = 4
    let distinctiveness = 3
    let writingDifficulty = 3

    // 根据气质调整评分
    const temperamentScores: Record<string, Partial<ModernRating>> = {
      '君子': { modernCareer: 4, culturalQuality: 5, distinctiveness: 4 },
      '弘毅': { modernCareer: 5, culturalQuality: 4, distinctiveness: 4 },
      '文臣': { modernCareer: 5, culturalQuality: 5, distinctiveness: 3 },
      '儒雅': { modernCareer: 4, culturalQuality: 5, distinctiveness: 3 },
      '清雅': { modernCareer: 3, culturalQuality: 5, distinctiveness: 4 },
      '知书': { modernCareer: 4, culturalQuality: 5, distinctiveness: 3 },
      '婉约': { modernCareer: 3, culturalQuality: 4, distinctiveness: 4 },
    }

    const scores = temperamentScores[temperament]
    if (scores) {
      modernCareer = scores.modernCareer ?? modernCareer
      culturalQuality = scores.culturalQuality ?? culturalQuality
      distinctiveness = scores.distinctiveness ?? distinctiveness
    }

    // 根据名字长度调整笔画难度
    if (fullName.length === 2) {
      writingDifficulty = 2
    } else if (fullName.length === 3) {
      writingDifficulty = 3
    } else {
      writingDifficulty = 4
    }

    const overallScore = (modernCareer + culturalQuality + distinctiveness + (5 - writingDifficulty)) / 4

    return {
      modernCareer,
      culturalQuality,
      distinctiveness,
      writingDifficulty,
      overallScore
    }
  }
}

/**
 * 英文拼写引擎
 */
export class EnglishSpellingEngine {
  private pinyinMap: Record<string, string> = {
    张: 'zhang', 王: 'wang', 李: 'li', 赵: 'zhao', 陈: 'chen', 刘: 'liu', 杨: 'yang', 黄: 'huang', 周: 'zhou', 吴: 'wu',
    修: 'xiu', 端: 'duan', 允: 'yun', 毅: 'yi', 远: 'yuan', 卓: 'zhuo', 清: 'qing', 婉: 'wan', 兰: 'lan', 芷: 'zhi',
    云: 'yun', 月: 'yue', 风: 'feng', 雨: 'yu', 敬: 'jing', 伯: 'bo', 仲: 'zhong', 信: 'xin', 季: 'ji', 弘: 'hong',
    坚: 'jian', 雍: 'yong', 烈: 'lie', 威: 'wei', 典: 'dian', 平: 'ping', 弼: 'bi', 嵩: 'song', 岑: 'cen', 民: 'min',
    治: 'zhi', 宁: 'ning', 闲: 'xian', 微: 'wei', 泉: 'quan', 淑: 'shu', 娴: 'xian', 静: 'jing', 仪: 'yi', 贞: 'zhen',
    澄: 'cheng', 书: 'shu', 知: 'zhi', 慧: 'hui', 柔: 'rou', 嘉: 'jia', 和: 'he', 令: 'ling', 容: 'rong', 昭: 'zhao',
    峻: 'jun', 策: 'ce', 章: 'zhang', 衡: 'heng', 辅: 'fu', 岱: 'dai', 峦: 'luan', 岳: 'yue', 济: 'ji', 安: 'an',
    逸: 'yi', 玄: 'xuan', 芳: 'fang', 德: 'de', 则: 'ze', 言: 'yan', 然: 'ran', 明: 'ming', 之: 'zhi', 元: 'yuan',
    景: 'jing', 徽: 'hui', 达: 'da', 简: 'jian', 深: 'shen', 渊: 'yuan', 朗: 'lang', 素: 'su'
  }

  generate(fullName: string): string {
    return Array.from(fullName)
      .map(char => {
        const pinyin = this.pinyinMap[char]
        if (!pinyin) return char
        return pinyin.charAt(0).toUpperCase() + pinyin.slice(1)
      })
      .join(' ')
  }
}

/**
 * 综合分析引擎
 */
export class NameAnalysisEngine {
  private phoneticEngine = new PhoneticAnalysisEngine()
  private writingEngine = new WritingAnalysisEngine()
  private ratingEngine = new ModernRatingEngine()
  private englishEngine = new EnglishSpellingEngine()

  analyze(fullName: string, temperament: string): NameAnalysis {
    return {
      fullName,
      pinyin: this.phoneticEngine.analyze(fullName),
      writing: this.writingEngine.analyze(fullName),
      modernRating: this.ratingEngine.rate(fullName, temperament),
      englishSpelling: this.englishEngine.generate(fullName)
    }
  }
}

export const nameAnalysisEngine = new NameAnalysisEngine()
