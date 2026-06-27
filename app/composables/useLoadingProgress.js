import { ref } from 'vue'

export const useLoadingProgress = (onCompleteCallback) => {
  const isLoading = ref(true)
  const loadingProgress = ref(0)

  const startProgressSimulation = () => {
    const timer = setInterval(() => {
      if (loadingProgress.value < 92) {
        loadingProgress.value += Math.floor(Math.random() * 5) + 2
      } else {
        clearInterval(timer)
      }
    }, 80)
    return timer
  }

  const initLoadingManager = () => {
    if (!process.client) return

    const progressTimer = startProgressSimulation()
    const minimumTimePromise = new Promise(resolve => setTimeout(resolve, 800))

    const completeLoading = async () => {
      await minimumTimePromise
      clearInterval(progressTimer)
      loadingProgress.value = 100 // 確保衝滿

      setTimeout(() => {
        isLoading.value = false
        // 遮罩淡出後，執行傳進來的 GSAP 初始化回呼函式
        setTimeout(() => {
          if (onCompleteCallback) onCompleteCallback()
        }, 300)
      }, 200)
    }

    if (document.readyState === 'complete') {
      completeLoading()
    } else {
      window.addEventListener('load', completeLoading)
    }

    // 5秒保底
    setTimeout(() => {
      if (isLoading.value) completeLoading()
    }, 5000)
  }

  return {
    isLoading,
    loadingProgress,
    initLoadingManager
  }
}
