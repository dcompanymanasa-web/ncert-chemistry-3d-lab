import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { NCERTExperiment } from '../../data/experiments';
import { GraphicsQuality } from '../../utils/storage';
import { labAudio } from '../../utils/audio';

interface LabSceneProps {
  experiment: NCERTExperiment;
  simulationStep: number;
  isMolecularView: boolean;
  graphicsQuality: GraphicsQuality;
  isReacting: boolean;
  reactionProgress: number; // 0.0 to 1.0
  onInteractApparatus?: (apparatusName: string) => void;
}

export const LabScene: React.FC<LabSceneProps> = ({
  experiment,
  simulationStep,
  isMolecularView,
  graphicsQuality,
  isReacting,
  reactionProgress,
  onInteractApparatus
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Dynamic mesh groups for current scene
  const apparatusGroupRef = useRef<THREE.Group | null>(null);
  const particlesGroupRef = useRef<THREE.Points | null>(null);
  const flameLightRef = useRef<THREE.PointLight | null>(null);
  const burnerFlameMeshRef = useRef<THREE.Mesh | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const precipitateMeshRef = useRef<THREE.Mesh | null>(null);
  const solidReactantMeshRef = useRef<THREE.Mesh | null>(null);
  const molecularGroupRef = useRef<THREE.Group | null>(null);

  // Orbit controls state
  const isDraggingRef = useRef(false);
  const isPinchingRef = useRef(false);
  const previousTouchRef = useRef<{ x: number; y: number } | null>(null);
  const initialPinchDistRef = useRef<number>(0);
  const sphericalRef = useRef(new THREE.Spherical(4.2, Math.PI / 3, Math.PI / 4));
  const targetRef = useRef(new THREE.Vector3(0, 0.9, 0));

  // Tooltip / interactive hover state
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Setup Three.js scene once
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isMolecularView ? 0x07090e : 0x0f141f);
    scene.fog = new THREE.FogExp2(isMolecularView ? 0x07090e : 0x0f141f, 0.05);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    camera.position.setFromSpherical(sphericalRef.current).add(targetRef.current);
    camera.lookAt(targetRef.current);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: graphicsQuality !== 'low',
      powerPreference: 'high-performance',
      alpha: false
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);

    const dpr = graphicsQuality === 'low' ? 1 : graphicsQuality === 'medium' ? 1.25 : Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.shadowMap.enabled = graphicsQuality !== 'low';
    renderer.shadowMap.type = graphicsQuality === 'ultra' ? THREE.PCFSoftShadowMap : THREE.BasicShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xdbeafe, isMolecularView ? 0.6 : 0.85);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainKeyLight.position.set(4, 7, 5);
    mainKeyLight.castShadow = graphicsQuality !== 'low';
    if (mainKeyLight.castShadow) {
      mainKeyLight.shadow.mapSize.width = graphicsQuality === 'ultra' ? 2048 : 1024;
      mainKeyLight.shadow.mapSize.height = graphicsQuality === 'ultra' ? 2048 : 1024;
      mainKeyLight.shadow.camera.near = 0.5;
      mainKeyLight.shadow.camera.far = 25;
      mainKeyLight.shadow.camera.left = -3;
      mainKeyLight.shadow.camera.right = 3;
      mainKeyLight.shadow.camera.top = 3;
      mainKeyLight.shadow.camera.bottom = -3;
      mainKeyLight.shadow.bias = -0.0005;
    }
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xfef08a, 0.4, 10);
    fillLight.position.set(0, 3, 2);
    scene.add(fillLight);

    // Dynamic flame/reaction point light
    const flameLight = new THREE.PointLight(0xffedd5, 0, 8);
    flameLight.position.set(0, 1.2, 0);
    scene.add(flameLight);
    flameLightRef.current = flameLight;

    // Laboratory Bench / Table
    const benchGroup = createLabBench(graphicsQuality);
    scene.add(benchGroup);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    const renderLoop = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera position update
      if (cameraRef.current) {
        cameraRef.current.position.setFromSpherical(sphericalRef.current).add(targetRef.current);
        cameraRef.current.lookAt(targetRef.current);
      }

      // Animate active flame/flicker
      if (flameLightRef.current && isReacting) {
        flameLightRef.current.intensity = 1.8 + Math.sin(elapsedTime * 25) * 0.4 + Math.random() * 0.3;
      }

      // Animate burner flame mesh if present
      if (burnerFlameMeshRef.current) {
        const scaleY = 1.0 + Math.sin(elapsedTime * 18) * 0.15;
        const scaleX = 1.0 + Math.cos(elapsedTime * 12) * 0.1;
        burnerFlameMeshRef.current.scale.set(scaleX, scaleY, scaleX);
      }

      // Animate particles (bubbles, steam, fumes)
      if (particlesGroupRef.current && particlesGroupRef.current.geometry) {
        const positions = particlesGroupRef.current.geometry.attributes.position.array as Float32Array;
        const count = positions.length / 3;
        for (let i = 0; i < count; i++) {
          positions[i * 3 + 1] += delta * (0.8 + (i % 5) * 0.2); // move up
          positions[i * 3] += Math.sin(elapsedTime * 3 + i) * 0.003;
          if (positions[i * 3 + 1] > 2.5) {
            positions[i * 3 + 1] = 0.4 + (i % 10) * 0.05;
          }
        }
        particlesGroupRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate molecular view rotation
      if (molecularGroupRef.current) {
        molecularGroupRef.current.rotation.y = elapsedTime * 0.3;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, [graphicsQuality, isMolecularView]);

  // Build Apparatus / Experiment or Molecular Geometry whenever experiment/step changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Clear previous dynamic groups
    if (apparatusGroupRef.current) {
      scene.remove(apparatusGroupRef.current);
      apparatusGroupRef.current = null;
    }
    if (molecularGroupRef.current) {
      scene.remove(molecularGroupRef.current);
      molecularGroupRef.current = null;
    }
    if (particlesGroupRef.current) {
      scene.remove(particlesGroupRef.current);
      particlesGroupRef.current = null;
    }

    if (isMolecularView) {
      // Build 3D Molecular Chamber
      const molGroup = buildMolecularScene(experiment, reactionProgress);
      scene.add(molGroup);
      molecularGroupRef.current = molGroup;
      targetRef.current.set(0, 1.2, 0);
      sphericalRef.current.radius = 4.8;
      sphericalRef.current.phi = Math.PI / 2.6;
    } else {
      // Build Realistic Physical Apparatus for Current Activity
      const { group, liquidMesh, precipitateMesh, solidMesh, flameMesh, particles } = 
        buildApparatusScene(experiment, simulationStep, reactionProgress, isReacting, graphicsQuality);

      scene.add(group);
      apparatusGroupRef.current = group;
      liquidMeshRef.current = liquidMesh;
      precipitateMeshRef.current = precipitateMesh;
      solidReactantMeshRef.current = solidMesh;
      burnerFlameMeshRef.current = flameMesh;

      if (particles) {
        scene.add(particles);
        particlesGroupRef.current = particles;
      }

      // Adjust camera focus per experiment type
      if (experiment.realLabHighlights.glasswareType === 'watch_glass') {
        targetRef.current.set(0, 0.8, 0);
        sphericalRef.current.radius = 3.6;
        sphericalRef.current.phi = Math.PI / 3.2;
      } else if (experiment.realLabHighlights.glasswareType === 'beaker') {
        targetRef.current.set(0, 0.9, 0);
        sphericalRef.current.radius = 3.8;
        sphericalRef.current.phi = Math.PI / 2.8;
      } else if (experiment.realLabHighlights.glasswareType === 'electrolysis_cell') {
        targetRef.current.set(0, 1.1, 0);
        sphericalRef.current.radius = 4.2;
        sphericalRef.current.phi = Math.PI / 2.6;
      } else {
        targetRef.current.set(0, 0.95, 0);
        sphericalRef.current.radius = 3.9;
        sphericalRef.current.phi = Math.PI / 2.7;
      }
    }
  }, [experiment, simulationStep, isMolecularView, graphicsQuality]);

  // Update dynamic reaction animation state (liquid height, colors, precipitate opacity)
  useEffect(() => {
    if (!isMolecularView) {
      updateDynamicApparatus(
        experiment,
        simulationStep,
        reactionProgress,
        isReacting,
        liquidMeshRef.current,
        precipitateMeshRef.current,
        solidReactantMeshRef.current,
        flameLightRef.current
      );
    }
  }, [reactionProgress, isReacting, simulationStep, experiment, isMolecularView]);

  // Pointer & Touch Controls for smooth 3D Orbiting, Panning, and Pinch-Zooming
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousTouchRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Tooltip raycasting
    if (containerRef.current && cameraRef.current && apparatusGroupRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(apparatusGroupRef.current.children, true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.name && obj.parent) {
          obj = obj.parent;
        }
        setHoveredObject(obj?.name || null);
      } else {
        setHoveredObject(null);
      }
    }

    if (!isDraggingRef.current || !previousTouchRef.current) return;
    const deltaX = e.clientX - previousTouchRef.current.x;
    const deltaY = e.clientY - previousTouchRef.current.y;
    previousTouchRef.current = { x: e.clientX, y: e.clientY };

    // Update spherical camera coordinates
    sphericalRef.current.theta -= deltaX * 0.007;
    sphericalRef.current.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, sphericalRef.current.phi - deltaY * 0.007));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    previousTouchRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    sphericalRef.current.radius = Math.max(1.8, Math.min(8.0, sphericalRef.current.radius + e.deltaY * 0.003));
  };

  // Touch Pinch-to-Zoom for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      isPinchingRef.current = true;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPinchingRef.current && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const diff = initialPinchDistRef.current - currentDist;
      sphericalRef.current.radius = Math.max(1.8, Math.min(8.0, sphericalRef.current.radius + diff * 0.01));
      initialPinchDistRef.current = currentDist;
    }
  };

  const handleTouchEnd = () => {
    isPinchingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] md:h-[500px] lg:h-[560px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-[#0c0f17] border border-lab-border shadow-2xl select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D View Overlays */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="font-semibold text-slate-200">
          {isMolecularView ? '🔬 3D Molecular Chamber' : `⚗️ Virtual Lab — ${experiment.activityNumber}`}
        </span>
      </div>

      {/* Interactive Tooltip on Hover */}
      {hoveredObject && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-cyan-200 text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>{hoveredObject}</span>
        </div>
      )}

      {/* Orbit Controls Guidance overlay */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none hidden sm:flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] text-slate-400 border border-slate-800">
        <span>🖱️ Drag to Rotate</span>
        <span>•</span>
        <span>🔍 Scroll/Pinch to Zoom</span>
      </div>
    </div>
  );
};

