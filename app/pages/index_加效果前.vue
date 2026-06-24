<template>
  <div class="resume-wrapper">
    
    <header class="resume-header">
      <div class="header-container">
        <div class="header-left">
          <h1 class="name">尹俊哲</h1>
          <p class="nickname">大吉 / Evan</p>
        </div>
        <div class="avatar-box">
          <img src="https://unsplash.com" alt="尹俊哲" class="project-img object-cover w-full h-full" />
        </div>
        <div class="header-right">
          <h2 class="job-title">前端設計師</h2>
          <p class="skills">前端程式 / 網頁設計</p>
        </div>
      </div>
    </header>

    <main class="timeline-main">
      <div class="timeline-axis"></div>

      <div v-for="(item, index) in timelineData" :key="index" class="timeline-item">
        
        <!-- 【左側區塊】：包含日期、手機版標題、品牌牆、以及品牌牆下方的圖 -->
        <div class="item-left-block">
          <div class="date-header">
            <span class="date-year">{{ item.year }}</span>
            <span class="date-tech">{{ item.techHeader }}</span>
          </div>

          <!-- 手機版專用標題 -->
          <div class="mobile-intro-header">
            <h3 class="intro-title">{{ item.title }}</h3>
            <h4 class="intro-subtitle">{{ item.subtitle }}</h4>
            <p class="intro-tech-stack">{{ item.techStack }}</p>
            <p class="intro-content mobile-only-content">{{ item.content }}</p>
          </div>

          <!-- 品牌牆網格 -->
          <div v-if="item.brands && item.brands.length" :class="['brand-grid', item.brandGridClass]">
            <div 
              v-for="(brand, bIndex) in item.brands" 
              :key="bIndex" 
              :class="['brand-card', brand.cardClass]"
            >
              <span :class="['brand-main', brand.accentClass]" v-html="brand.name"></span>
              <span v-if="brand.sub" class="brand-sub">{{ brand.sub }}</span>
            </div>
          </div>

          <!-- 💡 核心修改：在品牌牆網格的正下方補上圖片包裹區 -->
          <div v-if="item.brandImages && item.brandImages.length" class="brand-images-wrapper pt-12">
            <div class="mockup-pc-container">
              <div 
                v-for="(bImg, bImgIndex) in item.brandImages" 
                :key="bImgIndex" 
                class="mockup-pc-card shadow-lg border border-slate-200 rounded overflow-hidden"
              >
                <img :src="bImg" alt="Brand Project Showcase" class="project-img object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        <!-- 【右側區塊】：放置電腦版標題、內文，以及內文下方的成果圖 -->
        <div class="item-right-block" :class="{ 'final-text-block': !item.content }">
          
          <!-- 電腦版專用標題 -->
          <div class="desktop-intro-header">
            <h3 class="intro-title">{{ item.title }}</h3>
            <h4 class="intro-subtitle">{{ item.subtitle }}</h4>
            <p class="intro-tech-stack">{{ item.techStack }}</p>
          </div>

          <!-- 電腦版內文 -->
          <p v-if="item.content" class="intro-content desktop-only-content">
            {{ item.content }}
          </p>

          <!-- 右側圖片組合包裹容器 -->
          <div v-if="item.images && item.images.length" class="project-images-wrapper pt-12">
            
            <!-- 組合 A：PC 寬螢幕網頁圖 -->
            <div v-if="item.imageType === 'pc'" class="mockup-pc-container">
              <div class="mockup-pc-card shadow-lg border border-slate-200 rounded">
                <img :src="item.images" :alt="item.title" class="project-img object-cover w-full h-full" />
              </div>
            </div>

            <!-- 組合 B：手機版直式雙圖並排 -->
            <div v-if="item.imageType === 'mb'" class="mockup-mb-grid">
              <div 
                v-for="(img, imgIndex) in item.images" 
                :key="imgIndex" 
                class="mockup-mb-card shadow-md border border-slate-200 rounded overflow-hidden"
              >
                <img :src="img" alt="Mobile Showcase" class="project-img object-cover w-full h-full" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>

    <footer class="resume-footer">
      <p class="thank-you-text">感謝您觀看我的履歷～祝您有愉快的一天</p>
    </footer>
    
  </div>
</template>

