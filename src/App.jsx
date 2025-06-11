import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightPanel } from '@/components/layout/RightPanel';
import { StatusBar } from '@/components/layout/StatusBar';
import { MoleculeViewer } from '@/components/3d/MoleculeViewer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <LeftSidebar />
        <div className="central-view">
          <MoleculeViewer />
        </div>
        <RightPanel />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;