// ==========================================
// 3D LAB BENCH & ENVIRONMENT
// ==========================================
function createLabBench(quality: GraphicsQuality): THREE.Group {
  const benchGroup = new THREE.Group();
  benchGroup.name = "Laboratory Bench";

  // Granite / Slate Lab Worktop with Chamfered Edges
  const topGeo = new THREE.BoxGeometry(7.0, 0.16, 4.5);
  const topMat = new THREE.MeshStandardMaterial({
    color: 0x1a2130,
    roughness: 0.28,
    metalness: 0.12,
  });
  const tabletop = new THREE.Mesh(topGeo, topMat);
  tabletop.position.set(0, -0.08, 0);
  tabletop.receiveShadow = quality !== 'low';
  benchGroup.add(tabletop);

  // Bench Bevel Trim (Dark Anodized Aluminum Edge)
  const trimGeo = new THREE.BoxGeometry(7.05, 0.04, 4.55);
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.4,
    metalness: 0.8
  });
  const trim = new THREE.Mesh(trimGeo, trimMat);
  trim.position.set(0, -0.18, 0);
  benchGroup.add(trim);

  // Background Wall / Lab Splashback with Tile Grid Lines
  const wallGeo = new THREE.PlaneGeometry(9.0, 5.0);
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x0e131f,
    roughness: 0.6,
    metalness: 0.05
  });
  const wall = new THREE.Mesh(wallGeo, wallMat);
  wall.position.set(0, 2.2, -2.1);
  benchGroup.add(wall);

  // Wooden / Metal Lab Shelves behind bench
  const shelfGeo = new THREE.BoxGeometry(6.0, 0.06, 0.5);
  const shelfMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.35,
    metalness: 0.6
  });
  const shelf = new THREE.Mesh(shelfGeo, shelfMat);
  shelf.position.set(0, 2.6, -1.8);
  benchGroup.add(shelf);

  // Amber reagent bottles on background shelf
  const shelfBottleColors = [0x78350f, 0x1e293b, 0x0f766e, 0x7c2d12];
  for (let i = 0; i < 4; i++) {
    const bGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.38, 16);
    const bMat = new THREE.MeshStandardMaterial({
      color: shelfBottleColors[i],
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const shelfBottle = new THREE.Mesh(bGeo, bMat);
    shelfBottle.position.set(-1.8 + i * 1.2, 2.82, -1.8);
    shelfBottle.name = "Reagent Bottle (Shelf)";
    benchGroup.add(shelfBottle);

    // Stopper
    const stGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.1, 12);
    const stMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.2 });
    const stopper = new THREE.Mesh(stGeo, stMat);
    stopper.position.set(-1.8 + i * 1.2, 3.06, -1.8);
    benchGroup.add(stopper);
  }

  return benchGroup;
}

// ==========================================
// REALISTIC GLASS MATERIALS
// ==========================================
function getRealisticGlassMaterial(quality: GraphicsQuality): THREE.Material {
  if (quality === 'low') {
    return new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1
    });
  }

  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1.0,
    roughness: 0.06,
    metalness: 0.02,
    transmission: 0.94,
    ior: 1.52, // Borosilicate Glass index of refraction
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    specularIntensity: 1.0,
    specularColor: new THREE.Color(0xffffff),
    thickness: 0.12
  });
}

