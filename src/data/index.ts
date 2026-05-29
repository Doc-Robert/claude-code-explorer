export interface ArchLayer {
  id: string
  icon: string
  title: string
  tag: string
  description: string
  details: string[]
  files: string[]
}

export interface CoreModule {
  id: string
  icon: string
  name: string
  size: string
  description: string
  features: string[]
  code: string
  details: string
}

export interface ToolCategory {
  icon: string
  name: string
  count: number
  tools: { name: string; desc: string }[]
}

export interface FlowStep {
  step: number
  icon: string
  title: string
  description: string
  detail: string
  items: string[]
}

export interface Insight {
  icon: string
  title: string
  description: string
  code: string
}

export const archLayers: ArchLayer[] = [
  {
    id: 'ui',
    icon: 'ui',
    title: 'UI 层 (Ink + React)',
    tag: 'Terminal UI',
    description: '基于 Ink (React for CLI) 构建的终端用户界面，提供交互式对话、工具输出渲染、权限提示等功能',
    details: [
      '使用 React 的声明式组件模型构建终端 UI',
      '支持富文本渲染：Markdown、代码高亮、表格、Diff',
      '虚拟列表优化长对话性能',
      '主题系统支持亮色/暗色切换',
      '键盘快捷键和 Vim 模式支持'
    ],
    files: ['src/components/', 'src/ink.ts', 'src/dialogLaunchers.tsx']
  },
  {
    id: 'command',
    icon: 'command',
    title: '命令处理层',
    tag: 'Command System',
    description: '处理用户输入，区分斜杠命令、Bash 命令和自然语言提示，路由到对应的处理器',
    details: [
      '100+ 内置斜杠命令 (/help, /compact, /model...)',
      'Bash 命令识别和安全检查',
      '命令自动补全和历史记录',
      '插件命令动态加载',
      '命令参数解析和验证'
    ],
    files: ['src/commands.ts', 'src/utils/processUserInput/', 'src/commands/']
  },
  {
    id: 'query',
    icon: 'query',
    title: '查询引擎层',
    tag: 'Query Engine',
    description: '核心对话循环，管理消息历史、上下文压缩、流式响应处理和工具调用编排',
    details: [
      '流式 SSE 响应实时处理',
      '消息历史管理和持久化',
      '自动上下文压缩 (autoCompact + microCompact)',
      '工具调用编排和并行执行',
      '错误处理和重试机制',
      '会话恢复和断点续传'
    ],
    files: ['src/query.ts', 'src/QueryEngine.ts', 'src/services/compact/']
  },
  {
    id: 'tool',
    icon: 'tool',
    title: '工具执行层',
    tag: 'Tool System',
    description: '42 个内置工具的统一抽象，包括文件操作、Shell 执行、搜索、MCP 集成等',
    details: [
      '统一的 Tool 接口：validate, execute, render',
      '工具结果序列化和压缩',
      '进度报告和实时更新',
      '工具搜索和动态发现',
      '权限检查集成',
      'MCP 协议工具扩展'
    ],
    files: ['src/Tool.ts', 'src/tools.ts', 'src/tools/']
  },
  {
    id: 'permission',
    icon: 'permission',
    title: '权限安全层',
    tag: 'Permissions',
    description: '7 种权限模式，细粒度的文件系统和命令权限控制，保障操作安全',
    details: [
      '7 种权限模式：default, plan, acceptEdits, bypassPermissions, dontAsk, auto, bubble',
      '文件系统路径级权限控制',
      'Shell 命令安全分类 (只读/写入/危险)',
      '权限规则解析器和匹配引擎',
      '自动批准规则配置',
      '权限决策日志和审计'
    ],
    files: ['src/types/permissions.ts', 'src/utils/permissions/']
  },
  {
    id: 'api',
    icon: 'api',
    title: 'API 服务层',
    tag: 'API Client',
    description: '与 Anthropic API 的集成，支持流式响应、重试机制、成本追踪和多种 Provider',
    details: [
      'Anthropic Messages API 集成',
      '流式 SSE 响应处理',
      '指数退避重试机制',
      '成本追踪和用量统计',
      '多 Provider 支持 (AWS Bedrock, Google Vertex)',
      'Beta 特性标志管理'
    ],
    files: ['src/services/api/claude.ts', 'src/cost-tracker.ts']
  }
]

