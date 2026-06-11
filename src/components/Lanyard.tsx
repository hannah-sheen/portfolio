/* eslint-disable react/no-unknown-property */
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
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
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
  cardName = null
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
  const texture = useTexture(lanyardImage || lanyard);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map as THREE.Texture;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image as any;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: any, rect: typeof FRONT_UV_RECT) => {
      const padding = 0.10
      const rx = (rect.x + rect.w * padding) * W;
      const ry = (rect.y + rect.h * padding * 0.5) * H;
      const rw = rect.w * (1 - padding * 2) * W;
      const rh = rect.h * (1 - padding * 2.5) * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) {
      const faceX = FRONT_UV_RECT.x * W;
      const faceY = FRONT_UV_RECT.y * H;
      const faceW = FRONT_UV_RECT.w * W;
      const faceH = FRONT_UV_RECT.h * H;
      const img = frontTex.image as any;

      ctx.save();
      ctx.beginPath();
      ctx.rect(faceX, faceY, faceW, faceH);
      ctx.clip();

      // -- Background: soft warm white --
      ctx.fillStyle = '#faf9f7';
      ctx.fillRect(faceX, faceY, faceW, faceH);

      // -- Violet blob top-left --
      const b1 = ctx.createRadialGradient(faceX + faceW * 0.1, faceY + faceH * 0.08, 0, faceX + faceW * 0.1, faceY + faceH * 0.08, faceW * 0.52);
      b1.addColorStop(0, 'rgba(167,139,250,0.32)');
      b1.addColorStop(1, 'transparent');
      ctx.fillStyle = b1;
      ctx.fillRect(faceX, faceY, faceW, faceH);

      // -- Rose blob bottom-right --
      const b2 = ctx.createRadialGradient(faceX + faceW * 0.9, faceY + faceH * 0.9, 0, faceX + faceW * 0.9, faceY + faceH * 0.9, faceW * 0.48);
      b2.addColorStop(0, 'rgba(251,113,133,0.25)');
      b2.addColorStop(1, 'transparent');
      ctx.fillStyle = b2;
      ctx.fillRect(faceX, faceY, faceW, faceH);

      // -- Sky blob center-bottom --
      const b3 = ctx.createRadialGradient(faceX + faceW * 0.5, faceY + faceH, 0, faceX + faceW * 0.5, faceY + faceH, faceW * 0.4);
      b3.addColorStop(0, 'rgba(99,102,241,0.15)');
      b3.addColorStop(1, 'transparent');
      ctx.fillStyle = b3;
      ctx.fillRect(faceX, faceY, faceW, faceH);

      // -- Subtle grain --
      for (let i = 0; i < 1600; i++) {
        const gx = faceX + Math.random() * faceW;
        const gy = faceY + Math.random() * faceH;
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.035})`;
        ctx.fillRect(gx, gy, 1, 1);
      }
      ctx.restore();

      // -- Gradient top bar --
      ctx.save();
      const barH = faceH * 0.125;
      const barGrad = ctx.createLinearGradient(faceX, 0, faceX + faceW, 0);
      barGrad.addColorStop(0, '#6366f1');
      barGrad.addColorStop(0.55, '#a855f7');
      barGrad.addColorStop(1, '#f43f5e');
      ctx.fillStyle = barGrad;
      ctx.fillRect(faceX, faceY, faceW, barH);
      ctx.font = `700 ${Math.round(faceW * 0.062)}px Manrope, system-ui, sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('', faceX + faceW * 0.06, faceY + barH / 2);
      ctx.font = `400 ${Math.round(faceW * 0.055)}px Manrope, system-ui, sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillText('', faceX + faceW * 0.94, faceY + barH / 2);
      ctx.restore();

      // -- Photo: large circle --
      const photoSize = faceW * 0.56;
      const pcx = faceX + faceW / 2;
      const pcy = faceY + barH + faceH * 0.075 + photoSize / 2;
      const scale = Math.max(photoSize / img.width, photoSize / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;

      // Gradient ring
      ctx.save();
      const ringGrad = ctx.createLinearGradient(pcx - photoSize / 2, pcy, pcx + photoSize / 2, pcy);
      ringGrad.addColorStop(0, '#818cf8');
      ringGrad.addColorStop(0.5, '#a855f7');
      ringGrad.addColorStop(1, '#f43f5e');
      ctx.beginPath();
      ctx.arc(pcx, pcy, photoSize / 2 + 4, 0, Math.PI * 2);
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // Photo clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(pcx, pcy, photoSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, pcx - dw / 2, pcy - dh / 2, dw, dh);
      ctx.restore();

      // -- Name --
      ctx.save();
      const nameY = pcy + photoSize / 2 + faceH * 0.048;
      const nameSize = Math.round(faceW * 0.07);
      ctx.font = `700 ${nameSize}px Manrope, system-ui, sans-serif`;
      ctx.fillStyle = '#18181b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(cardName ?? '', pcx, nameY);

      // -- Gradient underline --
      const ulY = nameY + nameSize * 1.2;
      const ulW = faceW * 0.42;
      const ulGrad = ctx.createLinearGradient(pcx - ulW / 2, 0, pcx + ulW / 2, 0);
      ulGrad.addColorStop(0, 'transparent');
      ulGrad.addColorStop(0.3, '#a855f7');
      ulGrad.addColorStop(0.7, '#6366f1');
      ulGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = ulGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pcx - ulW / 2, ulY);
      ctx.lineTo(pcx + ulW / 2, ulY);
      ctx.stroke();

      // -- Role --
      const roleSize = Math.round(faceW * 0.063);
      ctx.font = `500 ${roleSize}px Manrope, system-ui, sans-serif`;
      ctx.fillStyle = '#7c3aed';
      ctx.fillText('Full Stack Developer', pcx, ulY + faceH * 0.025);
      ctx.restore();
    }

    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);

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
            onPointerUp={(e: any) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
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
