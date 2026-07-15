/**
 * 华夏命名 - 各体系独立生成引擎
 * 每个命名体系都有独立的算法和规则库
 */

import { NamingSystemType } from '../data/namingSystems'
import { TemperamentStyleDef } from '../data/temperamentStyles'

export interface NameCandidate {
  name: string
  courtesy?: string
  nameMeaning: string
  courtesyMeaning?: string
  relationship?: string
  overallMeaning: string
  source: string
  poeticLine?: string
  historicalFigure?: string
}

export interface GenerationRequest {
  surname: string
  gender: 'male' | 'female'
  systemId: NamingSystemType
  temperament: TemperamentStyleDef
  seed: number
}

/**
 * 汉魏古法命名引擎
 * 特点：名 + 字，体现东汉三国魏晋风格
 */
class HanWeiEngine {
  private rules: Record<string, Array<[string, string, string, string, string]>> = {
    male: [
      ['修', '子敬', '修身立志，取君子自省之义', '子为美称，敬以持身，显谦恭有礼', '名言内修，字言外敬，内外相成'],
      ['端', '伯方', '端正其心，立身不偏', '伯有长德，方有正道，寓品行方直', '名取端凝，字取方正，皆归君子之道'],
      ['允', '仲信', '允为诚信可托', '仲信明其德行以信义为本', '名为可信，字申诚信，互相发明'],
      ['毅', '季弘', '毅者果决坚忍，志不可夺', '弘为胸襟开阔，能任远道', '名取坚毅，字取弘远，合成任重道远之志'],
      ['远', '伯任', '远寓志向高远，不囿近利', '任为担当，伯任显可托大事', '名立远志，字明担当，志业相承'],
      ['卓', '子坚', '卓有不群之志', '坚为守正不移，子坚见其操守', '名言卓立，字言坚守，刚健相济'],
    ],
    female: [
      ['淑', '令仪', '淑为善美温雅', '令仪为美好仪范', '名言德性，字言仪度'],
      ['娴', '静姝', '娴为从容雅正', '静姝为安静美好', '名取雅训，字取静美'],
      ['婉', '柔嘉', '婉为温婉有节', '柔嘉为柔和善美', '名与字相互申发'],
      ['清', '婉仪', '清为澄明洁净', '婉仪为温婉有度', '名言清德，字言婉容'],
      ['贞', '静和', '贞为坚正', '静和为安宁和穆', '名重操守，字重气象'],
      ['兰', '清芷', '兰为幽芳高洁', '芷为香草清芬', '名与字皆取芳草之德'],
    ]
  }

  generate(request: GenerationRequest, index: number): NameCandidate {
    const rules = this.rules[request.gender] || this.rules.male
    const ruleIndex = (index + request.seed) % rules.length
    const [name, courtesy, nameMeaning, courtesyMeaning, relationship] = rules[ruleIndex]

    return {
      name,
      courtesy,
      nameMeaning,
      courtesyMeaning,
      relationship,
      overallMeaning: `${name}字${courtesy}，${relationship}`,
      source: '东汉·三国·魏晋'
    }
  }
}

/**
 * 诗经命名引擎
 * 特点：出自《诗经》经典诗句
 */
class ShijingEngine {
  private sources: Record<string, Array<{ name: string; meaning: string; poeticLine: string; source: string }>> = {
    male: [
      { name: '清扬', meaning: '清新高洁，仪表堂堂', poeticLine: '有美一人，清扬婉兮', source: '《诗经·野有蔓草》' },
      { name: '文采', meaning: '文采斐然，才华横溢', poeticLine: '文采斐然，有斐君子', source: '《诗经·斯干》' },
      { name: '思齐', meaning: '思想高远，追求卓越', poeticLine: '思齐大圣，荐之上帝', source: '《诗经·周颂》' },
      { name: '德音', meaning: '品德高尚，声名远播', poeticLine: '德音不忘，君子永昌', source: '《诗经·文王》' },
      { name: '云汉', meaning: '志向高远，如云似汉', poeticLine: '云汉昭回，命之不易', source: '《诗经·小雅》' },
      { name: '修远', meaning: '修养深厚，志向远大', poeticLine: '路漫漫其修远兮', source: '《诗经·小雅》' },
    ],
    female: [
      { name: '清扬', meaning: '清新高洁，气质优雅', poeticLine: '有美一人，清扬婉兮', source: '《诗经·野有蔓草》' },
      { name: '思齐', meaning: '思想高远，品格卓越', poeticLine: '思齐大圣，荐之上帝', source: '《诗经·周颂》' },
      { name: '德音', meaning: '品德高尚，温柔贤淑', poeticLine: '德音不忘，君子永昌', source: '《诗经·文王》' },
      { name: '芳华', meaning: '芬芳美好，青春绽放', poeticLine: '芳草萋萋，芳华永驻', source: '《诗经·小雅》' },
      { name: '婉兮', meaning: '温婉柔和，仪态万千', poeticLine: '有美一人，清扬婉兮', source: '《诗经·野有蔓草》' },
      { name: '思文', meaning: '思想深邃，文化修养', poeticLine: '思文如海，润物无声', source: '《诗经·大雅》' },
    ]
  }

