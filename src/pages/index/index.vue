<template>
  <view class="page">
    <!-- 详情页面 -->
    <view v-if="selectedName" class="detail-panel">
      <button class="ghost-button" @click="selectedName = null">← 返回列表</button>

      <view class="detail-card">
        <text class="detail-kicker">{{ selectedName.systemName }}</text>
        <text class="detail-name">{{ selectedName.fullName }}</text>
        <text class="detail-pinyin">{{ selectedName.fullNamePinyin }}</text>
        
        <view v-if="selectedName.courtesyName" class="section">
          <text class="section-title">字</text>
          <text class="section-text">{{ selectedName.courtesyName }}</text>
          <text class="section-pinyin">{{ selectedName.courtesyPinyin }}</text>
        </view>

        <view class="section">
          <text class="section-title">名解释</text>
          <text class="section-text">{{ selectedName.nameMeaning }}</text>
        </view>

        <view v-if="selectedName.courtesyMeaning" class="section">
          <text class="section-title">字解释</text>
          <text class="section-text">{{ selectedName.courtesyMeaning }}</text>
        </view>

        <view v-if="selectedName.source" class="section">
          <text class="section-title">出处</text>
          <text class="section-text">{{ selectedName.source }}</text>
        </view>

        <view v-if="selectedName.relationship" class="section">
          <text class="section-title">名字关系</text>
          <text class="section-text">{{ selectedName.relationship }}</text>
        </view>

        <view class="section highlight-section">
          <text class="section-title">整体寓意</text>
          <text class="section-text">{{ selectedName.overallMeaning }}</text>
        </view>

        <view class="action-buttons">
          <button class="action-btn collect-btn" @click="toggleCollect">
            {{ isCollected ? '❤️ 已收藏' : '🤍 收藏' }}
          </button>
          <button class="action-btn share-btn" @click="shareNamePoster">分享海报</button>
        </view>
      </view>
    </view>

    <!-- 命名体系选择页面 -->
    <view v-else-if="showSystemSelection" class="system-selection-panel">
      <button class="ghost-button" @click="showSystemSelection = false">← 返回</button>

      <view class="hero-card">
        <text class="eyebrow">名以立志 · 字以明德</text>
        <text class="title">华夏命名</text>
        <text class="mode-title">选择命名体系</text>
        <text class="subtitle">每个体系都有独立的算法和文化底蕴</text>
      </view>

      <view class="systems-grid">
        <view
          v-for="system in availableSystems"
          :key="system.id"
          class="system-card"
          @click="selectSystem(system.id)"
        >
          <text class="system-name">{{ system.name }}</text>
          <text class="system-desc">{{ system.description }}</text>
          <view class="system-features">
            <text v-for="feature in system.features.slice(0, 2)" :key="feature" class="feature-tag">
              {{ feature }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 主页面 -->
    <view v-else>
      <view class="hero-card">
        <text class="eyebrow">名以立志 · 字以明德</text>
        <text class="title">华夏命名</text>
        <text class="mode-title">{{ currentSystemName }}</text>
        <text class="subtitle">{{ currentSystemDesc }}</text>
      </view>

      <view class="form-card">
        <view class="field">
          <text class="label">姓氏</text>
          <input v-model.trim="surname" class="input" maxlength="2" placeholder="请输入姓氏，如：陈" />
        </view>

        <view class="field">
          <text class="label">性别</text>
          <view class="segmented">
            <button
              v-for="item in genders"
              :key="item"
              class="segment"
              :class="{ active: gender === item }"
              @click="selectGender(item)"
            >
              {{ item === 'male' ? '男' : '女' }}
            </button>
          </view>
        </view>

        <view class="field">
          <text class="label">气质风格</text>
          <view class="style-grid">
            <button
              v-for="item in availableTemperaments"
              :key="item.name"
              class="style-chip"
              :class="{ active: selectedTemperament === item.name }"
              @click="selectedTemperament = item.name"
            >
              {{ item.name }}
            </button>
          </view>
        </view>

        <view class="system-selector">
          <text class="label">命名体系</text>
          <button class="system-selector-btn" @click="showSystemSelection = true">
            {{ currentSystemName }} →
          </button>
        </view>

        <button class="generate-button" @click="generateNames">
          {{ nameResults.length ? '重新生成' : '生成名字' }}
        </button>
        <text v-if="errorMessage" class="error">{{ errorMessage }}</text>
      </view>

      <view v-if="nameResults.length" class="results">
        <view class="results-head">
          <text class="results-title">十八组命名方案</text>
          <text class="results-tip">点击任一名字查看详细解释</text>
        </view>

        <view class="name-grid">
          <view v-for="item in nameResults" :key="item.id" class="name-card" @click="selectedName = item">
            <text class="full-name">{{ item.fullName }}</text>
            <text class="pinyin">{{ item.fullNamePinyin }}</text>
            <text v-if="item.courtesyName" class="courtesy">字 {{ item.courtesyName }}</text>
            <text v-if="item.courtesyPinyin" class="pinyin">{{ item.courtesyPinyin }}</text>
            <text class="tag">{{ item.temperament }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { NAMING_SYSTEMS, getNamingSystemsByGender, type NamingSystemType } from '../../data/namingSystems'
import { 
  getTemperamentsByGender, 
  type Gender as TGender,
  type TemperamentStyleDef 
} from '../../data/temperamentStyles'
import { namingSystemEngineFactory, type NameCandidate } from '../../engine/NamingSystemEngine'
import { nameAnalysisEngine } from '../../engine/AnalysisEngine'

type Gender = 'male' | 'female'

interface NameResult {
  id: number
  surname: string
  systemId: NamingSystemType
  systemName: string
  temperament: string
  name: string
  fullName: string
  fullNamePinyin: string
  courtesyName?: string
  courtesyPinyin?: string
  nameMeaning: string
  courtesyMeaning?: string
  relationship?: string
  overallMeaning: string
  source?: string
  poeticLine?: string
  analysis?: any
}

const genders: Gender[] = ['male', 'female']

const surname = ref('')
const gender = ref<Gender>('male')
const selectedTemperament = ref('')
const selectedSystemId = ref<NamingSystemType>('hanwei')
const nameResults = ref<NameResult[]>([])
const selectedName = ref<NameResult | null>(null)
const hasGenerated = ref(false)
const showSystemSelection = ref(false)
const generationSeed = ref(0)
const collectedNames = ref<Set<number>>(new Set())

const availableSystems = computed(() => {
  return getNamingSystemsByGender(gender.value).map(sys => NAMING_SYSTEMS[sys.id])
})

const availableTemperaments = computed(() => {
  return getTemperamentsByGender(gender.value as TGender)
})

const currentSystemName = computed(() => {
  return NAMING_SYSTEMS[selectedSystemId.value]?.name || '汉魏古法'
})

const currentSystemDesc = computed(() => {
  return NAMING_SYSTEMS[selectedSystemId.value]?.description || ''
})

const isCollected = computed(() => {
  return selectedName.value ? collectedNames.value.has(selectedName.value.id) : false
})

const errorMessage = computed(() => {
  if (!hasGenerated.value) return ''
  if (!surname.value) return '请先输入姓氏'
  if (!/^[\u4e00-\u9fa5]{1,2}$/.test(surname.value)) return '姓氏建议输入一至两个汉字'
  return ''
})

const pinyinMap: Record<string, string> = {
  张: 'zhang', 王: 'wang', 李: 'li', 赵: 'zhao', 陈: 'chen', 刘: 'liu', 杨: 'yang', 黄: 'huang', 周: 'zhou', 吴: 'wu', 徐: 'xu', 孙: 'sun', 胡: 'hu', 朱: 'zhu', 高: 'gao', 林: 'lin', 何: 'he', 郭: 'guo', 马: 'ma', 罗: 'luo', 梁: 'liang', 宋: 'song', 郑: 'zheng', 谢: 'xie', 韩: 'han', 唐: 'tang', 冯: 'feng', 于: 'yu', 董: 'dong', 萧: 'xiao', 程: 'cheng', 曹: 'cao', 袁: 'yuan', 邓: 'deng', 许: 'xu', 傅: 'fu', 沈: 'shen', 曾: 'zeng', 彭: 'peng', 吕: 'lv', 苏: 'su', 卢: 'lu', 蒋: 'jiang', 蔡: 'cai', 贾: 'jia', 丁: 'ding', 魏: 'wei', 薛: 'xue', 叶: 'ye', 阎: 'yan', 余: 'yu', 潘: 'pan', 杜: 'du', 戴: 'dai', 夏: 'xia', 钟: 'zhong', 汪: 'wang', 田: 'tian', 任: 'ren', 姜: 'jiang', 范: 'fan', 方: 'fang', 石: 'shi', 姚: 'yao', 谭: 'tan', 廖: 'liao', 邹: 'zou', 熊: 'xiong', 金: 'jin', 陆: 'lu', 郝: 'hao', 孔: 'kong', 白: 'bai', 崔: 'cui', 康: 'kang', 毛: 'mao', 邱: 'qiu', 秦: 'qin', 江: 'jiang', 史: 'shi', 顾: 'gu', 侯: 'hou', 邵: 'shao', 孟: 'meng', 龙: 'long', 万: 'wan', 段: 'duan', 雷: 'lei', 钱: 'qian', 汤: 'tang', 尹: 'yin', 易: 'yi', 黎: 'li', 常: 'chang', 武: 'wu', 乔: 'qiao', 贺: 'he', 赖: 'lai', 龚: 'gong', 文: 'wen', 修: 'xiu', 端: 'duan', 允: 'yun', 毅: 'yi', 远: 'yuan', 卓: 'zhuo', 雅: 'ya', 谦: 'qian', 昭: 'zhao', 峻: 'jun', 策: 'ce', 章: 'zhang', 衡: 'heng', 辅: 'fu', 岱: 'dai', 峦: 'luan', 岳: 'yue', 济: 'ji', 安: 'an', 逸: 'yi', 玄: 'xuan', 淑: 'shu', 娴: 'xian', 婉: 'wan', 兰: 'lan', 芷: 'zhi', 蕙: 'hui', 静: 'jing', 仪: 'yi', 贞: 'zhen', 清: 'qing', 澄: 'cheng', 书: 'shu', 知: 'zhi', 慧: 'hui', 柔: 'rou', 嘉: 'jia', 和: 'he', 令: 'ling', 容: 'rong', 子: 'zi', 敬: 'jing', 伯: 'bo', 仲: 'zhong', 信: 'xin', 季: 'ji', 弘: 'hong', 坚: 'jian', 雍: 'yong', 烈: 'lie', 威: 'wei', 典: 'dian', 平: 'ping', 弼: 'bi', 嵩: 'song', 岑: 'cen', 民: 'min', 治: 'zhi', 宁: 'ning', 闲: 'xian', 微: 'wei', 泉: 'quan', 姝: 'shu', 芳: 'fang', 德: 'de', 则: 'ze', 言: 'yan', 然: 'ran', 明: 'ming', 之: 'zhi', 元: 'yuan', 景: 'jing', 徽: 'hui', 达: 'da', 简: 'jian', 深: 'shen', 渊: 'yuan', 朗: 'lang', 素: 'su'
}

function toPinyin(value: string) {
  return Array.from(value).map((item) => pinyinMap[item] || item).join(' ')
}

function selectGender(item: Gender) {
  gender.value = item
  selectedTemperament.value = ''
  selectedName.value = null
  if (nameResults.value.length) generateNames()
}

function selectSystem(systemId: NamingSystemType) {
  selectedSystemId.value = systemId
  showSystemSelection.value = false
  if (nameResults.value.length) generateNames()
}

function toggleCollect() {
  if (selectedName.value) {
    if (collectedNames.value.has(selectedName.value.id)) {
      collectedNames.value.delete(selectedName.value.id)
    } else {
      collectedNames.value.add(selectedName.value.id)
    }
  }
}

function shareNamePoster() {
  if (selectedName.value) {
    uni.showToast({
      title: '分享功能开发中',
      icon: 'none'
    })
  }
}

function generateNames() {
  hasGenerated.value = true
  generationSeed.value += 1
  
  if (!surname.value || !/^[\u4e00-\u9fa5]{1,2}$/.test(surname.value)) {
    nameResults.value = []
    return
  }

  const temperamentList = availableTemperaments.value
  const selectedTempName = selectedTemperament.value || temperamentList[0]?.name || ''
  const selectedTemp = temperamentList.find(t => t.name === selectedTempName)
  
  nameResults.value = Array.from({ length: 18 }, (_, index) => {
    const tempIndex = (index + generationSeed.value) % temperamentList.length
    const temp = temperamentList[tempIndex]
    
    try {
      // 使用命名系统引擎生成名字
      const candidate = namingSystemEngineFactory.generate(
        {
          surname: surname.value,
          gender: gender.value,
          systemId: selectedSystemId.value,
          temperament: temp,
          seed: generationSeed.value
        },
        index
      )
      
      const fullName = `${surname.value}${candidate.name}`
      const analysis = nameAnalysisEngine.analyze(fullName, temp.name)

      return {
        id: generationSeed.value * 100 + index + 1,
        surname: surname.value,
        systemId: selectedSystemId.value,
        systemName: currentSystemName.value,
        temperament: temp.name,
        name: candidate.name,
        fullName,
        fullNamePinyin: analysis.pinyin.characters.map(c => c.pinyin).join(' '),
        courtesyName: candidate.courtesy,
        courtesyPinyin: candidate.courtesy ? toPinyin(candidate.courtesy) : undefined,
        nameMeaning: candidate.nameMeaning,
        courtesyMeaning: candidate.courtesyMeaning,
        relationship: candidate.relationship,
        overallMeaning: candidate.overallMeaning,
        source: candidate.source,
        poeticLine: candidate.poeticLine,
        analysis
      }
    } catch (e) {
      console.error('Error generating name:', e)
      return {
        id: generationSeed.value * 100 + index + 1,
        surname: surname.value,
        systemId: selectedSystemId.value,
        systemName: currentSystemName.value,
        temperament: temp.name,
        name: '名',
        fullName: `${surname.value}名`,
        fullNamePinyin: 'ming',
        nameMeaning: '生成失败',
        overallMeaning: '请重试',
        source: ''
      }
    }
  })
}

// 初始化默认气质
watch(availableTemperaments, (newTemps) => {
  if (newTemps.length > 0 && !selectedTemperament.value) {
    selectedTemperament.value = newTemps[0].name
  }
}, { immediate: true })
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background-color: #f5efe4;
  padding-bottom: 40px;
}

.ghost-button {
  background: transparent;
  border: none;
  color: #333;
  font-size: 16px;
  padding: 12px 16px;
  text-align: left;
  margin: 8px 0;
}

// 英雄卡片
.hero-card {
  background: linear-gradient(135deg, #efe0c7 0%, #f5efe4 100%);
  padding: 32px 20px;
  text-align: center;
  border-bottom: 1px solid #e0d0b8;
}

.eyebrow {
  display: block;
  font-size: 12px;
  color: #999;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.title {
  display: block;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.mode-title {
  display: block;
  font-size: 18px;
  color: #666;
  margin-bottom: 8px;
}

.subtitle {
  display: block;
  font-size: 14px;
  color: #999;
  line-height: 1.5;
}

// 表单卡片
.form-card {
  background: white;
  margin: 16px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.field {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0d0b8;
  border-radius: 8px;
  font-size: 16px;
  background: #fafaf8;
}

.segmented {
  display: flex;
  gap: 8px;
}

.segment {
  flex: 1;
  padding: 10px;
  border: 1px solid #e0d0b8;
  border-radius: 8px;
  background: white;
  color: #666;
  font-size: 14px;
  transition: all 0.2s;

  &.active {
    background: #d4a574;
    color: white;
    border-color: #d4a574;
  }
}

.style-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.style-chip {
  padding: 8px 12px;
  border: 1px solid #e0d0b8;
  border-radius: 20px;
  background: white;
  color: #666;
  font-size: 13px;
  transition: all 0.2s;

  &.active {
    background: #d4a574;
    color: white;
    border-color: #d4a574;
  }
}

.system-selector {
  margin-top: 20px;
}

.system-selector-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0d0b8;
  border-radius: 8px;
  background: #fafaf8;
  color: #333;
  font-size: 14px;
  text-align: left;
}

.generate-button {
  width: 100%;
  padding: 14px;
  background: #d4a574;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
}

.error {
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 8px;
}

// 结果列表
.results {
  margin: 20px 16px;
}

.results-head {
  margin-bottom: 16px;
}

.results-title {
  display: block;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.results-tip {
  display: block;
  font-size: 12px;
  color: #999;
}

.name-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.name-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  }
}

.full-name {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.pinyin {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.courtesy {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.tag {
  display: inline-block;
  font-size: 11px;
  color: #d4a574;
  background: #f5efe4;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 8px;
}

// 详情页面
.detail-panel {
  padding: 16px;
}

.detail-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.detail-kicker {
  display: block;
  font-size: 12px;
  color: #d4a574;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.detail-name {
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.detail-pinyin {
  display: block;
  font-size: 14px;
  color: #999;
  margin-bottom: 12px;
}

.section {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0e8dc;
}

.section-title {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #d4a574;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.section-text {
  display: block;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.section-pinyin {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.highlight-section {
  background: #f5efe4;
  padding: 12px;
  border-radius: 8px;
  border: none;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.action-btn {
  flex: 1;
  padding: 12px;
  border: 1px solid #e0d0b8;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.collect-btn {
  &:active {
    background: #f5efe4;
  }
}

.share-btn {
  background: #d4a574;
  color: white;
  border-color: #d4a574;
}

// 命名体系选择页面
.system-selection-panel {
  padding: 16px;
}

.systems-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 16px;
}

.system-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  }
}

.system-name {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
}

.system-desc {
  display: block;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 8px;
}

.system-features {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.feature-tag {
  display: inline-block;
  font-size: 11px;
  color: #d4a574;
  background: #f5efe4;
  padding: 3px 6px;
  border-radius: 3px;
}
</style>
