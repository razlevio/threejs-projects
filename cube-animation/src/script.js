import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Clock
const clock = new THREE.Clock();

// Cube

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#CCFFFF" })
);

scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animate right-left-center using gsap
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 });
// gsap.to(mesh.position, { duration: 1, delay: 3, x: 0 });

function tick() {
    const elapsedTime = clock.getElapsedTime();
    mesh.position.x = Math.cos(elapsedTime);
    mesh.position.y = Math.sin(elapsedTime);
    camera.lookAt(mesh.position)

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
