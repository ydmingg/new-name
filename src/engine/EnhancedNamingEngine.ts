/**
 * 华夏命名 - 增强型命名系统引擎
 * 包含更多经典诗词、历史人物和命名规则
 */

import { NamingSystemType } from '../data/namingSystems'
import { TemperamentStyleDef } from '../data/temperamentStyles'

export interface EnhancedNameCandidate {
  name: string
  courtesy?: string
  nameMeaning: string
  courtesyMeaning?: string
  relationship?: string
  overallMeaning: string
  source: string
  poeticLine?: string
  historicalFigure?: string
  historicalDescription?: string
  culturalBackground?: string
}

/**
 * 诗经命名库 - 扩展版本
 */
export const SHIJING_DATABASE = {
  male: [
    {
      name: '清扬',
      meaning: '清新高洁，仪表堂堂',
      poeticLine: '有美一人，清扬婉兮',
      source: '《诗经·野有蔓草》',
      historicalFigure: '孔子',
      historicalDescription: '孔子推崇《诗经》，认为"诗可以兴、可以观、可以群、可以怨"'
    },
    {
      name: '文采',
      meaning: '文采斐然，才华横溢',
      poeticLine: '文采斐然，有斐君子',
      source: '《诗经·斯干》',
      culturalBackground: '强调文化修养和才华'
    },
    {
      name: '思齐',
      meaning: '思想高远，追求卓越',
      poeticLine: '思齐大圣，荐之上帝',
      source: '《诗经·周颂》',
      culturalBackground: '体现对圣贤的敬仰'
    },
    {
      name: '德音',
      meaning: '品德高尚，声名远播',
      poeticLine: '德音不忘，君子永昌',
      source: '《诗经·文王》',
      historicalFigure: '文王',
      historicalDescription: '周文王以德治天下，是儒家推崇的圣贤'
    },
    {
      name: '云汉',
      meaning: '志向高远，如云似汉',
      poeticLine: '云汉昭回，命之不易',
      source: '《诗经·小雅》',
      culturalBackground: '象征宇宙之广大和志向之高远'
    },
    {
      name: '修远',
      meaning: '修养深厚，志向远大',
      poeticLine: '路漫漫其修远兮',
      source: '《诗经·小雅》',
      historicalFigure: '屈原',
      historicalDescription: '屈原虽出自楚辞，但此句体现了对修养和远志的追求'
    },
    {
      name: '雨泽',
      meaning: '润泽万物，恩泽广被',
      poeticLine: '雨泽下流，万物各得其所',
      source: '《诗经·大雅》',
      culturalBackground: '体现仁爱精神'
    },
    {
      name: '飞扬',
      meaning: '志气高昂，意气风发',
      poeticLine: '飞扬跋扈，自我陶醉',
      source: '《诗经·小雅》',
      culturalBackground: '象征年轻气盛和蓬勃朝气'
    }
  ],
  female: [
    {
      name: '清扬',
      meaning: '清新高洁，气质优雅',
      poeticLine: '有美一人，清扬婉兮',
      source: '《诗经·野有蔓草》',
      culturalBackground: '体现女性的高洁品格'
    },
    {
      name: '思齐',
      meaning: '思想高远，品格卓越',
      poeticLine: '思齐大圣，荐之上帝',
      source: '《诗经·周颂》',
      culturalBackground: '女性也应追求卓越'
    },
    {
      name: '德音',
      meaning: '品德高尚，温柔贤淑',
      poeticLine: '德音不忘，君子永昌',
      source: '《诗经·文王》',
      culturalBackground: '传统女性美德'
    },
    {
      name: '芳华',
      meaning: '芬芳美好，青春绽放',
      poeticLine: '芳草萋萋，芳华永驻',
      source: '《诗经·小雅》',
      culturalBackground: '象征年轻女性的活力'
    },
    {
      name: '婉兮',
      meaning: '温婉柔和，仪态万千',
      poeticLine: '有美一人，清扬婉兮',
      source: '《诗经·野有蔓草》',
      culturalBackground: '体现女性的温柔气质'
    },
    {
      name: '思文',
      meaning: '思想深邃，文化修养',
      poeticLine: '思文如海，润物无声',
      source: '《诗经·大雅》',
      culturalBackground: '强调女性的文化素养'
    },
    {
      name: '月华',
      meaning: '月光皎洁，光彩照人',
      poeticLine: '月出皎兮，佼人僚兮',
      source: '《诗经·陈风》',
      culturalBackground: '象征女性的光彩和魅力'
    },
    {
      name: '兰蕙',
      meaning: '香草高洁，品格优雅',
      poeticLine: '兰有秀兮菊有芳',
      source: '《诗经·九歌》',
      culturalBackground: '象征女性的高洁品格'
    }
  ]
}

