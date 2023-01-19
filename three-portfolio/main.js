import "./style.css"

import *as THREE from "three"

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader } from "three";

//Setup main elements
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Render the canvas
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

//Set the canvas(renderer) to the window height and width
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//change camera position
camera.position.setZ(30);


const geometry = new THREE.TorusGeometry(10, 2, 16, 100)
//This material does not need any lights to be rendered
const material = new THREE.MeshStandardMaterial({color: 0x0073ad});
const torus = new THREE.Mesh(geometry, material);

//Create a light (0x means hex code(like pound))(light helper to find light)
const pointLight = new THREE.PointLight(0xffffff, 2, 100)
const floodLight = new THREE.AmbientLight(0xf2b179, 0.4);

//set the constrols
const controls = new OrbitControls(camera, renderer.domElement)

//add objects
scene.add(torus, pointLight, floodLight)



//adjust position of objects
pointLight.position.set(0, 10, 20)
torus.translateY(0);


const loader = new GLTFLoader();

loader.load( './htmlLogo.glb', function ( gltf ) {
	scene.add( gltf.scene );
  gltf.scene.rotateY(200);
}, 
//display any errors in the console
undefined, function ( error ) {
	console.error( error );
});

//Is like a gameloop and updates the website
function animate() {
  requestAnimationFrame(animate);
  //render the canvas(renderer)
  renderer.render(scene, camera)
}

animate();