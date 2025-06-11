import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Database, 
  Search,
  Upload,
  Download,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { useMoleculeStore } from '@/stores/moleculeStore';

// 分子库项组件
function MoleculeItem({ molecule, isSelected, onSelect }) {
  return (
    <div 
      className={`flex justify-between py-2 px-3 rounded-md cursor-pointer hover:bg-primary/10 ${
        isSelected ? 'bg-primary/20' : ''
      }`}
      onClick={() => onSelect(molecule.id)}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium">{molecule.name}</span>
        <span className="text-xs text-muted-foreground">{molecule.formula}</span>
      </div>
      {isSelected && (
        <div className="flex items-center">
          <Check className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  );
}

// 分子库组件
export function MoleculeLibrary() {
  const { molecules, selectedMoleculeId, selectMolecule, removeMolecule } = useMoleculeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // 过滤分子
  const filteredMolecules = molecules.filter(molecule => 
    molecule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    molecule.formula.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // 处理删除
  const handleDelete = () => {
    if (selectedMoleculeId) {
      removeMolecule(selectedMoleculeId);
      setShowDeleteConfirm(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索分子..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <ScrollArea className="h-[300px] border rounded-md">
        <div className="p-1">
          {filteredMolecules.length > 0 ? (
            filteredMolecules.map(molecule => (
              <MoleculeItem 
                key={molecule.id}
                molecule={molecule}
                isSelected={molecule.id === selectedMoleculeId}
                onSelect={selectMolecule}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Database className="h-10 w-10 mb-2 opacity-20" />
              <p className="text-sm">
                {searchQuery ? '没有找到匹配的分子' : '分子库为空'}
              </p>
              <p className="text-xs mt-1">
                {searchQuery ? '尝试其他搜索词' : '使用生成功能或导入分子'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1 flex items-center justify-center">
          <Upload className="mr-2 h-4 w-4" />
          导入
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 flex items-center justify-center"
          disabled={!selectedMoleculeId}
        >
          <Download className="mr-2 h-4 w-4" />
          导出
        </Button>
        {!showDeleteConfirm ? (
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center text-destructive hover:text-destructive"
            disabled={!selectedMoleculeId}
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            删除
          </Button>
        ) : (
          <div className="flex-1 flex space-x-1">
            <Button 
              variant="destructive" 
              size="sm"
              className="flex-1 flex items-center justify-center"
              onClick={handleDelete}
            >
              <Check className="mr-1 h-3 w-3" />
              确认
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 flex items-center justify-center"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <X className="mr-1 h-3 w-3" />
              取消
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

