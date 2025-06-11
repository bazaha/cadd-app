import { useState, useRef } from 'react';
import { MoleculeScene } from './MoleculeScene';
import { useMoleculeStore } from '@/stores/moleculeStore';

export function MoleculeViewer() {
  const { getSelectedMolecule } = useMoleculeStore();
  const molecule = getSelectedMolecule();
  
  return (
    <div className="w-full h-full">
      <MoleculeScene />
    </div>
  );
}