export const coreModules: CoreModule[] = [
  {
    id: 'query',
    icon: 'query',
    name: 'QueryEngine',
    size: '46,630 bytes',
    description: 'Claude Code 的大脑，负责管理整个对话循环',
    features: ['消息历史管理与持久化', '流式响应处理 (SSE)', '工具调用编排与结果收集', '上下文窗口管理', '会话恢复与断点续传'],
    code: `// query.ts - 核心查询循环
export async function query(
  messages: Message[],
  tools: Tools,
  context: QueryContext
): Promise<QueryResult> {
  // 构建系统提示词
  const systemPrompt = await buildSystemPrompt(context);
  
  // 调用 Claude API (流式)
  const stream = await claude.stream({
    messages: normalizeMessagesForAPI(messages),
    tools: tools.map(toolToAPISchema),
    system: systemPrompt,
    model: getModel(),
    max_tokens: getMaxTokens()
  });
  
  // 处理流式响应
  for await (const event of stream) {
    switch (event.type) {
      case 'text':
        yield { type: 'text', content: event.text };
        break;
      case 'tool_use':
        // 执行工具并收集结果
        const result = await executeTool(event, context);
        messages.push(createToolResultMessage(result));
        break;
      case 'stop':
        return { messages, usage: event.usage };
    }
  }
}`,
    details: 'QueryEngine 是整个系统的核心，实现了一个完整的 LLM 对话循环。它处理消息序列化、上下文压缩、工具编排等复杂逻辑，确保对话流畅进行。'
  },
  {
    id: 'tool',
    icon: 'tool',
    name: 'Tool 抽象层',
    size: '29,516 bytes',
    description: '统一的工具接口定义和执行框架',
    features: ['Tool 接口定义 (validate, execute, render)', '权限检查集成', '工具结果序列化', '进度报告机制', '工具搜索与发现'],
    code: `// Tool.ts - 工具接口定义
export interface Tool<TInput = unknown> {
  name: string;
  description: string;
  inputSchema: JSONSchema;
  
  // 验证输入参数
  validate(input: unknown): ValidationResult;
  
  // 执行工具逻辑
  execute(
    input: TInput,
    context: ToolUseContext
  ): Promise<ToolResult>;
  
  // 渲染工具输出 (React 组件)
  render(result: ToolResult): ReactNode;
  
  // 检查是否需要权限
  requiresPermission(input: TInput): PermissionCheck;
}

// 工具工厂函数
export function buildTool<T>(def: ToolDef<T>): Tool<T> {
  return {
    ...def,
    validate: def.validate ?? defaultValidate,
    render: def.render ?? defaultRender
  };
}`,
    details: 'Tool 抽象层定义了所有工具的统一接口，使得 42 个内置工具和 MCP 扩展工具都遵循相同的模式。这大大简化了工具的开发和维护。'
  },
  {
    id: 'context',
    icon: 'layers',
    name: 'Context 管理',
    size: '6,446 bytes',
    description: '系统提示词构建和上下文注入',
    features: ['Git 状态信息收集', 'CLAUDE.md 文件加载', '工作目录感知', '系统提示词组装', '记忆文件注入'],
    code: `// context.ts - 上下文构建
export const getSystemContext = memoize(async () => {
  const parts: string[] = [];
  
  // 1. 基础系统提示
  parts.push(getBaseSystemPrompt());
  
  // 2. Git 状态信息
  const gitStatus = await getGitStatus();
  if (gitStatus) {
    parts.push(formatGitStatus(gitStatus));
  }
  
  // 3. CLAUDE.md 文件
  const claudeMd = await getClaudeMds();
  parts.push(...claudeMd);
  
  // 4. 记忆文件
  const memory = await getMemoryFiles();
  parts.push(...memory);
  
  // 5. 环境信息
  parts.push(formatEnvironmentInfo());
  
  return parts.join('\n\n');
});

// Git 状态收集
async function getGitStatus() {
  const [branch, status, log] = await Promise.all([
    getBranch(),
    exec('git status --short'),
    exec('git log --oneline -5')
  ]);
  return { branch, status, log };
}`,
    details: 'Context 管理负责构建完整的系统提示词，包括项目上下文、Git 状态、用户记忆等信息。这些上下文帮助 Claude 更好地理解当前工作环境。'
  },
  {
    id: 'permission',
    icon: 'permission',
    name: '权限系统',
    size: '13,145 bytes',
    description: '细粒度的操作权限控制',
    features: ['7 种权限模式 (default, plan, acceptEdits...)', '文件系统路径级权限', 'Shell 命令安全分类', '权限规则解析器', '自动批准规则'],
    code: `// permissions.ts - 权限模式定义
export type PermissionMode = 
  | 'default'           // 默认询问模式
  | 'plan'              // 只读规划模式
  | 'acceptEdits'       // 自动接受文件编辑
  | 'bypassPermissions' // 跳过所有权限检查
  | 'dontAsk'           // 不询问直接拒绝
  | 'auto'              // 自动模式 (分类器决定)
  | 'bubble';           // 冒泡到父级

// 权限检查流程
export async function checkPermission(
  tool: Tool,
  input: unknown,
  context: PermissionContext
): Promise<PermissionResult> {
  // 1. 检查权限模式
  const mode = getPermissionMode();
  
  // 2. 检查自动批准规则
  const rule = await findMatchingRule(tool, input);
  if (rule) return { allowed: true, rule };
  
  // 3. 根据模式决定行为
  switch (mode) {
    case 'plan':
      return { allowed: false, reason: 'Plan mode' };
    case 'acceptEdits':
      return { allowed: true, reason: 'Auto-accept' };
    case 'default':
      return promptUser(tool, input);
  }
}`,
    details: '权限系统是 Claude Code 安全性的核心。它支持多种权限模式，可以细粒度控制文件访问、命令执行等操作，确保 AI 不会执行危险操作。'
  },
  {
    id: 'state',
    icon: 'session',
    name: '状态管理',
    size: '56,109 bytes',
    description: '应用状态的统一管理',
    features: ['React Context + Store 模式', '会话状态持久化', '消息队列管理', '配置状态同步', '状态变更通知'],
    code: `// AppState.tsx - 状态定义
export interface AppState {
  // 会话状态
  messages: Message[];
  sessionId: string;
  isProcessing: boolean;
  
  // 权限状态
  permissionMode: PermissionMode;
  
  // 模型状态
  currentModel: string;
  
  // UI 状态
  abortController: AbortController | null;
  
  // 成本状态
  totalCost: number;
  totalTokens: number;
}

// 状态存储
export function createStore(initial?: Partial<AppState>) {
  let state: AppState = {
    ...getDefaultAppState(),
    ...initial
  };
  
  const listeners = new Set<(state: AppState) => void>();
  
  return {
    getState: () => state,
    setState: (update: Partial<AppState>) => {
      state = { ...state, ...update };
      listeners.forEach(fn => fn(state));
    },
    subscribe: (fn: (state: AppState) => void) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}`,
    details: '状态管理使用类似 Redux 的 Store 模式，但更轻量。它管理会话、权限、模型、UI 等所有状态，确保状态变更可追踪、可持久化。'
  },
  {
    id: 'session',
    icon: 'session',
    name: '会话存储',
    size: '180,620 bytes',
    description: '会话数据的持久化和恢复',
    features: ['消息历史序列化', '会话元数据管理', '跨会话搜索', '会话导出功能', '存储空间管理'],
    code: `// sessionStorage.ts - 会话存储
export class SessionStorage {
  private storagePath: string;
  
  constructor() {
    this.storagePath = getSessionStoragePath();
  }
  
  // 保存会话
  async save(session: Session): Promise<void> {
    const data = {
      id: session.id,
      messages: session.messages,
      metadata: {
        createdAt: session.createdAt,
        updatedAt: Date.now(),
        model: session.model,
        cost: session.cost
      }
    };
    
    await fs.writeFile(
      this.getPath(session.id),
      JSON.stringify(data, null, 2)
    );
  }
  
  // 加载会话
  async load(id: string): Promise<Session> {
    const data = await fs.readFile(this.getPath(id), 'utf-8');
    return JSON.parse(data);
  }
  
  // 搜索会话
  async search(query: string): Promise<Session[]> {
    const sessions = await this.list();
    return sessions.filter(s => 
      s.messages.some(m => 
        m.content.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
}`,
    details: '会话存储负责将对话历史持久化到磁盘，支持会话的保存、加载、搜索和导出。使用 JSON 格式存储，便于调试和迁移。'
  }
]