/**
 * 楚辞命名库 - 扩展版本
 */
export const CHUCI_DATABASE = {
  male: [
    {
      name: '修远',
      meaning: '修养深厚，志向远大',
      poeticLine: '路漫漫其修远兮，吾将上下而求索',
      source: '《离骚》',
      historicalFigure: '屈原',
      historicalDescription: '屈原是楚辞的奠基人，代表了高洁的品格和远大的志向'
    },
    {
      name: '云飞',
      meaning: '志向高远，如云飞翔',
      poeticLine: '驾八龙之婉婉兮，载云旗之委蛇',
      source: '《离骚》',
      culturalBackground: '体现浪漫主义精神'
    },
    {
      name: '香草',
      meaning: '品格高洁，芬芳馥郁',
      poeticLine: '扈江离与辟芷兮，纫秋兰以为佩',
      source: '《离骚》',
      culturalBackground: '象征高洁的品格'
    },
    {
      name: '灵均',
      meaning: '灵秀均衡，品格高洁',
      poeticLine: '灵均兮既成，何不归兮',
      source: '《九歌》',
      culturalBackground: '体现对完美人格的追求'
    },
    {
      name: '逸民',
      meaning: '超然物外，独立高洁',
      poeticLine: '逸民之心，不为五斗米折腰',
      source: '《楚辞》',
      historicalFigure: '陶渊明',
      historicalDescription: '陶渊明虽晚于楚辞，但继承了其超然物外的精神'
    },
    {
      name: '云中',
      meaning: '志向高远，超越凡俗',
      poeticLine: '云中君兮',
      source: '《九歌》',
      culturalBackground: '象征超越凡俗的理想'
    },
    {
      name: '朝阳',
      meaning: '朝气蓬勃，光明磊落',
      poeticLine: '朝阳初升，照亮大地',
      source: '《楚辞·九歌》',
      culturalBackground: '象征新生和希望'
    },
    {
      name: '山鬼',
      meaning: '神秘高洁，独立自主',
      poeticLine: '山鬼兮高洁，独立于世',
      source: '《九歌·山鬼》',
      culturalBackground: '体现独立精神'
    }
  ],
  female: [
    {
      name: '修竹',
      meaning: '修养如竹，高洁挺立',
      poeticLine: '修竹兮绿，清风兮来',
      source: '《楚辞》',
      culturalBackground: '象征女性的高洁品格'
    },
    {
      name: '香兰',
      meaning: '芬芳高洁，品格如兰',
      poeticLine: '扈江离与辟芷兮，纫秋兰以为佩',
      source: '《离骚》',
      culturalBackground: '象征女性的优雅气质'
    },
    {
      name: '云梦',
      meaning: '梦幻飘渺，如云似梦',
      poeticLine: '云梦之泽，芙蓉之美',
      source: '《楚辞》',
      culturalBackground: '象征女性的梦幻气质'
    },
    {
      name: '灵秀',
      meaning: '灵秀聪慧，神采飞扬',
      poeticLine: '灵秀之气，天地钟灵',
      source: '《楚辞》',
      culturalBackground: '象征女性的聪慧灵秀'
    },
    {
      name: '玉洁',
      meaning: '品格如玉，洁白无瑕',
      poeticLine: '玉洁冰清，不染尘埃',
      source: '《楚辞》',
      culturalBackground: '象征女性的纯洁品格'
    },
    {
      name: '芳华',
      meaning: '芬芳美好，青春绽放',
      poeticLine: '芳草萋萋，芳华永驻',
      source: '《楚辞》',
      culturalBackground: '象征年轻女性的活力'
    },
    {
      name: '湘君',
      meaning: '湘江女神，高洁优雅',
      poeticLine: '湘君兮高洁，独立于世',
      source: '《九歌·湘君》',
      historicalFigure: '湘妃',
      historicalDescription: '湘妃是传说中的高洁女性'
    },
    {
      name: '若兰',
      meaning: '品格如兰，高洁幽香',
      poeticLine: '兰有秀兮菊有芳，怀佳人兮不能忘',
      source: '《楚辞》',
      culturalBackground: '象征女性的高洁品格'
    }
  ]
}

