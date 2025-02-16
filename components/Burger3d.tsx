import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useRef } from "react";

const RotatingBurger = ({ textureUrl }: { textureUrl: string }) => {
  const meshRef = useRef<any>(null);
  
  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
    <sphereGeometry args={[3, 64, 64]} />  // Bigger size
    {/* Adjust shape if needed */}
      <meshStandardMaterial map={useTexture(textureUrl)} />
      <OrbitControls autoRotate autoRotateSpeed={1.5} /> {/* Infinite Rotation */}
    </mesh>
  );
};

const Burger3D = ({ imageUrl }: { imageUrl: string }) => (
    <Canvas camera={{ position: [0, 0, 3] }}> 

    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <RotatingBurger textureUrl={imageUrl} />
  </Canvas>
);

export default Burger3D;
