import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Database, 
  BarChart3
} from "lucide-react";
import { MoleculeGenerator } from "@/components/molecules/MoleculeGenerator";
import { MoleculeLibrary } from "@/components/molecules/MoleculeLibrary";

export function LeftSidebar() {
  return (
    <div className="left-sidebar">
      <Tabs defaultValue="generate">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="generate">生成</TabsTrigger>
          <TabsTrigger value="library">分子库</TabsTrigger>
          <TabsTrigger value="analysis">分析</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="generation-panel">
          <div className="panel-title flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            AI分子生成
          </div>
          
          <MoleculeGenerator />
        </TabsContent>
        
        <TabsContent value="library" className="p-4 space-y-4">
          <div className="panel-title flex items-center">
            <Database className="mr-2 h-5 w-5 text-primary" />
            分子库
          </div>
          
          <MoleculeLibrary />
        </TabsContent>
        
        <TabsContent value="analysis" className="p-4 space-y-4">
          <div className="panel-title flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            分析工具
          </div>
          
          <div className="text-sm text-muted-foreground">
            分析工具功能正在开发中...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