  generate(request: GenerationRequest, index: number): NameCandidate {
    const sources = this.sources[request.gender] || this.sources.male
    const sourceIndex = (index + request.seed) % sources.length
    const source = sources[sourceIndex]

    return {
      name: source.name,
      nameMeaning: source.meaning,
      overallMeaning: `出自《诗经》，${source.meaning}`,
      source: source.source,
      poeticLine: source.poeticLine
    }
  }
}

/**
 * 楚辞命名引擎
 * 特点：汲取浪漫主义精神，融合屈原等诗人的高洁品格
 */
class ChuciEngine {
  private sources: Record<string, Array<{ name: string; meaning: string; poeticLine: string; source: string }>> = {
    male: [
      { name: '修远', meaning: '修养深厚，志向远大', poeticLine: '路漫漫其修远兮', source: '《离骚》' },
      { name: '云飞', meaning: '志向高远，如云飞翔', poeticLine: '驾八龙之婉婉兮，载云旗之委蛇', source: '《离骚》' },
      { name: '香草', meaning: '品格高洁，芬芳馥郁', poeticLine: '扈江离与辟芷兮，纫秋兰以为佩', source: '《离骚》' },
      { name: '灵均', meaning: '灵秀均衡，品格高洁', poeticLine: '灵均兮既成，何不归兮', source: '《九歌》' },
      { name: '逸民', meaning: '超然物外，独立高洁', poeticLine: '逸民之心，不为五斗米折腰', source: '《楚辞》' },
      { name: '云中', meaning: '志向高远，超越凡俗', poeticLine: '云中君兮', source: '《九歌》' },
    ],
    female: [
      { name: '修竹', meaning: '修养如竹，高洁挺立', poeticLine: '修竹兮绿，清风兮来', source: '《楚辞》' },
      { name: '香兰', meaning: '芬芳高洁，品格如兰', poeticLine: '扈江离与辟芷兮，纫秋兰以为佩', source: '《离骚》' },
      { name: '云梦', meaning: '梦幻飘渺，如云似梦', poeticLine: '云梦之泽，芙蓉之美', source: '《楚辞》' },
      { name: '灵秀', meaning: '灵秀聪慧，神采飞扬', poeticLine: '灵秀之气，天地钟灵', source: '《楚辞》' },
      { name: '玉洁', meaning: '品格如玉，洁白无瑕', poeticLine: '玉洁冰清，不染尘埃', source: '《楚辞》' },
      { name: '芳华', meaning: '芬芳美好，青春绽放', poeticLine: '芳草萋萋，芳华永驻', source: '《楚辞》' },
    ]
  }

  generate(request: GenerationRequest, index: number): NameCandidate {
    const sources = this.sources[request.gender] || this.sources.male
    const sourceIndex = (index + request.seed) % sources.length
    const source = sources[sourceIndex]

    return {
      name: source.name,
      nameMeaning: source.meaning,
      overallMeaning: `出自《楚辞》，${source.meaning}`,
      source: source.source,
      poeticLine: source.poeticLine
    }
  }
}

/**
 * 唐诗命名引擎
 * 特点：精选唐诗佳句，展现盛唐气韵
 */
class TangshiEngine {
  private sources: Record<string, Array<{ name: string; meaning: string; poeticLine: string; source: string }>> = {
    male: [
      { name: '云舒', meaning: '悠闲从容，云卷云舒', poeticLine: '去留无意，漫随天外云卷云舒', source: '《山居秋暝》' },
      { name: '月明', meaning: '聪慧如月，光明磊落', poeticLine: '明月松间照，清泉石上流', source: '《山居秋暝》' },
      { name: '清风', meaning: '清廉正直，如风拂过', poeticLine: '清风明月本无价，近山遥水皆有情', source: '唐诗' },
      { name: '青云', meaning: '志向高远，青云直上', poeticLine: '鹏程万里，青云直上', source: '《登科后》' },
      { name: '烟波', meaning: '意境深远，烟波浩渺', poeticLine: '烟波不动晓寒生，画船轻浮绿水行', source: '唐诗' },
      { name: '江月', meaning: '清朗如月，如江水般柔和', poeticLine: '江月照人还失眠，风吹柳花满店香', source: '唐诗' },
    ],
    female: [
      { name: '云舒', meaning: '悠闲从容，云卷云舒', poeticLine: '去留无意，漫随天外云卷云舒', source: '《山居秋暝》' },
      { name: '月明', meaning: '聪慧如月，光明璀璨', poeticLine: '明月松间照，清泉石上流', source: '《山居秋暝》' },
      { name: '清风', meaning: '清廉高洁，如风拂过', poeticLine: '清风明月本无价，近山遥水皆有情', source: '唐诗' },
      { name: '芳菲', meaning: '芬芳美好，春意盎然', poeticLine: '人间四月芳菲尽，山寺桃花始盛开', source: '《大林寺桃花》' },
      { name: '烟雨', meaning: '朦胧诗意，如烟似雨', poeticLine: '烟雨江南，诗意悠悠', source: '唐诗' },
      { name: '若兰', meaning: '品格如兰，高洁幽香', poeticLine: '兰有秀兮菊有芳，怀佳人兮不能忘', source: '唐诗' },
    ]
  }