<script setup>
const timelineData = [
  {
    year: '2004~2009',
    techHeader: 'Photoshop、Dreamweaver、Flash',
    title: '開啟網頁設計人生',
    subtitle: '從上市櫃企業至路面店家網站，經手上百個網站設計',
    techStack: 'html, css, java, flash, asp',
    content: '初入職場時，有幸受到陳經理的賞識，加入了天矽團隊，進而累積了大量的工作經驗。對外直接與客戶提案、溝通，對內與程式人員規劃後台到製作。晉升設計組組長後，安排設計間的技术分享，同時也積極培育新進設計。',
    brandGridClass: 'grid-4',
    brands: [
      { name: 'LCY GROUP', sub: '李長榮集團', accentClass: 'accent-amber' },
      { name: 'RITEK 錸德集團', accentClass: 'accent-blue' },
      { name: '台灣電力公司', accentClass: 'accent-cyan' },
      { name: 'ANdes', sub: 'Technology', accentClass: 'accent-indigo', cardClass: 'uppercase' },
      { name: '國都豐田服務網', sub: 'TOYOTA LEXUS', accentClass: 'accent-red' },
      { name: '北部豐田汽車線上服務網', cardClass: 'text-xs' },
      { name: '幼獅文化', accentClass: 'text-green-600 font-bold' },
      { name: '大樹藥局', accentClass: 'text-emerald-700 font-bold' },
      { name: '世紀貿易', accentClass: 'text-blue-600 font-bold' },
      { name: '三通公司', accentClass: 'text-slate-600 font-medium' },
      { name: '全生中醫診所', accentClass: 'text-purple-800' },
      { name: '聖波竹炭', accentClass: 'text-red-900 font-bold' }
    ],
    // 💡 左側品牌牆下方補上線上假圖
    brandImages: [
      'https://unsplash.com'
    ],
    imageType: 'pc',
    images: [
      'https://unsplash.com'
    ]
  },
  {
    year: '2011~2013',
    techHeader: '',
    title: '第一次遠距工作',
    subtitle: '專為品牌設計活動網站 edm 媒體素材(swf)',
    techStack: 'html,css,JavaScript,actionscript',
    content: '兩年多的遠距上班，兼顧育兒與工作，同時在品牌端與用戶端有了更深的感受，並且加強了對女性/幼兒族群的調性掌握，進而在下個職場上(桑河)有如魚得水的發揮，與統一數網的合作，累積大量的媒體素材製作經驗，快速的產出動態banner、影音素材、產品活動網站等...',
    brandGridClass: 'grid-2',
    brands: [
      { name: 'PЯESCO<sup>&reg;</sup>', accentClass: 'accent-red' },
      { name: 'SOCIÉ', sub: 'esthetic', cardClass: 'font-serif block font-bold' }
    ],
    brandImages: [
      'https://unsplash.com'
    ],
    imageType: 'pc',
    images: [
      'https://unsplash.com'
    ]
  },
  {
    year: '2013~2022',
    techHeader: 'Photoshop、Dreamweaver、Illustrator、Premiere',
    title: '網路樣貌多變，不斷學習進步',
    subtitle: '跨平台網頁 RWD 成主流，開發前端技能',
    techStack: 'HTML5,CSS3,jQuery,RWD,Premiere,Audition',
    content: '視覺設計跨足前端設計，除了 RWD 還有許多的套件 & 特效需要用在網站中，單純的一頁式網站中包含著各種元件的運用，社群的興起也帶來另一種媒體素材的走向。',
    brandGridClass: 'grid-3 pt-16',
    brands: [
      { name: '■● KOSÉ', cardClass: 'span-3 border-none bg-transparent font-serif tracking-widest text-lg font-bold text-slate-700' },
      { name: 'DECORTÉ', cardClass: 'font-serif tracking-wider' },
      { name: 'INFINITY<br><small style="font-size:8px;font-weight:normal;">KOSÉ</small>', cardClass: 'font-serif tracking-tight font-bold' },
      { name: 'ESPRIQUE', cardClass: 'font-sans tracking-wide' },
      { name: '雪肌精', sub: 'SEKKISEI', accentClass: 'text-blue-800 font-bold' },
      { name: 'SEKKISEI', sub: 'CLEAR WELLNESS', accentClass: 'text-blue-900 tracking-widest font-mono' },
      { name: '雪肌精 みやび', cardClass: 'font-serif italic text-blue-950' },
      { name: 'ONE BY KOSÉ', cardClass: 'font-sans text-xs' },
      { name: 'Visée', cardClass: 'font-serif italic text-md' },
      { name: 'Fasio', cardClass: 'font-black tracking-widest uppercase' }
    ],
    brandImages: [
      'https://unsplash.com'
    ],
    imageType: 'pc',
    images: [
      'https://unsplash.com'
    ]
  },
  {
    year: '2022~2026',
    techHeader: 'Nuxt、Vue、Vuetify、VS Code、Gitlab、zeplin、SCSS',
    title: '第二次遠距工作',
    subtitle: '厚實前端實力，各類框架運用，ai學習浪潮',
    techStack: 'Nuxt,Vue,Vuetify,VS Code,Gitlab,HTML,SCSS,JS',
    content: '從傳統切版要轉換框架切版時，公司也正在將產品從 php 轉為 H5，感謝郭主管無私的指導帶領下，與後端團隊共同成長，讓我在前端技術上有卓越的提升，如今框架技術成熟普及及加上各類 ai 輔助，已能大幅縮短各種功能與效果的產出時間，多語系排版更加考驗切版彈性.',
    brandGridClass: 'grid-4 pt-12',
    brands: [
      { name: 'UNIQLO', sub: 'LifeWear', accentClass: 'text-red-600 font-bold border border-red-600 p-0.5 text-[9px] leading-tight' },
      { name: 'N', cardClass: 'bg-black text-white italic text-lg font-serif' },
      { name: '● STANDARD FOODS', accentClass: 'text-green-700 font-black tracking-tighter' },
      { name: '白蘭氏', cardClass: 'bg-emerald-900 text-white font-bold' }
    ],
    brandImages: [
      'https://unsplash.com'
    ],
    imageType: 'mb',
    images: [
      'https://unsplash.com',
      'https://unsplash.com'
    ]
  },
  {
    year: '2026~',
    techHeader: '',
    title: '新的開始',
    subtitle: '加入您的團隊，迎接新挑戰！',
    techStack: '',
    content: '準備就緒，期待能將多年的前端架構實力、UI 彈性切版經驗與 AI 自動化工作流帶入貴團隊。',
    brandImages: [
      'https://unsplash.com'
    ],
    imageType: 'pc',
    images: [
      'https://unsplash.com'
    ]
  }
]
</script>