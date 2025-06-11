import { create } from 'zustand';

// 创建Agent状态管理
export const useAgentStore = create((set) => ({
  // 状态
  messages: [
    {
      id: '1',
      sender: 'agent',
      content: '您好！我是您的AI分子设计助手。我可以帮助您生成分子、分析结构、提供设计建议。请问有什么可以帮助您的？',
      timestamp: Date.now()
    }
  ],
  isThinking: false,
  suggestions: [],
  
  // 操作
  sendMessage: (content) => set((state) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: Date.now()
    };
    
    // 模拟Agent思考状态
    set({ isThinking: true });
    
    // 模拟Agent回复（实际应用中这里会调用后端API）
    setTimeout(() => {
      const agentMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        content: getAgentResponse(content),
        timestamp: Date.now()
      };
      
      set((state) => ({
        messages: [...state.messages, agentMessage],
        isThinking: false
      }));
    }, 1000);
    
    return {
      messages: [...state.messages, userMessage]
    };
  }),
  
  clearMessages: () => set({ messages: [] })
}));

// 模拟Agent回复（实际应用中会由后端API提供）
function getAgentResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('生成') || lowerMessage.includes('设计')) {
    return '我可以帮您设计分子。请告诉我您的具体需求，例如目标靶点、所需性质或结构特征。您也可以上传一个起始分子，我可以基于它进行优化。';
  }
  
  if (lowerMessage.includes('分析') || lowerMessage.includes('属性')) {
    return '我可以分析分子的物理化学性质、药效团特征和ADMET预测。请选择您想要分析的分子，或者上传一个新的分子结构。';
  }
  
  if (lowerMessage.includes('对接') || lowerMessage.includes('靶点')) {
    return '要进行分子对接，我需要靶点蛋白的结构。您可以上传PDB文件，或者告诉我蛋白质的PDB ID，我可以从数据库获取。然后我们可以将分子对接到活性位点。';
  }
  
  if (lowerMessage.includes('优化') || lowerMessage.includes('改进')) {
    return '分子优化可以从多个方面进行：提高活性、改善溶解度、增强选择性或改善ADMET性质。请告诉我您想要优化的具体方向，我会提供相应的建议。';
  }
  
  return '我理解您的需求。请提供更多细节，例如您的研究目标、感兴趣的分子类型或者您想要解决的具体问题，这样我可以提供更有针对性的帮助。';
}

