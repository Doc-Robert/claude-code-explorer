<script setup lang="ts">
import { toolCategories } from '../data'
import AppIcons from '../icons/AppIcons.vue'
</script>

<template>
  <section class="section" id="tools">
    <div class="container">
      <div class="section-header">
        <span class="section-num">03</span>
        <h2 class="section-title">工具系统</h2>
        <p class="section-subtitle">42 个内置工具，覆盖文件操作、代码执行、搜索、MCP 集成等场景</p>
      </div>

      <div class="categories">
        <div v-for="cat in toolCategories" :key="cat.name" class="category">
          <div class="cat-header">
            <div class="cat-icon">
              <AppIcons :name="cat.icon" :size="18" />
            </div>
            <h3>{{ cat.name }}</h3>
            <span class="cat-count">{{ cat.count }}</span>
          </div>
          <div class="cat-tools">
            <div v-for="tool in cat.tools" :key="tool.name" class="tool">
              <span class="tool-name">{{ tool.name }}</span>
              <span class="tool-desc">{{ tool.desc }}</span>
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
  max-width: 480px;
}

.categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.category {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}

.category:hover {
  border-color: var(--color-border-hover);
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
}

.cat-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-dim);
  border-radius: var(--radius-sm);
  color: var(--color-accent);
}

.cat-header h3 {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.cat-count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent);
  background: var(--color-accent-dim);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.cat-tools {
  padding: 8px;
}

.tool {
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.tool:hover {
  background: rgba(255, 255, 255, 0.02);
}

.tool-name {
  display: block;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 2px;
}

.tool-desc {
  font-size: 11px;
  color: var(--color-text-muted);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .section { padding: 80px 0; }
  .categories { grid-template-columns: 1fr; }
}
</style>
