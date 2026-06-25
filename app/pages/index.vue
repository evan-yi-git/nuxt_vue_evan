<template>
  <div class="resume-wrapper">
    
    <header class="resume-header">
      <div class="header-container">
        <div class="header-left">
          <h1 class="name">尹俊哲</h1>
          <p class="nickname">大吉 / Evan</p>
        </div>
        <div class="avatar-box">
          <img src="/img/pic_00.jpg" alt="尹俊哲" class="project-img object-cover w-full h-full" />
        </div>
        <div class="header-right">
          <h2 class="job-title">前端設計師</h2>
          <p class="skills">前端程式 / 網頁設計</p>
        </div>
      </div>
    </header>

    <main class="timeline-main">
      <div class="timeline-axis">
        <div class="timeline-axis-bg"></div>
        <div class="timeline-axis-fill"></div>
      </div>

      <div v-for="(item, index) in timelineData" :key="index" class="timeline-item">
        
        <!-- 【左側區塊】：包含日期、手機標題、左側 3D 品牌牆 -->
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

          <!-- 左側品牌牆大容器 -->
          <div v-if="item.brands && item.brands.length" class="brand-timeline-container">
            <!-- 💡 核心修改：移除 HTML 中的 inline style maxHeight 控制，全部交由更靈活的 SCSS 類別控制 -->
            <div :class="['brand-grid', item.brandGridClass, { 'is-expanded': item.isExpanded }]">
              <div 
                v-for="(brand, bIndex) in item.brands" 
                :key="bIndex" 
                :class="['brand-card', brand.cardClass, { 'hidden-card': bIndex >= 16 }]"
                data-tilt
                data-tilt-max="15"
                data-tilt-speed="400"
                data-tilt-glare="true"
                data-tilt-max-glare="0.25"
              >
                <div class="tilt-inner">
                  <img v-if="brand.img" :src="brand.img" :alt="brand.name" class="brand-logo-img" style="max-width: 90%; max-height: 52px; object-fit: contain; display: block; margin: 0 auto;" />
                  <template v-else>
                    <span :class="['brand-main', brand.accentClass]" v-html="brand.name"></span>
                    <span v-if="brand.sub" class="brand-sub">{{ brand.sub }}</span>
                  </template>
                </div>
              </div>
            </div>

            <!-- 💡 核心修改：按鈕加上 mobile-only-btn 類別，確保在電腦版自動完全隱藏 -->
            <div v-if="item.brands.length > 16" class="expand-btn-wrapper mobile-only-btn">
              <button class="expand-toggle-btn" @click="toggleExpand(item)">
                {{ item.isExpanded ? '收合品牌牆 ▲' : '展開更多品牌 ▼' }}
              </button>
            </div>
          </div>

          <!-- 品牌牆下方成果圖 -->
          <div v-if="item.brandImages && item.brandImages.length" class="brand-images-wrapper pt-12">
            <div class="mockup-pc-container">
              <div v-for="(bImg, bImgIndex) in item.brandImages" :key="bImgIndex" class="mockup-pc-card shadow-lg border border-slate-200 rounded overflow-hidden">
                <img :src="bImg" alt="Brand Project Showcase" class="project-img object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        <!-- 【右側區塊】：放置內文、成果圖、以及右側 3D 品牌牆 -->
        <div class="item-right-block" :class="{ 'final-text-block': !item.content }">
          <div class="desktop-intro-header">
            <h3 class="intro-title">{{ item.title }}</h3>
            <h4 class="intro-subtitle">{{ item.subtitle }}</h4>
            <p class="intro-tech-stack">{{ item.techStack }}</p>
          </div>

          <p v-if="item.content" class="intro-content desktop-only-content">{{ item.content }}</p>

          <!-- 右側成果圖片 -->
          <div v-if="item.images && item.images.length" class="project-images-wrapper pt-12">
            <div v-if="item.imageType === 'pc'" class="mockup-pc-container">
              <div class="mockup-pc-card shadow-lg border border-slate-200 rounded">
                <img :src="item.images[0]" :alt="item.title" class="project-img object-cover w-full h-full" />
              </div>
            </div>
            <div v-if="item.imageType === 'mb'" class="mockup-mb-grid">
              <div v-for="(img, imgIndex) in item.images" :key="imgIndex" class="mockup-mb-card shadow-md border border-slate-200 rounded overflow-hidden">
                <img :src="img" alt="Mobile Showcase" class="project-img object-cover w-full h-full" />
              </div>
            </div>
          </div>

          <!-- 右側專屬的「雙排跨界合作品牌牆」 -->
          <div v-if="item.rightBrands && item.rightBrands.length" class="right-brand-timeline-container pt-12">
            <!-- 💡 核心修改：右側也同步加上 .is-expanded 類別控制 -->
            <div :class="['brand-grid grid-2', { 'is-expanded': item.isRightExpanded }]">
              <div 
                v-for="(rBrand, rbIndex) in item.rightBrands" 
                :key="rbIndex"
                :class="['brand-card', { 'hidden-card': rbIndex >= 16 }]"
                data-tilt
                data-tilt-max="15"
                data-tilt-speed="400"
                data-tilt-glare="true"
                data-tilt-max-glare="0.2"
              >
                <div class="tilt-inner">
                  <img v-if="rBrand.img" :src="rBrand.img" :alt="rBrand.name" class="brand-logo-img" style="max-width: 90%; max-height: 52px; object-fit: contain; display: block; margin: 0 auto;" />
                  <template v-else>
                    <span class="brand-main" v-html="rBrand.name"></span>
                  </template>
                </div>
              </div>
            </div>

            <!-- 💡 核心修改：右側專屬的手機版折疊按鈕 -->
            <div v-if="item.rightBrands.length > 16" class="expand-btn-wrapper mobile-only-btn">
              <button class="expand-toggle-btn" @click="toggleRightExpand(item)">
                {{ item.isRightExpanded ? '收合品牌牆 ▲' : '展開更多品牌 ▼' }}
              </button>
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
import { onMounted, reactive, nextTick } from 'vue'