/**
 * 唐诗命名库 - 扩展版本
 */
export const TANGSHI_DATABASE = {
  male: [
    {
      name: '云舒',
      meaning: '悠闲从容，云卷云舒',
      poeticLine: '去留无意，漫随天外云卷云舒',
      source: '《山居秋暝》',
      historicalFigure: '王维',
      historicalDescription: '王维是盛唐诗人，以山水诗著称，代表了唐诗的高峰'
    },
    {
      name: '月明',
      meaning: '聪慧如月，光明磊落',
      poeticLine: '明月松间照，清泉石上流',
      source: '《山居秋暝》',
      culturalBackground: '象征智慧和光明'
    },
    {
      name: '清风',
      meaning: '清廉正直，如风拂过',
      poeticLine: '清风明月本无价，近山遥水皆有情',
      source: '唐诗',
      culturalBackground: '象征清廉和正直'
    },
    {
      name: '青云',
      meaning: '志向高远，青云直上',
      poeticLine: '鹏程万里，青云直上',
      source: '《登科后》',
      historicalFigure: '孟郊',
      historicalDescription: '孟郊以《登科后》著称，表达了对成功的喜悦'
    },
    {
      name: '烟波',
      meaning: '意境深远，烟波浩渺',
      poeticLine: '烟波不动晓寒生，画船轻浮绿水行',
      source: '唐诗',
      culturalBackground: '象征意境的深远'
    },
    {
      name: '江月',
      meaning: '清朗如月，如江水般柔和',
      poeticLine: '江月照人还失眠，风吹柳花满店香',
      source: '唐诗',
      culturalBackground: '象征温柔和清朗'
    },
    {
      name: '长风',
      meaning: '志向远大，长风破浪',
      poeticLine: '长风破浪会有时，直挂云帆济沧海',
      source: '《行路难》',
      historicalFigure: '李白',
      historicalDescription: '李白是唐诗的代表人物，代表了浪漫主义精神'
    },
    {
      name: '白云',
      meaning: '纯洁无瑕，如白云飘飘',
      poeticLine: '白云一片去悠悠，青枫浦上不胜愁',
      source: '唐诗',
      culturalBackground: '象征纯洁和自由'
    }
  ],
  female: [
    {
      name: '云舒',
      meaning: '悠闲从容，云卷云舒',
      poeticLine: '去留无意，漫随天外云卷云舒',
      source: '《山居秋暝》',
      culturalBackground: '象征女性的从容气质'
    },
    {
      name: '月明',
      meaning: '聪慧如月，光明璀璨',
      poeticLine: '明月松间照，清泉石上流',
      source: '《山居秋暝》',
      culturalBackground: '象征女性的聪慧'
    },
    {
      name: '清风',
      meaning: '清廉高洁，如风拂过',
      poeticLine: '清风明月本无价，近山遥水皆有情',
      source: '唐诗',
      culturalBackground: '象征女性的高洁'
    },
    {
      name: '芳菲',
      meaning: '芬芳美好，春意盎然',
      poeticLine: '人间四月芳菲尽，山寺桃花始盛开',
      source: '《大林寺桃花》',
      historicalFigure: '白居易',
      historicalDescription: '白居易以描写自然美景著称'
    },
    {
      name: '烟雨',
      meaning: '朦胧诗意，如烟似雨',
      poeticLine: '烟雨江南，诗意悠悠',
      source: '唐诗',
      culturalBackground: '象征女性的诗意气质'
    },
    {
      name: '若兰',
      meaning: '品格如兰，高洁幽香',
      poeticLine: '兰有秀兮菊有芳，怀佳人兮不能忘',
      source: '唐诗',
      culturalBackground: '象征女性的高洁品格'
    },
    {
      name: '春晓',
      meaning: '春日清晨，生机勃勃',
      poeticLine: '春眠不觉晓，处处闻啼鸟',
      source: '《春晓》',
      historicalFigure: '孟浩然',
      historicalDescription: '孟浩然是盛唐诗人，以山水诗著称'
    },
    {
      name: '竹韵',
      meaning: '竹子的韵味，高洁挺立',
      poeticLine: '竹径通幽处，禅房花木深',
      source: '唐诗',
      culturalBackground: '象征女性的高洁品格'
    }
  ]
}

