<script setup lang="ts">
const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}
</script>

<template>
  <section class="hero" id="overview">
    <div class="hero-bg">
      <div class="hero-grid"></div>
    </div>
    
    <div class="hero-layout">
      <div class="hero-content">
        <div class="hero-label">Source Code Analysis</div>
        
        <h1 class="hero-title">
          <span class="title-line">深入理解</span>
          <span class="title-line accent">Claude Code</span>
          <span class="title-line">架构设计</span>
        </h1>
        
        <p class="hero-desc">
          全面剖析 Anthropic 最新 Code Agent 的核心架构、工具系统、权限模型和多智能体协作机制
        </p>
        
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">803K+</span>
            <span class="stat-label">Lines of Code</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">42</span>
            <span class="stat-label">Built-in Tools</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">7</span>
            <span class="stat-label">Permission Modes</span>
          </div>
        </div>
        
        <div class="hero-actions">
          <button class="btn-primary" @click="scrollTo('architecture')">
            开始探索
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="hero-code">
        <div class="code-window">
          <div class="code-bar">
            <div class="code-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="code-filename">query.ts</span>
          </div>
          <pre class="code-content"><code><span class="comment">// Claude Code 核心查询循环</span>
<span class="keyword">async function</span>* <span class="function">query</span>(messages, tools) {
  <span class="keyword">const</span> stream = <span class="keyword">await</span> claude.<span class="function">stream</span>({
    messages,
    tools,
    system: systemPrompt
  })
  
  <span class="keyword">for await</span> (<span class="keyword">const</span> event <span class="keyword">of</span> stream) {
    <span class="keyword">if</span> (event.type === <span class="string">'tool_use'</span>) {
      <span class="keyword">yield await</span> <span class="function">executeTool</span>(event)
    }
  }
}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 40px 80px;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%);
}

/* 关键：左右分栏布局 */
.hero-layout {
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-content {
  text-align: left;
}

.hero-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 24px;
  animation: fadeInUp 0.6s ease-out;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  line-height: 1.15;
  margin-bottom: 24px;
  animation: fadeInUp 0.6s ease-out 0.1s both;
}

.title-line {
  display: block;
}

.title-line.accent {
  color: var(--color-accent);
  font-style: italic;
}

.hero-desc {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 36px;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 36px;
  animation: fadeInUp 0.6s ease-out 0.3s both;
}

.stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--color-text);
}

.stat-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--color-border);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--color-accent);
  color: var(--color-bg);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-body);
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.btn-primary:hover {
  background: #F0B860;
  transform: translateY(-2px);
}

/* 右侧代码窗口 */
.hero-code {
  animation: fadeIn 1s ease-out 0.5s both;
}

.code-window {
  background: var(--color-code-bg);
  border: 1px solid var(--color-code-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
}

.code-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--color-code-border);
}

.code-dots {
  display: flex;
  gap: 6px;
}

.code-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.code-dots span:first-child { background: #FF5F56; }
.code-dots span:nth-child(2) { background: #FFBD2E; }
.code-dots span:nth-child(3) { background: #27C93F; }

.code-filename {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
}

.code-content {
  padding: 20px;
  margin: 0;
  overflow-x: auto;
}

.code-content code {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.comment { color: #6A737D; }
.keyword { color: #F97583; }
.function { color: #B392F0; }
.string { color: #9ECBFF; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 1024px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .hero-code {
    max-width: 500px;
  }
}

@media (max-width: 640px) {
  .hero { padding: 100px 20px 60px; }
  .hero-stats { flex-direction: column; align-items: flex-start; gap: 12px; }
  .stat-divider { width: 40px; height: 1px; }
}
</style>