// 職涯階段資料結構：包含 3D 視差開關與展開高度
const timelineData = reactive([
  {
    year: '2004~2009',
    techHeader: 'Photoshop、Dreamweaver、Flash',
    title: '開啟網頁設計人生',
    subtitle: '從上市櫃企業至路面店家網站，經手上百個網站設計',
    techStack: 'html, css, java, flash, asp',
    content: '初入職場時，有幸受到陳經理的賞識，加入了天矽團隊，進而累積了大量的工作經驗。對外直接與客戶提案、溝通，對內與程式人員規劃後台到製作。晉升設計組組長後，安排設計間的技术分享，同時也積極培育新進設計。',
    brandGridClass: 'grid-4',
    isExpanded: false,
    maxHeightPx: 320, 
    isExpanded: false,      // 左側展開狀態
    isRightExpanded: false, // 💡 新增：右側展開狀態
    // 左側 20 家品牌與對應 Logo 圖片
    brands: [
      { name: 'LCY GROUP', sub: '李長榮集團', accentClass: 'accent-amber', img: '/img/pic_03.jpg' },
      { name: 'RITEK 錸德集團', accentClass: 'accent-blue', img: '/img/pic_05.jpg' },
      { name: '台灣電力公司', accentClass: 'accent-cyan', img: '/img/pic_07.jpg' },
      { name: 'ANdes', sub: 'Technology', accentClass: 'accent-indigo', cardClass: 'uppercase', img: '/img/pic_09.jpg' },
      { name: '國都豐田服務網', sub: 'TOYOTA LEXUS', accentClass: 'accent-red', img: '/img/pic_15.jpg' },
      { name: '北部豐田汽車', sub: '線上服務網', cardClass: 'text-xs', img: '/img/pic_16.jpg' },
      { name: '幼獅文化', accentClass: 'text-green-600 font-bold', img: '/img/pic_17.jpg' },
      { name: '大樹藥局', accentClass: 'text-emerald-700 font-bold', img: '/img/pic_18.jpg' },
      { name: '世紀貿易', accentClass: 'text-blue-600 font-bold', img: '/img/pic_26.jpg' }, 
      { name: '三通公司', accentClass: 'text-slate-600 font-medium', img: '/img/pic_27.jpg' }, 
      { name: '全生中醫診所', accentClass: 'text-purple-800', img: '/img/pic_28.jpg' },
      { name: '聖波竹炭', accentClass: 'text-red-900 font-bold', img: '/img/pic_29.jpg' },
      { name: '錦銘鋁門窗', accentClass: 'text-red-500 font-bold', img: '/img/pic_34.jpg' },
      { name: 'SUN MARK', sub: '桑瑪克隔熱紙', accentClass: 'font-black italic', img: '/img/pic_35.jpg' },
      { name: '龍膜 LLumar', sub: 'WINDOW FILM', accentClass: 'font-bold', img: '/img/pic_36.jpg' },
      { name: '台灣臨床腫瘤學會', cardClass: 'text-xs font-bold text-blue-900', img: '/img/pic_37.jpg' },
      { name: 'ATNG 艾騰', accentClass: 'text-red-700 font-black', img: '/img/pic_46.jpg' }, 
      { name: 'OMV 奧地利石油', fontClass: 'font-mono tracking-tighter', img: '/img/pic_47.jpg' },
      { name: '台灣智天貿易', sub: 'CHIH TIEN', accentClass: 'text-green-600', img: '/img/pic_48.jpg' }, 
      { name: 'SUNNIC 興意', accentClass: 'text-blue-500', img: '/img/pic_49.jpg' }
    ],
    brandImages: ['/img/pic_62.jpg'],
    imageType: 'pc',
    images: ['/img/pic_20.jpg'],
    
    rightBrands: [
      { name: 'TIPA 智慧財產培訓學院', img: '/img/pic_39.jpg' },
      { name: '衛生福利部 全國解毒劑儲備網', img: '/img/pic_41.jpg' },
      
      { name: 'UPSC 聯合專利商標事務所', img: '/img/pic_52.jpg' },
      { name: '國立臺灣大學光電工程學研究所', img: '/img/pic_53.jpg' },
      { name: '法律事務所', img: '/img/pic_56.jpg' },
      { name: '台灣癌症學會', img: '/img/pic_57.jpg' },
      
      { name: '台北市報業商業同業公會', img: '/img/pic_66.jpg' },
      { name: '霍特科技', img: '/img/pic_67.jpg' },
      { name: '台灣房屋營建產業協會', img: '/img/pic_70.jpg' },
      { name: 'CHANT OIL', img: '/img/pic_71.jpg' },
      { name: '台灣營建防水技術協進會 WTA', img: '/img/pic_74.jpg' },
      { name: '天磊 樹木保護', img: '/img/pic_75.jpg' },
      { name: 'GOGO SPORTS', img: '/img/pic_78.jpg' },
      { name: 'Happy Marian 快樂瑪麗安', img: '/img/pic_79.jpg' },
      { name: 'SAIACO 先鋒股份有限公司', img: '/img/pic_82.jpg' },
      { name: 'FormoLight', img: '/img/pic_83.jpg' },
      { name: '聯群精密彈簧有限公司', img: '/img/pic_86.jpg' },
      { name: '偉林企業有限公司', img: '/img/pic_87.jpg' },
      { name: '世紀自動化股份有限公司', img: '/img/pic_90.jpg' },
      { name: 'Freser 菲瑞瑟', img: '/img/pic_91.jpg' },
      { name: 'TAIWAN ENDURANCE', img: '/img/pic_94.jpg' },
      { name: 'SUNPOWER', img: '/img/pic_95.jpg' },
      { name: 'KoreaNanometer', img: '/img/pic_98.jpg' },
      { name: '重德汽車 ONLY BMW', img: '/img/pic_99.jpg' },
      { name: 'DENO 丹龍隔熱紙', img: '/img/pic_102.jpg' },
      { name: '藍天', img: '/img/pic_103.jpg' },
      { name: '緯譽 WEYU', img: '/img/pic_106.jpg' },
      { name: '群展汽車大燈翻新', img: '/img/pic_107.jpg' },
      { name: 'CARDIO', img: '/img/pic_111.jpg' },
      { name: '宏陽汽車大燈維修隔熱紙', img: '/img/pic_112.jpg' }
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
])

// 點擊展開事件（並重新初始化視差傾斜監聽）
const toggleExpand = async (item) => {
  item.isExpanded = !item.isExpanded
  await nextTick()
  if (process.client) {
    const VanillaTilt = (await import('vanilla-tilt')).default
    const cards = document.querySelectorAll('.brand-card')
    VanillaTilt.init(cards)
  }
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh()
  }
}
const toggleRightExpand = async (item) => {
  item.isRightExpanded = !item.isRightExpanded
  await nextTick()
  if (process.client) {
    const VanillaTilt = (await import('vanilla-tilt')).default
    const cards = document.querySelectorAll('.brand-card')
    VanillaTilt.init(cards)
  }
  if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh()
    }
}