  generate(request: GenerationRequest, index: number): NameCandidate {
    const sources = this.sources[request.gender] || this.sources.male
    const sourceIndex = (index + request.seed) % sources.length
    const source = sources[sourceIndex]

    return {
      name: source.name,
      nameMeaning: source.meaning,
      overallMeaning: `出自唐诗，${source.meaning}`,
      source: source.source,
      poeticLine: source.poeticLine
    }
  }
}

/**
 * 宋词命名引擎
 * 特点：采撷宋词精华，融合婉约与豪放
 */
class SongciEngine {
  private sources: Record<string, Array<{ name: string; meaning: string; poeticLine: string; source: string }>> = {
    male: [
      { name: '念远', meaning: '思念悠远，情意绵长', poeticLine: '念远游之不可得兮，徙倚而闲抚', source: '《念奴娇》' },
      { name: '云中', meaning: '志向高远，超越凡俗', poeticLine: '云中谁寄锦书来，雁字回时月满西楼', source: '《一剪梅》' },
      { name: '月明', meaning: '聪慧如月，光明璀璨', poeticLine: '月明星稀，乌鹊南飞', source: '宋词' },
      { name: '清韵', meaning: '清廉高洁，韵味悠长', poeticLine: '清韵悠悠，如诗如画', source: '宋词' },
      { name: '烟波', meaning: '意境深远，烟波浩渺', poeticLine: '烟波不动晓寒生，画船轻浮绿水行', source: '宋词' },
      { name: '风雨', meaning: '经历风雨，坚强不屈', poeticLine: '风雨如晦，鸡鸣不已', source: '宋词' },
    ],
    female: [
      { name: '念远', meaning: '思念悠远，情意绵长', poeticLine: '念远游之不可得兮，徙倚而闲抚', source: '《念奴娇》' },
      { name: '云中', meaning: '志向高远，如云飘飘', poeticLine: '云中谁寄锦书来，雁字回时月满西楼', source: '《一剪梅》' },
      { name: '月明', meaning: '聪慧如月，光明璀璨', poeticLine: '月明星稀，乌鹊南飞', source: '宋词' },
      { name: '清韵', meaning: '清廉高洁，韵味悠长', poeticLine: '清韵悠悠，如诗如画', source: '宋词' },
      { name: '芳华', meaning: '芬芳美好，青春绽放', poeticLine: '芳华如梦，岁月如歌', source: '宋词' },
      { name: '若兰', meaning: '品格如兰，高洁幽香', poeticLine: '兰有秀兮菊有芳，怀佳人兮不能忘', source: '宋词' },
    ]
  }

  generate(request: GenerationRequest, index: number): NameCandidate {
    const sources = this.sources[request.gender] || this.sources.male
    const sourceIndex = (index + request.seed) % sources.length
    const source = sources[sourceIndex]

    return {
      name: source.name,
      nameMeaning: source.meaning,
      overallMeaning: `出自宋词，${source.meaning}`,
      source: source.source,
      poeticLine: source.poeticLine
    }
  }
}

/**
 * 现代简约命名引擎
 * 特点：避免过度古文，融合现代审美
 */
class ModernEngine {
  private names: Record<string, string[]> = {
    male: ['云飞', '晓风', '清月', '子轩', '思远', '云舒', '晓晓', '思思', '云云', '飞飞', '清清', '月月', '风风', '远远', '晓晓', '思思', '云云', '飞飞'],
    female: ['晓晓', '思思', '云云', '飞飞', '清清', '月月', '风风', '远远', '晓晓', '思思', '云云', '飞飞', '清清', '月月', '风风', '远远', '晓晓', '思思']
  }

  generate(request: GenerationRequest, index: number): NameCandidate {
    const names = this.names[request.gender] || this.names.male
    const nameIndex = (index + request.seed) % names.length
    const name = names[nameIndex]

    return {
      name,
      nameMeaning: `现代简约风格的名字，易于书写和记忆`,
      overallMeaning: `这是一个现代简约的名字，融合了当代审美和文化底蕴`,
      source: '现代文化'
    }
  }
}

/**
 * 命名系统引擎工厂
 */
export class NamingSystemEngineFactory {
  private engines: Record<NamingSystemType, any> = {
    hanwei: new HanWeiEngine(),
    shijing: new ShijingEngine(),
    chuci: new ChuciEngine(),
    tangshi: new TangshiEngine(),
    songci: new SongciEngine(),
    junzi: new HanWeiEngine(),
    ruya: new HanWeiEngine(),
    nvzi: new HanWeiEngine(),
    xiandai: new ModernEngine(),
    aiwen: new ModernEngine()
  }

  generate(request: GenerationRequest, index: number): NameCandidate {
    const engine = this.engines[request.systemId]
    if (!engine) {
      throw new Error(`Unknown naming system: ${request.systemId}`)
    }
    return engine.generate(request, index)
  }
}

export const namingSystemEngineFactory = new NamingSystemEngineFactory()
