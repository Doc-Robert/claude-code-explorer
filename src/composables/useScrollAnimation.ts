import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(threshold = 0.1) {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { elementRef, isVisible }
}
