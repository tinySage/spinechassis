import * as THREE from "three";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("#app root element not found");
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x262626);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const placeholder = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.25, 128, 16),
  new THREE.MeshStandardMaterial({ color: 0xe9dfc8, roughness: 0.6 }),
);
scene.add(placeholder);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(3, 4, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  placeholder.rotation.x += 0.004;
  placeholder.rotation.y += 0.006;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
