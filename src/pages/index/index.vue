<template>
  <view class="page">
    <view v-if="selectedName" class="detail-panel">
      <button class="ghost-button" @click="selectedName = null">返回十八选</button>

      <view class="detail-card">
        <text class="detail-kicker">汉魏古法命名</text>
        <text class="detail-name">{{ selectedName.fullName }}</text>
        <text class="detail-courtesy">字 {{ selectedName.courtesyName }}</text>

        <view class="section">
          <text class="section-title">名解释</text>
          <text class="section-text">{{ selectedName.nameMeaning }}</text>
        </view>
        <view class="section">
          <text class="section-title">字解释</text>
          <text class="section-text">{{ selectedName.courtesyMeaning }}</text>
        </view>
        <view class="section">
          <text class="section-title">名字关系</text>
          <text class="section-text">{{ selectedName.relationship }}</text>
        </view>
        <view class="section highlight-section">
          <text class="section-title">整体寓意</text>
          <text class="section-text">{{ selectedName.overallMeaning }}</text>
        </view>
      </view>
    </view>

    <view v-else>
      <view class="hero-card">
        <text class="eyebrow">名以立志 · 字以明德</text>
        <text class="title">汉魏古法命名</text>
        <text class="subtitle">借东汉至三国士人命名传统，以规则引擎生成符合古典审美的「名 + 字」方案。</text>
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
              @click="gender = item"
            >
              {{ item }}
            </button>
          </view>
        </view>

        <view class="field">
          <text class="label">命名风格</text>
          <view class="style-grid">
            <button
              v-for="item in styles"
              :key="item"
              class="style-chip"
              :class="{ active: namingStyle === item }"
              @click="namingStyle = item"
            >
              {{ item }}
            </button>
          </view>
        </view>

        <button class="generate-button" @click="generateNames">生成名字</button>
        <text v-if="errorMessage" class="error">{{ errorMessage }}</text>
      </view>

      <view v-if="nameResults.length" class="results">
        <view class="results-head">
          <text class="results-title">十八组命名方案</text>
          <text class="results-tip">点击任一名字查看解释</text>
        </view>

        <view class="name-grid">
          <view v-for="item in nameResults" :key="item.id" class="name-card" @click="selectedName = item">
            <text class="full-name">{{ item.fullName }}</text>
            <text class="courtesy">字 {{ item.courtesyName }}</text>
            <text class="tag">{{ item.style }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Gender = '男' | '女'
type NamingStyle = '君子' | '弘毅' | '儒雅' | '武将' | '清雅' | '山水' | '魏晋'

type RuleTuple = [name: string, courtesy: string, nameMeaning: string, courtesyMeaning: string, relationship: string]

interface RuleEntry {
  name: string
  courtesy: string
  virtue: string
  nameMeaning: string
  courtesyMeaning: string
  relationship: string
}

interface NameResult extends RuleEntry {
  id: number
  surname: string
  style: NamingStyle
  fullName: string
  courtesyName: string
  overallMeaning: string
}

const styles: NamingStyle[] = ['君子', '弘毅', '儒雅', '武将', '清雅', '山水', '魏晋']
const genders: Gender[] = ['男', '女']

const surname = ref('')
const gender = ref<Gender>('男')
const namingStyle = ref<NamingStyle>('君子')
const nameResults = ref<NameResult[]>([])
const selectedName = ref<NameResult | null>(null)
const hasGenerated = ref(false)

const errorMessage = computed(() => {
  if (!hasGenerated.value) return ''
  if (!surname.value) return '请先输入姓氏'
  if (!/^[\u4e00-\u9fa5]{1,2}$/.test(surname.value)) return '姓氏建议输入一至两个汉字'
  return ''
})

const rawRuleLibrary: Record<NamingStyle, RuleTuple[]> = {
  君子: [
    ['修', '子敬', '修身立志，取君子自省之义', '子为美称，敬以持身，显谦恭有礼', '名言内修，字言外敬，内外相成'],
    ['端', '伯方', '端正其心，立身不偏', '伯有长德，方有正道，寓品行方直', '名取端凝，字取方正，皆归君子之道'],
    ['允', '仲信', '允为诚信可托', '仲信明其德行以信义为本', '名为可信，字申诚信，互相发明']
  ],
  弘毅: [
    ['毅', '季弘', '毅者果决坚忍，志不可夺', '弘为胸襟开阔，能任远道', '名取坚毅，字取弘远，合成任重道远之志'],
    ['远', '伯任', '远寓志向高远，不囿近利', '任为担当，伯任显可托大事', '名立远志，字明担当，志业相承'],
    ['卓', '子坚', '卓有不群之志', '坚为守正不移，子坚见其操守', '名言卓立，字言坚守，刚健相济']
  ],
  儒雅: [
    ['文', '子章', '文取礼乐文章，温润有度', '章为文采彰明，亦有法度', '名以文德立基，字以章采发明'],
    ['雅', '伯雍', '雅为高洁合礼，远离俗尘', '雍有和穆从容之象', '名言雅正，字言雍和，见儒者风度'],
    ['谦', '仲和', '谦为退让不伐之德', '和为中和温厚，处世有节', '名取谦德，字取和气，德性相辅']
  ],
  武将: [
    ['昭', '子烈', '昭为光明显著，军令昭然', '烈有壮烈刚正之气', '名示明断，字示勇烈，文武兼具'],
    ['峻', '伯威', '峻取山势高峻，喻气节刚劲', '威为威仪与军略之盛', '名言峻节，字言威重，适合将略之风'],
    ['策', '仲武', '策为筹谋决断', '武为果敢用兵，亦寓护民', '名取谋略，字取武德，智勇相成']
  ],
  清雅: [
    ['清', '子澄', '清为心地澄明，不染尘俗', '澄为水静而明，照见本心', '名与字皆取清澈之象，层层递进'],
    ['素', '伯仪', '素为质朴洁白，守本真', '仪为容止有度，风采可观', '名重本色，字重仪度，朴雅相宜'],
    ['宁', '仲安', '宁为安定从容，心无躁竞', '安为守静处和，福履绵长', '名言心宁，字言身安，由内及外']
  ],
  山水: [
    ['岱', '子岳', '岱指泰山，取厚重高远', '岳为名山大镇，象征气象端严', '名为山宗，字为岳镇，山岳之意相互映照'],
    ['渊', '伯深', '渊为深水，寓学养深厚', '深承渊意，见沉静含蓄', '名取渊涵，字取深厚，一脉相承'],
    ['林', '仲泉', '林有生生不息之象', '泉为活水清源，寓灵动不竭', '名取林木，字取泉源，山水相生']
  ],
  魏晋: [
    ['玄', '子微', '玄取幽远深思，近魏晋清谈之风', '微为精妙入理，含蓄不尽', '名言玄远，字言精微，显高致'],
    ['朗', '伯达', '朗为明净旷达', '达为通达不滞，胸次开阔', '名取朗然，字取通达，见魏晋风流'],
    ['逸', '仲简', '逸为超然自得，不拘凡近', '简为简约有度，去繁存真', '名言逸兴，字言简淡，萧散而有法']
  ]
}

const ruleLibrary: Record<NamingStyle, RuleEntry[]> = Object.fromEntries(
  Object.entries(rawRuleLibrary).map(([style, rules]) => [
    style,
    rules.map(([name, courtesy, nameMeaning, courtesyMeaning, relationship]) => ({
      name,
      courtesy,
      virtue: style,
      nameMeaning,
      courtesyMeaning,
      relationship
    }))
  ])
) as Record<NamingStyle, RuleEntry[]>

function generateNames() {
  hasGenerated.value = true
  if (!surname.value || !/^[\u4e00-\u9fa5]{1,2}$/.test(surname.value)) {
    nameResults.value = []
    return
  }

  const preferred = ruleLibrary[namingStyle.value]
  const expandedRules = [...preferred, ...styles.filter((style) => style !== namingStyle.value).flatMap((style) => ruleLibrary[style])]
  const genderSuffix = gender.value === '女' ? ['婉', '令', '徽'] : ['之', '元', '景']

  nameResults.value = Array.from({ length: 18 }, (_, index) => {
    const base = expandedRules[index % expandedRules.length]
    const suffix = index >= expandedRules.length ? genderSuffix[index % genderSuffix.length] : ''
    const givenName = `${base.name}${suffix}`
    const courtesy = suffix ? `${base.courtesy.slice(0, 1)}${suffix}${base.courtesy.slice(1)}` : base.courtesy

    return {
      ...base,
      id: index + 1,
      surname: surname.value,
      style: index < preferred.length ? namingStyle.value : styles.find((style) => ruleLibrary[style].includes(base)) || namingStyle.value,
      name: givenName,
      courtesy,
      fullName: `${surname.value}${givenName}`,
      courtesyName: courtesy,
      overallMeaning: `${surname.value}${givenName}，字${courtesy}。此组以「${base.virtue}」为核心，遵循名以立志、字以明德：名立其志向，字申其德行，适合偏好${namingStyle.value}风格且重视汉魏古典气象的现代命名。`
    }
  })
}
</script>

<style>
page {
  background: #f5efe4;
}

.page {
  min-height: 100vh;
  padding: 36rpx 28rpx 64rpx;
  box-sizing: border-box;
  color: #352315;
  background: linear-gradient(180deg, #efe0c7 0%, #f8f3ea 44%, #f5efe4 100%);
}

.hero-card,
.form-card,
.detail-card,
.name-card {
  border: 2rpx solid rgba(111, 72, 35, 0.14);
  background: rgba(255, 252, 246, 0.9);
  box-shadow: 0 18rpx 44rpx rgba(95, 61, 28, 0.12);
}

.hero-card {
  padding: 48rpx 36rpx;
  border-radius: 36rpx;
}

.eyebrow,
.detail-kicker,
.tag {
  color: #9b6a34;
  letter-spacing: 4rpx;
  font-size: 24rpx;
}

.title {
  display: block;
  margin-top: 18rpx;
  font-size: 58rpx;
  line-height: 1.1;
  font-weight: 700;
}

.subtitle {
  display: block;
  margin-top: 24rpx;
  color: #735a43;
  font-size: 28rpx;
  line-height: 1.8;
}

.form-card,
.results,
.detail-card {
  margin-top: 28rpx;
}

.form-card,
.detail-card {
  padding: 32rpx;
  border-radius: 30rpx;
}

.field + .field {
  margin-top: 30rpx;
}

.label,
.section-title,
.results-title {
  display: block;
  font-weight: 700;
  font-size: 30rpx;
}

.input {
  margin-top: 16rpx;
  height: 88rpx;
  padding: 0 24rpx;
  border-radius: 18rpx;
  background: #f6ead8;
  font-size: 32rpx;
}

.segmented,
.style-grid,
.name-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 16rpx;
}

.segment,
.style-chip,
.generate-button,
.ghost-button {
  margin: 0;
  border-radius: 999rpx;
  border: 2rpx solid #c9a474;
  background: #fffaf1;
  color: #6e4724;
  font-size: 28rpx;
  line-height: 2.5;
}

.segment {
  flex: 1;
}

.style-chip {
  min-width: 140rpx;
  padding: 0 18rpx;
}

.segment.active,
.style-chip.active,
.generate-button {
  background: #7a4b22;
  color: #fff8ed;
  border-color: #7a4b22;
}

.generate-button {
  width: 100%;
  margin-top: 38rpx;
  font-weight: 700;
}

.error {
  display: block;
  margin-top: 18rpx;
  color: #b34836;
  text-align: center;
}

.results-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 8rpx 4rpx 18rpx;
}

