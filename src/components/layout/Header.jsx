import { useState } from 'react';
import { 
  MoonStar, 
  Sun,
  Settings,
  HelpCircle,
  User,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // 在实际应用中，这里会切换文档的主题类
    document.documentElement.classList.toggle('light');
  };
  
  return (
    <header className="header">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">MoleculeAI</div>
        <div className="text-xs text-muted-foreground">创新药物设计平台</div>
      </div>
      
      <div className="flex-1"></div>
      
      {/* 桌面菜单 */}
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <MoonStar className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
      
      {/* 移动端菜单按钮 */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* 移动端菜单 */}
      {menuOpen && (
        <div className="absolute top-14 right-0 w-48 bg-card border border-border rounded-md shadow-lg p-2 z-50 md:hidden">
          <Button variant="ghost" className="w-full justify-start" onClick={toggleDarkMode}>
            {darkMode ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                亮色模式
              </>
            ) : (
              <>
                <MoonStar className="h-4 w-4 mr-2" />
                暗色模式
              </>
            )}
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            设置
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="h-4 w-4 mr-2" />
            帮助
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="h-4 w-4 mr-2" />
            用户
          </Button>
        </div>
      )}
    </header>
  );
}

