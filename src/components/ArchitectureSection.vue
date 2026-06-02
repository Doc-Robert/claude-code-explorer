<script setup lang="ts">
import { ref } from 'vue'
import { archLayers } from '../data'
import AppIcons from '../icons/AppIcons.vue'

const expandedLayer = ref<string | null>(null)
const toggleLayer = (id: string) => {
  expandedLayer.value = expandedLayer.value === id ? null : id
}
</script>

<template>
  <section class="section" id="architecture">
    <div class="container">
      <div class="section-header scroll-reveal">
        <span class="section-num">01</span>
        <h2 class="section-title">系统架构全景</h2>
        <p class="section-subtitle">从用户交互到 LLM 推理，每一层都有明确的职责和边界</p>
      </div>

      <div class="layers scroll-reveal delay-1" role="list">
        <div
          v-for="(layer, index) in archLayers"
          :key="layer.id"
          class="layer"
          :class="{ expanded: expandedLayer === layer.id }"
          role="listitem"
        >
          <button
            class="layer-header"
            :aria-expanded="expandedLayer === layer.id"
            :aria-controls="'layer-content-' + layer.id"
            @click="toggleLayer(layer.id)"
          >
            <span class="layer-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="layer-icon" aria-hidden="true">
              <AppIcons :name="layer.icon" :size="20" />
            </div>
            <div class="layer-info">
              <h3>{{ layer.title }}</h3>
              <span class="layer-tag">{{ layer.tag }}</span>
            </div>
            <div class="layer-toggle" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>

          <div
            v-if="expandedLayer === layer.id"
            :id="'layer-content-' + layer.id"
            class="layer-content"
            role="region"
          >
            <p class="layer-desc">{{ layer.description }}</p>
            <ul class="layer-details">
              <li v-for="detail in layer.details" :key="detail">{{ detail }}</li>
            </ul>
            <div class="layer-files">
              <code v-for="file in layer.files" :key="file">{{ file }}</code>
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
  position: relative;
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
  letter-spacing: -0.02em;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 2px;
  margin-top: 16px;
  background: linear-gradient(90deg, var(--color-accent), transparent);
}

.section-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  max-width: 480px;
}

.layers {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.layer {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: var(--transition);
  position: relative;
}

.layer::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.layer:hover {
  background: var(--color-bg-card);
  border-color: transparent;
}

.layer:hover::before {
  opacity: 0.4;
}

.layer.expanded {
  border-color: transparent;
  box-shadow: 0 0 40px var(--color-accent-dim);
}

.layer.expanded::before {
  opacity: 1;
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
  text-align: left;
  min-height: 48px;
}

.layer-index {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
  width: 24px;
}

.layer-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-dim);
  border-radius: var(--radius-md);
  color: var(--color-accent);
  flex-shrink: 0;
}

.layer-info {
  flex: 1;
}

.layer-info h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 2px;
}

.layer-tag {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
}

.layer-toggle {
  color: var(--color-text-muted);
  transition: transform 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.layer.expanded .layer-toggle {
  transform: rotate(180deg);
  color: var(--color-accent);
}

.layer-content {
  padding: 0 24px 24px;
  padding-left: 80px;
  animation: slideDown 0.3s ease-out;
}

.layer-desc {
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  line-height: 1.7;
  font-size: 14px;
}

.layer-details {
  list-style: none;
  margin-bottom: 16px;
}

.layer-details li {
  padding: 6px 0 6px 16px;
  position: relative;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.layer-details li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

.layer-files {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.layer-files code {
  padding: 4px 10px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-code-border);
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}

@keyframes slideDown {
  from { opacity: 0; max-height: 0; }
  to   { opacity: 1; max-height: 500px; }
}

@media (max-width: 768px) {
  .section { padding: 80px 0; }
  .layer-content { padding-left: 24px; }
  .layer-header { padding: 16px 20px; }
}
</style>