onMounted(async () => {
  await nextTick()

  if (process.client) {
    const VanillaTilt = (await import('vanilla-tilt')).default
    const cards = document.querySelectorAll('.brand-card')
    VanillaTilt.init(cards)
  }

  if (process.client) {
    const initGsapAnimation = () => {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
    
        gsap.config({ force3D: true })
        
        gsap.fromTo('.timeline-axis-fill', 
          { 
            scaleY: 0,
            xPercent: -50 
          },
          {
            scaleY: 1,
            xPercent: -50,
            ease: 'none', 
            scrollTrigger: {
              trigger: '.timeline-main',
              start: 'top top',       
              end: 'bottom bottom',
              scrub: true,
              invalidateOnRefresh: true,
              markers: false,
              
              // 💡 核心新增：監聽滾動進度
              onUpdate: (self) => {
                // 取得外層大外殼的 DOM 元素 (.timeline-axis)
                const axisElement = document.querySelector('.timeline-axis')
                if (!axisElement) return
        
                // self.progress 的數值介於 0 ~ 1 之間
                // 當 progress === 1 代表百分之百觸底了！
                if (self.progress >= 0.99) { 
                  axisElement.classList.add('is-bottom') // 觸底時加上 class
                } else {
                  axisElement.classList.remove('is-bottom') // 往上滾動時自動移除 class
                }
              }
            }
          }
        )

        console.log('GSAP 與 ScrollTrigger 順利載入並初始化成功！')
      } else {
        setTimeout(initGsapAnimation, 50)
      }
    }

    initGsapAnimation()
  }
})

</script>