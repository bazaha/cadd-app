import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  Grid,
  Center,
  Text
} from '@react-three/drei';
import * as THREE from 'three';
import { useMoleculeStore } from '@/stores/moleculeStore';
import { AtomComponent } from './AtomComponent';
import { BondComponent } from './BondComponent';
import { MoleculeControls } from './MoleculeControls';

// 场景灯光组件
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow 
      />
      <directionalLight 
        position={[-10, -10, -10]} 
        intensity={0.5} 
      />
    </>
  );
}

// 分子组件
function MoleculeModel({ showLabels }) {
  const { 
    getSelectedMolecule, 
    selectedAtoms, 
    toggleAtomSelection,
    viewMode
  } = useMoleculeStore();
  const [hoveredAtom, setHoveredAtom] = useState(null);
  
  const molecule = getSelectedMolecule();
  
  if (!molecule) {
    return (
      <Text
        position={[0, 0, 0]}
        color="white"
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        没有可显示的分子
      </Text>
    );
  }
  
  // 将原子位置转换为Three.js向量
  const atomPositions = molecule.atoms.map(atom => 
    new THREE.Vector3(...atom.position)
  );
  
  return (
    <group>
      {/* 渲染原子 */}
      {molecule.atoms.map((atom, index) => (
        <AtomComponent 
          key={`atom-${index}`}
          position={atom.position}
          element={atom.element}
          label={atom.label}
          index={index}
          selected={selectedAtoms.includes(index)}
          hovered={hoveredAtom === index}
          onPointerOver={() => setHoveredAtom(index)}
          onPointerOut={() => setHoveredAtom(null)}
          onClick={toggleAtomSelection}
          viewMode={viewMode}
          showLabels={showLabels}
        />
      ))}
      
      {/* 渲染化学键 */}
      {molecule.bonds.map((bond, index) => (
        <BondComponent 
          key={`bond-${index}`}
          from={atomPositions[bond.from]}
          to={atomPositions[bond.to]}
          order={bond.order || 1}
          viewMode={viewMode}
        />
      ))}
    </group>
  );
}

// 主视图组件
export function MoleculeScene() {
  const controlsRef = useRef();
  const [showLabels, setShowLabels] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  
  return (
    <div className="relative w-full h-full">
      <Canvas className="scene-container">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <SceneLights />
        <Center>
          <MoleculeModel showLabels={showLabels} />
        </Center>
        {showGrid && <Grid infiniteGrid fadeDistance={30} fadeStrength={1.5} />}
        <OrbitControls 
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={50}
        />
        <Environment preset="city" />
      </Canvas>
      
      <MoleculeControls 
        controlsRef={controlsRef} 
        showLabels={showLabels}
        setShowLabels={setShowLabels}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
      />
    </div>
  );
}