.results-tip {
  color: #8c7259;
  font-size: 24rpx;
}

.name-card {
  width: calc(50% - 8rpx);
  padding: 26rpx;
  border-radius: 24rpx;
  box-sizing: border-box;
}

.full-name,
.detail-name {
  display: block;
  font-weight: 700;
  color: #2e1d10;
}

.full-name {
  font-size: 38rpx;
}

.courtesy,
.detail-courtesy {
  display: block;
  margin-top: 10rpx;
  color: #7d5a38;
  font-size: 26rpx;
}

.tag {
  display: block;
  margin-top: 20rpx;
  font-size: 22rpx;
}

.detail-panel {
  padding-top: 12rpx;
}

.ghost-button {
  display: inline-block;
  padding: 0 30rpx;
}

.detail-name {
  margin-top: 18rpx;
  font-size: 68rpx;
}

.detail-courtesy {
  font-size: 34rpx;
}

.section {
  margin-top: 30rpx;
  padding-top: 28rpx;
  border-top: 2rpx solid rgba(122, 75, 34, 0.12);
}

.section-text {
  display: block;
  margin-top: 12rpx;
  color: #604832;
  font-size: 28rpx;
  line-height: 1.75;
}

.highlight-section {
  padding: 26rpx;
  border-radius: 24rpx;
  background: #f6ead8;
  border-top: 0;
}
</style>
