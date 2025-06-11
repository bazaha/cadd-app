import { useMoleculeStore } from '@/stores/moleculeStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Info, 
  AlertCircle,
  Check,
  X
} from 'lucide-react';

// 属性项组件
function PropertyItem({ label, value, unit = '' }) {
  return (
    <div className="grid grid-cols-2 gap-2 py-1">
      <div className="text-muted-foreground text-sm">{label}</div>
      <div className="text-sm font-medium">
        {value} {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}

// 规则检查项组件
function RuleCheckItem({ label, passed }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-sm">{label}</span>
      {passed ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-destructive" />
      )}
    </div>
  );
}

// 分子属性组件
export function MoleculeProperties() {
  const { getSelectedMolecule } = useMoleculeStore();
  const molecule = getSelectedMolecule();
  
  if (!molecule) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <AlertCircle className="h-10 w-10 mb-2 opacity-20" />
        <p className="text-sm">没有选中的分子</p>
        <p className="text-xs mt-1">请从分子库中选择或生成一个分子</p>
      </div>
    );
  }
  
  const { properties } = molecule;
  
  // 计算Lipinski规则
  const lipinskiRules = {
    molecularWeight: properties.molecularWeight <= 500,
    logP: properties.logP <= 5,
    hbdCount: properties.hbdCount <= 5,
    hbaCount: properties.hbaCount <= 10
  };
  
  // 计算Veber规则
  const veberRules = {
    rotBonds: properties.rotBonds <= 10,
    tpsa: properties.tpsa <= 140
  };
  
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-1">
        <div className="border rounded-md p-3 space-y-2">
          <div className="text-sm font-medium flex items-center">
            <Info className="h-4 w-4 mr-2 text-primary" />
            基本信息
          </div>
          <div className="space-y-1">
            <PropertyItem label="分子名称" value={molecule.name} />
            <PropertyItem label="分子式" value={molecule.formula} />
            <PropertyItem label="分子量" value={properties.molecularWeight.toFixed(2)} unit="g/mol" />
            <PropertyItem label="原子数" value={molecule.atoms.length} />
            <PropertyItem label="键数" value={molecule.bonds.length} />
          </div>
        </div>
        
        <div className="border rounded-md p-3 space-y-2">
          <div className="text-sm font-medium">物理化学性质</div>
          <div className="space-y-1">
            <PropertyItem label="LogP" value={properties.logP} />
            <PropertyItem label="氢键受体" value={properties.hbaCount} />
            <PropertyItem label="氢键供体" value={properties.hbdCount} />
            <PropertyItem label="极性表面积" value={properties.tpsa} unit="Å²" />
            <PropertyItem label="可旋转键" value={properties.rotBonds} />
          </div>
        </div>
        
        <div className="border rounded-md p-3 space-y-2">
          <div className="text-sm font-medium">药物性规则</div>
          <div className="space-y-1">
            <div className="text-sm mb-2">Lipinski规则</div>
            <RuleCheckItem label="分子量 ≤ 500" passed={lipinskiRules.molecularWeight} />
            <RuleCheckItem label="LogP ≤ 5" passed={lipinskiRules.logP} />
            <RuleCheckItem label="氢键供体 ≤ 5" passed={lipinskiRules.hbdCount} />
            <RuleCheckItem label="氢键受体 ≤ 10" passed={lipinskiRules.hbaCount} />
            
            <div className="border-t my-2"></div>
            
            <div className="text-sm mb-2">Veber规则</div>
            <RuleCheckItem label="可旋转键 ≤ 10" passed={veberRules.rotBonds} />
            <RuleCheckItem label="极性表面积 ≤ 140 Å²" passed={veberRules.tpsa} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

