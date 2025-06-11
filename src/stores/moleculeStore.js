import { create } from 'zustand';

// 示例分子数据 - 咖啡因
const caffeineMolecule = {
  id: 'caffeine-1',
  name: '咖啡因',
  formula: 'C8H10N4O2',
  atoms: [
    { position: [0, 0, 0], element: 'C', label: 'C1' },
    { position: [1.4, 0, 0], element: 'N', label: 'N1' },
    { position: [2.1, 1.2, 0], element: 'C', label: 'C2' },
    { position: [1.4, 2.4, 0], element: 'N', label: 'N2' },
    { position: [0, 2.4, 0], element: 'C', label: 'C3' },
    { position: [-0.7, 1.2, 0], element: 'C', label: 'C4' },
    { position: [-2.1, 1.2, 0], element: 'O', label: 'O1' },
    { position: [3.5, 1.2, 0], element: 'O', label: 'O2' },
    { position: [1.4, 3.8, 0], element: 'C', label: 'C5' },
    { position: [2.1, -1.2, 0], element: 'C', label: 'C6' },
  ],
  bonds: [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 0 },
    { from: 5, to: 6, order: 2 },
    { from: 2, to: 7, order: 2 },
    { from: 3, to: 8 },
    { from: 1, to: 9 },
  ],
  properties: {
    molecularWeight: 194.19,
    logP: -0.07,
    hbdCount: 0,
    hbaCount: 6,
    tpsa: 58.4,
    rotBonds: 0,
    lipinskiViolations: 0
  }
};

// 创建分子状态管理
export const useMoleculeStore = create((set, get) => ({
  // 状态
  molecules: [caffeineMolecule],
  selectedMoleculeId: 'caffeine-1',
  selectedAtoms: [],
  viewMode: 'ball-and-stick',
  
  // 操作
  selectMolecule: (id) => set({ selectedMoleculeId: id }),
  
  toggleAtomSelection: (atomIndex) => set((state) => {
    const selectedAtoms = [...state.selectedAtoms];
    const index = selectedAtoms.indexOf(atomIndex);
    
    if (index === -1) {
      selectedAtoms.push(atomIndex);
    } else {
      selectedAtoms.splice(index, 1);
    }
    
    return { selectedAtoms };
  }),
  
  clearAtomSelection: () => set({ selectedAtoms: [] }),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  addMolecule: (molecule) => set((state) => ({
    molecules: [...state.molecules, molecule],
    selectedMoleculeId: molecule.id
  })),
  
  removeMolecule: (id) => set((state) => {
    const molecules = state.molecules.filter(m => m.id !== id);
    const selectedMoleculeId = molecules.length > 0 
      ? molecules[0].id 
      : null;
      
    return { molecules, selectedMoleculeId };
  }),
  
  // 获取当前选中的分子
  getSelectedMolecule: () => {
    const { molecules, selectedMoleculeId } = get();
    return molecules.find(m => m.id === selectedMoleculeId) || null;
  }
}));

