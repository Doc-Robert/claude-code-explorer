<script setup lang="ts">
defineProps<{
  name: string
  size?: number
}>()
</script>

<template>
  <svg
    :width="size || 24"
    :height="size || 24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <!-- UI Layer - 窗口/屏幕 -->
    <path v-if="name === 'ui'" d="M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V15C20 16.1046 19.1046 17 18 17H6C4.89543 17 4 16.1046 4 15V5Z" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'ui'" d="M8 21H16M12 17V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path v-if="name === 'ui'" d="M7 8H17M7 12H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Command - 命令行 -->
    <path v-if="name === 'command'" d="M7 8L4 12L7 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path v-if="name === 'command'" d="M17 8L20 12L17 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path v-if="name === 'command'" d="M14 6L10 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Query/Brain - 大脑/处理 -->
    <path v-if="name === 'query'" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'query'" d="M12 3C9.5 6 8 9 8 12C8 15 9.5 18 12 21" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'query'" d="M12 3C14.5 6 16 9 16 12C16 15 14.5 18 12 21" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'query'" d="M3.5 9H20.5M3.5 15H20.5" stroke="currentColor" stroke-width="1.5"/>

    <!-- Tool - 扳手 -->
    <path v-if="name === 'tool'" d="M14.7 6.3C14.3 5.1 14.5 3.7 15.5 2.7C17.4 0.8 20.5 0.8 22.4 2.7L20.3 4.8L18.6 3.1L19.2 2.5C18 1.3 16 1.3 14.8 2.5C13.9 3.4 13.6 4.7 13.8 5.9L5.1 14.6C4.7 14.4 4.2 14.3 3.7 14.3C1.6 14.3 0 16 0 18C0 20 1.6 21.7 3.7 21.7C5.7 21.7 7.4 20 7.4 18C7.4 17.5 7.2 17 7 16.6L14.7 6.3Z" fill="currentColor"/>

    <!-- Permission - 盾牌 -->
    <path v-if="name === 'permission'" d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'permission'" d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- API - 云 -->
    <path v-if="name === 'api'" d="M4 15C1.79086 15 0 13.2091 0 11C0 8.79086 1.79086 7 4 7C4.33921 7 4.66911 7.03906 4.98477 7.11285C6.07367 4.66906 8.58838 3 11.5 3C15.6421 3 19 6.35786 19 10.5C19 10.6713 18.9949 10.8411 18.9849 11.0093C19.3211 11.0031 19.66 11 20 11C22.2091 11 24 12.7909 24 15C24 17.2091 22.2091 19 20 19H4C1.79086 19 0 17.2091 0 15Z" fill="currentColor"/>

    <!-- Session - 数据库 -->
    <path v-if="name === 'session'" d="M4 7C4 5.34315 7.58172 4 12 4C16.4183 4 20 5.34315 20 7V17C20 18.6569 16.4183 20 12 20C7.58172 20 4 18.6569 4 17V7Z" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'session'" d="M4 12C4 10.3431 7.58172 9 12 9C16.4183 9 20 10.3431 20 12" stroke="currentColor" stroke-width="1.5"/>

    <!-- File - 文件 -->
    <path v-if="name === 'file'" d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'file'" d="M14 2V8H20" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'file'" d="M8 13H16M8 17H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Execution - 闪电 -->
    <path v-if="name === 'execution'" d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>

    <!-- Agent - 机器人 -->
    <rect v-if="name === 'agent'" x="5" y="8" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'agent'" d="M9 8V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V8" stroke="currentColor" stroke-width="1.5"/>
    <circle v-if="name === 'agent'" cx="9" cy="14" r="1.5" fill="currentColor"/>
    <circle v-if="name === 'agent'" cx="15" cy="14" r="1.5" fill="currentColor"/>
    <path v-if="name === 'agent'" d="M9 18H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Web - 地球 -->
    <circle v-if="name === 'web'" cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'web'" d="M3 12H21" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'web'" d="M12 3C14.5 6.5 16 9.5 16 12C16 14.5 14.5 17.5 12 21" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'web'" d="M12 3C9.5 6.5 8 9.5 8 12C8 14.5 9.5 17.5 12 21" stroke="currentColor" stroke-width="1.5"/>

    <!-- Plugin - 插头 -->
    <path v-if="name === 'plugin'" d="M7 4V10M17 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path v-if="name === 'plugin'" d="M5 10H19V14C19 17.866 15.866 21 12 21C8.13401 21 5 17.866 5 14V10Z" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'plugin'" d="M12 14V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Schedule - 时钟 -->
    <circle v-if="name === 'schedule'" cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'schedule'" d="M12 7V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Insight - 灯泡 -->
    <path v-if="name === 'insight'" d="M12 2C8.13401 2 5 5.13401 5 9C5 11.39 6.21 13.5 8.11 14.71C8.67 15.08 9 15.71 9 16.38V17C9 18.1046 9.89543 19 11 19H13C14.1046 19 15 18.1046 15 17V16.38C15 15.71 15.33 15.08 15.89 14.71C17.79 13.5 19 11.39 19 9C19 5.13401 15.866 2 12 2Z" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'insight'" d="M9 21H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Stream - 波浪 -->
    <path v-if="name === 'stream'" d="M2 8C4 6 6 10 8 8C10 6 12 10 14 8C16 6 18 10 20 8C22 6 22 6 22 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path v-if="name === 'stream'" d="M2 14C4 12 6 16 8 14C10 12 12 16 14 14C16 12 18 16 20 14C22 12 22 12 22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Arrow Right -->
    <path v-if="name === 'arrow-right'" d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Menu -->
    <path v-if="name === 'menu'" d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Close -->
    <path v-if="name === 'close'" d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Github - 代码仓库 -->
    <path v-if="name === 'github'" d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>

    <!-- 混音器/滑块 -->
    <path v-if="name === 'slider'" d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <circle v-if="name === 'slider'" cx="8" cy="7" r="2" fill="white" stroke="currentColor" stroke-width="1.5"/>
    <circle v-if="name === 'slider'" cx="16" cy="12" r="2" fill="white" stroke="currentColor" stroke-width="1.5"/>
    <circle v-if="name === 'slider'" cx="10" cy="17" r="2" fill="white" stroke="currentColor" stroke-width="1.5"/>

    <!-- 节点/网络 -->
    <circle v-if="name === 'node'" cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
    <circle v-if="name === 'node'" cx="4" cy="6" r="2" stroke="currentColor" stroke-width="1.5"/>
    <circle v-if="name === 'node'" cx="20" cy="6" r="2" stroke="currentColor" stroke-width="1.5"/>
    <circle v-if="name === 'node'" cx="4" cy="18" r="2" stroke="currentColor" stroke-width="1.5"/>
    <circle v-if="name === 'node'" cx="20" cy="18" r="2" stroke="currentColor" stroke-width="1.5"/>
    <path v-if="name === 'node'" d="M6 7L10 10M18 7L14 10M6 17L10 14M18 17L14 14" stroke="currentColor" stroke-width="1.5"/>

    <!-- 分层 -->
    <path v-if="name === 'layers'" d="M2 12L12 7L22 12L12 17L2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path v-if="name === 'layers'" d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path v-if="name === 'layers'" d="M2 7L12 2L22 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
