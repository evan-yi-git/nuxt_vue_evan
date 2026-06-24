<template>
  <div>
    <!-- 頂部返回導覽列 -->
    <v-app-bar flat class="border-b px-md-12" color="white">
      <v-btn variant="text" prepend-icon="mdi-arrow-left" class="font-weight-bold text-caption" to="/">
        返回主頁
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-subtitle-2 font-weight-black text-grey-darken-4 text-right">
        TIMELINE SHOWCASE <span class="text-primary">.</span>
      </v-toolbar-title>
    </v-app-bar>

    <!-- 主要滾動填色內容區 -->
    <div class="timeline-wrapper position-relative py-16 bg-grey-lighten-4">
      
      <!-- 🌟 核心：貫穿主軸的滑動填色直線 -->
      <div class="scroll-fill-line" :style="{ height: scrollPercent + '%' }"></div>

      <v-container style="max-width: 1100px;" class="position-relative">
        <v-timeline 
          :side="isMobile ? 'end' : undefined" 
          line-color="grey-lighten-2" 
          line-thickness="4" 
          class="custom-timeline"
        >
          <!-- 時間軸區塊迴圈渲染 -->
          <v-timeline-item 
            v-for="(item, idx) in timelineItems" 
            :key="item.id" 
            :dot-color="activeSection >= idx ? 'primary' : 'grey-lighten-2'" 
            size="small"
            class="timeline-row mb-16"
          >
            <!-- 桌機左右交錯，手機版通通排到左側 -->
            <v-row align="center" :class="{'flex-row-reverse': idx % 2 !== 0 && !isMobile}">
              
              <!-- 1. 主要文字描述區（帶有捲動觸發亮起效果） -->
              <v-col cols="12" sm="6" :class="getTextAlignment(idx)">
                <div class="fade-text-box pa-4 pa-md-6" :class="{ 'is-active': activeSection >= idx }">
                  <span class="text-caption font-weight-bold text-primary tracking-widest block mb-1">
                    {{ item.year }} // {{ item.tag }}
                  </span>
                  <h3 class="text-h5 text-md-h4 font-weight-black text-grey-darken-4 mb-3">
                    {{ item.title }}
                  </h3>
                  <p class="text-body-2 text-grey-darken-1 leading-relaxed">
                    {{ item.desc }}
                  </p>
                </div>
              </v-col>
              
              <!-- 2. 圖片預留區（淺灰色色塊呈現，附帶滾動放大微特效） -->
              <v-col cols="12" sm="6">
                <v-sheet 
                  color="grey-lighten-2" 
                  height="280" 
                  class="rounded-xl d-flex align-center justify-center placeholder-image-box elevation-1"
                  :class="{ 'is-active': activeSection >= idx }"
                >
                  <div class="text-center text-grey-darken-1">
                    <v-icon size="48" class="mb-2">mdi-image-outline</v-icon>
                    <div class="text-caption font-weight-bold tracking-wide">IMAGE PLACEHOLDER</div>
                  </div>
                </v-sheet>
              </v-col>

            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const isMobile = computed(() => smAndDown.value)

const scrollPercent = ref(0)
const activeSection = ref(0)

const timelineItems = ref([
  {
    id: 1,
    year: '2024',
    tag: 'PROJECT INITIALIZATION',
    title: '集團前端架構現代化轉型',
    desc: '主導維運多品牌站台，將過去傳統的分散式切版架構，全面重構升級為以組件化（Component）為核心的數據分離範本，大幅降低高頻率內容上架與大改版時的人力維護成本。'
  },
  {
    id: 2,
    year: '2025',
    tag: 'DESIGN SYSTEM IN ACTION',
    title: '核心 UI 元件庫二次高級封裝',
    desc: '基於 Material Design 3 規範，將常用的高階選單、頁籤、摺疊手風琴與動態對話框進行深度封裝。100% 完美精度還原 Figma 設計稿，全面優化行動裝置與桌機雙端的使用表現。'
  },
  {
    id: 3,
    year: '2026',
    tag: 'DYNAMIC INTERACTIVE INTERFACE',
    title: '時空軸線前衛動態網頁切版',
    desc: '挑戰高難度交互設計，運用 Vue 3 Composition API 結合滾動偵測，實作中軸線動態填色與區塊漸進上浮特效。手機端版型自動靠左適配，展現高超的跨裝置 RWD 開發實力。'
  }
])

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  
  if (docHeight > 0) {
    scrollPercent.value = (scrollTop / docHeight) * 100
  }

  const rows = document.querySelectorAll('.timeline-row')
  rows.forEach((row, index) => {
    const rect = row.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.75) {
      activeSection.value = index
    }
  })
}

const getTextAlignment = (idx) => {
  if (isMobile.value) return 'text-left'
  return idx % 2 === 0 ? 'text-right' : 'text-left'
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  setTimeout(handleScroll, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.tracking-widest { letter-spacing: 0.15em !important; }
.tracking-wide { letter-spacing: 0.05em !important; }
.leading-relaxed { line-height: 1.8 !important; }

/* 🌟 核心：滑動填色中軸線樣式配置 */
.scroll-fill-line {
  position: absolute;
  left: 50%;
  top: 0;
  width: 4px;
  transform: translateX(-50%);
  background: linear-gradient(to bottom, #1867C0 0%, #5CBBF6 100%);
  z-index: 1;
  transition: height 0.1s ease-out;
}

/* 🌟 手機端 RWD 配置：中軸線自動跳轉至右側 */
@media (max-width: 599px) {
  .scroll-fill-line {
    left: auto;
    right: 31px;
    transform: none;
  }
}

.fade-text-box {
  opacity: 0.2;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-text-box.is-active {
  opacity: 1;
  transform: translateY(0);
}

.placeholder-image-box {
  opacity: 0.4;
  transform: scale(0.95);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.placeholder-image-box.is-active {
  opacity: 1;
  transform: scale(1);
}
</style>
