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
        <img src="/claudecode-color.svg" alt="Claude Code" class="logo-icon" />
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

.logo-icon {
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;
}

.nav-logo:hover .logo-icon {
  transform: scale(1.1);
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
