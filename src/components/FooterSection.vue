<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-logo">
          <span class="logo-dot"></span>
          <span>Claude Code Explorer</span>
        </div>
        <p class="footer-desc">基于 Anthropic Claude Code 源码分析</p>
        <div class="footer-author">
          <span class="author-label">Author</span>
          <span class="author-name">Robert</span>
        </div>
        <div class="footer-copy">© 2026 · 仅供学习研究使用</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 60px 0;
  border-top: 1px solid var(--color-border);
}

.footer-inner {
  text-align: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 18px;
  margin-bottom: 12px;
}

.logo-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
}

.footer-desc {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-bottom: 16px;
}

.footer-author {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: var(--color-accent-dim);
  border-radius: 100px;
  margin-bottom: 16px;
}

.author-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.author-name {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--color-accent);
  font-style: italic;
}

.footer-copy {
  color: var(--color-text-muted);
  font-size: 12px;
}
</style>
