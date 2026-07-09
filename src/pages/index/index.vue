<template>
  <view class="page">
    <view v-if="selectedName" class="detail-panel">
      <button class="ghost-button" @click="selectedName = null">返回十八选</button>

      <view class="detail-card">
        <text class="detail-kicker">华夏命名 · 汉魏古法</text>
        <text class="detail-name">{{ selectedName.fullName }}</text>
        <text class="pinyin">{{ selectedName.fullNamePinyin }}</text>
        <text class="detail-courtesy">字 {{ selectedName.courtesyName }}</text>
        <text class="pinyin">{{ selectedName.courtesyPinyin }}</text>

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
        <text class="eyebrow">当前模块 · 汉魏古法命名</text>
        <text class="title">华夏命名</text>
        <text class="subtitle">借东汉至三国士人命名传统，以规则引擎生成符合古典审美的「名 + 字」方案。名以立志，字以明德。</text>
      </view>

      <view class="form-card">
        <view class="field">
          <text class="label">姓氏</text>
          <input v-model.trim="surname" class="input" maxlength="2" placeholder="请输入姓氏，如：张" />
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
              v-for="item in currentStyles"
              :key="item"
              class="style-chip"
              :class="{ active: namingStyle === item }"
              @click="selectStyle(item)"
            >
              {{ item }}
            </button>
          </view>
        </view>

        <button class="generate-button" @click="generateNames">{{ nameResults.length ? '重新生成一批' : '生成名字' }}</button>
        <text v-if="errorMessage" class="error">{{ errorMessage }}</text>
      </view>

      <view v-if="nameResults.length" class="results">
        <view class="results-head">
          <view>
            <text class="results-title">十八组命名方案</text>
            <text class="results-tip">{{ gender }} · {{ namingStyle }} · 第 {{ batchIndex }} 批</text>
          </view>
          <button class="small-button" @click="generateNames">换一批</button>
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
type MaleStyle = '君子' | '弘毅' | '儒雅' | '文臣' | '武将' | '山岳' | '经世' | '隐士'
type FemaleStyle = '淑雅' | '兰芷' | '静仪' | '清婉' | '知书' | '柔嘉' | '令仪' | '明慧'
type NamingStyle = MaleStyle | FemaleStyle

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
  id: string
  surname: string
  style: NamingStyle
  fullName: string
  fullNamePinyin: string
  courtesyName: string
  courtesyPinyin: string
  overallMeaning: string
}

const maleStyles: MaleStyle[] = ['君子', '弘毅', '儒雅', '文臣', '武将', '山岳', '经世', '隐士']
const femaleStyles: FemaleStyle[] = ['淑雅', '兰芷', '静仪', '清婉', '知书', '柔嘉', '令仪', '明慧']
const genders: Gender[] = ['男', '女']

const surname = ref('')
const gender = ref<Gender>('男')
const namingStyle = ref<NamingStyle>('君子')
const nameResults = ref<NameResult[]>([])
const selectedName = ref<NameResult | null>(null)
const hasGenerated = ref(false)
const batchIndex = ref(0)

