import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Clock
const clock = new THREE.Clock();

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "#ed1fb6" })
);

scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 6;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

function cubeRightTopLeftBottom() {
    gsap.to(mesh.position, {duration: 1, delay: 1, x: 2});
    gsap.to(mesh.position, {duration: 1, delay: 2, x: 0});
    gsap.to(mesh.position, {duration: 1, delay:3, y: 2});
    gsap.to(mesh.position, {duration: 1, delay: 4, y: 0});
    gsap.to(mesh.position, {duration: 1, delay: 5, x: -2});
    gsap.to(mesh.position, {duration: 1, delay: 6, x: 0});
    gsap.to(mesh.position, {duration: 1, delay: 7, y: -2});
    gsap.to(mesh.position, {duration: 1, delay: 8, y: 0});
}

function cubeAnimation() {
    const elapsedTime = clock.getElapsedTime()
    // camera.position.x = Math.cos(elapsedTime);
    // camera.position.y = Math.sin(elapsedTime)
    // camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(cubeAnimation);

};

cubeRightTopLeftBottom();
cubeAnimation();

