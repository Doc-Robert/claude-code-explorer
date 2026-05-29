<script setup lang="ts">
import { insights } from '../data'
import AppIcons from '../icons/AppIcons.vue'
</script>

<template>
  <section class="section" id="insights">
    <div class="container">
      <div class="section-header">
        <span class="section-num">05</span>
        <h2 class="section-title">深度洞察</h2>
        <p class="section-subtitle">关键设计决策和实现细节</p>
      </div>

      <div class="grid">
        <div v-for="item in insights" :key="item.title" class="card">
          <div class="card-icon">
            <AppIcons :name="item.icon" :size="20" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <code>{{ item.code }}</code>
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

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-accent), transparent);
  opacity: 0;
  transition: var(--transition);
}

.card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
}

.card:hover::before {
  opacity: 1;
}

.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-dim);
  border-radius: var(--radius-md);
  color: var(--color-accent);
  margin-bottom: 16px;
}

.card h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.card p {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.card code {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 8px;
  background: var(--color-code-bg);
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  .section { padding: 80px 0; }
  .grid { grid-template-columns: 1fr; }
}
</style>