const currentStyles = computed<NamingStyle[]>(() => (gender.value === '男' ? maleStyles : femaleStyles))

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
  文臣: [
    ['谟', '子猷', '谟为谋议经邦，寓筹策有方', '猷为大道与谋略，显文臣经画之才', '名取庙堂之谋，字申经国之猷'],
    ['肃', '伯明', '肃为端整持重，临事不苟', '明为洞察事理，断案清通', '名重官箴，字重明达，适合文臣气象'],
    ['衡', '仲平', '衡为权衡轻重，处事得中', '平为公正无私，政声平允', '名言裁量，字言公正，合为治世之才']
  ],
  武将: [
    ['昭', '子烈', '昭为光明显著，军令昭然', '烈有壮烈刚正之气', '名示明断，字示勇烈，文武兼具'],
    ['峻', '伯威', '峻取山势高峻，喻气节刚劲', '威为威仪与军略之盛', '名言峻节，字言威重，适合将略之风'],
    ['策', '仲武', '策为筹谋决断', '武为果敢用兵，亦寓护民', '名取谋略，字取武德，智勇相成']
  ],
  山岳: [
    ['岱', '子岳', '岱指泰山，取厚重高远', '岳为名山大镇，象征气象端严', '名为山宗，字为岳镇，山岳之意相互映照'],
    ['嵩', '伯镇', '嵩为高山峻极，寓志节高标', '镇为安定四方，有持重之德', '名取高峻，字取镇定，山岳气象贯通'],
    ['岩', '仲坚', '岩为石骨嶙峋，坚而不移', '坚承岩意，显操守不改', '名言风骨，字言坚贞，刚正相承']
  ],
  经世: [
    ['济', '子通', '济为济世利民，志在有成', '通为通达政理，能贯百务', '名取济世，字取通变，经世之义明晰'],
    ['佐', '伯辅', '佐为辅佐王事，成就大业', '辅为辅弼匡正，德才可托', '名与字皆明辅世之责'],
    ['治', '仲理', '治为治理有方，秩序井然', '理为条理分明，平衡人事', '名言治功，字言理法，适合经世风格']
  ],
  隐士: [
    ['玄', '子微', '玄取幽远深思，近魏晋清谈之风', '微为精妙入理，含蓄不尽', '名言玄远，字言精微，显高致'],
    ['逸', '仲简', '逸为超然自得，不拘凡近', '简为简约有度，去繁存真', '名言逸兴，字言简淡，萧散而有法'],
    ['泉', '伯隐', '泉为山中活水，清而不竭', '隐为守志林泉，不慕浮华', '名取清源，字取隐德，归于高蹈之趣']
  ],
  淑雅: [
    ['淑', '令仪', '淑为善美温和，内德充盈', '令仪为美好仪范，见端庄可法', '名言淑德，字言仪范，德容相应'],
    ['雅', '婉仪', '雅为高洁合礼，不随俗流', '婉仪为温婉有度，举止从容', '名取雅正，字取婉仪，清贵而温厚'],
    ['娴', '静和', '娴为娴雅明礼，处事有方', '静和为安静中和，心气平舒', '名重才度，字重性情，内外兼美']
  ],
  兰芷: [
    ['兰', '芳若', '兰为幽芳之草，寓品格清芬', '芳若承兰芷之香，含蓄有致', '名以兰质立品，字以芳若申其香德'],
    ['芷', '令芳', '芷为香草，象征洁净芳馨', '令芳为美善声名，德泽可闻', '名取香草，字取芳名，香德相承'],
    ['蕙', '兰心', '蕙为蕙质兰心，清芬有节', '兰心言心性高洁，聪慧温良', '名与字同归兰蕙之美']
  ],
  静仪: [
    ['静', '安仪', '静为心定神宁，不躁不竞', '安仪为安然有仪，容止合礼', '名言内静，字言外仪，由心及行'],
    ['宁', '令容', '宁为安宁从容，心有定力', '令容为美好容止，温然可亲', '名取宁定，字取容仪，静雅相成'],
    ['仪', '子端', '仪为礼度与风范', '子端为端庄守正，见其品行', '名重仪度，字重端正，皆归静雅']
  ],
  清婉: [
    ['清', '婉如', '清为澄澈洁净，心地明朗', '婉如为温婉如玉，柔中有度', '名取清澈，字取婉顺，清而不寒'],
    ['婉', '清扬', '婉为柔和有礼，言行得体', '清扬为神采清明，风姿舒展', '名言婉德，字言清扬，气质相发'],
    ['澄', '若水', '澄为澄明不浊，心境平和', '若水为如水柔静，善利不争', '名与字皆取水德，清婉自然']
  ],
  知书: [
    ['书', '明章', '书为诗书礼学，寓知礼有文', '明章为文理彰明，才识可见', '名取书香，字取章明，知书达礼'],
    ['文', '知礼', '文为文章与礼乐之教', '知礼为通晓礼度，进退有节', '名重文采，字重礼法，书卷气浓'],
    ['敏', '慧章', '敏为聪敏好学，反应明捷', '慧章为才慧外显，文采有章', '名言敏学，字言慧文，才德兼具']
  ],
  柔嘉: [
    ['柔', '嘉言', '柔为柔顺有韧，非弱而有节', '嘉言为美善之言，温厚可亲', '名取柔德，字取嘉言，言行皆美'],
    ['嘉', '柔则', '嘉为美善可喜，德声温润', '柔则为柔中有法，合乎礼度', '名言善美，字言柔则，德范分明'],
    ['温', '令善', '温为温厚平和，待人有礼', '令善为美善之德，令人亲近', '名取温润，字取善德，柔嘉相济']
  ],
  令仪: [
    ['令', '淑仪', '令为美善可嘉，声名清正', '淑仪为善美仪范，举止端雅', '名以令德开端，字以淑仪成形'],
    ['容', '令则', '容为容止端庄，气度和雅', '令则为美好法则，足为仪范', '名取容仪，字取令则，内外合礼'],
    ['端', '美仪', '端为端正自持，不偏不倚', '美仪为仪态美善，风度可观', '名言端方，字言仪美，庄雅相承']
  ],
  明慧: [
    ['明', '慧心', '明为明达清朗，识见不昧', '慧心为聪慧之心，知微见著', '名言明识，字言慧心，智慧相照'],
    ['慧', '昭文', '慧为聪慧颖悟，学有所成', '昭文为文采昭明，才情外显', '名取慧悟，字取文采，明慧兼备'],
    ['昭', '明若', '昭为光明显著，气象清朗', '明若为明净若玉，澄澈可亲', '名与字互申光明清慧之意']
  ]
}

