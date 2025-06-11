import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Info, 
  BarChart3
} from "lucide-react";
import { AgentChat } from "@/components/agent/AgentChat";
import { MoleculeProperties } from "@/components/molecules/MoleculeProperties";

export function RightPanel() {
  return (
    <div className="right-panel">
      <Tabs defaultValue="agent">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="agent">Agent</TabsTrigger>
          <TabsTrigger value="properties">属性</TabsTrigger>
          <TabsTrigger value="results">结果</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agent" className="h-full">
          <AgentChat />
        </TabsContent>
        
        <TabsContent value="properties" className="p-4 h-full">
          <div className="panel-title flex items-center mb-4">
            <Info className="mr-2 h-5 w-5 text-primary" />
            分子属性
          </div>
          
          <MoleculeProperties />
        </TabsContent>
        
        <TabsContent value="results" className="p-4 space-y-4">
          <div className="panel-title flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            计算结果
          </div>
          
          <div className="text-sm text-muted-foreground">
            计算结果功能正在开发中...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