export const toolCategories: ToolCategory[] = [
  {
    icon: 'file',
    name: '文件操作',
    count: 6,
    tools: [
      { name: 'FileReadTool', desc: '读取文件内容，支持图片、PDF 等格式，自动检测编码' },
      { name: 'FileWriteTool', desc: '创建或覆盖写入文件，支持目录自动创建' },
      { name: 'FileEditTool', desc: '精确的查找替换编辑，保留文件格式' },
      { name: 'GlobTool', desc: '按模式匹配查找文件，支持 glob 语法' },
      { name: 'GrepTool', desc: '在文件内容中搜索，基于 ripgrep，支持正则' },
      { name: 'NotebookEditTool', desc: 'Jupyter Notebook 单元格编辑' }
    ]
  },
  {
    icon: 'execution',
    name: '执行工具',
    count: 3,
    tools: [
      { name: 'BashTool', desc: 'Shell 命令执行，支持后台任务、超时控制、输出捕获' },
      { name: 'PowerShellTool', desc: 'Windows PowerShell 执行，完整的安全检查' },
      { name: 'REPLTool', desc: '交互式代码执行，支持 Node.js 和 Python' }
    ]
  },
  {
    icon: 'agent',
    name: '智能体工具',
    count: 8,
    tools: [
      { name: 'AgentTool', desc: '子智能体生成和管理，支持并行执行' },
      { name: 'TaskCreateTool', desc: '创建异步任务，支持进度追踪' },
      { name: 'TaskUpdateTool', desc: '更新任务状态和进度' },
      { name: 'TeamCreateTool', desc: '创建智能体团队，分配角色' },
      { name: 'SendMessageTool', desc: '跨智能体消息发送和协调' },
      { name: 'SkillTool', desc: '技能加载和管理，支持动态发现' },
      { name: 'TodoWriteTool', desc: '任务列表管理，支持优先级排序' },
      { name: 'ToolSearchTool', desc: '工具搜索发现，按名称或功能搜索' }
    ]
  },
  {
    icon: 'web',
    name: '网络工具',
    count: 2,
    tools: [
      { name: 'WebFetchTool', desc: '获取网页内容，支持 HTML 转 Markdown' },
      { name: 'WebSearchTool', desc: '网络搜索，支持多搜索引擎' }
    ]
  },
  {
    icon: 'plugin',
    name: 'MCP 集成',
    count: 4,
    tools: [
      { name: 'MCPTool', desc: 'MCP 服务器工具调用，统一接口' },
      { name: 'McpAuthTool', desc: 'MCP 认证管理，OAuth 支持' },
      { name: 'ListMcpResourcesTool', desc: '列出 MCP 服务器资源' },
      { name: 'ReadMcpResourceTool', desc: '读取 MCP 资源内容' }
    ]
  },
  {
    icon: 'schedule',
    name: '调度工具',
    count: 4,
    tools: [
      { name: 'CronCreateTool', desc: '创建定时任务，支持 Cron 表达式' },
      { name: 'CronDeleteTool', desc: '删除定时任务' },
      { name: 'CronListTool', desc: '列出所有定时任务' },
      { name: 'RemoteTriggerTool', desc: '远程触发器，支持 Webhook' }
    ]
  }
]