const pinyinMap = Object.fromEntries(
  [
    ['张', 'zhang'],
    ['王', 'wang'],
    ['李', 'li'],
    ['赵', 'zhao'],
    ['陈', 'chen'],
    ['刘', 'liu'],
    ['杨', 'yang'],
    ['黄', 'huang'],
    ['周', 'zhou'],
    ['吴', 'wu'],
    ['徐', 'xu'],
    ['孙', 'sun'],
    ['胡', 'hu'],
    ['朱', 'zhu'],
    ['高', 'gao'],
    ['林', 'lin'],
    ['何', 'he'],
    ['郭', 'guo'],
    ['马', 'ma'],
    ['罗', 'luo'],
    ['梁', 'liang'],
    ['宋', 'song'],
    ['郑', 'zheng'],
    ['谢', 'xie'],
    ['韩', 'han'],
    ['唐', 'tang'],
    ['冯', 'feng'],
    ['于', 'yu'],
    ['董', 'dong'],
    ['萧', 'xiao'],
    ['程', 'cheng'],
    ['曹', 'cao'],
    ['袁', 'yuan'],
    ['邓', 'deng'],
    ['许', 'xu'],
    ['傅', 'fu'],
    ['沈', 'shen'],
    ['曾', 'zeng'],
    ['彭', 'peng'],
    ['吕', 'lv'],
    ['苏', 'su'],
    ['卢', 'lu'],
    ['蒋', 'jiang'],
    ['蔡', 'cai'],
    ['贾', 'jia'],
    ['丁', 'ding'],
    ['魏', 'wei'],
    ['薛', 'xue'],
    ['叶', 'ye'],
    ['阎', 'yan'],
    ['余', 'yu'],
    ['潘', 'pan'],
    ['杜', 'du'],
    ['戴', 'dai'],
    ['夏', 'xia'],
    ['钟', 'zhong'],
    ['汪', 'wang'],
    ['田', 'tian'],
    ['任', 'ren'],
    ['姜', 'jiang'],
    ['范', 'fan'],
    ['方', 'fang'],
    ['石', 'shi'],
    ['姚', 'yao'],
    ['谭', 'tan'],
    ['廖', 'liao'],
    ['邹', 'zou'],
    ['熊', 'xiong'],
    ['金', 'jin'],
    ['陆', 'lu'],
    ['郝', 'hao'],
    ['孔', 'kong'],
    ['白', 'bai'],
    ['崔', 'cui'],
    ['康', 'kang'],
    ['毛', 'mao'],
    ['邱', 'qiu'],
    ['秦', 'qin'],
    ['江', 'jiang'],
    ['史', 'shi'],
    ['顾', 'gu'],
    ['侯', 'hou'],
    ['邵', 'shao'],
    ['孟', 'meng'],
    ['龙', 'long'],
    ['万', 'wan'],
    ['段', 'duan'],
    ['雷', 'lei'],
    ['钱', 'qian'],
    ['汤', 'tang'],
    ['尹', 'yin'],
    ['黎', 'li'],
    ['易', 'yi'],
    ['常', 'chang'],
    ['武', 'wu'],
    ['乔', 'qiao'],
    ['贺', 'he'],
    ['赖', 'lai'],
    ['龚', 'gong'],
    ['文', 'wen'],
    ['修', 'xiu'],
    ['端', 'duan'],
    ['允', 'yun'],
    ['毅', 'yi'],
    ['远', 'yuan'],
    ['卓', 'zhuo'],
    ['雅', 'ya'],
    ['谦', 'qian'],
    ['谟', 'mo'],
    ['肃', 'su'],
    ['衡', 'heng'],
    ['昭', 'zhao'],
    ['峻', 'jun'],
    ['策', 'ce'],
    ['岱', 'dai'],
    ['嵩', 'song'],
    ['岩', 'yan'],
    ['济', 'ji'],
    ['佐', 'zuo'],
    ['治', 'zhi'],
    ['玄', 'xuan'],
    ['逸', 'yi'],
    ['泉', 'quan'],
    ['淑', 'shu'],
    ['娴', 'xian'],
    ['兰', 'lan'],
    ['芷', 'zhi'],
    ['蕙', 'hui'],
    ['静', 'jing'],
    ['宁', 'ning'],
    ['仪', 'yi'],
    ['清', 'qing'],
    ['婉', 'wan'],
    ['澄', 'cheng'],
    ['书', 'shu'],
    ['敏', 'min'],
    ['慧', 'hui'],
    ['柔', 'rou'],
    ['嘉', 'jia'],
    ['温', 'wen'],
    ['令', 'ling'],
    ['容', 'rong'],
    ['明', 'ming'],
    ['子', 'zi'],
    ['敬', 'jing'],
    ['伯', 'bo'],
    ['方', 'fang'],
    ['仲', 'zhong'],
    ['信', 'xin'],
    ['季', 'ji'],
    ['弘', 'hong'],
    ['任', 'ren'],
    ['坚', 'jian'],
    ['章', 'zhang'],
    ['雍', 'yong'],
    ['和', 'he'],
    ['猷', 'you'],
    ['平', 'ping'],
    ['烈', 'lie'],
    ['威', 'wei'],
    ['岳', 'yue'],
    ['镇', 'zhen'],
    ['通', 'tong'],
    ['辅', 'fu'],
    ['理', 'li'],
    ['微', 'wei'],
    ['简', 'jian'],
    ['隐', 'yin'],
    ['若', 'ruo'],
    ['芳', 'fang'],
    ['心', 'xin'],
    ['安', 'an'],
    ['如', 'ru'],
    ['扬', 'yang'],
    ['水', 'shui'],
    ['礼', 'li'],
    ['言', 'yan'],
    ['则', 'ze'],
    ['善', 'shan'],
    ['美', 'mei']
  ]
) as Record<string, string>

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

