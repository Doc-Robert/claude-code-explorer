<script setup lang="ts">
import { flowSteps } from '../data'
import AppIcons from '../icons/AppIcons.vue'
</script>

<template>
  <section class="section section-alt" id="flow">
    <div class="container">
      <div class="section-header">
        <span class="section-num">04</span>
        <h2 class="section-title">执行流程</h2>
        <p class="section-subtitle">从用户输入到最终响应的完整执行链路</p>
      </div>

      <div class="steps">
        <div v-for="step in flowSteps" :key="step.step" class="step">
          <div class="step-marker">
            <span class="step-num">{{ step.step }}</span>
            <div class="step-line"></div>
          </div>
          <div class="step-content">
            <div class="step-header">
              <div class="step-icon">
                <AppIcons :name="step.icon" :size="18" />
              </div>
              <h4>{{ step.title }}</h4>
            </div>
            <p class="step-desc">{{ step.description }}</p>
            <div class="step-detail">
              <code>{{ step.detail }}</code>
              <ul>
                <li v-for="item in step.items" :key="item">{{ item }}</li>
              </ul>
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
}

.section-alt {
  background: var(--color-bg-elevated);
}

.section-header { margin-bottom: 64px; }

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
}

.steps {
  max-width: 640px;
}

.step {
  display: flex;
  gap: 24px;
}

.step-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  color: var(--color-bg);
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font-mono);
}

.step-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin: 8px 0;
}

.step:last-child .step-line { display: none; }

.step-content {
  flex: 1;
  padding-bottom: 32px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.step-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-dim);
  border-radius: var(--radius-sm);
  color: var(--color-accent);
}

.step-header h4 {
  font-size: 16px;
  font-weight: 500;
}

.step-desc {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-bottom: 12px;
}

.step-detail {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 14px;
}

.step-detail code {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent);
}

.step-detail ul {
  margin-top: 8px;
  list-style: none;
}

.step-detail li {
  padding: 3px 0 3px 14px;
  position: relative;
  font-size: 12px;
  color: var(--color-text-muted);
}

.step-detail li::before {
  content: '·';
  position: absolute;
  left: 2px;
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .section { padding: 80px 0; }
}
</style>
