<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ArchitectureSection from './components/ArchitectureSection.vue'
import CoreModulesSection from './components/CoreModulesSection.vue'
import ToolSystemSection from './components/ToolSystemSection.vue'
import ExecutionFlowSection from './components/ExecutionFlowSection.vue'
import InsightsSection from './components/InsightsSection.vue'
import FooterSection from './components/FooterSection.vue'
import BackToTop from './components/BackToTop.vue'
import { useScrollReveal } from './composables/useScrollReveal'

useScrollReveal()
</script>

<template>
  <a href="#overview" class="skip-link">跳到主要内容</a>
  <NavBar />
  <main id="main-content">
    <HeroSection />
    <ArchitectureSection />
    <CoreModulesSection />
    <ToolSystemSection />
    <ExecutionFlowSection />
    <InsightsSection />
  </main>
  <FooterSection />
  <BackToTop />
</template>

<style>
/* Global styles are in main.css */
</style>
