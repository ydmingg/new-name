# 华夏命名 - 全面升级指南

## 📋 升级概览

本次升级将"起名小程序"全面升级为**"华夏命名"**平台，涵盖 10 大命名体系、完整的会员体系、AI 深度分析、名字 PK、收藏分享等功能。

## 🎯 核心升级内容

### 1. 品牌与首页重构
- ✨ 品牌名称：**华夏命名**
- ✨ 品牌理念：**名以立志 · 字以明德**
- ✨ 首页支持 10 大命名体系的选择入口
- ✨ 流畅的用户交互体验

### 2. 10 大命名体系独立算法

| 体系 | 特点 | 来源 | 适用人群 |
|------|------|------|---------|
| 汉魏古法 | 名 + 字，体现古典气质 | 东汉·三国·魏晋 | 男女通用 |
| 诗经命名 | 出自《诗经》经典诗句 | 《诗经》 | 男女通用 |
| 楚辞命名 | 浪漫主义精神，高洁品格 | 《楚辞》 | 男女通用 |
| 唐诗命名 | 精选唐诗佳句，盛唐气韵 | 唐诗 | 男女通用 |
| 宋词命名 | 婉约与豪放兼备，文雅气质 | 宋词 | 女孩优先 |
| 君子风格 | 儒家理想，修身养性 | 儒家文化 | 男孩 |
| 儒雅风格 | 温和雅正，文化修养 | 儒家文化 | 男孩 |
| 女子风格 | 温婉高洁，女性美德 | 传统文化 | 女孩 |
| 现代简约 | 避免古文，融合现代审美 | 现代文化 | 男女通用 |
| AI 文化命名 | AI 深度学习，个性化定制 | AI 算法 | 男女通用 |

### 3. 气质风格系统升级

**男孩气质（16 种）**
- 君子、弘毅、文臣、儒雅、山岳、隐士、武将、经世
- 侠客、帝王、清正、风流、潇洒、神童、将军、名士

**女孩气质（16 种）**
- 清雅、知书、婉约、大家闺秀、才女、兰心、温婉、明媚
- 高洁、仙气、灵秀、飒爽、古典、书香、宫廷、山水

### 4. 详情页 6 大分析维度

#### ① 出处分析
- 显示名字的文化来源（《诗经》《楚辞》等）
- 点击查看原文和诗句

#### ② 人物案例
- 历史人物示例（如王羲之字逸少）
- 解释为什么这样命字

#### ③ 音律分析
- 每个字的声调标注（阴平、阳平、上声、去声）
- 音律顺畅度评分（0-100）
- 读音是否顺口的建议

#### ④ 书写分析
- 笔画数统计
- 字体结构分析（独体、左右、上下等）
- 避免全为左右结构的提醒

#### ⑤ 现代评价
- 现代职场适合度 ★★★★☆
- 文化气质 ★★★★★
- 辨识度 ★★★★☆
- 书写难度 ★★☆☆☆
- **注明：这是产品基于公开规则给出的参考评价，非官方评分**

#### ⑥ 英文拼写
- 例如：Chen Yun
- 方便出国参考

### 5. AI 深度解析（会员功能）

**免费用户**
- 100 字分析
- 包含：名字寓意、成长方向

**VIP 会员**
- 800 字深度分析
- 包含：
  - 名字寓意
  - 成长方向
  - 家庭教育建议
  - 文化来源
  - 气质分析
  - 职业建议
  - 社交印象
  - 文学美感

### 6. 名字 PK 功能

用户可以选择两个收藏的名字进行对比：
- **音律对比**：哪个读音更顺畅
- **寓意对比**：哪个寓意更深远
- **出处对比**：哪个文化底蕴更深
- **辨识度对比**：哪个更容易记住
- **现代感对比**：哪个更符合当代审美
- **文化感对比**：哪个文化气质更强

最后给出 AI 推荐

### 7. 收藏系统

支持以下操作：
- ❤️ 收藏名字
- 🗑️ 删除收藏
- 🔄 排序（按时间、评分、名字）
- 📝 添加备注
- 📊 查看统计（按系统、气质分类）
- 📤 导出收藏
- 📥 导入收藏

### 8. 古风分享海报

生成可分享的海报：
- 背景：宣纸风格
- 元素：印章、古风装饰
- 支持 3 种风格：传统、现代、优雅
- 分享到：微信、朋友圈、小红书、抖音

