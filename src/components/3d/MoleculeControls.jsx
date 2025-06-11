import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize,
  Minimize,
  SplitSquareVertical,
  Layers,
  Eye,
  EyeOff,
  Ruler,
  Atom
} from 'lucide-react';
import { useMoleculeStore } from '@/stores/moleculeStore';

export function MoleculeControls({ controlsRef }) {
  const { viewMode, setViewMode } = useMoleculeStore();
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [quality, setQuality] = useState([50]);
  
  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };
  
  return (
    <div className="toolbar">
      <Button variant="ghost" size="icon" onClick={handleResetView} title="重置视图">
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => controlsRef.current?.zoomIn(1.5)}
        title="放大"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => controlsRef.current?.zoomOut(1.5)}
        title="缩小"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <div className="h-6 border-r border-border mx-1"></div>
      <Button 
        variant={viewMode === 'ball-and-stick' ? 'secondary' : 'ghost'} 
        size="icon" 
        onClick={() => setViewMode('ball-and-stick')}
        title="球棍模型"
      >
        <SplitSquareVertical className="h-4 w-4" />
      </Button>
      <Button 
        variant={viewMode === 'spacefill' ? 'secondary' : 'ghost'} 
        size="icon" 
        onClick={() => setViewMode('spacefill')}
        title="空间填充模型"
      >
        <Maximize className="h-4 w-4" />
      </Button>
      <Button 
        variant={viewMode === 'wireframe' ? 'secondary' : 'ghost'} 
        size="icon" 
        onClick={() => setViewMode('wireframe')}
        title="线框模型"
      >
        <Minimize className="h-4 w-4" />
      </Button>
      <Button 
        variant={viewMode === 'cartoon' ? 'secondary' : 'ghost'} 
        size="icon" 
        onClick={() => setViewMode('cartoon')}
        title="卡通模型"
      >
        <Layers className="h-4 w-4" />
      </Button>
      <div className="h-6 border-r border-border mx-1"></div>
      <Button 
        variant={showLabels ? 'secondary' : 'ghost'} 
        size="icon" 
        onClick={() => setShowLabels(!showLabels)}
        title="显示标签"
      >
        <Atom className="h-4 w-4" />
      </Button>
      <Button 
        variant={showMeasurements ? 'secondary' : 'ghost'} 
        size="icon" 
        onClick={() => setShowMeasurements(!showMeasurements)}
        title="测量工具"
      >
        <Ruler className="h-4 w-4" />
      </Button>
      <div className="h-6 border-r border-border mx-1"></div>
      <div className="flex items-center space-x-2 px-2">
        <span className="text-xs text-muted-foreground">质量</span>
        <Slider
          className="w-20"
          value={quality}
          min={0}
          max={100}
          step={10}
          onValueChange={setQuality}
        />
      </div>
    </div>
  );
}

