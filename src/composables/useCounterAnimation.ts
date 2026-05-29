import { ref, onMounted } from 'vue'

export function useCounterAnimation(target: number, duration = 2000) {
  const current = ref(0)
  const elementRef = ref<HTMLElement | null>(null)

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

  const animate = () => {
    const startTime = performance.now()

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      current.value = Math.floor(target * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        current.value = target
      }
    }

    requestAnimationFrame(update)
  }

  onMounted(() => {
    if (!elementRef.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(elementRef.value)
  })

  return { current, elementRef }
}
