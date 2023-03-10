import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Material } from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Clock
const clock = new THREE.Clock();

// The Cube Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "#ed1fb6"})
);

scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Resize Handler
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

});

// Double Click Handler
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

// Debug Panel GUI
const gui = new GUI();

// Debug Panel Parameters
const parameters = {
    position: mesh.position,
    color: "#ed1fb6",
    controls: controls,
    material: mesh.material,
    animationOne: animationOne,
    spinHorizontally: () => gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2}),
    spinVertically: () => gsap.to(mesh.rotation, {duration: 1, x: mesh.rotation.x + Math.PI * 2}),
};

gui
    .add(parameters.position, "y")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Change Vertical Axes")

gui
    .add(parameters.position, "x")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Change Horizontal Axes")

gui
    .add(parameters.controls, "enabled")
    .name("Toggle Movement Option")

gui
    .add(parameters.controls, "enableDamping")
    .name('Toggle Damping Effect')

gui
    .add(parameters.material, "wireframe")
    .name("Toggle Wireframe")

gui
    .addColor(parameters, "color")
    .onChange(() => {
        mesh.material.color.set(parameters.color);
    });

gui
    .add(parameters, "animationOne")
    .name("Animation 1")

gui
    .add(parameters, "spinHorizontally")
    .name("Spin Horizontally")

gui
    .add(parameters, "spinVertically")
    .name("Spin Vertically")

function animationOne() {
    gsap.to(mesh.position, {duration: 1, delay: 1, x: 2});
    gsap.to(mesh.position, {duration: 1, delay: 2, x: 0});
    gsap.to(mesh.position, {duration: 1, delay:3, y: 2});
    gsap.to(mesh.position, {duration: 1, delay: 4, y: 0});
    gsap.to(mesh.position, {duration: 1, delay: 5, x: -2});
    gsap.to(mesh.position, {duration: 1, delay: 6, x: 0});
    gsap.to(mesh.position, {duration: 1, delay: 7, y: -2});
    gsap.to(mesh.position, {duration: 1, delay: 8, y: 0});
}

function tick() {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
};

tick();

