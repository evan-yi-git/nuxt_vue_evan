import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useScrollProgress() {
  const isGoTopVisible = ref(false)
  const scrollPercent = ref(0)

  const strokeOffset = computed(() => {
    const circumference = 2 * Math.PI * 44
    return circumference - (scrollPercent.value * circumference)
  })

  const checkScroll = () => {
    if (process.client) {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      if (totalScroll > 0) {
        scrollPercent.value = Math.min(Math.max(currentScroll / totalScroll, 0), 1)
      }
      isGoTopVisible.value = currentScroll > 500
    }
  }

  const scrollToTop = () => {
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
      gsap.to(window, { scrollTo: 0, duration: 1.0, ease: 'power3.out' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  onMounted(() => {
    if (process.client) {
      window.addEventListener('scroll', checkScroll, { passive: true })
      checkScroll()
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('scroll', checkScroll)
    }
  })

  return {
    isGoTopVisible,
    scrollPercent,
    strokeOffset,
    scrollToTop
  }
}