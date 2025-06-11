import { useState, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Line } from '@react-three/drei';
import { useMoleculeStore } from '@/stores/moleculeStore';

// 测量工具组件
export function MeasurementTools({ active }) {
  const { getSelectedMolecule, selectedAtoms } = useMoleculeStore();
  const [measurements, setMeasurements] = useState([]);
  const { camera } = useThree();
  
  // 当选中的原子变化时更新测量
  useEffect(() => {
    if (!active) {
      setMeasurements([]);
      return;
    }
    
    const molecule = getSelectedMolecule();
    if (!molecule) return;
    
    // 测量距离
    if (selectedAtoms.length === 2) {
      const atom1 = molecule.atoms[selectedAtoms[0]];
      const atom2 = molecule.atoms[selectedAtoms[1]];
      
      if (atom1 && atom2) {
        const pos1 = new THREE.Vector3(...atom1.position);
        const pos2 = new THREE.Vector3(...atom2.position);
        const distance = pos1.distanceTo(pos2);
        
        setMeasurements([
          {
            type: 'distance',
            points: [pos1, pos2],
            value: distance.toFixed(2),
            label: `${atom1.label || atom1.element}-${atom2.label || atom2.element}: ${distance.toFixed(2)} Å`
          }
        ]);
      }
    }
    // 测量角度
    else if (selectedAtoms.length === 3) {
      const atom1 = molecule.atoms[selectedAtoms[0]];
      const atom2 = molecule.atoms[selectedAtoms[1]];
      const atom3 = molecule.atoms[selectedAtoms[2]];
      
      if (atom1 && atom2 && atom3) {
        const pos1 = new THREE.Vector3(...atom1.position);
        const pos2 = new THREE.Vector3(...atom2.position);
        const pos3 = new THREE.Vector3(...atom3.position);
        
        const v1 = new THREE.Vector3().subVectors(pos1, pos2);
        const v2 = new THREE.Vector3().subVectors(pos3, pos2);
        
        // 计算角度（弧度）
        const angle = v1.angleTo(v2);
        // 转换为度
        const degrees = angle * (180 / Math.PI);
        
        setMeasurements([
          {
            type: 'angle',
            points: [pos1, pos2, pos3],
            value: degrees.toFixed(1),
            label: `${atom1.label || atom1.element}-${atom2.label || atom2.element}-${atom3.label || atom3.element}: ${degrees.toFixed(1)}°`
          }
        ]);
      }
    }
    // 测量二面角
    else if (selectedAtoms.length === 4) {
      const atom1 = molecule.atoms[selectedAtoms[0]];
      const atom2 = molecule.atoms[selectedAtoms[1]];
      const atom3 = molecule.atoms[selectedAtoms[2]];
      const atom4 = molecule.atoms[selectedAtoms[3]];
      
      if (atom1 && atom2 && atom3 && atom4) {
        const pos1 = new THREE.Vector3(...atom1.position);
        const pos2 = new THREE.Vector3(...atom2.position);
        const pos3 = new THREE.Vector3(...atom3.position);
        const pos4 = new THREE.Vector3(...atom4.position);
        
        // 计算二面角
        const v1 = new THREE.Vector3().subVectors(pos1, pos2);
        const v2 = new THREE.Vector3().subVectors(pos3, pos2);
        const v3 = new THREE.Vector3().subVectors(pos3, pos4);
        
        const n1 = new THREE.Vector3().crossVectors(v1, v2).normalize();
        const n2 = new THREE.Vector3().crossVectors(v2, v3).normalize();
        
        const angle = Math.acos(n1.dot(n2));
        const degrees = angle * (180 / Math.PI);
        
        setMeasurements([
          {
            type: 'dihedral',
            points: [pos1, pos2, pos3, pos4],
            value: degrees.toFixed(1),
            label: `${atom1.label || atom1.element}-${atom2.label || atom2.element}-${atom3.label || atom3.element}-${atom4.label || atom4.element}: ${degrees.toFixed(1)}°`
          }
        ]);
      }
    }
    else {
      setMeasurements([]);
    }
  }, [active, selectedAtoms, getSelectedMolecule]);
  
  if (!active || measurements.length === 0) return null;
  
  return (
    <>
      {measurements.map((measurement, index) => (
        <group key={`measurement-${index}`}>
          {/* 绘制测量线 */}
          {measurement.type === 'distance' && (
            <Line
              points={[measurement.points[0], measurement.points[1]]}
              color="yellow"
              lineWidth={1}
              dashed={true}
            />
          )}
          
          {measurement.type === 'angle' && (
            <>
              <Line
                points={[measurement.points[0], measurement.points[1]]}
                color="yellow"
                lineWidth={1}
                dashed={true}
              />
              <Line
                points={[measurement.points[1], measurement.points[2]]}
                color="yellow"
                lineWidth={1}
                dashed={true}
              />
            </>
          )}
          
          {measurement.type === 'dihedral' && (
            <>
              <Line
                points={[measurement.points[0], measurement.points[1]]}
                color="yellow"
                lineWidth={1}
                dashed={true}
              />
              <Line
                points={[measurement.points[1], measurement.points[2]]}
                color="yellow"
                lineWidth={1}
                dashed={true}
              />
              <Line
                points={[measurement.points[2], measurement.points[3]]}
                color="yellow"
                lineWidth={1}
                dashed={true}
              />
            </>
          )}
          
          {/* 显示测量值 */}
          <Html
            position={getMeasurementLabelPosition(measurement)}
            center
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '4px 8px',
              borderRadius: '4px',
              color: 'yellow',
              fontSize: '12px',
              fontWeight: 'bold',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            {measurement.label}
          </Html>
        </group>
      ))}
    </>
  );
}

// 计算测量标签的位置
function getMeasurementLabelPosition(measurement) {
  if (measurement.type === 'distance') {
    // 距离标签位于两点中间，稍微上移
    const midpoint = new THREE.Vector3()
      .addVectors(measurement.points[0], measurement.points[1])
      .multiplyScalar(0.5);
    midpoint.y += 0.3; // 上移一点
    return midpoint;
  }
  
  if (measurement.type === 'angle') {
    // 角度标签位于中心点附近
    return new THREE.Vector3()
      .copy(measurement.points[1])
      .add(new THREE.Vector3(0, 0.3, 0));
  }
  
  if (measurement.type === 'dihedral') {
    // 二面角标签位于中间两点之间
    const midpoint = new THREE.Vector3()
      .addVectors(measurement.points[1], measurement.points[2])
      .multiplyScalar(0.5);
    midpoint.y += 0.3; // 上移一点
    return midpoint;
  }
  
  return new THREE.Vector3(0, 0, 0);
}

