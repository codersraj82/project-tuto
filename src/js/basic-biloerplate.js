import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Create wenGL renderer

const renderer = new THREE.WebGLRenderer();
//set size (width/height) of renderer
renderer.setSize(window.innerWidth, window.innerHeight);

//add this element to document body

document.body.appendChild(renderer.domElement);