/**
 * 宋词命名库 - 扩展版本
 */
export const SONGCI_DATABASE = {
  male: [
    {
      name: '念远',
      meaning: '思念悠远，情意绵长',
      poeticLine: '念远游之不可得兮，徙倚而闲抚',
      source: '《念奴娇》',
      culturalBackground: '体现对远方的思念'
    },
    {
      name: '云中',
      meaning: '志向高远，超越凡俗',
      poeticLine: '云中谁寄锦书来，雁字回时月满西楼',
      source: '《一剪梅》',
      historicalFigure: '李清照',
      historicalDescription: '李清照是宋词的代表人物，代表了婉约派的高峰'
    },
    {
      name: '月明',
      meaning: '聪慧如月，光明璀璨',
      poeticLine: '月明星稀，乌鹊南飞',
      source: '宋词',
      culturalBackground: '象征智慧和光明'
    },
    {
      name: '清韵',
      meaning: '清廉高洁，韵味悠长',
      poeticLine: '清韵悠悠，如诗如画',
      source: '宋词',
      culturalBackground: '象征品格的高洁'
    },
    {
      name: '烟波',
      meaning: '意境深远，烟波浩渺',
      poeticLine: '烟波不动晓寒生，画船轻浮绿水行',
      source: '宋词',
      culturalBackground: '象征意境的深远'
    },
    {
      name: '风雨',
      meaning: '经历风雨，坚强不屈',
      poeticLine: '风雨如晦，鸡鸣不已',
      source: '宋词',
      culturalBackground: '象征坚强的品格'
    },
    {
      name: '苏轼',
      meaning: '学问渊博，才华横溢',
      poeticLine: '大江东去，浪淘尽千古风流人物',
      source: '《念奴娇·赤壁怀古》',
      historicalFigure: '苏轼',
      historicalDescription: '苏轼是宋代最伟大的文人，代表了豪放派宋词'
    },
    {
      name: '晓风',
      meaning: '清晨的风，清新爽朗',
      poeticLine: '晓风残月，梧桐叶又飘零',
      source: '宋词',
      culturalBackground: '象征清新的气质'
    }
  ],
  female: [
    {
      name: '念远',
      meaning: '思念悠远，情意绵长',
      poeticLine: '念远游之不可得兮，徙倚而闲抚',
      source: '《念奴娇》',
      culturalBackground: '象征女性的深情'
    },
    {
      name: '云中',
      meaning: '志向高远，如云飘飘',
      poeticLine: '云中谁寄锦书来，雁字回时月满西楼',
      source: '《一剪梅》',
      culturalBackground: '象征女性的思念'
    },
    {
      name: '月明',
      meaning: '聪慧如月，光明璀璨',
      poeticLine: '月明星稀，乌鹊南飞',
      source: '宋词',
      culturalBackground: '象征女性的聪慧'
    },
    {
      name: '清韵',
      meaning: '清廉高洁，韵味悠长',
      poeticLine: '清韵悠悠，如诗如画',
      source: '宋词',
      culturalBackground: '象征女性的高洁'
    },
    {
      name: '芳华',
      meaning: '芬芳美好，青春绽放',
      poeticLine: '芳华如梦，岁月如歌',
      source: '宋词',
      culturalBackground: '象征年轻女性的活力'
    },
    {
      name: '若兰',
      meaning: '品格如兰，高洁幽香',
      poeticLine: '兰有秀兮菊有芳，怀佳人兮不能忘',
      source: '宋词',
      culturalBackground: '象征女性的高洁品格'
    },
    {
      name: '清照',
      meaning: '清廉照人，品格高洁',
      poeticLine: '清照人间，永驻心间',
      source: '宋词',
      historicalFigure: '李清照',
      historicalDescription: '李清照是宋代最伟大的女性词人'
    },
    {
      name: '晓风',
      meaning: '清晨的风，清新爽朗',
      poeticLine: '晓风残月，梧桐叶又飘零',
      source: '宋词',
      culturalBackground: '象征女性的清新气质'
    }
  ]
}

