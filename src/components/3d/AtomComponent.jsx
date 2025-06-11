import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useMoleculeStore } from '@/stores/moleculeStore';

// 原子颜色映射
const elementColors = {
  C: '#4a5568', // 碳 - 深灰色
  N: '#3182ce', // 氮 - 蓝色
  O: '#e53e3e', // 氧 - 红色
  S: '#d69e2e', // 硫 - 黄色
  P: '#dd6b20', // 磷 - 橙色
  F: '#38a169', // 氟 - 绿色
  Cl: '#38a169', // 氯 - 绿色
  Br: '#805ad5', // 溴 - 紫色
  I: '#805ad5', // 碘 - 紫色
  H: '#a0aec0', // 氢 - 浅灰色
};

// 原子半径映射
const elementRadii = {
  C: 0.4,
  N: 0.38,
  O: 0.35,
  S: 0.5,
  P: 0.5,
  F: 0.3,
  Cl: 0.4,
  Br: 0.45,
  I: 0.5,
  H: 0.2,
};

// 原子组件
export function AtomComponent({ 
  position, 
  element, 
  label, 
  index,
  selected = false, 
  hovered = false,
  onPointerOver,
  onPointerOut,
  onClick,
  viewMode = 'ball-and-stick',
  showLabels = false
}) {
  const meshRef = useRef();
  const color = elementColors[element] || '#cccccc';
  const radius = elementRadii[element] || 0.4;
  const [labelVisible, setLabelVisible] = useState(false);
  
  // 根据视图模式调整原子半径
  const getRadius = () => {
    switch (viewMode) {
      case 'spacefill':
        return radius * 2;
      case 'wireframe':
        return radius * 0.3;
      case 'cartoon':
        return radius * 0.5;
      case 'ball-and-stick':
      default:
        return radius;
    }
  };
  
  // 选中或悬停时的效果
  useFrame(() => {
    if (meshRef.current) {
      if (selected || hovered) {
        meshRef.current.material.emissive.set(selected ? '#ffffff' : '#aaaaaa');
        meshRef.current.material.emissiveIntensity = selected ? 0.3 : 0.2;
      } else {
        meshRef.current.material.emissiveIntensity = 0;
      }
    }
  });
  
  // 显示标签的逻辑
  useEffect(() => {
    setLabelVisible(showLabels || hovered);
  }, [showLabels, hovered]);
  
  return (
    <mesh 
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver(index);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onPointerOut(index);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(index);
      }}
    >
      <sphereGeometry args={[getRadius(), 32, 16]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.2}
        roughness={0.4}
        wireframe={viewMode === 'wireframe'}
      />
      
      {labelVisible && (
        <Html
          position={[0, getRadius() + 0.2, 0]}
          center
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '2px 4px',
            borderRadius: '2px',
            color: 'white',
            fontSize: '10px',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        >
          {label || element}
        </Html>
      )}
    </mesh>
  );
}

