import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// 化学键组件
export function BondComponent({ from, to, order = 1, viewMode = 'ball-and-stick' }) {
  const meshRef = useRef();
  
  // 计算键的中点、方向和长度
  const { midPoint, direction, length } = useMemo(() => {
    const midPoint = new THREE.Vector3(
      (from.x + to.x) / 2,
      (from.y + to.y) / 2,
      (from.z + to.z) / 2
    );
    
    const direction = new THREE.Vector3().subVectors(to, from).normalize();
    const length = from.distanceTo(to);
    
    return { midPoint, direction, length };
  }, [from, to]);
  
  // 计算垂直于键方向的向量
  const { perpendicular, perpendicular2 } = useMemo(() => {
    // 创建一个向上的向量
    const up = new THREE.Vector3(0, 1, 0);
    
    // 如果方向向量与向上向量平行，使用向前向量
    const axis = Math.abs(direction.dot(up)) > 0.9
      ? new THREE.Vector3(1, 0, 0)
      : up;
    
    // 计算垂直于键方向的向量
    const perpendicular = new THREE.Vector3().crossVectors(direction, axis).normalize();
    
    // 计算第三个垂直向量
    const perpendicular2 = new THREE.Vector3().crossVectors(direction, perpendicular).normalize();
    
    return { perpendicular, perpendicular2 };
  }, [direction]);
  
  // 根据视图模式调整键的半径
  const getBondRadius = () => {
    switch (viewMode) {
      case 'spacefill':
        return 0.15;
      case 'wireframe':
        return 0.03;
      case 'cartoon':
        return 0.1;
      case 'ball-and-stick':
      default:
        return 0.08;
    }
  };
  
  // 单键
  if (order === 1 || viewMode === 'wireframe' || viewMode === 'cartoon') {
    return (
      <mesh position={midPoint} ref={meshRef}>
        <cylinderGeometry args={[getBondRadius(), getBondRadius(), length, 8]} />
        <meshStandardMaterial 
          color="#cccccc" 
          metalness={0.1}
          roughness={0.4}
          wireframe={viewMode === 'wireframe'}
        />
        <primitive 
          object={new THREE.AxesHelper(0)} 
          rotation={new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
          )}
        />
      </mesh>
    );
  }
  
  // 双键
  if (order === 2) {
    const offset = 0.15;
    
    return (
      <>
        <mesh 
          position={new THREE.Vector3().addVectors(
            midPoint,
            new THREE.Vector3().copy(perpendicular).multiplyScalar(offset)
          )}
        >
          <cylinderGeometry args={[getBondRadius() * 0.8, getBondRadius() * 0.8, length, 8]} />
          <meshStandardMaterial color="#cccccc" />
          <primitive 
            object={new THREE.AxesHelper(0)} 
            rotation={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction
            )}
          />
        </mesh>
        <mesh 
          position={new THREE.Vector3().addVectors(
            midPoint,
            new THREE.Vector3().copy(perpendicular).multiplyScalar(-offset)
          )}
        >
          <cylinderGeometry args={[getBondRadius() * 0.8, getBondRadius() * 0.8, length, 8]} />
          <meshStandardMaterial color="#cccccc" />
          <primitive 
            object={new THREE.AxesHelper(0)} 
            rotation={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction
            )}
          />
        </mesh>
      </>
    );
  }
  
  // 三键
  const tripleOffset = 0.2;
  return (
    <>
      <mesh position={midPoint}>
        <cylinderGeometry args={[getBondRadius() * 0.8, getBondRadius() * 0.8, length, 8]} />
        <meshStandardMaterial color="#cccccc" />
        <primitive 
          object={new THREE.AxesHelper(0)} 
          rotation={new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
          )}
        />
      </mesh>
      <mesh 
        position={new THREE.Vector3().addVectors(
          midPoint,
          new THREE.Vector3().copy(perpendicular).multiplyScalar(tripleOffset)
        )}
      >
        <cylinderGeometry args={[getBondRadius() * 0.8, getBondRadius() * 0.8, length, 8]} />
        <meshStandardMaterial color="#cccccc" />
        <primitive 
          object={new THREE.AxesHelper(0)} 
          rotation={new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
          )}
        />
      </mesh>
      <mesh 
        position={new THREE.Vector3().addVectors(
          midPoint,
          new THREE.Vector3().copy(perpendicular).multiplyScalar(-tripleOffset)
        )}
      >
        <cylinderGeometry args={[getBondRadius() * 0.8, getBondRadius() * 0.8, length, 8]} />
        <meshStandardMaterial color="#cccccc" />
        <primitive 
          object={new THREE.AxesHelper(0)} 
          rotation={new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
          )}
        />
      </mesh>
    </>
  );
}