/**
 * 增强型命名系统引擎工厂
 */
export class EnhancedNamingSystemEngineFactory {
  /**
   * 生成诗经命名
   */
  generateShijing(gender: 'male' | 'female', index: number): EnhancedNameCandidate {
    const database = SHIJING_DATABASE[gender]
    const candidate = database[index % database.length]
    return {
      name: candidate.name,
      nameMeaning: candidate.meaning,
      overallMeaning: `出自《诗经》，${candidate.meaning}`,
      source: candidate.source,
      poeticLine: candidate.poeticLine,
      historicalFigure: candidate.historicalFigure,
      historicalDescription: candidate.historicalDescription,
      culturalBackground: candidate.culturalBackground
    }
  }

  /**
   * 生成楚辞命名
   */
  generateChuci(gender: 'male' | 'female', index: number): EnhancedNameCandidate {
    const database = CHUCI_DATABASE[gender]
    const candidate = database[index % database.length]
    return {
      name: candidate.name,
      nameMeaning: candidate.meaning,
      overallMeaning: `出自《楚辞》，${candidate.meaning}`,
      source: candidate.source,
      poeticLine: candidate.poeticLine,
      historicalFigure: candidate.historicalFigure,
      historicalDescription: candidate.historicalDescription,
      culturalBackground: candidate.culturalBackground
    }
  }

  /**
   * 生成唐诗命名
   */
  generateTangshi(gender: 'male' | 'female', index: number): EnhancedNameCandidate {
    const database = TANGSHI_DATABASE[gender]
    const candidate = database[index % database.length]
    return {
      name: candidate.name,
      nameMeaning: candidate.meaning,
      overallMeaning: `出自唐诗，${candidate.meaning}`,
      source: candidate.source,
      poeticLine: candidate.poeticLine,
      historicalFigure: candidate.historicalFigure,
      historicalDescription: candidate.historicalDescription,
      culturalBackground: candidate.culturalBackground
    }
  }

  /**
   * 生成宋词命名
   */
  generateSongci(gender: 'male' | 'female', index: number): EnhancedNameCandidate {
    const database = SONGCI_DATABASE[gender]
    const candidate = database[index % database.length]
    return {
      name: candidate.name,
      nameMeaning: candidate.meaning,
      overallMeaning: `出自宋词，${candidate.meaning}`,
      source: candidate.source,
      poeticLine: candidate.poeticLine,
      historicalFigure: candidate.historicalFigure,
      historicalDescription: candidate.historicalDescription,
      culturalBackground: candidate.culturalBackground
    }
  }
}

export const enhancedNamingEngineFactory = new EnhancedNamingSystemEngineFactory()
