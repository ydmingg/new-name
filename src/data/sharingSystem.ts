/**
 * 华夏命名 - 名字 PK 和分享系统
 */

export interface NamePKResult {
  winner: string
  loser: string
  scores: {
    phonetics: number // 音律分数
    meaning: number // 寓意分数
    source: number // 出处分数
    distinctiveness: number // 辨识度分数
    modernity: number // 现代感分数
    culture: number // 文化感分数
  }
  recommendation: string
  analysis: string
}

export interface SharePosterConfig {
  name: string
  courtesy?: string
  system: string
  temperament: string
  meaning: string
  style: 'traditional' | 'modern' | 'elegant'
  backgroundColor: string
  textColor: string
}

/**
 * 名字 PK 引擎
 */
export class NamePKEngine {
  /**
   * 比较两个名字
   */
  compare(
    name1: {
      fullName: string
      meaning: string
      source: string
      phonetics: number
      distinctiveness: number
    },
    name2: {
      fullName: string
      meaning: string
      source: string
      phonetics: number
      distinctiveness: number
    }
  ): NamePKResult {
    const scores1 = this.calculateScores(name1)
    const scores2 = this.calculateScores(name2)

    const total1 = Object.values(scores1).reduce((a, b) => a + b, 0)
    const total2 = Object.values(scores2).reduce((a, b) => a + b, 0)

    const winner = total1 > total2 ? name1.fullName : name2.fullName
    const loser = total1 > total2 ? name2.fullName : name1.fullName
    const winnerScores = total1 > total2 ? scores1 : scores2

    return {
      winner,
      loser,
      scores: winnerScores,
      recommendation: `建议选择 ${winner}`,
      analysis: this.generateAnalysis(name1, name2, total1, total2)
    }
  }

  /**
   * 计算单个名字的各项分数
   */
  private calculateScores(name: {
    fullName: string
    meaning: string
    source: string
    phonetics: number
    distinctiveness: number
  }): Record<string, number> {
    return {
      phonetics: name.phonetics || 70,
      meaning: this.calculateMeaningScore(name.meaning),
      source: this.calculateSourceScore(name.source),
      distinctiveness: name.distinctiveness || 60,
      modernity: this.calculateModernityScore(name.fullName),
      culture: this.calculateCultureScore(name.source)
    }
  }

  /**
   * 计算寓意分数
   */
  private calculateMeaningScore(meaning: string): number {
    if (!meaning) return 50
    
    let score = 60
    if (meaning.length > 20) score += 10
    if (meaning.includes('高') || meaning.includes('远') || meaning.includes('雅')) score += 10
    if (meaning.includes('品') || meaning.includes('德') || meaning.includes('修')) score += 10
    
    return Math.min(100, score)
  }

  /**
   * 计算出处分数
   */
  private calculateSourceScore(source: string): number {
    if (!source) return 40
    
    const classicalSources: Record<string, number> = {
      '《诗经》': 90,
      '《楚辞》': 95,
      '《论语》': 85,
      '《周易》': 80,
      '唐诗': 85,
      '宋词': 80,
      '东汉': 75,
      '三国': 75,
      '魏晋': 75,
      '现代': 60
    }

    for (const [key, value] of Object.entries(classicalSources)) {
      if (source.includes(key)) {
        return value
      }
    }

    return 70
  }

  /**
   * 计算现代感分数
   */
  private calculateModernityScore(fullName: string): number {
    // 简洁的名字现代感更强
    if (fullName.length === 2) return 75
    if (fullName.length === 3) return 70
    return 60
  }

  /**
   * 计算文化感分数
   */
  private calculateCultureScore(source: string): number {
    if (!source) return 50
    
    if (source.includes('《') || source.includes('诗') || source.includes('词')) {
      return 90
    }
    if (source.includes('汉') || source.includes('魏') || source.includes('晋')) {
      return 85
    }
    return 60
  }

