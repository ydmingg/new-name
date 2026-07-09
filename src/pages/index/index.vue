<template>
  <view class="page">
    <view v-if="selectedName" class="detail-panel">
      <button class="ghost-button" @click="selectedName = null">返回十八选</button>

      <view class="detail-card">
        <text class="detail-kicker">汉魏古法命名</text>
        <text class="detail-name">{{ selectedName.fullName }}</text>
        <text class="detail-pinyin">{{ selectedName.fullNamePinyin }}</text>
        <text class="detail-courtesy">字 {{ selectedName.courtesyName }}</text>
        <text class="detail-pinyin">{{ selectedName.courtesyPinyin }}</text>

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
        <text class="title">华夏命名</text>
        <text class="mode-title">汉魏古法命名</text>
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
              @click="selectGender(item)"
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

        <button class="generate-button" @click="generateNames">{{ nameResults.length ? '重新生成' : '生成名字' }}</button>
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
            <text class="pinyin">{{ item.fullNamePinyin }}</text>
            <text class="courtesy">字 {{ item.courtesyName }}</text>
            <text class="pinyin">{{ item.courtesyPinyin }}</text>
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
type NamingStyle =
  | '君子'
  | '弘毅'
  | '儒雅'
  | '文臣'
  | '武将'
  | '山岳'
  | '经世'
  | '隐士'
  | '淑雅'
  | '兰芷'
  | '静仪'
  | '清婉'
  | '知书'
  | '柔嘉'
  | '令仪'
  | '明慧'

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
  fullNamePinyin: string
  courtesyName: string
  courtesyPinyin: string
  overallMeaning: string
}

const genderStyleMap: Record<Gender, NamingStyle[]> = {
  男: ['君子', '弘毅', '儒雅', '文臣', '武将', '山岳', '经世', '隐士'],
  女: ['淑雅', '兰芷', '静仪', '清婉', '知书', '柔嘉', '令仪', '明慧']
}
const genders: Gender[] = ['男', '女']

const surname = ref('')
const gender = ref<Gender>('男')
const namingStyle = ref<NamingStyle>('君子')
const nameResults = ref<NameResult[]>([])
const selectedName = ref<NameResult | null>(null)
const hasGenerated = ref(false)
const generationSeed = ref(0)

const styles = computed(() => genderStyleMap[gender.value])

const errorMessage = computed(() => {
  if (!hasGenerated.value) return ''
  if (!surname.value) return '请先输入姓氏'
  if (!/^[\u4e00-\u9fa5]{1,2}$/.test(surname.value)) return '姓氏建议输入一至两个汉字'
  return ''
})

