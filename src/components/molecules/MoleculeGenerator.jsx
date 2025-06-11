import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, 
  RotateCw,
  Dna,
  Beaker,
  Target
} from 'lucide-react';
import { useMoleculeStore } from '@/stores/moleculeStore';

// 分子生成参数接口
export function MoleculeGenerator() {
  const { addMolecule } = useMoleculeStore();
  
  // 生成参数
  const [diversity, setDiversity] = useState([0.7]);
  const [numMolecules, setNumMolecules] = useState([10]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetDescription, setTargetDescription] = useState('');
  const [similarityReference, setSimilarityReference] = useState('');
  
  // 模拟分子生成
  const handleGenerateMolecules = () => {
    setIsGenerating(true);
    
    // 模拟API调用延迟
    setTimeout(() => {
      // 生成一个示例分子
      const newMolecule = generateSampleMolecule();
      
      // 添加到状态
      addMolecule(newMolecule);
      
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">目标描述</label>
        <Textarea
          placeholder="例如：ACE抑制剂，具有良好的口服生物利用度..."
          value={targetDescription}
          onChange={(e) => setTargetDescription(e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">相似性参考</label>
        <Input
          placeholder="输入SMILES或分子名称"
          value={similarityReference}
          onChange={(e) => setSimilarityReference(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium">多样性</label>
          <span className="text-sm">{diversity[0].toFixed(1)}</span>
        </div>
        <Slider
          value={diversity}
          min={0}
          max={1}
          step={0.1}
          onValueChange={setDiversity}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium">分子数量</label>
          <span className="text-sm">{numMolecules[0]}</span>
        </div>
        <Slider
          value={numMolecules}
          min={1}
          max={50}
          step={1}
          onValueChange={setNumMolecules}
        />
      </div>
      
      <Button 
        className="w-full" 
        onClick={handleGenerateMolecules}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            生成分子
          </>
        )}
      </Button>
      
      <div className="space-y-2 pt-4">
        <Button variant="outline" className="w-full flex items-center">
          <Dna className="mr-2 h-4 w-4" />
          优化选中分子
        </Button>
        <Button variant="outline" className="w-full flex items-center">
          <Beaker className="mr-2 h-4 w-4" />
          最小化能量
        </Button>
        <Button variant="outline" className="w-full flex items-center">
          <Target className="mr-2 h-4 w-4" />
          对接到靶点
        </Button>
      </div>
    </div>
  );
}

// 生成示例分子数据
function generateSampleMolecule() {
  // 生成唯一ID
  const id = `molecule-${Date.now()}`;
  
  // 随机生成一个简单的环状分子
  const atomCount = Math.floor(Math.random() * 5) + 6; // 6-10个原子
  const atoms = [];
  const bonds = [];
  
  // 创建环状结构
  const radius = 2;
  for (let i = 0; i < atomCount; i++) {
    const angle = (i / atomCount) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = 0;
    
    // 随机选择原子类型
    const elementTypes = ['C', 'C', 'C', 'N', 'O'];
    const element = elementTypes[Math.floor(Math.random() * elementTypes.length)];
    
    atoms.push({
      position: [x, y, z],
      element,
      label: `${element}${i+1}`
    });
    
    // 添加键
    bonds.push({
      from: i,
      to: (i + 1) % atomCount,
      order: Math.random() < 0.2 ? 2 : 1 // 20%概率是双键
    });
  }
  
  // 添加一些随机的交叉键
  const extraBonds = Math.floor(Math.random() * 3); // 0-2个额外键
  for (let i = 0; i < extraBonds; i++) {
    const from = Math.floor(Math.random() * atomCount);
    let to = Math.floor(Math.random() * atomCount);
    
    // 确保不是自己连自己，也不是已有的键
    while (to === from || bonds.some(b => (b.from === from && b.to === to) || (b.from === to && b.to === from))) {
      to = Math.floor(Math.random() * atomCount);
    }
    
    bonds.push({
      from,
      to,
      order: 1
    });
  }
  
  return {
    id,
    name: `生成分子-${id.slice(-5)}`,
    formula: generateRandomFormula(),
    atoms,
    bonds,
    properties: {
      molecularWeight: Math.round(Math.random() * 300 + 100),
      logP: (Math.random() * 6 - 2).toFixed(2),
      hbdCount: Math.floor(Math.random() * 3),
      hbaCount: Math.floor(Math.random() * 5) + 1,
      tpsa: Math.round(Math.random() * 100),
      rotBonds: Math.floor(Math.random() * 5),
      lipinskiViolations: Math.floor(Math.random() * 2)
    }
  };
}

// 生成随机分子式
function generateRandomFormula() {
  const c = Math.floor(Math.random() * 10) + 5;
  const h = Math.floor(Math.random() * 15) + 5;
  const n = Math.floor(Math.random() * 3);
  const o = Math.floor(Math.random() * 3);
  
  let formula = `C${c}H${h}`;
  if (n > 0) formula += `N${n}`;
  if (o > 0) formula += `O${o}`;
  
  return formula;
}

