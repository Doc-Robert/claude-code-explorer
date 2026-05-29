import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveSection(sectionIds: string[]) {
  const activeSection = ref(sectionIds[0] || '')

  const handleScroll = () => {
    const scrollY = window.scrollY + 100

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i])
      if (section && section.offsetTop <= scrollY) {
        activeSection.value = sectionIds[i]
        break
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { activeSection }
}