const rawRuleLibrary: Record<NamingStyle, RuleTuple[]> = {
  君子: [['修', '子敬', '修身立志，取君子自省之义', '子为美称，敬以持身，显谦恭有礼', '名言内修，字言外敬，内外相成'], ['端', '伯方', '端正其心，立身不偏', '伯有长德，方有正道，寓品行方直', '名取端凝，字取方正，皆归君子之道'], ['允', '仲信', '允为诚信可托', '仲信明其德行以信义为本', '名为可信，字申诚信，互相发明']],
  弘毅: [['毅', '季弘', '毅者果决坚忍，志不可夺', '弘为胸襟开阔，能任远道', '名取坚毅，字取弘远，合成任重道远之志'], ['远', '伯任', '远寓志向高远，不囿近利', '任为担当，伯任显可托大事', '名立远志，字明担当，志业相承'], ['卓', '子坚', '卓有不群之志', '坚为守正不移，子坚见其操守', '名言卓立，字言坚守，刚健相济']],
  儒雅: [['文', '子章', '文取礼乐文章，温润有度', '章为文采彰明，亦有法度', '名以文德立基，字以章采发明'], ['雅', '伯雍', '雅为高洁合礼，远离俗尘', '雍有和穆从容之象', '名言雅正，字言雍和，见儒者风度'], ['谦', '仲和', '谦为退让不伐之德', '和为中和温厚，处世有节', '名取谦德，字取和气，德性相辅']],
  文臣: [['章', '子典', '章有典章制度之义', '典为经国成法，见文臣治世之才', '名重文采，字重典制'], ['衡', '伯平', '衡为权衡天下', '平为持中致治', '名言裁断，字言平正'], ['辅', '仲弼', '辅为辅国安民', '弼为匡正辅佐', '名与字同归佐治']],
  武将: [['昭', '子烈', '昭为光明显著，军令昭然', '烈有壮烈刚正之气', '名示明断，字示勇烈，文武兼具'], ['峻', '伯威', '峻取山势高峻，喻气节刚劲', '威为威仪与军略之盛', '名言峻节，字言威重，适合将略之风'], ['策', '仲武', '策为筹谋决断', '武为果敢用兵，亦寓护民', '名取谋略，字取武德，智勇相成']],
  山岳: [['岱', '子岳', '岱指泰山，取厚重高远', '岳为名山大镇，象征气象端严', '名为山宗，字为岳镇'], ['峦', '伯嵩', '峦为层山连绵', '嵩为中岳高峻', '名言山势，字言高标'], ['岳', '仲岑', '岳为高山大镇', '岑为山高而静', '名取雄镇，字取静峻']],
  经世: [['济', '子民', '济有济世安民之志', '民为立政之本', '名言事业，字明所归'], ['安', '伯治', '安为安邦定众', '治为经世有方', '名言目标，字言方法'], ['康', '仲宁', '康为民物康阜', '宁为天下安宁', '名与字皆归治世']],
  隐士: [['逸', '子闲', '逸为超然自得', '闲为从容不竞', '名言高致，字言心境'], ['玄', '伯微', '玄取幽远深思', '微为精妙入理', '名言玄远，字言精微'], ['林', '仲泉', '林有栖隐之象', '泉为山中清源', '名取隐居，字取清流']],
  淑雅: [['淑', '令仪', '淑为善美温雅', '令仪为美好仪范', '名言德性，字言仪度'], ['娴', '静姝', '娴为从容雅正', '静姝为安静美好', '名取雅训，字取静美'], ['婉', '柔嘉', '婉为温婉有节', '柔嘉为柔和善美', '名与字相互申发']],
  兰芷: [['兰', '清芷', '兰为幽芳高洁', '芷为香草清芬', '名与字皆取芳草之德'], ['芷', '兰仪', '芷有清芬之义', '兰仪见幽雅风致', '香草互文，清雅相成'], ['蕙', '芳仪', '蕙为香草，寓贤淑', '芳仪为德容并美', '名言芳德，字言仪范']],
  静仪: [['静', '令容', '静为安定端凝', '令容为美好容止', '名言心性，字言仪容'], ['仪', '安贞', '仪为礼度容止', '安贞为安静守正', '名取外仪，字取内德'], ['贞', '静和', '贞为坚正', '静和为安宁和穆', '名重操守，字重气象']],
  清婉: [['清', '婉仪', '清为澄明洁净', '婉仪为温婉有度', '名言清德，字言婉容'], ['婉', '清和', '婉为柔顺有节', '清和为清正和雅', '名与字清婉相承'], ['澄', '柔清', '澄为明净', '柔清为温柔清正', '名言明澈，字言柔美']],
  知书: [['书', '明章', '书为学问典籍', '明章为文理彰明', '名言学养，字言文采'], ['知', '令文', '知为明达通理', '令文为美好文德', '名取明智，字取文雅'], ['慧', '文仪', '慧为聪敏', '文仪为文雅有度', '名言才慧，字言仪范']],
  柔嘉: [['柔', '嘉言', '柔为温和坚韧', '嘉言为善言美德', '名言性情，字言德声'], ['嘉', '柔则', '嘉为善美', '柔则为温和有法', '名言美德，字言准则'], ['和', '嘉柔', '和为中和', '嘉柔为善美温柔', '名与字互为补足']],
  令仪: [['令', '淑仪', '令为美善', '淑仪为善美仪范', '名言美质，字言礼容'], ['仪', '令德', '仪为容止法度', '令德为美好德行', '名言仪范，字言德本'], ['容', '令则', '容为容止从容', '令则为美好准则', '名取容仪，字取法度']],
  明慧: [['明', '慧然', '明为通达昭亮', '慧然为聪慧明澈', '名言明达，字言慧悟'], ['慧', '昭仪', '慧为聪敏明识', '昭仪为明美仪范', '名取才慧，字取昭明'], ['昭', '明慧', '昭为光明显著', '明慧为聪敏通达', '名与字光明相映']]
}