// ==========================================
// BUILD APPARATUS SCENE PER EXPERIMENT
// ==========================================
function buildApparatusScene(
  experiment: NCERTExperiment,
  step: number,
  progress: number,
  isReacting: boolean,
  quality: GraphicsQuality
) {
  const group = new THREE.Group();
  group.name = experiment.title;

  let liquidMesh: THREE.Mesh | null = null;
  let precipitateMesh: THREE.Mesh | null = null;
  let solidMesh: THREE.Mesh | null = null;
  let flameMesh: THREE.Mesh | null = null;
  let particles: THREE.Points | null = null;

  const glassMat = getRealisticGlassMaterial(quality);

  switch (experiment.activityNumber) {
    // ----------------------------------------------------
    // Activity 1.1: Magnesium Ribbon Burning & Watch Glass
    // ----------------------------------------------------
    case "Activity 1.1": {
      // 1. Watch Glass
      const watchGlassGeo = new THREE.SphereGeometry(0.75, 32, 16, 0, Math.PI * 2, 0, Math.PI / 4.5);
      const watchGlass = new THREE.Mesh(watchGlassGeo, glassMat);
      watchGlass.rotation.x = Math.PI;
      watchGlass.position.set(0.6, 0.12, 0.4);
      watchGlass.name = "Watch Glass (Borosilicate)";
      group.add(watchGlass);

      // Ash on Watch Glass (White MgO powder)
      const ashGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.04, 24);
      const ashMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.95,
        transparent: true,
        opacity: step >= 3 ? Math.min(1.0, 0.2 + progress * 0.8) : 0
      });
      const ashMesh = new THREE.Mesh(ashGeo, ashMat);
      ashMesh.position.set(0.6, 0.03, 0.4);
      ashMesh.name = "Magnesium Oxide Ash (MgO)";
      group.add(ashMesh);
      precipitateMesh = ashMesh;

      // 2. Bunsen Burner
      const burner = createBunsenBurner(group, new THREE.Vector3(-0.8, 0, 0));
      flameMesh = burner.flame;

      // 3. Laboratory Tongs
      const tongsGroup = new THREE.Group();
      tongsGroup.name = "Crucible Tongs";
      const tongMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.25, metalness: 0.9 });
      const tongArmGeo = new THREE.CylinderGeometry(0.02, 0.025, 1.2, 12);
      const tongArm1 = new THREE.Mesh(tongArmGeo, tongMat);
      tongArm1.position.set(-0.04, 0.6, 0);
      tongArm1.rotation.z = 0.08;
      const tongArm2 = new THREE.Mesh(tongArmGeo, tongMat);
      tongArm2.position.set(0.04, 0.6, 0);
      tongArm2.rotation.z = -0.08;
      tongsGroup.add(tongArm1, tongArm2);

      // Magnesium Ribbon
      const ribbonGeo = new THREE.BoxGeometry(0.04, 0.5, 0.015);
      const ribbonMat = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0,
        metalness: 0.92,
        roughness: 0.25
      });
      const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
      ribbon.position.set(0, 0.1, 0);
      ribbon.name = "Magnesium Ribbon (Mg)";
      tongsGroup.add(ribbon);
      solidMesh = ribbon;

      // Position tongs based on simulation step
      if (step === 1) {
        tongsGroup.position.set(0.2, 0.3, 0.5);
        tongsGroup.rotation.z = 0.2;
      } else if (step >= 2) {
        tongsGroup.position.set(-0.8, 0.75, 0);
        tongsGroup.rotation.z = -0.35;
      }
      group.add(tongsGroup);

      // Combustion Dazzling Particle System
      if (isReacting) {
        particles = createParticleSparkles(new THREE.Vector3(-0.8, 1.1, 0), 0xffffff, 150);
      }
      break;
    }

    // ----------------------------------------------------
    // Activity 1.2: Lead Nitrate & Potassium Iodide Test Tube
    // ----------------------------------------------------
    case "Activity 1.2": {
      // Test Tube Rack
      createTestTubeRack(group, new THREE.Vector3(0, 0, 0));

      // Main Reaction Test Tube
      const tubeGroup = createTestTube(glassMat, new THREE.Vector3(0, 0.7, 0));
      tubeGroup.name = "Reaction Test Tube";
      group.add(tubeGroup);

      // Lead Nitrate Solution inside tube (clear colourless)
      const liquidGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 24);
      const liquidMat = new THREE.MeshPhysicalMaterial({
        color: 0xe2e8f0,
        transmission: 0.88,
        transparent: true,
        opacity: 0.75,
        roughness: 0.08,
        ior: 1.33
      });
      const liquid = new THREE.Mesh(liquidGeo, liquidMat);
      liquid.position.set(0, -0.25, 0);
      liquid.name = "Lead Nitrate Solution (Pb(NO₃)₂)";
      tubeGroup.add(liquid);
      liquidMesh = liquid;

      // Canary Yellow Precipitate (PbI₂)
      const pbi2Geo = new THREE.CylinderGeometry(0.18, 0.18, 0.35, 24);
      const pbi2Mat = new THREE.MeshStandardMaterial({
        color: 0xfacc15, // Bright yellow
        roughness: 0.85,
        transparent: true,
        opacity: step >= 3 ? Math.min(0.95, progress * 1.1) : 0
      });
      const pbi2 = new THREE.Mesh(pbi2Geo, pbi2Mat);
      pbi2.position.set(0, -0.45, 0);
      pbi2.name = "Lead(II) Iodide Precipitate (PbI₂)";
      tubeGroup.add(pbi2);
      precipitateMesh = pbi2;

      // Potassium Iodide Dropper
      const dropper = createDropper(new THREE.Vector3(0.15, 1.6, 0.1), 0xf1f5f9);
      if (step >= 2) {
        dropper.position.set(0, 1.4, 0);
      }
      group.add(dropper);

      // Reagent Bottle on bench
      const bottle = createReagentBottle("KI (Potassium Iodide)", 0x1e293b, new THREE.Vector3(1.4, 0, 0));
      group.add(bottle);
      break;
    }

    // ----------------------------------------------------
    // Activity 1.3: Zinc Granules with Dilute Acid (Flask)
    // ----------------------------------------------------
    case "Activity 1.3": {
      // Conical / Erlenmeyer Flask
      const flaskGroup = createConicalFlask(glassMat, new THREE.Vector3(0, 0, 0));
      group.add(flaskGroup);

      // Dilute Acid liquid inside flask
      const acidGeo = new THREE.CylinderGeometry(0.48, 0.68, 0.6, 24);
      const acidMat = new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        transmission: 0.9,
        transparent: true,
        opacity: step >= 2 ? 0.8 : 0,
        roughness: 0.1,
        ior: 1.33
      });
      const acid = new THREE.Mesh(acidGeo, acidMat);
      acid.position.set(0, 0.32, 0);
      acid.name = "Dilute H₂SO₄ Acid";
      flaskGroup.add(acid);
      liquidMesh = acid;

      // Zinc granules on flask base
      const zincGroup = new THREE.Group();
      zincGroup.name = "Zinc Granules (Zn)";
      const znMat = new THREE.MeshStandardMaterial({ color: 0x71717a, roughness: 0.45, metalness: 0.85 });
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2;
        const rad = 0.15 + (i % 3) * 0.1;
        const znPiece = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 0), znMat);
        znPiece.position.set(Math.cos(angle) * rad, 0.08, Math.sin(angle) * rad);
        znPiece.rotation.set(i * 0.4, i * 0.7, 0);
        zincGroup.add(znPiece);
      }
      zincGroup.visible = step >= 1;
      flaskGroup.add(zincGroup);
      solidMesh = zincGroup as unknown as THREE.Mesh;

      // Rubber Cork with Glass Delivery Tube
      if (step >= 2) {
        const cork = createRubberCorkWithTube(new THREE.Vector3(0, 1.45, 0));
        flaskGroup.add(cork);
      }

      // Acid Reagent Bottle
      const acidBottle = createReagentBottle("Dil. H₂SO₄ Acid", 0x78350f, new THREE.Vector3(1.3, 0, -0.2));
      group.add(acidBottle);

      // Effervescence Micro-bubbles
      if (isReacting || step === 3) {
        particles = createRisingBubbles(new THREE.Vector3(0, 0.35, 0), 0xffffff, 80);
      }
      break;
    }

    // ----------------------------------------------------
    // Activity 1.4: Quicklime and Water in Beaker
    // ----------------------------------------------------
    case "Activity 1.4": {
      // 250 mL Glass Beaker
      const beakerGroup = createBeaker(glassMat, new THREE.Vector3(0, 0, 0));
      group.add(beakerGroup);

      // Quicklime solid lumps inside beaker
      const limeGroup = new THREE.Group();
      limeGroup.name = "Quicklime Lumps (CaO)";
      const limeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.9 });
      for (let i = 0; i < 7; i++) {
        const lump = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 1), limeMat);
        const ang = (i / 7) * Math.PI * 2;
        lump.position.set(Math.cos(ang) * 0.22, 0.1, Math.sin(ang) * 0.22);
        limeGroup.add(lump);
      }
      limeGroup.visible = step >= 1;
      beakerGroup.add(limeGroup);
      solidMesh = limeGroup as unknown as THREE.Mesh;

      // Water / Slaked Lime liquid
      const slakeGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.6, 32);
      const slakeMat = new THREE.MeshPhysicalMaterial({
        color: step >= 3 ? 0xf8fafc : 0x38bdf8,
        transmission: step >= 3 ? 0.3 : 0.85,
        transparent: true,
        opacity: step >= 2 ? 0.85 : 0,
        roughness: 0.3
      });
      const slakeLiquid = new THREE.Mesh(slakeGeo, slakeMat);
      slakeLiquid.position.set(0, 0.32, 0);
      slakeLiquid.name = "Slaked Lime Suspension Ca(OH)₂";
      beakerGroup.add(slakeLiquid);
      liquidMesh = slakeLiquid;

      // Steam particles when exothermic reaction occurs
      if (isReacting || step === 3) {
        particles = createSteamPlume(new THREE.Vector3(0, 0.65, 0), 0xffffff, 90);
      }

      // Water wash bottle
      const washBottle = createReagentBottle("Distilled H₂O", 0x0284c7, new THREE.Vector3(1.3, 0, 0.3));
      group.add(washBottle);
      break;
    }

    // ----------------------------------------------------
    // Activity 1.5: Ferrous Sulphate Decomposition (Boiling Tube)
    // ----------------------------------------------------
    case "Activity 1.5": {
      // Bunsen Burner
      const burner = createBunsenBurner(group, new THREE.Vector3(0, 0, 0));
      flameMesh = burner.flame;

      // Boiling Tube clamped over burner at 45 degree angle
      const tubeGroup = createTestTube(glassMat, new THREE.Vector3(0, 0.9, 0), true);
      tubeGroup.rotation.z = -0.4; // 45 degree safety tilt pointing away
      tubeGroup.name = "Pyrex Boiling Tube (FeSO₄)";
      group.add(tubeGroup);

      // Crystals inside bottom of tube
      const crystalGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.25, 16);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: step >= 3 ? 0x991b1b : 0x86efac, // Green -> Reddish brown Fe₂O₃
        roughness: 0.85
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      crystalMesh.position.set(0, -0.45, 0);
      crystalMesh.name = "Ferrous Sulphate Crystals";
      tubeGroup.add(crystalMesh);
      solidMesh = crystalMesh;

      // Gas / smoke release
      if (isReacting || step === 3) {
        particles = createGasFumes(new THREE.Vector3(0.4, 1.4, 0), 0xfed7aa, 80);
      }
      break;
    }

    // ----------------------------------------------------
    // Activity 1.6: Lead Nitrate Decomposition (Brown Fumes)
    // ----------------------------------------------------
    case "Activity 1.6": {
      // Bunsen Burner
      const burner = createBunsenBurner(group, new THREE.Vector3(0, 0, 0));
      flameMesh = burner.flame;

      // Boiling Tube
      const tubeGroup = createTestTube(glassMat, new THREE.Vector3(0, 0.9, 0), true);
      tubeGroup.rotation.z = -0.35;
      group.add(tubeGroup);

      // Lead nitrate powder
      const powderGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.22, 16);
      const powderMat = new THREE.MeshStandardMaterial({
        color: step >= 3 ? 0xfacc15 : 0xf8fafc, // White -> Yellow PbO residue
        roughness: 0.9
      });
      const powder = new THREE.Mesh(powderGeo, powderMat);
      powder.position.set(0, -0.48, 0);
      powder.name = "Lead Nitrate / Oxide Residue";
      tubeGroup.add(powder);
      solidMesh = powder;

      // Reddish Brown NO₂ Fumes
      if (isReacting || step === 3) {
        particles = createGasFumes(new THREE.Vector3(0.35, 1.45, 0), 0x9a3412, 120);
      }
      break;
    }

    // ----------------------------------------------------
    // Activity 1.7: Electrolysis of Water (Voltameter)
    // ----------------------------------------------------
    case "Activity 1.7": {
      const cellGroup = createElectrolysisCell(glassMat, step, progress);
      group.add(cellGroup);

      if (isReacting || step >= 2) {
        particles = createElectrolysisBubbles(new THREE.Vector3(-0.28, 0.4, 0), new THREE.Vector3(0.28, 0.4, 0), 100);
      }
      break;
    }

    // ----------------------------------------------------
    // Activity 1.8: Photolytic Decomposition of AgCl in Sunlight
    // ----------------------------------------------------
    case "Activity 1.8": {
      // China Dish
      const dishGroup = createChinaDish(new THREE.Vector3(0, 0.08, 0));
      group.add(dishGroup);

      // Silver Chloride Powder inside dish (White -> Grey Ag)
      const agclGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.05, 24);
      const agclMat = new THREE.MeshStandardMaterial({
        color: step >= 3 ? 0x94a3b8 : 0xf8fafc, // White to Grey
        roughness: 0.8
      });
      const agcl = new THREE.Mesh(agclGeo, agclMat);
      agcl.position.set(0, 0.08, 0);
      agcl.name = "Silver Chloride Powder (AgCl)";
      dishGroup.add(agcl);
      solidMesh = agcl;

      // Sunlight Ray Beam Representation
      const beamGeo = new THREE.CylinderGeometry(0.05, 0.9, 3.0, 16);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: step >= 2 ? 0.25 : 0.05
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0.6, 1.6, 0);
      beam.rotation.z = -0.3;
      beam.name = "Sunlight Energy (hν)";
      group.add(beam);
      break;
    }

    // ----------------------------------------------------
    // Activity 1.9: Iron Nail in Copper Sulphate Solution
    // ----------------------------------------------------
    case "Activity 1.9": {
      createTestTubeRack(group, new THREE.Vector3(0, 0, 0));

      // Tube A: Control standard (Pure Blue CuSO₄)
      const tubeA = createTestTube(glassMat, new THREE.Vector3(-0.5, 0.7, 0));
      tubeA.name = "Test Tube A (Control Standard)";
      const blueLiqGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 20);
      const blueLiqMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7, // Blue
        transmission: 0.8,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1
      });
      const blueLiq = new THREE.Mesh(blueLiqGeo, blueLiqMat);
      blueLiq.position.set(0, -0.25, 0);
      tubeA.add(blueLiq);
      group.add(tubeA);

      // Tube B: Reaction Test Tube (Blue -> Light Green FeSO₄)
      const tubeB = createTestTube(glassMat, new THREE.Vector3(0.5, 0.7, 0));
      tubeB.name = "Test Tube B (Reaction Tube)";
      const rxnLiqMat = new THREE.MeshPhysicalMaterial({
        color: step >= 3 ? 0x86efac : 0x0284c7, // Blue -> Green
        transmission: 0.82,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1
      });
      const rxnLiq = new THREE.Mesh(blueLiqGeo, rxnLiqMat);
      rxnLiq.position.set(0, -0.25, 0);
      tubeB.add(rxnLiq);
      liquidMesh = rxnLiq;
      group.add(tubeB);

      // Iron Nails immersed in Tube B
      if (step >= 2) {
        const nailGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.9, 12);
        const nailMat = new THREE.MeshStandardMaterial({
          color: step >= 3 ? 0xb45309 : 0x94a3b8, // Grey -> Brown Copper
          metalness: 0.8,
          roughness: 0.35
        });
        const nail = new THREE.Mesh(nailGeo, nailMat);
        nail.position.set(0.02, -0.2, 0);
        nail.rotation.z = 0.08;
        nail.name = "Iron Nail with Displaced Copper";
        tubeB.add(nail);
        solidMesh = nail;
      }

      // Control reference nail on bench
      const refNail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.9, 12),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.25 })
      );
      refNail.position.set(1.2, 0.02, 0.3);
      refNail.rotation.z = Math.PI / 2;
      refNail.name = "Control Iron Nail (Shiny Grey)";
      group.add(refNail);
      break;
    }

    // ----------------------------------------------------
    // Activity 1.10: Sodium Sulphate & Barium Chloride (Precipitate)
    // ----------------------------------------------------
    case "Activity 1.10": {
      createTestTubeRack(group, new THREE.Vector3(0, 0, 0));

      const tubeGroup = createTestTube(glassMat, new THREE.Vector3(0, 0.7, 0));
      tubeGroup.name = "Precipitation Tube";
      group.add(tubeGroup);

      // Clear liquid
      const liqGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 20);
      const liqMat = new THREE.MeshPhysicalMaterial({
        color: 0xf1f5f9,
        transmission: 0.9,
        transparent: true,
        opacity: 0.75,
        roughness: 0.1
      });
      const liq = new THREE.Mesh(liqGeo, liqMat);
      liq.position.set(0, -0.25, 0);
      tubeGroup.add(liq);
      liquidMesh = liq;

      // Dense White Barium Sulphate (BaSO₄) Precipitate
      const baso4Geo = new THREE.CylinderGeometry(0.18, 0.18, 0.45, 20);
      const baso4Mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.9,
        transparent: true,
        opacity: step >= 3 ? Math.min(1.0, 0.3 + progress * 0.7) : 0
      });
      const baso4 = new THREE.Mesh(baso4Geo, baso4Mat);
      baso4.position.set(0, -0.42, 0);
      baso4.name = "Barium Sulphate White Precipitate (BaSO₄)";
      tubeGroup.add(baso4);
      precipitateMesh = baso4;

      // Second tube pouring in step 3
      const pouringTube = createTestTube(glassMat, new THREE.Vector3(0.4, 1.4, 0));
      pouringTube.rotation.z = step === 3 ? 0.95 : 0;
      pouringTube.name = "Barium Chloride Test Tube";
      group.add(pouringTube);
      break;
    }

    // ----------------------------------------------------
    // Activity 1.11: Copper Oxidation & Reduction (Tripod + Dish)
    // ----------------------------------------------------
    case "Activity 1.11": {
      // Metal Tripod Stand with Wire Gauze
      createTripodStand(group, new THREE.Vector3(0, 0, 0));

      // Bunsen Burner below tripod
      const burner = createBunsenBurner(group, new THREE.Vector3(0, 0, 0));
      flameMesh = burner.flame;

      // China Dish on wire gauze
      const dish = createChinaDish(new THREE.Vector3(0, 0.92, 0));
      group.add(dish);

      // Copper Powder inside dish
      const cuPowderGeo = new THREE.CylinderGeometry(0.45, 0.48, 0.05, 24);
      const cuPowderMat = new THREE.MeshStandardMaterial({
        color: step === 2 ? 0x1e293b : 0xb45309, // Brown -> Black CuO -> Brown Cu
        roughness: 0.85
      });
      const cuPowder = new THREE.Mesh(cuPowderGeo, cuPowderMat);
      cuPowder.position.set(0, 0.06, 0);
      cuPowder.name = "Copper Powder / CuO Layer";
      dish.add(cuPowder);
      solidMesh = cuPowder;

      // Hydrogen Delivery Tube in Step 3
      if (step === 3) {
        const h2Tube = createRubberCorkWithTube(new THREE.Vector3(0.5, 1.4, 0));
        h2Tube.rotation.z = 0.8;
        h2Tube.name = "Hydrogen Gas Tube (H₂)";
        group.add(h2Tube);
      }
      break;
    }
  }

  return {
    group,
    liquidMesh,
    precipitateMesh,
    solidMesh,
    flameMesh,
    particles
  };
}

