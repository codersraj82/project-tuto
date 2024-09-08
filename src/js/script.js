import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
//Create wenGL renderer

const renderer = new THREE.WebGLRenderer();
//set size (width/height) of renderer
renderer.setSize(window.innerWidth, window.innerHeight);

//add this element to document body

document.body.appendChild(renderer.domElement);

//create scene and camera object

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// add helper for axes
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);
// add mobility to camera
const orbit = new OrbitControls(camera, renderer.domElement);

//change the position backward

// camera.position.z = 5;
// camera.position.y = 2;
camera.position.set(5, 10, 25);
// update mobility of camera
orbit.update();

// add other object in scene
// add box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//add to scene
scene.add(box);

// add plane elemnt / object in scene
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

plane.rotation.x = -0.5 * Math.PI;

// add grid helper

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// add sphere

const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: true,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
// add gui for user selction of parameters
const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
};

gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});

gui.add(options, "wireframe").onChange((e) => {
  sphere.material.wireframe = e;
});

gui.add(options, "speed", 0, 0.1);

//Ambient Light source
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//Add directional light

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);

//Add directional light helper
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

// geometric trnsformation
//animation is a sequence of transfomation
// add bounce effect to sphere
let step = 0;
//let speed = 0.01;

function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  step += options.speed;

  sphere.position.y = 10 * Math.abs(Math.sin(step));

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
