/* ============================================================
   aria-logo-3d.js — Logo 3D ARIA (versione ORO)
   Effetto: lettere metalliche estrose + particelle dorate
   ============================================================ */
(async () => {
  // --- WebGL check ---
  function hasWebGL() {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch (e) { return false; }
  }

  const container = document.getElementById('aria-logo-3d');
  if (!container) return;

  if (!hasWebGL()) {
    container.classList.add('no-webgl');
    return;
  }

  // --- Carica Three.js + addons da CDN ---
  let THREE, SVGLoader, RoomEnvironment;
  try {
    THREE = await import('https://unpkg.com/three@0.160.0/build/three.module.js');
    SVGLoader = (await import('https://unpkg.com/three@0.160.0/examples/jsm/loaders/SVGLoader.js')).SVGLoader;
    RoomEnvironment = (await import('https://unpkg.com/three@0.160.0/examples/jsm/environments/RoomEnvironment.js')).RoomEnvironment;
  } catch (e) {
    console.error('[aria-logo-3d] Errore caricamento Three.js:', e);
    container.classList.add('no-webgl');
    return;
  }

  // ============================================================
  // PATH SVG — Lettere ARIA + parola "salon"
  // ============================================================
  const PATHS = {
    salon: [
      "M 396.902 -367.508 C 396.902 -367.391 396.969 -367.285 397.105 -367.184 C 397.188 -367.098 397.289 -367.055 397.406 -367.055 C 397.578 -367.055 397.711 -367.125 397.809 -367.258 C 398.789 -368.652 400.152 -369.352 401.898 -369.352 C 402.793 -369.352 403.574 -369.129 404.246 -368.684 C 404.918 -368.238 405.258 -367.637 405.258 -366.879 C 405.258 -366.105 404.965 -365.523 404.375 -365.137 C 403.785 -364.750 402.977 -364.430 401.953 -364.176 C 400.590 -363.840 399.516 -363.391 398.730 -362.828 C 397.949 -362.266 397.559 -361.469 397.559 -360.441 C 397.559 -359.449 397.957 -358.629 398.746 -357.980 C 399.539 -357.332 400.555 -357.012 401.797 -357.012 C 402.488 -357.012 403.176 -357.145 403.855 -357.414 C 404.539 -357.684 405.160 -358.113 405.711 -358.699 C 405.828 -358.801 405.887 -358.918 405.887 -359.055 C 405.887 -359.203 405.828 -359.340 405.711 -359.457 C 405.578 -359.523 405.469 -359.559 405.383 -359.559 C 405.266 -359.559 405.168 -359.508 405.082 -359.406 C 404.207 -358.445 403.078 -357.969 401.699 -357.969 C 400.809 -357.969 400.055 -358.188 399.438 -358.625 C 398.824 -359.062 398.520 -359.668 398.520 -360.441 C 398.566 -361.164 398.898 -361.727 399.516 -362.121 C 400.129 -362.516 401.035 -362.863 402.227 -363.168 C 403.090 -363.387 403.797 -363.629 404.363 -363.887 C 404.922 -364.148 405.375 -364.516 405.711 -364.988 C 406.047 -365.457 406.219 -366.070 406.219 -366.828 C 406.219 -367.891 405.809 -368.727 404.992 -369.340 C 404.176 -369.953 403.113 -370.262 401.797 -370.262 C 399.883 -370.262 398.309 -369.504 397.078 -367.988 C 396.961 -367.805 396.902 -367.645 396.902 -367.508",
      "M 418.523 -368.559 C 419.270 -368.059 419.855 -367.375 420.277 -366.500 C 420.695 -365.625 420.910 -364.648 420.910 -363.574 C 420.910 -362.547 420.695 -361.602 420.277 -360.746 C 419.855 -359.887 419.270 -359.207 418.523 -358.711 C 417.773 -358.215 416.938 -357.969 416.012 -357.969 C 415.086 -357.969 414.250 -358.207 413.500 -358.688 C 412.750 -359.168 412.164 -359.832 411.746 -360.684 C 411.324 -361.531 411.113 -362.496 411.113 -363.574 C 411.113 -364.648 411.324 -365.625 411.746 -366.500 C 412.164 -367.375 412.746 -368.059 413.488 -368.559 C 414.227 -369.055 415.070 -369.301 416.012 -369.301 C 416.938 -369.301 417.773 -369.055 418.523 -368.559 M 421.680 -357.566 C 421.770 -357.664 421.816 -357.781 421.816 -357.918 L 421.816 -369.504 C 421.816 -369.637 421.766 -369.758 421.664 -369.859 C 421.562 -369.957 421.449 -370.008 421.312 -370.008 C 421.160 -370.008 421.039 -369.957 420.945 -369.859 C 420.855 -369.758 420.805 -369.637 420.805 -369.504 L 420.805 -367.230 C 420.387 -368.090 419.738 -368.809 418.863 -369.391 C 417.988 -369.969 417.023 -370.262 415.961 -370.262 C 414.852 -370.262 413.852 -369.969 412.957 -369.391 C 412.062 -368.809 411.367 -368.008 410.863 -366.992 C 410.355 -365.973 410.102 -364.832 410.102 -363.574 C 410.102 -362.324 410.359 -361.203 410.875 -360.199 C 411.387 -359.199 412.090 -358.422 412.984 -357.855 C 413.875 -357.289 414.867 -357.008 415.961 -357.008 C 417.055 -357.008 418.039 -357.297 418.914 -357.867 C 419.789 -358.438 420.422 -359.203 420.805 -360.164 L 420.805 -357.918 C 420.805 -357.781 420.855 -357.664 420.945 -357.566 C 421.039 -357.465 421.160 -357.414 421.312 -357.414 C 421.465 -357.414 421.586 -357.465 421.680 -357.566",
      "M 428.254 -369.855 C 428.152 -369.961 428.035 -370.008 427.898 -370.008 C 427.746 -370.008 427.625 -369.961 427.531 -369.855 C 427.441 -369.754 427.395 -369.641 427.395 -369.504 L 427.395 -351.832 C 427.395 -351.699 427.445 -351.582 427.543 -351.480 C 427.645 -351.379 427.766 -351.328 427.898 -351.328 C 428.047 -351.328 428.172 -351.379 428.266 -351.480 C 428.359 -351.582 428.402 -351.699 428.402 -351.832 L 428.402 -369.504 C 428.402 -369.641 428.355 -369.754 428.254 -369.855",
      "M 443.613 -360.746 C 443.168 -359.887 442.551 -359.207 441.758 -358.715 C 440.965 -358.215 440.078 -357.969 439.082 -357.969 C 438.105 -357.969 437.219 -358.215 436.422 -358.715 C 435.621 -359.207 434.996 -359.887 434.539 -360.746 C 434.082 -361.602 433.855 -362.570 433.855 -363.648 C 433.855 -364.707 434.082 -365.668 434.539 -366.523 C 434.996 -367.383 435.621 -368.059 436.422 -368.559 C 437.219 -369.055 438.105 -369.301 439.082 -369.301 C 440.078 -369.301 440.965 -369.059 441.758 -368.570 C 442.551 -368.082 443.168 -367.406 443.613 -366.539 C 444.059 -365.672 444.285 -364.707 444.285 -363.648 C 444.285 -362.570 444.059 -361.602 443.613 -360.746 M 444.484 -367.020 C 443.945 -368.016 443.203 -368.809 442.250 -369.391 C 441.297 -369.969 440.242 -370.262 439.082 -370.262 C 437.922 -370.262 436.867 -369.969 435.914 -369.391 C 434.965 -368.809 434.215 -368.012 433.668 -367.004 C 433.121 -365.992 432.848 -364.875 432.848 -363.648 C 432.848 -362.398 433.121 -361.273 433.668 -360.266 C 434.215 -359.258 434.957 -358.461 435.902 -357.879 C 436.844 -357.301 437.906 -357.012 439.082 -357.012 C 440.242 -357.012 441.297 -357.301 442.250 -357.879 C 443.203 -358.461 443.945 -359.258 444.484 -360.266 C 445.023 -361.273 445.293 -362.398 445.293 -363.648 C 445.293 -364.891 445.023 -366.016 444.484 -367.020",
      "M 458.973 -358.332 C 459.730 -359.219 460.109 -360.363 460.109 -361.777 L 460.109 -369.504 C 460.109 -369.641 460.059 -369.754 459.957 -369.855 C 459.855 -369.957 459.738 -370.008 459.605 -370.008 C 459.449 -370.008 459.332 -369.957 459.238 -369.855 C 459.145 -369.754 459.098 -369.641 459.098 -369.504 L 459.098 -361.879 C 459.098 -360.734 458.801 -359.801 458.203 -359.066 C 457.605 -358.332 456.699 -357.969 455.488 -357.969 C 454.746 -357.969 454.020 -358.145 453.305 -358.500 C 452.590 -358.852 452.008 -359.332 451.551 -359.938 C 451.098 -360.543 450.871 -361.191 450.871 -361.879 L 450.871 -369.504 C 450.871 -369.641 450.820 -369.754 450.715 -369.855 C 450.617 -369.957 450.500 -370.008 450.363 -370.008 C 450.211 -370.008 450.090 -369.957 450.000 -369.855 C 449.906 -369.754 449.859 -369.641 449.859 -369.504 L 449.859 -357.918 C 449.859 -357.781 449.910 -357.664 450.012 -357.562 C 450.113 -357.461 450.230 -357.414 450.363 -357.414 C 450.520 -357.414 450.637 -357.461 450.730 -357.562 C 450.824 -357.664 450.871 -357.781 450.871 -357.918 L 450.871 -359.609 C 451.359 -358.852 452.043 -358.227 452.926 -357.742 C 453.812 -357.254 454.695 -357.012 455.590 -357.012 C 457.086 -357.012 458.215 -357.449 458.973 -358.332"
    ],
    aria: [
      "M 254.895 -321.340 L 250.375 -321.340 L 342.625 -224.570 L 346.016 -224.570 L 346.016 -321.613 L 342.910 -321.613 L 342.910 -230.016 Z M 254.895 -321.340",
      "M 416.086 -296.160 L 415.805 -296.160 C 414.109 -296.434 412.391 -296.727 410.645 -297.047 C 408.906 -297.367 407.137 -297.523 405.352 -297.523 L 405.352 -294.254 C 411.285 -293.895 416.676 -292.441 421.527 -289.902 C 426.375 -287.363 430.305 -284.047 433.320 -279.965 C 436.336 -275.883 438.242 -271.234 439.043 -266.012 C 439.844 -260.797 439.203 -255.375 437.137 -249.750 C 435.254 -244.941 432.312 -240.742 428.305 -237.160 C 424.301 -233.578 419.762 -231.102 414.676 -229.742 C 414.395 -229.742 413.773 -229.605 412.836 -229.336 C 411.895 -229.062 411.285 -228.926 411.000 -228.926 C 410.809 -228.926 410.484 -228.879 410.012 -228.789 C 409.543 -228.699 409.211 -228.652 409.023 -228.652 L 378.648 -228.652 L 378.648 -321.340 L 374.977 -321.340 L 374.977 -225.113 L 407.043 -225.113 C 410.719 -225.113 414.367 -225.773 417.996 -227.090 C 421.617 -228.402 424.848 -230.105 427.668 -232.191 C 431.906 -235.188 435.277 -238.840 437.773 -243.148 C 440.266 -247.457 441.824 -251.996 442.434 -256.758 C 443.047 -261.523 442.691 -266.309 441.379 -271.117 C 440.055 -275.930 437.703 -280.285 434.309 -284.184 C 432.332 -286.543 430.121 -288.562 427.668 -290.242 C 425.219 -291.922 422.582 -293.441 419.762 -294.801 L 419.762 -295.074 L 440.242 -321.340 L 436.004 -321.340 Z M 416.086 -296.160",
      "M 473.441 -321.344 L 470.051 -321.344 L 470.051 -224.301 L 473.441 -224.301 Z M 473.441 -321.344",
      "M 500.285 -321.340 L 495.766 -321.340 L 588.016 -224.570 L 591.406 -224.570 L 591.406 -321.613 L 588.297 -321.613 L 588.297 -230.016 Z M 500.285 -321.340"
    ]
  };

  // ============================================================
  // SETUP SCENA
  // ============================================================
  const stage = container.querySelector('.stage') || container;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 1, 5000);

  // Environment per riflessi metallici realistici
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;

  // Luci
  const keyLight = new THREE.DirectionalLight(0xfff3dc, 2.2);
  keyLight.position.set(-300, 400, 600);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
  fillLight.position.set(500, -200, -300);
  scene.add(fillLight);

  // Materiale ORO metallico
  const goldMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf3c56b,
    metalness: 1,
    roughness: 0.16,
    clearcoat: 0.35,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.35
  });

  // ============================================================
  // CREA GEOMETRIE DALLE LETTERE SVG
  // ============================================================
  const svgLoader = new SVGLoader();

  function createTextGroup(paths, extrudeOptions) {
    const group = new THREE.Group();
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg">${paths.map(d => `<path d="${d}"/>`).join('')}</svg>`;
    const parsed = svgLoader.parse(svgString);
    parsed.paths.forEach(path => {
      const shapes = path.toShapes(true);
      shapes.forEach(shape => {
        const geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
        const mesh = new THREE.Mesh(geom, goldMaterial);
        group.add(mesh);
      });
    });
    return group;
  }

  const logoGroup = new THREE.Group();

  // Lettere ARIA (estrusione maggiore)
  const ariaGroup = createTextGroup(PATHS.aria, {
    depth: 9,
    bevelEnabled: true,
    bevelThickness: 1.1,
    bevelSize: 0.7,
    bevelSegments: 5,
    curveSegments: 18
  });
  logoGroup.add(ariaGroup);

  // Parola "salon" (estrusione minore, posizionata sotto)
  const salonGroup = createTextGroup(PATHS.salon, {
    depth: 2.2,
    bevelEnabled: true,
    bevelThickness: 0.35,
    bevelSize: 0.18,
    bevelSegments: 3,
    curveSegments: 12
  });
  salonGroup.position.set(-7.6, 0, 3.5);
  logoGroup.add(salonGroup);

  // Barre decorative (accenti sotto salon)
  function createBar(x1, x2) {
    const w = x2 - x1;
    const geom = new THREE.BoxGeometry(w, 0.55, 1.2);
    const mesh = new THREE.Mesh(geom, goldMaterial);
    mesh.position.set((x1 + x2) / 2 - 7.6, -363.7, 4);
    return mesh;
  }
  logoGroup.add(createBar(360, 388), createBar(469, 497));

  // Centra il logo sull'origine
  const bbox = new THREE.Box3().setFromObject(logoGroup);
  const bboxCenter = bbox.getCenter(new THREE.Vector3());
  logoGroup.children.forEach(child => {
    child.position.x -= bboxCenter.x;
    child.position.y -= bboxCenter.y;
  });

  const logoRoot = new THREE.Group();
  logoRoot.add(logoGroup);
  scene.add(logoRoot);

  const logoSize = bbox.getSize(new THREE.Vector3());

  // ============================================================
  // PARTICELLE DORATE
  // ============================================================
  function makeParticleTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,255,255,.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  const PARTICLE_COUNT = 140;
  const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
  const particleSeeds = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particlePositions[i * 3]     = (Math.random() - 0.5) * logoSize.x * 1.5;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * logoSize.y * 2.2;
    particlePositions[i * 3 + 2] = Math.random() * 200 - 120;
    particleSeeds[i] = Math.random() * 100;
  }
  const particlesGeom = new THREE.BufferGeometry();
  particlesGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 3.2,
    map: makeParticleTexture(),
    color: 0xffd98a,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(particlesGeom, particlesMat);
  scene.add(particles);

  // ============================================================
  // RESIZE RESPONSIVE
  // ============================================================
  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;

    renderer.setSize(w, h, false);
    camera.aspect = w / h;

    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    const distW = (logoSize.x * 1.25) / (2 * Math.tan(halfFov) * camera.aspect);
    const distH = (logoSize.y * 1.9) / (2 * Math.tan(halfFov));
    camera.position.set(0, 0, Math.max(distW, distH));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  // ============================================================
  // PARALLASSE MOUSE
  // ============================================================
  let mouseX = 0, mouseY = 0;
  let smoothX = 0, smoothY = 0;
  container.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });
  container.addEventListener('pointerleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  // ============================================================
  // ANIMAZIONE
  // ============================================================
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isVisible = true;
  new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }).observe(container);

  const startTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const t = (now - startTime) / 1000;

    smoothX += (mouseX - smoothX) * 0.05;
    smoothY += (mouseY - smoothY) * 0.05;

    const motionFactor = reducedMotion ? 0 : 1;

    // Rotazione + parallasse
    logoRoot.rotation.y = Math.sin(t * 0.45) * 0.28 * motionFactor + smoothX * 0.35;
    logoRoot.rotation.x = Math.sin(t * 0.33) * 0.05 * motionFactor + smoothY * 0.18;
    logoRoot.position.y = Math.sin(t * 0.8) * 1.6 * motionFactor;

    // Luce orbitante
    keyLight.position.x = Math.sin(t * 0.6) * 700;

    // Particelle fluttuanti
    if (!reducedMotion) {
      const positions = particlesGeom.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let y = positions.getY(i) + 0.05 + Math.sin(t + particleSeeds[i]) * 0.02;
        if (y > logoSize.y * 1.1) y = -logoSize.y * 1.1;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
    }

    // Opacità particelle pulsante
    particlesMat.opacity = 0.4 + Math.sin(t * 1.3) * 0.12;

    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);

  // Segnala che è pronto (rimuove opacity:0 dal canvas)
  container.classList.add('pronto');
  console.log('[aria-logo-3d] Logo 3D ARIA caricato con successo.');
})();