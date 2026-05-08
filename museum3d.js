import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js";

const host = document.getElementById("museum-3d-canvas");
const listHost = document.getElementById("museum-3d-sections");
const detailTitle = document.getElementById("museum-3d-detail-title");
const detailText = document.getElementById("museum-3d-detail-text");

if (!host || !listHost || !detailTitle || !detailText) {
  // This page does not include the 3D viewer.
} else {
  const sections = [
    { code: "A0", title: "Bienvenida", text: "Punto inicial del recorrido: recepcion, orientacion y contexto del centro.", x: -4, z: 0, w: 2.4, d: 2.2, color: 0xb88e56 },
    { code: "A1", title: "Mar de Tetis", text: "Lectura del origen marino del territorio y registro fosil.", x: -1.2, z: 0.2, w: 2.1, d: 2.1, color: 0xc89b62 },
    { code: "A2", title: "Geologia y orografia", text: "Procesos geologicos que modelan Sierra Magina.", x: 1.5, z: -0.1, w: 2.3, d: 2.2, color: 0xd2a56b },
    { code: "A3", title: "Cuaternario", text: "Cambios climaticos y ambientales durante el Cuaternario.", x: 4, z: 0.3, w: 2.1, d: 2.1, color: 0xd9aa72 },
    { code: "A4", title: "Mundo neandertal", text: "Evidencias de vida neandertal y tecnologia asociada.", x: -2.8, z: -2.6, w: 2.2, d: 1.9, color: 0xc07b44 },
    { code: "A5", title: "Paleolitico superior", text: "Innovaciones culturales y tecnicas de sociedades cazadoras.", x: -0.1, z: -2.5, w: 2.2, d: 1.9, color: 0xb36f3d },
    { code: "A6", title: "Neolitico", text: "Primeras comunidades productoras y transformacion del territorio.", x: 2.6, z: -2.4, w: 2.1, d: 1.9, color: 0x6b8b5f },
    { code: "A7", title: "Calcolitico", text: "Metalurgia inicial y nuevos modelos sociales.", x: 4.8, z: -2.2, w: 1.8, d: 1.8, color: 0x7f9a57 },
    { code: "A8", title: "Ciencia y ciudadania", text: "Investigacion arqueologica y divulgacion abierta al publico.", x: 0.9, z: 2.8, w: 2.4, d: 1.8, color: 0xa79b45 },
    { code: "TZ", title: "Terraza y paisaje", text: "Cierre del recorrido con lectura directa del paisaje real.", x: 4.2, z: 2.7, w: 2.4, d: 1.7, color: 0x9d8462 }
  ];

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf7f1e6);

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 120);
  camera.position.set(0, 10.5, 12.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  host.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0.5, 0);
  controls.maxPolarAngle = Math.PI / 2.1;
  controls.minDistance = 8;
  controls.maxDistance = 24;

  const hemi = new THREE.HemisphereLight(0xffffff, 0xb7a286, 0.95);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 0.65);
  dir.position.set(7, 12, 8);
  scene.add(dir);

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(13.5, 0.4, 8.8),
    new THREE.MeshStandardMaterial({ color: 0xe6ddce, roughness: 0.9 })
  );
  base.position.y = -0.22;
  scene.add(base);

  const grid = new THREE.GridHelper(13, 13, 0xceb89c, 0xd9c8b2);
  grid.position.y = -0.02;
  scene.add(grid);

  const sectionMeshes = [];
  let selectedCode = "A0";

  sections.forEach((section) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(section.w, 0.75, section.d),
      new THREE.MeshStandardMaterial({ color: section.color, roughness: 0.72, metalness: 0.05 })
    );
    mesh.position.set(section.x, 0.38, section.z);
    mesh.userData.code = section.code;
    scene.add(mesh);
    sectionMeshes.push(mesh);
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function setActive(code) {
    selectedCode = code;
    const active = sections.find((item) => item.code === code);
    if (!active) return;

    detailTitle.textContent = `${active.code} - ${active.title}`;
    detailText.textContent = active.text;

    document.querySelectorAll(".museum-3d-section-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.code === code);
    });

    sectionMeshes.forEach((mesh) => {
      const isActive = mesh.userData.code === code;
      mesh.scale.y = isActive ? 1.18 : 1;
      mesh.position.y = isActive ? 0.45 : 0.38;
      mesh.material.emissive = new THREE.Color(isActive ? 0x3b1d0f : 0x000000);
      mesh.material.emissiveIntensity = isActive ? 0.15 : 0;
    });
  }

  sections.forEach((section) => {
    const btn = document.createElement("button");
    btn.className = "museum-3d-section-btn";
    btn.dataset.code = section.code;
    btn.type = "button";
    btn.textContent = `${section.code} - ${section.title}`;
    btn.addEventListener("click", () => setActive(section.code));
    listHost.appendChild(btn);
  });

  function onPointerDown(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(sectionMeshes);
    if (intersects.length > 0) {
      setActive(intersects[0].object.userData.code);
    }
  }

  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();
  setActive(selectedCode);

  function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