function toPinyin(text: string) {
  return Array.from(text).map((char) => pinyinMap[char] || char).join(' ')
}

function selectGender(nextGender: Gender) {
  if (gender.value === nextGender) return
  gender.value = nextGender
  namingStyle.value = nextGender === '男' ? maleStyles[0] : femaleStyles[0]
  nameResults.value = []
  selectedName.value = null
  batchIndex.value = 0
}

function selectStyle(style: NamingStyle) {
  namingStyle.value = style
  nameResults.value = []
  selectedName.value = null
  batchIndex.value = 0
}

function rotateRules(rules: RuleEntry[], offset: number) {
  return rules.map((_, index) => rules[(index + offset) % rules.length])
}

function generateNames() {
  hasGenerated.value = true
  if (!surname.value || !/^[\u4e00-\u9fa5]{1,2}$/.test(surname.value)) {
    nameResults.value = []
    return
  }

  batchIndex.value += 1
  selectedName.value = null

  const availableStyles = currentStyles.value
  const preferred = ruleLibrary[namingStyle.value]
  const siblingRules = availableStyles.filter((style) => style !== namingStyle.value).flatMap((style) => ruleLibrary[style])
  const expandedRules = rotateRules([...preferred, ...siblingRules], batchIndex.value - 1)
  const nameSuffixes = gender.value === '男' ? ['', '', '', '之', '元', '景'] : ['', '', '', '婉', '令', '若']

  nameResults.value = Array.from({ length: 18 }, (_, index) => {
    const base = expandedRules[index % expandedRules.length]
    const suffix = nameSuffixes[(index + batchIndex.value - 1) % nameSuffixes.length]
    const givenName = suffix && !base.name.includes(suffix) ? `${base.name}${suffix}` : base.name
    const courtesy = suffix ? `${base.courtesy.slice(0, 1)}${suffix}${base.courtesy.slice(1)}` : base.courtesy
    const style = availableStyles.find((item) => ruleLibrary[item].includes(base)) || namingStyle.value
    const fullName = `${surname.value}${givenName}`

    return {
      ...base,
      id: `${batchIndex.value}-${index + 1}`,
      surname: surname.value,
      style,
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
  background: rgba(255, 252, 246, 0.92);
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
.ghost-button,
.small-button {
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

.small-button {
  padding: 0 22rpx;
  font-size: 24rpx;
  line-height: 2.3;
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
  display: block;
  margin-top: 8rpx;
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

.pinyin {
  display: block;
  margin-top: 6rpx;
  color: #a38361;
  font-size: 22rpx;
  line-height: 1.4;
}

.courtesy,
.detail-courtesy {
  display: block;
  margin-top: 12rpx;
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