  /**
   * 生成分析文本
   */
  private generateAnalysis(
    name1: { fullName: string; meaning: string },
    name2: { fullName: string; meaning: string },
    total1: number,
    total2: number
  ): string {
    const diff = Math.abs(total1 - total2)
    
    if (diff < 10) {
      return `${name1.fullName} 和 ${name2.fullName} 不相上下，各有特色。${name1.fullName} 略占上风。`
    } else if (diff < 20) {
      return `${name1.fullName} 优势明显，整体气质更佳。`
    } else {
      return `${name1.fullName} 遥遥领先，是更好的选择。`
    }
  }
}

/**
 * 分享海报生成器
 */
export class SharePosterGenerator {
  /**
   * 生成古风海报配置
   */
  generateTraditionalPoster(config: SharePosterConfig): SharePosterConfig {
    return {
      ...config,
      style: 'traditional',
      backgroundColor: '#f5efe4',
      textColor: '#333'
    }
  }

  /**
   * 生成现代海报配置
   */
  generateModernPoster(config: SharePosterConfig): SharePosterConfig {
    return {
      ...config,
      style: 'modern',
      backgroundColor: '#ffffff',
      textColor: '#333'
    }
  }

  /**
   * 生成优雅海报配置
   */
  generateElegantPoster(config: SharePosterConfig): SharePosterConfig {
    return {
      ...config,
      style: 'elegant',
      backgroundColor: '#2c2c2c',
      textColor: '#f5efe4'
    }
  }

  /**
   * 生成海报 HTML
   */
  generatePosterHTML(config: SharePosterConfig): string {
    const { name, courtesy, system, temperament, meaning, style, backgroundColor, textColor } = config

    const courtesyHTML = courtesy ? `<div class="courtesy">字 ${courtesy}</div>` : ''
    const styleClass = `poster-${style}`

    return `
      <div class="share-poster ${styleClass}" style="background-color: ${backgroundColor}; color: ${textColor};">
        <div class="poster-header">
          <div class="system-tag">${system}</div>
          <div class="temperament-tag">${temperament}</div>
        </div>
        
        <div class="poster-content">
          <div class="name">${name}</div>
          ${courtesyHTML}
          <div class="meaning">${meaning}</div>
        </div>
        
        <div class="poster-footer">
          <div class="logo">华夏命名</div>
          <div class="slogan">名以立志 · 字以明德</div>
        </div>
      </div>

      <style>
        .share-poster {
          width: 400px;
          height: 600px;
          padding: 40px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: 'SimSun', 'Microsoft YaHei', serif;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .poster-header {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .system-tag, .temperament-tag {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          background: rgba(212, 165, 116, 0.2);
          color: #d4a574;
        }

        .poster-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .name {
          font-size: 64px;
          font-weight: bold;
          margin-bottom: 16px;
          letter-spacing: 8px;
        }

        .courtesy {
          font-size: 24px;
          margin-bottom: 32px;
          opacity: 0.8;
        }

        .meaning {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.7;
          max-width: 100%;
        }

        .poster-footer {
          text-align: center;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .slogan {
          font-size: 12px;
          opacity: 0.6;
          letter-spacing: 2px;
        }

        .poster-traditional {
          background: linear-gradient(135deg, #efe0c7 0%, #f5efe4 100%);
          border: 2px solid #d4a574;
        }

        .poster-modern {
          background: white;
          border: 1px solid #e0e0e0;
        }

        .poster-elegant {
          background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
          border: 2px solid #d4a574;
        }
      </style>
    `
  }

  /**
   * 生成分享文案
   */
  generateShareText(name: string, system: string, temperament: string): string {
    return `我用「华夏命名」给孩子起了个好名字：${name}（${system}·${temperament}）。名以立志，字以明德。你也来试试吧！`
  }
}

export const namePKEngine = new NamePKEngine()
export const sharePosterGenerator = new SharePosterGenerator()