const ruleLibrary: Record<NamingStyle, RuleEntry[]> = Object.fromEntries(
  Object.entries(rawRuleLibrary).map(([style, rules]) => [
    style,
    rules.map(([name, courtesy, nameMeaning, courtesyMeaning, relationship]) => ({ name, courtesy, virtue: style, nameMeaning, courtesyMeaning, relationship }))
  ])
) as Record<NamingStyle, RuleEntry[]>

const pinyinMap: Record<string, string> = {
  张: 'zhang', 王: 'wang', 李: 'li', 赵: 'zhao', 陈: 'chen', 刘: 'liu', 杨: 'yang', 黄: 'huang', 周: 'zhou', 吴: 'wu', 徐: 'xu', 孙: 'sun', 胡: 'hu', 朱: 'zhu', 高: 'gao', 林: 'lin', 何: 'he', 郭: 'guo', 马: 'ma', 罗: 'luo', 梁: 'liang', 宋: 'song', 郑: 'zheng', 谢: 'xie', 韩: 'han', 唐: 'tang', 冯: 'feng', 于: 'yu', 董: 'dong', 萧: 'xiao', 程: 'cheng', 曹: 'cao', 袁: 'yuan', 邓: 'deng', 许: 'xu', 傅: 'fu', 沈: 'shen', 曾: 'zeng', 彭: 'peng', 吕: 'lv', 苏: 'su', 卢: 'lu', 蒋: 'jiang', 蔡: 'cai', 贾: 'jia', 丁: 'ding', 魏: 'wei', 薛: 'xue', 叶: 'ye', 阎: 'yan', 余: 'yu', 潘: 'pan', 杜: 'du', 戴: 'dai', 夏: 'xia', 钟: 'zhong', 汪: 'wang', 田: 'tian', 任: 'ren', 姜: 'jiang', 范: 'fan', 方: 'fang', 石: 'shi', 姚: 'yao', 谭: 'tan', 廖: 'liao', 邹: 'zou', 熊: 'xiong', 金: 'jin', 陆: 'lu', 郝: 'hao', 孔: 'kong', 白: 'bai', 崔: 'cui', 康: 'kang', 毛: 'mao', 邱: 'qiu', 秦: 'qin', 江: 'jiang', 史: 'shi', 顾: 'gu', 侯: 'hou', 邵: 'shao', 孟: 'meng', 龙: 'long', 万: 'wan', 段: 'duan', 雷: 'lei', 钱: 'qian', 汤: 'tang', 尹: 'yin', 易: 'yi', 黎: 'li', 常: 'chang', 武: 'wu', 乔: 'qiao', 贺: 'he', 赖: 'lai', 龚: 'gong', 文: 'wen', 修: 'xiu', 端: 'duan', 允: 'yun', 毅: 'yi', 远: 'yuan', 卓: 'zhuo', 雅: 'ya', 谦: 'qian', 昭: 'zhao', 峻: 'jun', 策: 'ce', 章: 'zhang', 衡: 'heng', 辅: 'fu', 岱: 'dai', 峦: 'luan', 岳: 'yue', 济: 'ji', 安: 'an', 逸: 'yi', 玄: 'xuan', 淑: 'shu', 娴: 'xian', 婉: 'wan', 兰: 'lan', 芷: 'zhi', 蕙: 'hui', 静: 'jing', 仪: 'yi', 贞: 'zhen', 清: 'qing', 澄: 'cheng', 书: 'shu', 知: 'zhi', 慧: 'hui', 柔: 'rou', 嘉: 'jia', 和: 'he', 令: 'ling', 容: 'rong', 子: 'zi', 敬: 'jing', 伯: 'bo', 仲: 'zhong', 信: 'xin', 季: 'ji', 弘: 'hong', 坚: 'jian', 雍: 'yong', 烈: 'lie', 威: 'wei', 典: 'dian', 平: 'ping', 弼: 'bi', 嵩: 'song', 岑: 'cen', 民: 'min', 治: 'zhi', 宁: 'ning', 闲: 'xian', 微: 'wei', 泉: 'quan', 姝: 'shu', 芳: 'fang', 德: 'de', 则: 'ze', 言: 'yan', 然: 'ran', 明: 'ming', 之: 'zhi', 元: 'yuan', 景: 'jing', 徽: 'hui', 达: 'da', 简: 'jian', 深: 'shen', 渊: 'yuan', 朗: 'lang', 素: 'su'
}

