<template>
  <view class="page">
    <!-- 详情页面 -->
    <view v-if="selectedName" class="detail-panel fade-in">
      <button class="ghost-button" @click="goBack">← 返回列表</button>

      <view class="detail-card">
        <text class="detail-kicker">{{ selectedName.systemName }}</text>
        <text class="detail-name">{{ selectedName.fullName }}</text>
        <text class="detail-pinyin">{{ selectedName.fullNamePinyin }}</text>
        
        <!-- 字的解释 -->
        <view v-if="selectedName.courtesyName" class="section">
          <text class="section-title">字</text>
          <text class="section-text">{{ selectedName.courtesyName }}</text>
          <text class="section-pinyin">{{ selectedName.courtesyPinyin }}</text>
        </view>

        <!-- 名的解释 -->
        <view class="section">
          <text class="section-title">名解释</text>
          <text class="section-text">{{ selectedName.nameMeaning }}</text>
        </view>

        <!-- 字的解释 -->
        <view v-if="selectedName.courtesyMeaning" class="section">
          <text class="section-title">字解释</text>
          <text class="section-text">{{ selectedName.courtesyMeaning }}</text>
        </view>

        <!-- 出处 -->
        <view v-if="selectedName.source" class="section">
          <text class="section-title">出处</text>
          <text class="section-text">{{ selectedName.source }}</text>
          <view v-if="selectedName.poeticLine" class="section">
            <text class="section-pinyin">{{ selectedName.poeticLine }}</text>
          </view>
        </view>

        <!-- 名字关系 -->
        <view v-if="selectedName.relationship" class="section">
          <text class="section-title">名字关系</text>
          <text class="section-text">{{ selectedName.relationship }}</text>
        </view>

        <!-- 整体寓意 -->
        <view class="section highlight-section">
          <text class="section-title">整体寓意</text>
          <text class="section-text">{{ selectedName.overallMeaning }}</text>
        </view>

        <!-- 分析信息 -->
        <view v-if="selectedName.analysis" class="section">
          <text class="section-title">音律分析</text>
          <view class="analysis-item">
            <text class="analysis-label">顺畅度：</text>
            <view class="analysis-bar">
              <view class="analysis-progress" :style="{ width: selectedName.analysis.pinyin.smoothness + '%' }"></view>
            </view>
            <text class="analysis-value">{{ selectedName.analysis.pinyin.smoothness }}/100</text>
          </view>
          <text class="section-text">{{ selectedName.analysis.pinyin.smoothnessDesc }}</text>
        </view>

        <!-- 操作按钮 -->
        <view class="action-buttons">
          <button class="action-btn collect-btn" @click="toggleCollect">
            {{ isCollected ? '❤️ 已收藏' : '🤍 收藏' }}
          </button>
          <button class="action-btn share-btn" @click="shareNamePoster">分享海报</button>
        </view>
      </view>
    </view>

    <!-- 命名体系选择页面 -->
    <view v-else-if="showSystemSelection" class="system-selection-panel fade-in">
      <button class="ghost-button" @click="showSystemSelection = false">← 返回</button>

      <view class="hero-card">
        <text class="eyebrow">名以立志 · 字以明德</text>
        <text class="title">华夏命名</text>
        <text class="mode-title">选择命名体系</text>
        <text class="subtitle">每个体系都有独立的算法和文化底蕴，覆盖所有用户需求</text>
      </view>

      <view class="systems-grid">
        <view
          v-for="system in availableSystems"
          :key="system.id"
          class="system-card slide-up"
          @click="selectSystem(system.id)"
        >
          <text class="system-name">{{ system.name }}</text>
          <text class="system-desc">{{ system.description }}</text>
          <view class="system-features">
            <text v-for="feature in system.features.slice(0, 3)" :key="feature" class="feature-tag">
              {{ feature }}
            </text>
          </view>
          <view style="margin-top: 8px;">
            <text class="system-desc" style="font-size: 12px; opacity: 0.7;">
              来源：{{ system.source }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 主页面 -->
    <view v-else>
      <!-- 英雄卡片 -->
      <view class="hero-card">
        <text class="eyebrow">名以立志 · 字以明德</text>
        <text class="title">华夏命名</text>
        <text class="mode-title">{{ currentSystemName }}</text>
        <text class="subtitle">{{ currentSystemDesc }}</text>
      </view>

      <!-- 表单卡片 -->
      <view class="form-card">
        <!-- 姓氏输入 -->
        <view class="field">
          <text class="label">👤 姓氏</text>
          <input 
            v-model.trim="surname" 
            class="input" 
            maxlength="2" 
            placeholder="请输入姓氏，如：陈、王、李"
            @input="onSurnameChange"
          />
        </view>

        <!-- 性别选择 -->
        <view class="field">
          <text class="label">⚧️ 性别</text>
          <view class="segmented">
            <button
              v-for="item in genders"
              :key="item"
              class="segment"
              :class="{ active: gender === item }"
              @click="selectGender(item)"
            >
              {{ item === 'male' ? '👦 男孩' : '👧 女孩' }}
            </button>
          </view>
        </view>

        <!-- 气质风格选择 -->
        <view class="field">
          <text class="label">✨ 气质风格</text>
          <view class="style-grid">
            <button
              v-for="item in availableTemperaments"
              :key="item.name"
              class="style-chip"
              :class="{ active: selectedTemperament === item.name }"
              @click="selectTemperament(item.name)"
              :title="item.description"
            >
              {{ item.name }}
            </button>
          </view>
        </view>

        <!-- 命名体系选择 -->
        <view class="system-selector">
          <text class="label">📚 命名体系</text>
          <button class="system-selector-btn" @click="showSystemSelection = true">
            <text>{{ currentSystemName }}</text>
            <text>→</text>
          </button>
        </view>

        <!-- 生成按钮 -->
        <button 
          class="generate-button" 
          @click="generateNames"
          :disabled="!surname"
        >
          {{ nameResults.length ? '🔄 重新生成' : '✨ 生成名字' }}
        </button>

        <!-- 错误提示 -->
        <text v-if="errorMessage" class="error">⚠️ {{ errorMessage }}</text>
      </view>

      <!-- 结果列表 -->
      <view v-if="nameResults.length" class="results">
        <view class="results-head">
          <text class="results-title">✓ 十八组命名方案</text>
          <text class="results-tip">点击任一名字查看详细解释</text>
        </view>

        <view class="name-grid">
          <view 
            v-for="item in nameResults" 
            :key="item.id" 
            class="name-card slide-up"
            @click="selectName(item)"
          >
            <text class="full-name">{{ item.fullName }}</text>
            <text class="pinyin">{{ item.fullNamePinyin }}</text>
            <text v-if="item.courtesyName" class="courtesy">字 {{ item.courtesyName }}</text>
            <text v-if="item.courtesyPinyin" class="pinyin">{{ item.courtesyPinyin }}</text>
            <text class="tag">{{ item.temperament }}</text>
          </view>
        </view>
      </view>

      <!-- 空状态提示 -->
      <view v-if="hasGenerated && !nameResults.length" style="text-align: center; padding: 40px 20px; color: #999;">
        <text style="font-size: 16px;">请输入有效的姓氏后重试</text>
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
import { namingSystemEngineFactory } from '../../engine/NamingSystemEngine'
import { nameAnalysisEngine } from '../../engine/AnalysisEngine'
import { collectionManager } from '../../data/collectionSystem'

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
  return selectedName.value ? collectionManager.isCollected(selectedName.value.id) : false
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

function selectTemperament(name: string) {
  selectedTemperament.value = name
}

function selectSystem(systemId: NamingSystemType) {
  selectedSystemId.value = systemId
  showSystemSelection.value = false
  if (nameResults.value.length) generateNames()
}

function selectName(name: NameResult) {
  selectedName.value = name
}

function goBack() {
  selectedName.value = null
}

function toggleCollect() {
  if (selectedName.value) {
    if (collectionManager.isCollected(selectedName.value.id)) {
      collectionManager.remove(selectedName.value.id)
    } else {
      collectionManager.add({
        id: selectedName.value.id,
        surname: selectedName.value.surname,
        fullName: selectedName.value.fullName,
        systemId: selectedName.value.systemId,
        systemName: selectedName.value.systemName,
        temperament: selectedName.value.temperament,
        nameMeaning: selectedName.value.nameMeaning,
        overallMeaning: selectedName.value.overallMeaning,
        source: selectedName.value.source || '',
        poeticLine: selectedName.value.poeticLine,
        collectedAt: new Date().toISOString()
      })
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

function onSurnameChange() {
  if (nameResults.value.length && surname.value) {
    // 自动重新生成
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
  
  nameResults.value = Array.from({ length: 18 }, (_, index) => {
    const tempIndex = (index + generationSeed.value) % temperamentList.length
    const temp = temperamentList[tempIndex]
    
    try {
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
@import './index.scss';

// 分析项目样式
.analysis-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.analysis-label {
  font-size: 13px;
  font-weight: 500;
  color: #666;
  min-width: 60px;
}

.analysis-bar {
  flex: 1;
  height: 8px;
  background: #f0e8dc;
  border-radius: 4px;
  overflow: hidden;
}

.analysis-progress {
  height: 100%;
  background: linear-gradient(90deg, #d4a574 0%, #c9935f 100%);
  transition: width 0.3s ease;
}

.analysis-value {
  font-size: 12px;
  color: #999;
  min-width: 50px;
  text-align: right;
}
</style>