### 9. 会员体系

**免费用户**
- 每天生成 3 次
- 基础命名体系
- 收藏功能

**VIP 会员**
- 无限生成
- 全部 10 大命名体系
- AI 深度解析（800 字）
- 名字 PK 功能
- 收藏系统
- 专属字体
- 古风海报
- 无广告体验

**VIP 价格**
- 连续包月：19 元/月
- 月卡：29 元/月
- 终身卡：99 元

## 📁 文件结构

```
src/
├── data/
│   ├── namingSystems.ts          # 10大命名体系定义
│   ├── temperamentStyles.ts      # 气质风格系统
│   ├── membershipSystem.ts        # 会员体系
│   ├── collectionSystem.ts        # 收藏系统
│   └── sharingSystem.ts           # 分享和PK系统
├── engine/
│   ├── NamingSystemEngine.ts      # 各体系独立算法
│   └── AnalysisEngine.ts          # 详情页分析引擎
└── pages/
    └── index/
        └── index.vue              # 重构的首页组件
```

## 🚀 使用指南

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev:h5
```

### 构建
```bash
npm run build:h5
```

## 🔧 核心 API

### 命名系统引擎
```typescript
import { namingSystemEngineFactory } from '@/engine/NamingSystemEngine'

const candidate = namingSystemEngineFactory.generate({
  surname: '陈',
  gender: 'male',
  systemId: 'hanwei',
  temperament: temperamentStyle,
  seed: 0
}, 0)
```

### 分析引擎
```typescript
import { nameAnalysisEngine } from '@/engine/AnalysisEngine'

const analysis = nameAnalysisEngine.analyze('陈允', '君子')
// 返回：音律、笔画、评分、英文拼写等
```

### 收藏管理
```typescript
import { collectionManager } from '@/data/collectionSystem'

collectionManager.add(nameItem)
collectionManager.getAll()
collectionManager.filterBySystem('hanwei')
```

### 名字 PK
```typescript
import { namePKEngine } from '@/data/sharingSystem'

const result = namePKEngine.compare(name1, name2)
// 返回：胜者、各项评分、推荐理由
```

### 会员管理
```typescript
import { MembershipManager, PermissionChecker } from '@/data/membershipSystem'

const membership = MembershipManager.upgradeToVIP(currentMembership)
const canAnalyze = PermissionChecker.canAccessAIAnalysis(membership)
```

## 📊 数据流

```
用户输入
  ↓
选择命名体系 + 气质风格
  ↓
调用 NamingSystemEngine 生成 18 组名字
  ↓
使用 AnalysisEngine 分析每个名字
  ↓
展示结果列表
  ↓
用户点击查看详情
  ↓
展示 6 大分析维度
  ↓
用户可以收藏、PK、分享
```

## 🎨 设计规范

- 主色调：#d4a574（古铜色）
- 背景色：#f5efe4（宣纸色）
- 字体：SimSun、Microsoft YaHei（中文）
- 圆角：8px
- 阴影：0 2px 8px rgba(0, 0, 0, 0.08)

## 🔐 权限控制

| 功能 | 免费 | VIP |
|------|------|-----|
| 基础命名体系 | ✓ | ✓ |
| 全部命名体系 | ✗ | ✓ |
| AI 深度解析 | 100字 | 800字 |
| 名字 PK | ✗ | ✓ |
| 收藏系统 | ✓ | ✓ |
| 分享海报 | ✗ | ✓ |
| 专属字体 | ✗ | ✓ |
| 每日生成次数 | 3 | 无限 |

## 📝 后续优化方向

1. **AI 模型集成**：接入大语言模型，实现真正的 AI 文化命名
2. **用户反馈**：收集用户评价，优化命名算法
3. **社区功能**：用户分享、点赞、评论
4. **历史人物库**：扩展历史人物案例
5. **诗词库扩展**：增加更多经典诗词来源
6. **多语言支持**：支持英文、日文等
7. **小程序优化**：针对各大小程序平台的适配
8. **支付集成**：接入微信支付、支付宝等

## 📞 技术支持

如有问题，请通过以下方式联系：
- GitHub Issues
- 邮件：support@huaxiamingming.com
- 微信公众号：华夏命名

---

**版本**：2.0.0  
**更新时间**：2026-07-15  
**维护者**：华夏命名团队
