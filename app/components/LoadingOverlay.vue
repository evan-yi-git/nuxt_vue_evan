<template>
    <Transition name="fade">
        <div v-if="isLoading" class="loading-overlay">
            <div class="loading-content">
                <img src="/img/evan_icon.png" alt="Evan Icon" class="evan-loading-icon" />
                <span class="loading-text">Loading {{ loadingProgress }}%</span>

                <div class="progress-bar-wrapper">
                    <div class="progress-bar-fill" :style="{ width: loadingProgress + '%' }"></div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    isLoading: {
        type: Boolean,
        required: true
    },
    loadingProgress: {
        type: Number,
        required: true
    }
})
</script>