// Dynamic updates during active reaction animation
function updateDynamicApparatus(
  experiment: NCERTExperiment,
  step: number,
  progress: number,
  isReacting: boolean,
  liquidMesh: THREE.Mesh | null,
  precipitateMesh: THREE.Mesh | null,
  solidMesh: THREE.Mesh | null,
  flameLight: THREE.PointLight | null
) {
  if (flameLight) {
    if (isReacting && (experiment.activityNumber === "Activity 1.1" || experiment.activityNumber === "Activity 1.5" || experiment.activityNumber === "Activity 1.6" || experiment.activityNumber === "Activity 1.11")) {
      flameLight.intensity = 2.0;
    } else {
      flameLight.intensity = 0;
    }
  }

  if (precipitateMesh && precipitateMesh.material instanceof THREE.Material) {
    if (step >= 3) {
      precipitateMesh.material.opacity = Math.min(0.95, progress * 1.2);
    }
  }

  if (experiment.activityNumber === "Activity 1.9" && liquidMesh) {
    // Blue to Green gradual interpolation
    if (step >= 3 && liquidMesh.material instanceof THREE.MeshPhysicalMaterial) {
      const startCol = new THREE.Color(0x0284c7);
      const endCol = new THREE.Color(0x86efac);
      liquidMesh.material.color.lerpColors(startCol, endCol, progress);
    }
  }

  if (experiment.activityNumber === "Activity 1.8" && solidMesh) {
    // White to Grey AgCl photolysis
    if (step >= 3 && solidMesh.material instanceof THREE.MeshStandardMaterial) {
      const whiteCol = new THREE.Color(0xf8fafc);
      const greyCol = new THREE.Color(0x64748b);
      solidMesh.material.color.lerpColors(whiteCol, greyCol, progress);
    }
  }

  if (experiment.activityNumber === "Activity 1.11" && solidMesh) {
    if (step === 2 && solidMesh.material instanceof THREE.MeshStandardMaterial) {
      // Brown to Black
      const brownCol = new THREE.Color(0xb45309);
      const blackCol = new THREE.Color(0x18181b);
      solidMesh.material.color.lerpColors(brownCol, blackCol, progress);
    } else if (step === 3 && solidMesh.material instanceof THREE.MeshStandardMaterial) {
      // Black back to Brown
      const blackCol = new THREE.Color(0x18181b);
      const brownCol = new THREE.Color(0xb45309);
      solidMesh.material.color.lerpColors(blackCol, brownCol, progress);
    }
  }
}

