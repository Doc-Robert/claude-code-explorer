<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}
</script>

<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <div class="nav-logo" @click="scrollTo('overview')">
        <!-- Claude Code 吉祥物 Clawd -->
        <svg class="clawd" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 身体 -->
          <ellipse cx="16" cy="18" rx="10" ry="8" fill="#E8A849"/>
          <!-- 眼睛 -->
          <circle cx="12" cy="15" r="2.5" fill="white"/>
          <circle cx="20" cy="15" r="2.5" fill="white"/>
          <circle cx="12.5" cy="14.5" r="1.2" fill="#1a1a1a"/>
          <circle cx="20.5" cy="14.5" r="1.2" fill="#1a1a1a"/>
          <!-- 嘴巴 -->
          <path d="M13 20 Q16 23 19 20" stroke="#1a1a1a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
          <!-- 左钳子 -->
          <path d="M6 14 Q4 10 3 12 Q2 14 5 15" fill="#E8A849" stroke="#D4952E" stroke-width="0.8"/>
          <path d="M6 14 Q3 16 4 18 Q5 19 7 17" fill="#E8A849" stroke="#D4952E" stroke-width="0.8"/>
          <!-- 右钳子 -->
          <path d="M26 14 Q28 10 29 12 Q30 14 27 15" fill="#E8A849" stroke="#D4952E" stroke-width="0.8"/>
          <path d="M26 14 Q29 16 28 18 Q27 19 25 17" fill="#E8A849" stroke="#D4952E" stroke-width="0.8"/>
          <!-- 触角 -->
          <path d="M13 10 Q11 6 10 8" stroke="#E8A849" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          <circle cx="10" cy="7.5" r="1.5" fill="#E8A849"/>
          <path d="M19 10 Q21 6 22 8" stroke="#E8A849" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          <circle cx="22" cy="7.5" r="1.5" fill="#E8A849"/>
          <!-- 腿 -->
          <path d="M10 24 Q9 27 8 26" stroke="#D4952E" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M14 25 Q13 28 12 27" stroke="#D4952E" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M18 25 Q19 28 20 27" stroke="#D4952E" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M22 24 Q23 27 24 26" stroke="#D4952E" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
        <span class="logo-text">Claude Code <span class="logo-light">Explorer</span></span>
      </div>
      <div class="nav-links">
        <a @click.prevent="scrollTo('architecture')">架构</a>
        <a @click.prevent="scrollTo('core')">核心</a>
        <a @click.prevent="scrollTo('tools')">工具</a>
        <a @click.prevent="scrollTo('flow')">流程</a>
        <a @click.prevent="scrollTo('insights')">洞察</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: var(--transition);
}

.nav.scrolled {
  padding: 12px 0;
  background: rgba(10, 10, 11, 0.9);
  backdrop-filter: blur(20px);
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
}

.clawd {
  transition: transform 0.3s ease;
}

.nav-logo:hover .clawd {
  transform: rotate(-10deg) scale(1.1);
}

.logo-text {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.logo-light {
  font-weight: 400;
  color: var(--color-text-muted);
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.nav-links a:hover {
  color: var(--color-text);
}
</style>