export const flowSteps: FlowStep[] = [
  {
    step: 1,
    icon: 'command',
    title: '用户输入',
    description: '用户在终端输入提示或命令',
    detail: 'processUserInput() 分析输入类型：',
    items: ['斜杠命令 (/help, /compact, /model...)', 'Bash 命令 (!ls, !git status...)', '自然语言提示', '图片/文件附件']
  },
  {
    step: 2,
    icon: 'layers',
    title: '上下文构建',
    description: '组装系统提示词和上下文信息',
    detail: 'fetchSystemPromptParts() 收集：',
    items: ['基础系统提示词 (角色、能力、限制)', 'Git 状态 (分支、提交、变更)', 'CLAUDE.md 项目配置', '记忆文件 (用户偏好、约定)', '工具定义和权限规则']
  },
  {
    step: 3,
    icon: 'api',
    title: 'API 调用',
    description: '发送请求到 Anthropic API',
    detail: 'claude.stream() 流式请求：',
    items: ['消息历史 (messages)', '工具定义 (tools schema)', '系统提示 (system prompt)', '模型参数 (model, max_tokens, temperature)']
  },
  {
    step: 4,
    icon: 'stream',
    title: '流式处理',
    description: '处理 SSE 流式响应',
    detail: 'QueryEngine 处理事件流：',
    items: ['文本块 (text delta) → 实时渲染', '工具调用 (tool_use) → 执行工具', '思考过程 (thinking) → 显示推理', '结束信号 (stop) → 完成响应']
  },
  {
    step: 5,
    icon: 'tool',
    title: '工具执行',
    description: '执行 LLM 请求的工具调用',
    detail: 'executeTool() 执行流程：',
    items: ['权限检查 (requiresPermission)', '输入验证 (validate)', '工具执行 (execute)', '结果序列化和压缩']
  },
  {
    step: 6,
    icon: 'query',
    title: '结果返回',
    description: '将工具结果返回给 LLM',
    detail: 'query() 循环继续：',
    items: ['工具结果添加到消息历史', '再次调用 API 继续对话', '重复直到 LLM 发出 stop', '自动压缩上下文 (如需要)']
  }
]