// ==========================================
// 3D MOLECULAR VIEW CHAMBER
// ==========================================
function buildMolecularScene(experiment: NCERTExperiment, progress: number): THREE.Group {
  const molGroup = new THREE.Group();
  molGroup.name = "3D Molecular Chamber";

  const { reactantMolecules, productMolecules } = experiment.molecularView;

  // Reactants on the Left (-X)
  const leftGroup = new THREE.Group();
  leftGroup.position.set(-1.8, 1.2, 0);
  molGroup.add(leftGroup);

  // Products on the Right (+X)
  const rightGroup = new THREE.Group();
  rightGroup.position.set(1.8, 1.2, 0);
  molGroup.add(rightGroup);

  // Reaction Arrow in Center
  const arrowGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.0, 12);
  const arrowMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
  const arrowShaft = new THREE.Mesh(arrowGeo, arrowMat);
  arrowShaft.rotation.z = Math.PI / 2;
  arrowShaft.position.set(0, 1.2, 0);
  molGroup.add(arrowShaft);

  const headGeo = new THREE.ConeGeometry(0.12, 0.28, 16);
  const arrowHead = new THREE.Mesh(headGeo, arrowMat);
  arrowHead.rotation.z = -Math.PI / 2;
  arrowHead.position.set(0.6, 1.2, 0);
  molGroup.add(arrowHead);

  // Build 3D Atoms for Reactants
  reactantMolecules.forEach((mol, idx) => {
    const mSubGroup = new THREE.Group();
    mSubGroup.position.set(0, (idx - (reactantMolecules.length - 1) / 2) * 1.1, 0);

    mol.atoms.forEach((atom, aIdx) => {
      for (let c = 0; c < atom.count; c++) {
        const atomGeo = new THREE.SphereGeometry(atom.radius, 24, 24);
        const atomMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(atom.color),
          roughness: 0.2,
          metalness: 0.1
        });
        const atomMesh = new THREE.Mesh(atomGeo, atomMat);
        atomMesh.position.set((c - (atom.count - 1) / 2) * (atom.radius * 1.8), aIdx * 0.15, 0);
        atomMesh.name = `${atom.symbol} Atom`;
        mSubGroup.add(atomMesh);
      }
    });
    leftGroup.add(mSubGroup);
  });

  // Build 3D Atoms for Products
  productMolecules.forEach((mol, idx) => {
    const mSubGroup = new THREE.Group();
    mSubGroup.position.set(0, (idx - (productMolecules.length - 1) / 2) * 1.1, 0);

    mol.atoms.forEach((atom, aIdx) => {
      for (let c = 0; c < atom.count; c++) {
        const atomGeo = new THREE.SphereGeometry(atom.radius, 24, 24);
        const atomMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(atom.color),
          roughness: 0.2,
          metalness: 0.1
        });
        const atomMesh = new THREE.Mesh(atomGeo, atomMat);
        atomMesh.position.set((c - (atom.count - 1) / 2) * (atom.radius * 1.8), aIdx * 0.15, 0);
        atomMesh.name = `${atom.symbol} Atom`;
        mSubGroup.add(atomMesh);
      }
    });
    rightGroup.add(mSubGroup);
  });

  return molGroup;
}

