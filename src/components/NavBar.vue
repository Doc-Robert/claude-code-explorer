<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useActiveSection } from '../composables/useActiveSection'

const sectionIds = ['overview', 'architecture', 'core', 'tools', 'flow', 'insights']
const { activeSection } = useActiveSection(sectionIds)

const isScrolled = ref(false)
const isMobileOpen = ref(false)

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  isMobileOpen.value = false
}

const toggleMobile = () => {
  isMobileOpen.value = !isMobileOpen.value
}

const navItems = [
  { id: 'architecture', label: '架构' },
  { id: 'core', label: '核心' },
  { id: 'tools', label: '工具' },
  { id: 'flow', label: '流程' },
  { id: 'insights', label: '洞察' },
]
</script>

<template>
  <nav class="nav" :class="{ scrolled: isScrolled }" role="navigation" aria-label="主导航">
    <div class="nav-inner">
      <a class="nav-logo" @click.prevent="scrollTo('overview')" href="#overview" tabindex="0" aria-label="回到顶部">
        <span class="logo-dot" aria-hidden="true"></span>
        <span class="logo-text">Claude Code</span>
      </a>

      <!-- Desktop nav -->
      <div class="nav-links" role="list">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="'#' + item.id"
          :class="{ active: activeSection === item.id }"
          role="listitem"
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.label }}
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="hamburger"
        :class="{ open: isMobileOpen }"
        @click="toggleMobile"
        :aria-expanded="isMobileOpen"
        aria-label="打开导航菜单"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile overlay -->
    <Transition name="slide">
      <div v-if="isMobileOpen" class="mobile-menu" role="list" @click.self="isMobileOpen = false">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="'#' + item.id"
          class="mobile-link"
          :class="{ active: activeSection === item.id }"
          role="listitem"
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.label }}
        </a>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-nav);
  padding: 20px 0;
  transition: background 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
}

.nav.scrolled {
  padding: 12px 0;
  background: rgba(11, 10, 9, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
}

.nav-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
  min-height: 44px;
}

.logo-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  min-height: 44px;
  display: flex;
  align-items: center;
}

.nav-links a:hover {
  color: var(--color-text);
}

.nav-links a.active {
  color: var(--color-accent);
  background: var(--color-accent-dim);
}

/* ── Hamburger ── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--color-text);
  border-radius: 1px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile menu ── */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(11, 10, 9, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  padding: 12px 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-link {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  min-height: 48px;
  display: flex;
  align-items: center;
  transition: color 0.2s ease, background 0.2s ease;
}

.mobile-link:hover,
.mobile-link.active {
  color: var(--color-accent);
  background: var(--color-accent-dim);
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
}
</style>