export const insights: Insight[] = [
  {
    icon: 'stream',
    title: '流式架构',
    description: '整个系统基于流式处理设计，从 API 响应到 UI 渲染都是流式的，确保用户能实时看到 LLM 的输出，无需等待完整响应',
    code: 'SSE (Server-Sent Events) + React Ink 实时渲染'
  },
  {
    icon: 'tool',
    title: '插件化工具',
    description: '工具系统采用插件化设计，每个工具都是独立模块，通过统一接口集成。支持动态加载、权限检查、进度报告',
    code: 'buildTool() 工厂 + Tool 接口契约'
  },
  {
    icon: 'permission',
    title: '多层权限',
    description: '权限系统分为多层：工具级、路径级、命令级，配合 7 种权限模式实现细粒度控制，确保安全性',
    code: 'PermissionRule + PermissionMode + Classifier'
  },
  {
    icon: 'agent',
    title: '多智能体协作',
    description: '支持生成子智能体并行处理任务，通过消息队列实现智能体间通信，支持团队创建和角色分配',
    code: 'AgentTool + TeamCreateTool + MessageQueue'
  },
  {
    icon: 'query',
    title: '上下文压缩',
    description: '当上下文窗口接近限制时，自动进行消息压缩和摘要，保持对话连续性，避免上下文溢出',
    code: 'autoCompact + microCompact + SessionMemory'
  },
  {
    icon: 'plugin',
    title: 'MCP 协议集成',
    description: '通过 Model Context Protocol 集成外部工具和服务，支持 stdio 和 HTTP 两种传输方式，扩展能力边界',
    code: 'MCPTool + MCPServer + Transport'
  },
  {
    icon: 'session',
    title: '会话持久化',
    description: '完整的会话状态持久化，支持跨会话恢复、搜索和导出。使用 JSON 格式存储，便于调试',
    code: 'SessionStorage + FilePersistence'
  },
  {
    icon: 'ui',
    title: 'Ink UI 框架',
    description: '使用 React 的终端 UI 框架 Ink，实现声明式的终端界面开发，支持组件化、状态管理、主题切换',
    code: 'React + Ink + VirtualList'
  },
  {
    icon: 'node',
    title: 'Bridge 远程架构',
    description: '支持远程会话桥接，允许通过 Web 界面访问终端会话。支持 JWT 认证、WebSocket 通信',
    code: 'bridgeMain + JWT + WebSocket'
  }
]