// ==========================================
// PROCEDURAL GLASSWARE & EQUIPMENT BUILDERS
// ==========================================

// Realistic Test Tube with Rounded Bottom & Lip Rim
function createTestTube(glassMat: THREE.Material, pos: THREE.Vector3, isBoilingTube: boolean = false): THREE.Group {
  const group = new THREE.Group();
  group.position.copy(pos);

  const radius = isBoilingTube ? 0.24 : 0.19;
  const height = isBoilingTube ? 1.4 : 1.25;

  // Main Cylinder
  const cylGeo = new THREE.CylinderGeometry(radius, radius, height, 32, 1, true);
  const tubeBody = new THREE.Mesh(cylGeo, glassMat);
  tubeBody.position.y = 0;
  group.add(tubeBody);

  // Hemispherical Rounded Bottom
  const bottomGeo = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const bottom = new THREE.Mesh(bottomGeo, glassMat);
  bottom.position.y = -height / 2;
  group.add(bottom);

  // Flanged Open Lip Rim (Torus)
  const rimGeo = new THREE.TorusGeometry(radius, 0.025, 12, 32);
  const rim = new THREE.Mesh(rimGeo, glassMat);
  rim.position.y = height / 2;
  rim.rotation.x = Math.PI / 2;
  group.add(rim);

  return group;
}

