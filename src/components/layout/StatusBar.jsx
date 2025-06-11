import { useState, useEffect } from 'react';
import { useMoleculeStore } from '@/stores/moleculeStore';

export function StatusBar() {
  const { getSelectedMolecule } = useMoleculeStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const molecule = getSelectedMolecule();
  
  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 格式化时间
  const formattedTime = currentTime.toLocaleTimeString();
  
  return (
    <div className="status-bar">
      <div className="flex-1 flex items-center">
        {molecule ? (
          <span>当前分子: {molecule.name} | {molecule.formula}</span>
        ) : (
          <span>未选择分子</span>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <span>就绪</span>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
}