function toPinyin(value: string) {
  return Array.from(value).map((item) => pinyinMap[item] || item).join(' ')
}

function selectGender(item: Gender) {
  gender.value = item
  namingStyle.value = genderStyleMap[item][0]
  selectedName.value = null
  if (nameResults.value.length) generateNames()
}

function rotateRules(entries: RuleEntry[]) {
  const offset = generationSeed.value % entries.length
  return [...entries.slice(offset), ...entries.slice(0, offset)]
}

function generateNames() {
  hasGenerated.value = true
  generationSeed.value += 1
  if (!surname.value || !/^[\u4e00-\u9fa5]{1,2}$/.test(surname.value)) {
    nameResults.value = []
    return
  }

  const preferred = rotateRules(ruleLibrary[namingStyle.value])
  const allGenderStyles = styles.value
  const expandedRules = [...preferred, ...allGenderStyles.filter((style) => style !== namingStyle.value).flatMap((style) => rotateRules(ruleLibrary[style]))]
  const genderSuffix = gender.value === '女' ? ['婉', '令', '徽', '仪', '宁', '嘉'] : ['之', '元', '景', '远', '安', '修']

  nameResults.value = Array.from({ length: 18 }, (_, index) => {
    const base = expandedRules[index % expandedRules.length]
    const suffix = index >= expandedRules.length ? genderSuffix[(index + generationSeed.value) % genderSuffix.length] : ''
    const givenName = `${base.name}${suffix}`
    const courtesy = suffix ? `${base.courtesy}${suffix}` : base.courtesy
    const fullName = `${surname.value}${givenName}`
    const resultStyle = allGenderStyles.find((style) => ruleLibrary[style].some((item) => item.name === base.name && item.courtesy === base.courtesy)) || namingStyle.value

    return {
      ...base,
      id: generationSeed.value * 100 + index + 1,
      surname: surname.value,
      style: index < preferred.length ? namingStyle.value : resultStyle,
      name: givenName,
      courtesy,
      fullName,
      fullNamePinyin: toPinyin(fullName),
      courtesyName: courtesy,
      courtesyPinyin: toPinyin(courtesy),
      overallMeaning: `${fullName}，字${courtesy}。此组以「${base.virtue}」为核心，遵循名以立志、字以明德：名立其志向，字申其德行，适合偏好${namingStyle.value}风格且重视汉魏古典气象的现代命名。`
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

.mode-title {
  display: block;
  margin-top: 12rpx;
  color: #7d5a38;
  font-size: 32rpx;
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
.pinyin,
.detail-pinyin,
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

.pinyin,
.detail-pinyin {
  color: #9b6a34;
  letter-spacing: 1rpx;
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