// Realistic Graduated Beaker with Pour Spout
function createBeaker(glassMat: THREE.Material, pos: THREE.Vector3): THREE.Group {
  const group = new THREE.Group();
  group.position.copy(pos);

  const radius = 0.58;
  const height = 1.1;

  // Cylindrical Body
  const cylGeo = new THREE.CylinderGeometry(radius, radius * 0.96, height, 32, 1, true);
  const body = new THREE.Mesh(cylGeo, glassMat);
  body.position.y = height / 2;
  group.add(body);

  // Flat Circular Base
  const baseGeo = new THREE.CircleGeometry(radius * 0.96, 32);
  const base = new THREE.Mesh(baseGeo, glassMat);
  base.rotation.x = -Math.PI / 2;
  group.add(base);

  // Beaker Lip Rim
  const rimGeo = new THREE.TorusGeometry(radius, 0.03, 12, 32);
  const rim = new THREE.Mesh(rimGeo, glassMat);
  rim.position.y = height;
  rim.rotation.x = Math.PI / 2;
  group.add(rim);

  return group;
}

// Conical / Erlenmeyer Flask
function createConicalFlask(glassMat: THREE.Material, pos: THREE.Vector3): THREE.Group {
  const group = new THREE.Group();
  group.position.copy(pos);

  // Conical body (truncated cone)
  const coneGeo = new THREE.CylinderGeometry(0.25, 0.75, 1.0, 32, 1, true);
  const cone = new THREE.Mesh(coneGeo, glassMat);
  cone.position.y = 0.5;
  group.add(cone);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.5, 32, 1, true);
  const neck = new THREE.Mesh(neckGeo, glassMat);
  neck.position.y = 1.25;
  group.add(neck);

  // Base
  const baseGeo = new THREE.CircleGeometry(0.75, 32);
  const base = new THREE.Mesh(baseGeo, glassMat);
  base.rotation.x = -Math.PI / 2;
  group.add(base);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.24, 0.025, 12, 32);
  const rim = new THREE.Mesh(rimGeo, glassMat);
  rim.position.y = 1.5;
  rim.rotation.x = Math.PI / 2;
  group.add(rim);

  return group;
}

// Bunsen Burner with Dynamic Flickering Flame
function createBunsenBurner(parent: THREE.Group, pos: THREE.Vector3): { group: THREE.Group; flame: THREE.Mesh } {
  const burnerGroup = new THREE.Group();
  burnerGroup.name = "Bunsen Burner";
  burnerGroup.position.copy(pos);

  // Heavy Cast Metal Base
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.8 });
  const baseGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.1, 24);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.05;
  burnerGroup.add(base);

  // Brass Collar with Air Hole
  const collarMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.9 });
  const collarGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.14, 16);
  const collar = new THREE.Mesh(collarGeo, collarMat);
  collar.position.y = 0.17;
  burnerGroup.add(collar);

  // Nickel-plated Barrel
  const barrelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.2, metalness: 0.95 });
  const barrelGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.75, 20);
  const barrel = new THREE.Mesh(barrelGeo, barrelMat);
  barrel.position.y = 0.6;
  burnerGroup.add(barrel);

  // Blue / Orange Hot Flame Mesh
  const flameGeo = new THREE.ConeGeometry(0.12, 0.45, 16);
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.85
  });
  const flame = new THREE.Mesh(flameGeo, flameMat);
  flame.position.y = 1.15;
  flame.name = "Bunsen Flame";
  burnerGroup.add(flame);

  parent.add(burnerGroup);
  return { group: burnerGroup, flame };
}

// China Dish (Porcelain Evaporating Dish)
function createChinaDish(pos: THREE.Vector3): THREE.Group {
  const group = new THREE.Group();
  group.name = "China Dish (Porcelain)";
  group.position.copy(pos);

  const dishGeo = new THREE.SphereGeometry(0.65, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3);
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.4,
    metalness: 0.05,
    side: THREE.DoubleSide
  });
  const dish = new THREE.Mesh(dishGeo, dishMat);
  dish.rotation.x = Math.PI;
  dish.position.y = 0.15;
  group.add(dish);

  return group;
}

// Test Tube Rack
function createTestTubeRack(parent: THREE.Group, pos: THREE.Vector3) {
  const rackGroup = new THREE.Group();
  rackGroup.name = "Test Tube Rack";
  rackGroup.position.copy(pos);

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6, metalness: 0.05 });

  // Top plate with holes
  const topGeo = new THREE.BoxGeometry(2.0, 0.05, 0.5);
  const top = new THREE.Mesh(topGeo, woodMat);
  top.position.y = 0.85;
  rackGroup.add(top);

  // Bottom base plate
  const baseGeo = new THREE.BoxGeometry(2.1, 0.08, 0.6);
  const base = new THREE.Mesh(baseGeo, woodMat);
  base.position.y = 0.04;
  rackGroup.add(base);

  // Side supports
  const postGeo = new THREE.BoxGeometry(0.08, 0.85, 0.45);
  const postL = new THREE.Mesh(postGeo, woodMat);
  postL.position.set(-0.95, 0.45, 0);
  const postR = new THREE.Mesh(postGeo, woodMat);
  postR.position.set(0.95, 0.45, 0);
  rackGroup.add(postL, postR);

  parent.add(rackGroup);
}

// Tripod Stand with Wire Gauze
function createTripodStand(parent: THREE.Group, pos: THREE.Vector3) {
  const tripodGroup = new THREE.Group();
  tripodGroup.name = "Tripod Stand & Wire Gauze";
  tripodGroup.position.copy(pos);

  const steelMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.8 });

  // Circular Ring Top
  const ringGeo = new THREE.TorusGeometry(0.65, 0.04, 12, 24);
  const ring = new THREE.Mesh(ringGeo, steelMat);
  ring.position.y = 0.9;
  ring.rotation.x = Math.PI / 2;
  tripodGroup.add(ring);

  // 3 Legs
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const legGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.95, 12);
    const leg = new THREE.Mesh(legGeo, steelMat);
    leg.position.set(Math.cos(angle) * 0.6, 0.45, Math.sin(angle) * 0.6);
    leg.rotation.z = Math.cos(angle) * 0.12;
    leg.rotation.x = Math.sin(angle) * 0.12;
    tripodGroup.add(leg);
  }

  // Ceramic Centered Wire Gauze
  const gauzeGeo = new THREE.BoxGeometry(1.2, 0.02, 1.2);
  const gauzeMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8, metalness: 0.4 });
  const gauze = new THREE.Mesh(gauzeGeo, gauzeMat);
  gauze.position.y = 0.92;
  tripodGroup.add(gauze);

  parent.add(tripodGroup);
}

// Reagent Bottle with Label & Stopper
function createReagentBottle(labelStr: string, glassColorHex: number, pos: THREE.Vector3): THREE.Group {
  const bottleGroup = new THREE.Group();
  bottleGroup.name = `Bottle: ${labelStr}`;
  bottleGroup.position.copy(pos);

  // Glass Body
  const bodyGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.75, 24);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: glassColorHex,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.75,
    transparent: true,
    opacity: 0.9
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.38;
  bottleGroup.add(body);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.22, 16);
  const neck = new THREE.Mesh(neckGeo, bodyMat);
  neck.position.y = 0.86;
  bottleGroup.add(neck);

  // Glass Stopper
  const stopperGeo = new THREE.CylinderGeometry(0.12, 0.11, 0.18, 16);
  const stopperMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.2 });
  const stopper = new THREE.Mesh(stopperGeo, stopperMat);
  stopper.position.y = 1.05;
  bottleGroup.add(stopper);

  // Paper Label
  const labelGeo = new THREE.CylinderGeometry(0.325, 0.325, 0.38, 24, 1, true, 0, Math.PI);
  const labelMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, side: THREE.DoubleSide });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.position.y = 0.38;
  label.rotation.y = Math.PI / 2;
  bottleGroup.add(label);

  return bottleGroup;
}

