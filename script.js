// Retro Cookie 3D with Three.js
const container = document.getElementById('cookie-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(400, 400);
container.appendChild(renderer.domElement);

// Cookie base (cylinder)
const cookieGeometry = new THREE.CylinderGeometry(1.6, 1.6, 0.4, 32);
const cookieMaterial = new THREE.MeshPhongMaterial({ color: 0xc68642, flatShading: true });
const cookie = new THREE.Mesh(cookieGeometry, cookieMaterial);
scene.add(cookie);

// Chips (random spheres)
const chips = [];
for (let i = 0; i < 14; i++) {
  const chipGeo = new THREE.SphereGeometry(0.18, 12, 12);
  const chipMat = new THREE.MeshPhongMaterial({ color: 0x3e2723 });
  const chip = new THREE.Mesh(chipGeo, chipMat);
  // Place chips randomly on the top face
  const angle = Math.random() * Math.PI * 2;
  const radius = 1.1 * Math.sqrt(Math.random());
  chip.position.x = Math.cos(angle) * radius;
  chip.position.y = Math.sin(angle) * radius;
  chip.position.z = 0.22 + (Math.random() - 0.5) * 0.05;
  chip.rotation.x = Math.random() * Math.PI;
  chip.rotation.y = Math.random() * Math.PI;
  chips.push(chip);
  cookie.add(chip);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffe0b2, 1.2);
dirLight.position.set(2, 2, 4);
scene.add(dirLight);

// Camera position
camera.position.z = 4.5;

// Floating animation
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.01;
  cookie.rotation.y += 0.018;
  cookie.rotation.x = Math.sin(t) * 0.08;
  cookie.position.y = Math.sin(t * 1.2) * 0.18;
  renderer.render(scene, camera);
}
animate();
