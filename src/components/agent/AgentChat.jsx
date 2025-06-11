import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { useAgentStore } from '@/stores/agentStore';
import { useMoleculeStore } from '@/stores/moleculeStore';

// 消息组件
function MessageItem({ message }) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={isUser ? 'user-message' : 'agent-message'}>
      <div className="flex items-center mb-1">
        {!isUser && (
          <MessageSquare className="h-4 w-4 mr-2 text-primary" />
        )}
        <span className="text-xs text-muted-foreground">
          {isUser ? '您' : 'AI Agent'}
        </span>
      </div>
      <p>{message.content}</p>
    </div>
  );
}

// 思考中状态组件
function ThinkingIndicator() {
  return (
    <div className="agent-message">
      <div className="flex items-center mb-1">
        <MessageSquare className="h-4 w-4 mr-2 text-primary" />
        <span className="text-xs text-muted-foreground">AI Agent</span>
      </div>
      <div className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>思考中...</span>
      </div>
    </div>
  );
}

// 建议组件
function Suggestion({ text, onClick }) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="text-xs" 
      onClick={() => onClick(text)}
    >
      {text}
    </Button>
  );
}

// 主聊天组件
export function AgentChat() {
  const { messages, isThinking, sendMessage } = useAgentStore();
  const { getSelectedMolecule } = useMoleculeStore();
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  
  // 常见问题建议
  const suggestions = [
    "生成类似于阿司匹林的分子",
    "分析这个分子的药物性质",
    "优化这个分子的溶解度",
    "如何提高选择性?"
  ];
  
  // 自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isThinking]);
  
  // 发送消息
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    sendMessage(inputValue);
    setInputValue('');
    
    // 聚焦输入框
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // 处理按键事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // 使用建议
  const handleSuggestionClick = (text) => {
    setInputValue(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="agent-chat">
      <ScrollArea ref={scrollAreaRef} className="chat-messages">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        
        {isThinking && <ThinkingIndicator />}
        
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {suggestions.map((text, index) => (
              <Suggestion 
                key={index} 
                text={text} 
                onClick={handleSuggestionClick} 
              />
            ))}
          </div>
        )}
      </ScrollArea>
      
      <div className="chat-input">
        <div className="flex space-x-2">
          <Input 
            ref={inputRef}
            placeholder="输入消息..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={isThinking || inputValue.trim() === ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