// Dropper with rubber teat
function createDropper(pos: THREE.Vector3, liquidColorHex: number): THREE.Group {
  const group = new THREE.Group();
  group.name = "Medicine Dropper";
  group.position.copy(pos);

  // Glass Tube & Tip
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.92,
    transparent: true,
    opacity: 0.8,
    roughness: 0.08
  });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 0.6, 16), glassMat);
  stem.position.y = 0.3;
  group.add(stem);

  // Rubber Teat
  const teatMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 });
  const teat = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), teatMat);
  teat.position.y = 0.65;
  group.add(teat);

  return group;
}

// Rubber Cork with Glass Delivery Tube
function createRubberCorkWithTube(pos: THREE.Vector3): THREE.Group {
  const group = new THREE.Group();
  group.name = "Rubber Cork & Delivery Tube";
  group.position.copy(pos);

  const corkMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85 });
  const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.25, 20), corkMat);
  group.add(cork);

  const tubeMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.92,
    transparent: true,
    opacity: 0.85,
    roughness: 0.1
  });
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 12), tubeMat);
  tube.position.y = 0.38;
  group.add(tube);

  return group;
}

// Electrolysis Voltameter Cell (Activity 1.7)
function createElectrolysisCell(glassMat: THREE.Material, step: number, progress: number): THREE.Group {
  const cellGroup = new THREE.Group();
  cellGroup.name = "Water Electrolysis Voltameter (Activity 1.7)";

  // Plastic / Glass Outer Container
  const mugGeo = new THREE.CylinderGeometry(0.85, 0.8, 1.3, 32, 1, true);
  const mugMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    transmission: 0.88,
    transparent: true,
    opacity: 0.6,
    roughness: 0.1
  });
  const mug = new THREE.Mesh(mugGeo, mugMat);
  mug.position.y = 0.65;
  cellGroup.add(mug);

  // Base
  const base = new THREE.Mesh(new THREE.CircleGeometry(0.8, 32), mugMat);
  base.rotation.x = -Math.PI / 2;
  cellGroup.add(base);

  // Graphite Electrodes (Carbon Rods)
  const carbonMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.7, metalness: 0.3 });
  const cathodeRod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 16), carbonMat);
  cathodeRod.position.set(-0.28, 0.45, 0);
  cathodeRod.name = "Cathode (- Negative Carbon Rod)";

  const anodeRod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 16), carbonMat);
  anodeRod.position.set(0.28, 0.45, 0);
  anodeRod.name = "Anode (+ Positive Carbon Rod)";
  cellGroup.add(cathodeRod, anodeRod);

  // Inverted Test Tubes for gas collection
  const tubeCathode = createTestTube(glassMat, new THREE.Vector3(-0.28, 0.85, 0));
  tubeCathode.rotation.x = Math.PI;
  tubeCathode.name = "Cathode Tube (Collecting H₂)";

  const tubeAnode = createTestTube(glassMat, new THREE.Vector3(0.28, 0.85, 0));
  tubeAnode.rotation.x = Math.PI;
  tubeAnode.name = "Anode Tube (Collecting O₂)";
  cellGroup.add(tubeCathode, tubeAnode);

  // Displaced Gas Volumes (2 : 1 Ratio)
  const h2Height = step >= 2 ? Math.min(0.6, 0.1 + progress * 0.5) : 0.05;
  const o2Height = h2Height / 2.0;

  const h2Gas = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, h2Height, 16),
    new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.3 })
  );
  h2Gas.position.set(-0.28, 1.45 - h2Height / 2, 0);
  h2Gas.name = "Hydrogen Gas (2x Volume)";

  const o2Gas = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, o2Height, 16),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.3 })
  );
  o2Gas.position.set(0.28, 1.45 - o2Height / 2, 0);
  o2Gas.name = "Oxygen Gas (1x Volume)";
  cellGroup.add(h2Gas, o2Gas);

  // 6V DC Battery Block
  const batMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
  const battery = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.4), batMat);
  battery.position.set(1.4, 0.2, 0);
  battery.name = "6V DC Battery";
  cellGroup.add(battery);

  return cellGroup;
}

// ==========================================
// PARTICLE SYSTEMS (BUBBLES, SPARKLES, FUMES)
// ==========================================
function createParticleSparkles(pos: THREE.Vector3, colorHex: number, count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = pos.x + (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 1] = pos.y + (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 2] = pos.z + (Math.random() - 0.5) * 0.4;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: colorHex,
    size: 0.05,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Points(geo, mat);
}

function createRisingBubbles(pos: THREE.Vector3, colorHex: number, count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = pos.x + (Math.random() - 0.5) * 0.35;
    positions[i * 3 + 1] = pos.y + Math.random() * 0.8;
    positions[i * 3 + 2] = pos.z + (Math.random() - 0.5) * 0.35;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: colorHex,
    size: 0.035,
    transparent: true,
    opacity: 0.75
  });
  return new THREE.Points(geo, mat);
}

function createGasFumes(pos: THREE.Vector3, colorHex: number, count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = pos.x + (Math.random() - 0.5) * 0.25;
    positions[i * 3 + 1] = pos.y + Math.random() * 0.9;
    positions[i * 3 + 2] = pos.z + (Math.random() - 0.5) * 0.25;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: colorHex,
    size: 0.065,
    transparent: true,
    opacity: 0.65
  });
  return new THREE.Points(geo, mat);
}

function createSteamPlume(pos: THREE.Vector3, colorHex: number, count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = pos.x + (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 1] = pos.y + Math.random() * 0.8;
    positions[i * 3 + 2] = pos.z + (Math.random() - 0.5) * 0.4;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: colorHex,
    size: 0.06,
    transparent: true,
    opacity: 0.5
  });
  return new THREE.Points(geo, mat);
}

function createElectrolysisBubbles(cathodePos: THREE.Vector3, anodePos: THREE.Vector3, count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const half = Math.floor(count * 0.67); // 2/3 at cathode, 1/3 at anode
  for (let i = 0; i < count; i++) {
    const isCathode = i < half;
    const base = isCathode ? cathodePos : anodePos;
    positions[i * 3] = base.x + (Math.random() - 0.5) * 0.08;
    positions[i * 3 + 1] = base.y + Math.random() * 0.7;
    positions[i * 3 + 2] = base.z + (Math.random() - 0.5) * 0.08;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.028,
    transparent: true,
    opacity: 0.85
  });
  return new THREE.Points(geo, mat);
}
