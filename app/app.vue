<template>
  <div class="app-container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  // 💡 升級：將全域網頁標題改為您的個人履歷專業名稱
  title: '尹俊哲 Evan | 前端設計師作品集',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 職涯時間軸` : '尹俊哲 Evan | 前端設計師作品集';
  },
  meta: [
    { name: 'description', content: '我是尹俊哲（大吉/Evan），擁有豐富跨平台 RWD 開發與品牌網頁設計經驗的前端設計師。熟練運用 Nuxt 4、Vue 3、Vuetify 與 SCSS，致力於打造高效能、高質感的網頁視覺與系統介面。' },
    { property: 'og:title', content: '尹俊哲 Evan | 前端設計師作品集' },
    { property: 'og:description', content: '探索尹俊哲（大吉/Evan）的職涯發展時間軸與合作品牌成果，展現從經典網頁設計到現代前端框架開發的深厚實力。' },
    // 💡 提示：後續可將世足賽專案或個人大頭照存成 og-share.jpg 放在 public/images/ 內，分享至 LINE 或 FB 時就會有超質感縮圖
    { property: 'og:image', content: '/images/og-share.jpg' }, 
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<style>
/* 💡 升域優化：讓網頁在不同裝置上滾動時更加平滑舒適 */
html, body {
  margin: 0;
  padding: 0;
  background-color: #f4f4f4; 
  scroll-behavior: smooth; 
}

/* 客製化全域精緻滾動條外觀 */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #e2e8f0; 
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>
