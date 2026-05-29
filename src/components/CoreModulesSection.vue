<script setup lang="ts">
import { ref, reactive } from 'vue'
import { coreModules } from '../data'
import AppIcons from '../icons/AppIcons.vue'

const expandedCode = reactive<Record<string, boolean>>({})

const toggleCode = (id: string) => {
  expandedCode[id] = !expandedCode[id]
}
</script>

<template>
  <section class="section" id="core">
    <div class="container">
      <div class="section-header">
        <span class="section-num">02</span>
        <h2 class="section-title">核心模块详解</h2>
        <p class="section-subtitle">每个模块都承担着特定的职责，共同构成完整的工作流</p>
      </div>

      <div class="modules">
        <div v-for="module in coreModules" :key="module.id" class="module">
          <div class="module-header">
            <div class="module-icon">
              <AppIcons :name="module.icon" :size="24" />
            </div>
            <div class="module-info">
              <h3>{{ module.name }}</h3>
              <span class="module-size">{{ module.size }}</span>
            </div>
          </div>
          
          <p class="module-desc">{{ module.description }}</p>
          
          <ul class="module-features">
            <li v-for="feature in module.features" :key="feature">{{ feature }}</li>
          </ul>

          <p class="module-detail">{{ module.details }}</p>
          
          <div class="code-section">
            <button class="code-toggle" @click="toggleCode(module.id)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" :class="{ rotated: expandedCode[module.id] }">
                <path d="M3 5L7 9L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ expandedCode[module.id] ? '收起代码' : '查看源码' }}</span>
              <span class="code-file">{{ module.id }}.ts</span>
            </button>
            
            <div v-if="expandedCode[module.id]" class="code-block">
              <pre><code>{{ module.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 120px 0;
  background: var(--color-bg-elevated);
}

.section-header {
  margin-bottom: 64px;
}

.section-num {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 16px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 400;
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  max-width: 480px;
}

.modules {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.module {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: var(--transition);
}

.module:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.module-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-dim);
  border-radius: var(--radius-md);
  color: var(--color-accent);
}

.module-info h3 {
  font-size: 18px;
  font-weight: 500;
}

.module-size {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
}

.module-desc {
  color: var(--color-text-secondary);
  margin-bottom: 14px;
  font-size: 14px;
  line-height: 1.6;
}

.module-features {
  list-style: none;
  margin-bottom: 14px;
}

.module-features li {
  padding: 4px 0 4px 16px;
  position: relative;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.module-features li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-size: 12px;
}

.module-detail {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
}

.code-section {
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
}

.code-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-family: var(--font-body);
  transition: var(--transition);
}

.code-toggle:hover {
  color: var(--color-accent);
}

.code-toggle svg {
  transition: var(--transition);
}

.code-toggle svg.rotated {
  transform: rotate(180deg);
}

.code-file {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
}

.code-block {
  margin-top: 8px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-code-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  animation: slideDown 0.3s ease-out;
}

.code-block pre {
  padding: 16px;
  overflow-x: auto;
  margin: 0;
}

.code-block code {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .section { padding: 80px 0; }
  .modules { grid-template-columns: 1fr; }
}
</style>
