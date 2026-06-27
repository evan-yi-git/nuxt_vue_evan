<template>
  <div>
    <Transition name="fade">
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-content">
          <span class="loading-text">Loading {{ loadingProgress }}%</span>
          
          <div class="progress-bar-wrapper">
            <div class="progress-bar-fill" :style="{ width: loadingProgress + '%' }"></div>
          </div>
        </div>
      </div>
    </Transition>
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
              <!-- 修改前： -->
              <!-- <span class="date-year">{{ item.year }}</span> -->
              
              <!-- ✨ 修改後：將文字拆開，並統一加上用於 GSAP 辨識的類別名稱 -->
              <span class="date-year">
                <span 
                  v-for="(char, charIndex) in item.year" 
                  :key="charIndex" 
                  class="char-item"
                >
                  {{ char }}
                </span>
              </span>
  
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
              <div :class="['brand-grid', item.brandGridClass, { 'is-expanded': item.isExpanded }]">
                <div 
                  v-for="(brand, bIndex) in item.brands" 
                  :key="bIndex" 
                  :class="['brand-card', brand.cardClass, { 'hidden-card': bIndex >= 8 }]"
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
  
              <div v-if="item.brands.length > 8" class="expand-btn-wrapper mobile-only-btn">
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
            
            <!-- 右側專屬的「雙排跨界合作品牌牆」 -->
            <div v-if="item.rightBrands && item.rightBrands.length && item.brandPosition !== 'top'" class="right-brand-timeline-container pt-12">
                <div :class="['brand-grid', item.rightBrandGridClass || 'grid-2', { 'is-expanded': item.isRightExpanded }]">
                  <div v-for="(rBrand, rbIndex) in item.rightBrands" :key="rbIndex" :class="['brand-card', { 'hidden-card': rbIndex >= 8 }]" data-tilt>
                    <div class="tilt-inner">
                      <img v-if="rBrand.img" :src="rBrand.img" :alt="rBrand.name" class="brand-logo-img" style="max-width: 90%; max-height: 52px; object-fit: contain; display: block; margin: 0 auto;" />
                      <template v-else><span class="brand-main" v-html="rBrand.name"></span></template>
                    </div>
                  </div>
                </div>
                <div v-if="item.rightBrands.length > 8" class="expand-btn-wrapper mobile-only-btn">
                  <button class="expand-toggle-btn" @click="toggleRightExpand(item)">
                    {{ item.isRightExpanded ? '收合品牌牆 ▲' : '展開更多品牌 ▼' }}
                  </button>
                </div>
              </div>
  
            <!-- 右側成果圖片 -->
            <div v-if="item.images && item.images.length" class="project-images-wrapper pt-12">
              <div v-if="item.imageType === 'pc'" class="mockup-pc-grid">
                <div 
                  v-for="(img, imgIndex) in item.images" 
                  :key="imgIndex" 
                  class="mockup-pc-card shadow-lg border border-slate-200 rounded overflow-hidden mb-6"
                >
                  <img :src="img" :alt="item.title" class="project-img object-cover w-full h-full" />
                </div>
              </div>
              <div v-if="item.imageType === 'mb'" class="mockup-mb-grid">
                <div v-for="(img, imgIndex) in item.images" :key="imgIndex" class="mockup-mb-card shadow-md border border-slate-200 rounded overflow-hidden">
                  <img :src="img" alt="Mobile Showcase" class="project-img object-cover w-full h-full" />
                </div>
              </div>
            </div>
  
            <!-- 右側專屬的「雙排跨界合作品牌牆」 -->
            <div v-if="item.rightBrands && item.rightBrands.length && item.brandPosition === 'top'" class="right-brand-timeline-container pt-12">
              <div :class="['brand-grid', item.rightBrandGridClass || 'grid-2', { 'is-expanded': item.isRightExpanded }]">
                <div 
                  v-for="(rBrand, rbIndex) in item.rightBrands" 
                  :key="rbIndex"
                  :class="['brand-card', { 'hidden-card': rbIndex >= 8 }]"
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
  
              <div v-if="item.rightBrands.length > 8" class="expand-btn-wrapper mobile-only-btn">
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
      
      <!-- GoTop 按鈕 -->
      <div 
        class="go-top-wrapper" 
        :class="{ 'is-visible': isGoTopVisible }"
        @click="scrollToTop"
      >
        <svg class="progress-circle" viewBox="0 0 100 100">
          <!-- 1. 靜態背景圓圈（淡淡的底色） -->
          <circle class="progress-bg" cx="50" cy="50" r="44"></circle>
          <!-- 2. 動態進度圓圈（隨滾輪注入藍色） -->
          <circle 
            class="progress-bar" 
            cx="50" 
            cy="50" 
            r="44" 
            :style="{ strokeDashoffset: strokeOffset }"
          ></circle>
        </svg>
        <!-- 中間的箭頭文字 -->
        <span class="arrow-text">▲</span>
      </div>
  
    </div>

  </div>
</template>

<script setup>
import { reactive, nextTick, onMounted } from 'vue'
import { timelineRawData } from '~~/data/timeline'
import { initResumeAnimations, initVanillaTilt, refreshScrollTrigger } from '~/utils/animation'

// 1. 滾動進度條與資料
const { isGoTopVisible, strokeOffset, scrollToTop } = useScrollProgress()
const timelineData = reactive(timelineRawData)

// 2. 引入 Loading 控制（傳入「完成時要執行的動畫」作為參數）
const { isLoading, loadingProgress, initLoadingManager } = useLoadingProgress(() => {
  initResumeAnimations()
})

// 3. 點擊展開事件（代碼變得很乾淨）
const toggleExpand = async (item) => {
  item.isExpanded = !item.isExpanded
  await nextTick()
  await initVanillaTilt()
  refreshScrollTrigger()
}

const toggleRightExpand = async (item) => {
  item.isRightExpanded = !item.isRightExpanded
  await nextTick()
  await initVanillaTilt()
  refreshScrollTrigger()
}

// 4. 生命週期監聽
onMounted(async () => {
  await nextTick()
  await initVanillaTilt() 
  initLoadingManager() // 啟動管理者
})
</script>

