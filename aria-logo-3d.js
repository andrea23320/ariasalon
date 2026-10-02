/* ============================================================
   aria-logo-3d.js — Logo 3D ARIA SALON (versione ORO)
   Ricreato da zero con Three.js da CDN.
   Effetti: lettere 3D metallizzate + 140 particelle dorate +
   parallasse mouse + luce orbitante.
   ============================================================ */
(async () => {

  // ---------- WebGL check ----------
  function hasWebGL() {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch (e) { return false; }
  }

  const container = document.getElementById('aria-logo-3d');
  if (!container) {
    console.warn('[aria-logo-3d] Container #aria-logo-3d non trovato.');
    return;
  }
  if (!hasWebGL()) {
    container.classList.add('no-webgl');
    return;
  }

  // ---------- Carica Three.js da CDN ----------
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

  // ---------- Path SVG (lettere ARIA + parola "salon") ----------
  const PATH_SALON = [
    "M 396.902344 -367.507812 C 396.902344 -367.390625 396.96875 -367.285156 397.105469 -367.183594 C 397.1875 -367.097656 397.289062 -367.054688 397.40625 -367.054688 C 397.578125 -367.054688 397.710938 -367.125 397.808594 -367.257812 C 398.789062 -368.652344 400.152344 -369.351562 401.898438 -369.351562 C 402.792969 -369.351562 403.574219 -369.128906 404.246094 -368.683594 C 404.917969 -368.238281 405.257812 -367.636719 405.257812 -366.878906 C 405.257812 -366.105469 404.964844 -365.523438 404.375 -365.136719 C 403.785156 -364.75 402.976562 -364.429688 401.953125 -364.175781 C 400.589844 -363.839844 399.515625 -363.390625 398.730469 -362.828125 C 397.949219 -362.265625 397.558594 -361.46875 397.558594 -360.441406 C 397.558594 -359.449219 397.957031 -358.628906 398.746094 -357.980469 C 399.539062 -357.332031 400.554688 -357.011719 401.796875 -357.011719 C 402.488281 -357.011719 403.175781 -357.144531 403.855469 -357.414062 C 404.539062 -357.683594 405.160156 -358.113281 405.710938 -358.699219 C 405.828125 -358.800781 405.886719 -358.917969 405.886719 -359.054688 C 405.886719 -359.203125 405.828125 -359.339844 405.710938 -359.457031 C 405.578125 -359.523438 405.46875 -359.558594 405.382812 -359.558594 C 405.265625 -359.558594 405.167969 -359.507812 405.082031 -359.40625 C 404.207031 -358.445312 403.078125 -357.96875 401.699219 -357.96875 C 400.808594 -357.96875 400.054688 -358.1875 399.4375 -358.625 C 398.824219 -359.0625 398.519531 -359.667969 398.519531 -360.441406 C 398.566406 -361.164062 398.898438 -361.726562 399.515625 -362.121094 C 400.128906 -362.515625 401.035156 -362.863281 402.226562 -363.167969 C 403.089844 -363.386719 403.796875 -363.628906 404.363281 -363.886719 C 404.921875 -364.148438 405.375 -364.515625 405.710938 -364.988281 C 406.046875 -365.457031 406.21875 -366.070312 406.21875 -366.828125 C 406.21875 -367.890625 405.808594 -368.726562 404.992188 -369.339844 C 404.175781 -369.953125 403.113281 -370.261719 401.796875 -370.261719 C 399.882812 -370.261719 398.308594 -369.503906 397.078125 -367.988281 C 396.960938 -367.804688 396.902344 -367.644531 396.902344 -367.507812",
    "M 418.523438 -368.558594 C 419.269531 -368.058594 419.855469 -367.375 420.277344 -366.5 C 420.695312 -365.625 420.910156 -364.648438 420.910156 -363.574219 C 420.910156 -362.546875 420.695312 -361.601562 420.277344 -360.746094 C 419.855469 -359.886719 419.269531 -359.207031 418.523438 -358.710938 C 417.773438 -358.214844 416.9375 -357.96875 416.011719 -357.96875 C 415.085938 -357.96875 414.25 -358.207031 413.5 -358.6875 C 412.75 -359.167969 412.164062 -359.832031 411.746094 -360.683594 C 411.324219 -361.53125 411.113281 -362.496094 411.113281 -363.574219 C 411.113281 -364.648438 411.324219 -365.625 411.746094 -366.5 C 412.164062 -367.375 412.746094 -368.058594 413.488281 -368.558594 C 414.226562 -369.054688 415.070312 -369.300781 416.011719 -369.300781 C 416.9375 -369.300781 417.773438 -369.054688 418.523438 -368.558594 M 421.679688 -357.566406 C 421.769531 -357.664062 421.816406 -357.78125 421.816406 -357.917969 L 421.816406 -369.503906 C 421.816406 -369.636719 421.765625 -369.757812 421.664062 -369.859375 C 421.5625 -369.957031 421.449219 -370.007812 421.3125 -370.007812 C 421.160156 -370.007812 421.039062 -369.957031 420.945312 -369.859375 C 420.855469 -369.757812 420.804688 -369.636719 420.804688 -369.503906 L 420.804688 -367.230469 C 420.386719 -368.089844 419.738281 -368.808594 418.863281 -369.390625 C 417.988281 -369.96875 417.023438 -370.261719 415.960938 -370.261719 C 414.851562 -370.261719 413.851562 -369.96875 412.957031 -369.390625 C 412.0625 -368.808594 411.367188 -368.007812 410.863281 -366.992188 C 410.355469 -365.972656 410.101562 -364.832031 410.101562 -363.574219 C 410.101562 -362.324219 410.359375 -361.203125 410.875 -360.199219 C 411.386719 -359.199219 412.089844 -358.421875 412.984375 -357.855469 C 413.875 -357.289062 414.867188 -357.007812 415.960938 -357.007812 C 417.054688 -357.007812 418.039062 -357.296875 418.914062 -357.867188 C 419.789062 -358.4375 420.421875 -359.203125 420.804688 -360.164062 L 420.804688 -357.917969 C 420.804688 -357.78125 420.855469 -357.664062 420.945312 -357.566406 C 421.039062 -357.464844 421.160156 -357.414062 421.3125 -357.414062 C 421.464844 -357.414062 421.585938 -357.464844 421.679688 -357.566406",
    "M 428.253906 -369.855469 C 428.152344 -369.960938 428.035156 -370.007812 427.898438 -370.007812 C 427.746094 -370.007812 427.625 -369.960938 427.53125 -369.855469 C 427.441406 -369.753906 427.394531 -369.640625 427.394531 -369.503906 L 427.394531 -351.832031 C 427.394531 -351.699219 427.445312 -351.582031 427.542969 -351.480469 C 427.644531 -351.378906 427.765625 -351.328125 427.898438 -351.328125 C 428.046875 -351.328125 428.171875 -351.378906 428.265625 -351.480469 C 428.359375 -351.582031 428.402344 -351.699219 428.402344 -351.832031 L 428.402344 -369.503906 C 428.402344 -369.640625 428.355469 -369.753906 428.253906 -369.855469",
    "M 443.613281 -360.746094 C 443.167969 -359.886719 442.550781 -359.207031 441.757812 -358.714844 C 440.964844 -358.214844 440.078125 -357.96875 439.082031 -357.96875 C 438.105469 -357.96875 437.21875 -358.214844 436.421875 -358.714844 C 435.621094 -359.207031 434.996094 -359.886719 434.539062 -360.746094 C 434.082031 -361.601562 433.855469 -362.570312 433.855469 -363.648438 C 433.855469 -364.707031 434.082031 -365.667969 434.539062 -366.523438 C 434.996094 -367.382812 435.621094 -368.058594 436.421875 -368.558594 C 437.21875 -369.054688 438.105469 -369.300781 439.082031 -369.300781 C 440.078125 -369.300781 440.964844 -369.058594 441.757812 -368.570312 C 442.550781 -368.082031 443.167969 -367.40625 443.613281 -366.539062 C 444.058594 -365.671875 444.285156 -364.707031 444.285156 -363.648438 C 444.285156 -362.570312 444.058594 -361.601562 443.613281 -360.746094 M 444.484375 -367.019531 C 443.945312 -368.015625 443.203125 -368.808594 442.25 -369.390625 C 441.296875 -369.96875 440.242188 -370.261719 439.082031 -370.261719 C 437.921875 -370.261719 436.867188 -369.96875 435.914062 -369.390625 C 434.964844 -368.808594 434.214844 -368.011719 433.667969 -367.003906 C 433.121094 -365.992188 432.847656 -364.875 432.847656 -363.648438 C 432.847656 -362.398438 433.121094 -361.273438 433.667969 -360.265625 C 434.214844 -359.257812 434.957031 -358.460938 435.902344 -357.878906 C 436.84375 -357.300781 437.90625 -357.011719 439.082031 -357.011719 C 440.242188 -357.011719 441.296875 -357.300781 442.25 -357.878906 C 443.203125 -358.460938 443.945312 -359.257812 444.484375 -360.265625 C 445.023438 -361.273438 445.292969 -362.398438 445.292969 -363.648438 C 445.292969 -364.890625 445.023438 -366.015625 444.484375 -367.019531",
    "M 458.972656 -358.332031 C 459.730469 -359.21875 460.109375 -360.363281 460.109375 -361.777344 L 460.109375 -369.503906 C 460.109375 -369.640625 460.058594 -369.753906 459.957031 -369.855469 C 459.855469 -369.957031 459.738281 -370.007812 459.605469 -370.007812 C 459.449219 -370.007812 459.332031 -369.957031 459.238281 -369.855469 C 459.144531 -369.753906 459.097656 -369.640625 459.097656 -369.503906 L 459.097656 -361.878906 C 459.097656 -360.734375 458.800781 -359.800781 458.203125 -359.066406 C 457.605469 -358.332031 456.699219 -357.96875 455.488281 -357.96875 C 454.746094 -357.96875 454.019531 -358.144531 453.304688 -358.5 C 452.589844 -358.851562 452.007812 -359.332031 451.550781 -359.9375 C 451.097656 -360.542969 450.871094 -361.191406 450.871094 -361.878906 L 450.871094 -369.503906 C 450.871094 -369.640625 450.820312 -369.753906 450.714844 -369.855469 C 450.617188 -369.957031 450.5 -370.007812 450.363281 -370.007812 C 450.210938 -370.007812 450.089844 -369.957031 450 -369.855469 C 449.90625 -369.753906 449.859375 -369.640625 449.859375 -369.503906 L 449.859375 -357.917969 C 449.859375 -357.78125 449.910156 -357.664062 450.011719 -357.5625 C 450.113281 -357.460938 450.230469 -357.414062 450.363281 -357.414062 C 450.519531 -357.414062 450.636719 -357.460938 450.730469 -357.5625 C 450.824219 -357.664062 450.871094 -357.78125 450.871094 -357.917969 L 450.871094 -359.609375 C 451.359375 -358.851562 452.042969 -358.226562 452.925781 -357.742188 C 453.8125 -357.253906 454.695312 -357.011719 455.589844 -357.011719 C 457.085938 -357.011719 458.214844 -357.449219 458.972656 -358.332031"
  ];

  const PATH_ARIA = [
    "M 254.894531 -321.339844 L 250.375 -321.339844 L 342.625 -224.570312 L 346.015625 -224.570312 L 346.015625 -321.613281 L 342.910156 -321.613281 L 342.910156 -230.015625 Z",
    "M 416.085938 -296.160156 L 415.804688 -296.160156 C 414.109375 -296.433594 412.390625 -296.726562 410.644531 -297.046875 C 408.90625 -297.367188 407.136719 -297.523438 405.351562 -297.523438 L 405.351562 -294.253906 C 411.285156 -293.894531 416.675781 -292.441406 421.527344 -289.902344 C 426.375 -287.363281 430.304688 -284.046875 433.320312 -279.964844 C 436.335938 -275.882812 438.242188 -271.234375 439.042969 -266.011719 C 439.84375 -260.796875 439.203125 -255.375 437.136719 -249.75 C 435.253906 -244.941406 432.3125 -240.742188 428.304688 -237.160156 C 424.300781 -233.578125 419.761719 -231.101562 414.675781 -229.742188 L 378.648438 -228.652344 L 378.648438 -321.339844 L 374.976562 -321.339844 L 374.976562 -225.113281 L 407.042969 -225.113281 C 410.71875 -225.113281 414.367188 -225.773438 417.996094 -227.089844 C 421.617188 -228.402344 424.847656 -230.105469 427.667969 -232.191406 C 431.90625 -235.1875 435.277344 -238.839844 437.773438 -243.148438 C 440.265625 -247.457031 441.824219 -251.996094 442.433594 -256.757812 C 443.046875 -261.523438 442.691406 -266.308594 441.378906 -271.117188 C 440.054688 -275.929688 437.703125 -280.285156 434.308594 -284.183594 C 432.332031 -286.542969 430.121094 -288.5625 427.667969 -290.242188 C 425.21875 -291.921875 422.582031 -293.441406 419.761719 -294.800781 L 419.761719 -295.074219 L 440.242188 -321.339844 L 436.003906 -321.339844 Z",
    "M 473.441406 -321.34375 L 470.050781 -321.34375 L 470.050781 -224.300781 L 473.441406 -224.300781 Z",
    "M 500.285156 -321.339844 L 495.765625 -321.339844 L 588.015625 -224.570312 L 591.40625 -224.570312 L 591.40625 -321.613281 L 588.296875 -321.613281 L 588.296875 -230.015625 Z"
  ];

  // ---------- Setup renderer ----------
  const stage = container.querySelector('.stage') || container;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 1, 5000);

  // ---------- Environment (riflessi realistici) ----------
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;

  // ---------- Luci ----------
  const keyLight = new THREE.DirectionalLight(0xfff3dc, 2.2);
  keyLight.position.set(-300, 400, 600);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
  fillLight.position.set(500, -200, -300);
  scene.add(fillLight);

  // ---------- Materiale ORO ----------
  const goldMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf3c56b,
    metalness: 1,
    roughness: 0.16,
    clearcoat: 0.35,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.35
  });

  // ---------- Costruzione lettere 3D ----------
  const svgLoader = new SVGLoader();

  function createTextGroup(paths, extrudeOptions) {
    const group = new THREE.Group();
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg">${paths.map(d => `<path d="${d}"/>`).join('')}</svg>`;
    const parsed = svgLoader.parse(svgStr);
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

  // Lettere ARIA
  const ariaGroup = createTextGroup(PATH_ARIA, {
    depth: 9,
    bevelEnabled: true,
    bevelThickness: 1.1,
    bevelSize: 0.7,
    bevelSegments: 5,
    curveSegments: 18
  });
  logoGroup.add(ariaGroup);

  // Parola "salon"
  const salonGroup = createTextGroup(PATH_SALON, {
    depth: 2.2,
    bevelEnabled: true,
    bevelThickness: 0.35,
    bevelSize: 0.18,
    bevelSegments: 3,
    curveSegments: 12
  });
  salonGroup.position.set(-7.6, 0, 3.5);
  logoGroup.add(salonGroup);

  // Barre decorative (accenti sotto "salon")
  function createBar(x1, x2) {
    const w = x2 - x1;
    const geom = new THREE.BoxGeometry(w, 0.55, 1.2);
    const mesh = new THREE.Mesh(geom, goldMaterial);
    mesh.position.set((x1 + x2) / 2 - 7.6, -363.7, 4);
    return mesh;
  }
  logoGroup.add(createBar(360, 388), createBar(469, 497));

  // Centratura del logo sull'origine
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

  // ---------- Texture per particelle ----------
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

  // ---------- 140 particelle dorate ----------
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

  // ---------- Responsive ----------
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

  // ---------- Parallasse mouse ----------
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

  // ---------- Animate loop ----------
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
  console.log('[aria-logo-3d] Logo 3D ARIA (versione oro) caricato con successo.');
})();
