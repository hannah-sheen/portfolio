'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

// Create typed component aliases to bypass JSX.IntrinsicElements validation completely
const MeshLineGeo = 'meshLineGeometry' as any;
const MeshLineMat = 'meshLineMaterial' as any;

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardName?: string | null;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  cardName = null
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isDraggingCard, setIsDraggingCard] = useState(false);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          gl.domElement.setAttribute('data-dragging', isDraggingCard ? 'true' : 'false');
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            cardName={cardName}
            onDragStateChange={setIsDraggingCard}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardName?: string | null;
  onDragStateChange: (dragging: boolean) => void;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  cardName = null,
  onDragStateChange
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardImage || lanyard) as THREE.Texture;
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map as THREE.Texture;
    const baseImg = baseMap.image as any;
    const W = baseImg.width;
    const H = baseImg.height;
    
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, W, H);

    // --- FRONT SIDE SYSTEM DESIGN ---
    const faceX = FRONT_UV_RECT.x * W;
    const faceY = FRONT_UV_RECT.y * H;
    const faceW = FRONT_UV_RECT.w * W;
    const faceH = FRONT_UV_RECT.h * H;

    ctx.save();
    ctx.beginPath();
    ctx.rect(faceX, faceY, faceW, faceH);
    ctx.clip();

    // 1. Background Core Base Color Layer
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(faceX, faceY, faceW, faceH);

    // 2. Cyan/Indigo Split Ambient Lighting Spectrum
    const topGlow = ctx.createRadialGradient(faceX + faceW * 0.5, faceY - 50, 0, faceX + faceW * 0.5, faceY - 50, faceH * 0.7);
    topGlow.addColorStop(0, 'rgba(99, 102, 241, 0.35)'); 
    topGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = topGlow;
    ctx.fillRect(faceX, faceY, faceW, faceH);

    const btmGlow = ctx.createRadialGradient(faceX + faceW * 0.5, faceY + faceH + 50, 0, faceX + faceW * 0.5, faceY + faceH + 50, faceH * 0.6);
    btmGlow.addColorStop(0, 'rgba(6, 182, 212, 0.25)'); 
    btmGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = btmGlow;
    ctx.fillRect(faceX, faceY, faceW, faceH);

    // 3. Top and Bottom Premium Accent Frame Borders
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(faceX, faceY, faceW, 14); 
    ctx.fillRect(faceX, faceY + faceH - 14, faceW, 14); 

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(faceX, faceY + 14); ctx.lineTo(faceX + faceW, faceY + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(faceX, faceY + faceH - 14); ctx.lineTo(faceX + faceW, faceY + faceH - 14); ctx.stroke();

    // 4. Perfect Circle Image Profile Aperture Ring Layout
    const photoSize = faceW * 0.48;
    const pcx = faceX + faceW / 2;
    const pcy = faceY + faceH * 0.35;
    const pradius = photoSize / 2;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(pcx, pcy, pradius + 8, 0, Math.PI * 2); ctx.stroke();

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)'; 
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(pcx, pcy, pradius + 14, 0, Math.PI * 2); ctx.stroke();

    if (frontImage && frontTex.image) {
      const img = frontTex.image as any;
      const scale = Math.max(photoSize / img.width, photoSize / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;

      ctx.save();
      ctx.beginPath();
      ctx.arc(pcx, pcy, pradius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, pcx - dw / 2, pcy - dh / 2, dw, dh);
      ctx.restore();
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.arc(pcx, pcy, pradius, 0, Math.PI * 2); ctx.fill();
    }

    // 5. Typographical Identity Architecture Data Fields
    const nameY = pcy + pradius + faceH * 0.08;
    
    // Primary Username Field
    ctx.font = `800 ${Math.round(faceW * 0.065)}px Manrope, system-ui, sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(cardName ?? 'DEVELOPER', pcx, nameY);

    // Job Title Designation Field
    ctx.font = `600 ${Math.round(faceW * 0.04)}px Manrope, system-ui, sans-serif`;
    ctx.fillStyle = '#818cf8'; 
    ctx.fillText('Full Stack Developer', pcx, nameY + faceH * 0.06);

    // Structural separating geometry stroke
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(faceX + 36, nameY + faceH * 0.125); ctx.lineTo(faceX + faceW - 36, nameY + faceH * 0.125); ctx.stroke();

    // 6. Upgraded Large Bold Metadata Layout Matrix
    const metaY = nameY + faceH * 0.155;
    
    // Explicit high-visibility Manrope configuration at 24px scale
    ctx.font = '800 24px Manrope, system-ui, sans-serif'; 
    ctx.textBaseline = 'middle';
    
    // Left Parameter: Auth Token ID
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'; // Boosted opacity for clear clarity
    ctx.textAlign = 'left';
    ctx.fillText('AUTH ID: 884C', faceX + 36, metaY);
    
    // Right Parameter: Active System Reference Segment
    ctx.fillStyle = 'rgba(6, 182, 212, 0.95)'; // Vibrant neon cyber-cyan color fill
    ctx.textAlign = 'right';
    ctx.fillText('ROLE REF 01', faceX + faceW - 36, metaY);

    ctx.restore();


    // --- BACK SIDE: MATTE SECURITY INFRASTRUCTURE BACKING ---
    const backX = BACK_UV_RECT.x * W;
    const backY = BACK_UV_RECT.y * H;
    const backW = BACK_UV_RECT.w * W;
    const backH = BACK_UV_RECT.h * H;

    ctx.save();
    ctx.beginPath();
    ctx.rect(backX, backY, backW, backH);
    ctx.clip();

    ctx.fillStyle = '#090d16';
    ctx.fillRect(backX, backY, backW, backH);

    ctx.strokeStyle = 'rgba(99, 102, 241, 0.04)';
    ctx.lineWidth = 1;
    for (let gy = backY; gy < backY + backH; gy += 30) {
      ctx.beginPath(); ctx.moveTo(backX, gy); ctx.lineTo(backX + backW, gy); ctx.stroke();
    }

    // Top and Bottom Back Borders
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(backX, backY, backW, 14);
    ctx.fillRect(backX, backY + backH - 14, backW, 14);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath(); ctx.moveTo(backX, backY + 14); ctx.lineTo(backX + backW, backY + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(backX, backY + backH - 14); ctx.lineTo(backX + backW, backY + backH - 14); ctx.stroke();

    // Top Matte Magnetic Stripe Field
    ctx.fillStyle = '#111726';
    ctx.fillRect(backX, backY + faceH * 0.12, backW, faceH * 0.15);

    // Iridescent Security Foil Hologram Patch
    const holoX = backX + 36;
    const holoY = backY + backH - 124;
    const holoW = 72;
    const holoH = 72;
    
    const hGrad = ctx.createLinearGradient(holoX, holoY, holoX + holoW, holoY + holoH);
    hGrad.addColorStop(0, '#67e8f9'); 
    hGrad.addColorStop(0.5, '#c084fc'); 
    hGrad.addColorStop(1, '#34d399'); 
    ctx.fillStyle = hGrad;
    ctx.fillRect(holoX, holoY, holoW, holoH);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= holoW; i += 12) {
      ctx.beginPath(); ctx.moveTo(holoX + i, holoY); ctx.lineTo(holoX + holoW - i, holoY + holoH); ctx.stroke();
    }

    // Scannable Matrix Tracking QR Block
    const qrX = backX + backW - 108;
    const qrY = backY + backH - 124;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qrX, qrY, 72, 72);

    ctx.fillStyle = '#090d16';
    ctx.fillRect(qrX + 4, qrY + 4, 20, 20); ctx.fillStyle = '#ffffff'; ctx.fillRect(qrX + 8, qrY + 8, 12, 12); ctx.fillStyle = '#090d16'; ctx.fillRect(qrX + 11, qrY + 11, 6, 6);
    ctx.fillRect(qrX + 48, qrY + 4, 20, 20); ctx.fillStyle = '#ffffff'; ctx.fillRect(qrX + 52, qrY + 8, 12, 12); ctx.fillStyle = '#090d16'; ctx.fillRect(qrX + 55, qrY + 11, 6, 6);
    ctx.fillRect(qrX + 4, qrY + 48, 20, 20); ctx.fillStyle = '#ffffff'; ctx.fillRect(qrX + 8, qrY + 52, 12, 12); ctx.fillStyle = '#090d16'; ctx.fillRect(qrX + 11, qrY + 55, 6, 6);
    
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        if ((r < 2 && c < 2) || (r < 2 && c > 3) || (r > 3 && c < 2)) continue;
        if (Math.random() > 0.45) {
          ctx.fillRect(qrX + 6 + c * 10, qrY + 6 + r * 10, 8, 8);
        }
      }
    }

    ctx.restore();

    // Bind texture transforms smoothly
    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map, cardName]);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (state.gl.domElement) {
      state.gl.domElement.setAttribute('data-dragging', dragged ? 'true' : 'false');
    }

    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => { 
              e.target.releasePointerCapture(e.pointerId); 
              drag(false); 
              onDragStateChange(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
              onDragStateChange(true);
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.5}
                metalness={0.3}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <MeshLineGeo />
        <MeshLineMat
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}