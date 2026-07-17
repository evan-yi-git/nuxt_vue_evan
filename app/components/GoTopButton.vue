<template>
    <div class="go-top-wrapper" :class="{ 'is-visible': isGoTopVisible }" @click="scrollToTop">
        <svg class="progress-circle" viewBox="0 0 100 100">
            <circle class="progress-bg" cx="50" cy="50" r="44"></circle>
            <circle class="progress-bar" cx="50" cy="50" r="44" :style="{ strokeDashoffset: strokeOffset }"></circle>
        </svg>
        <span class="arrow-text">▲</span>
    </div>
</template>

<script setup>
// 將滾動邏輯封裝在元件內部，讓 index.vue 更乾淨
const { isGoTopVisible, strokeOffset, scrollToTop } = useScrollProgress()
</script>