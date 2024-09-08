import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// add mobility to camera
const orbit = new OrbitControls(camera, renderer.domElement);

//change the position backward

// camera.position.z = 5;
// camera.position.y = 2;
camera.position.set(0, 2, 5);
// update mobility of camera
orbit.update();

// add other object in scene
// add box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//add to scene
scene.add(box);

// geometric trnsformation

//animation is a sequence of transfomation

function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
