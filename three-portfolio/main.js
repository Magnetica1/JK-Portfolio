import "./style.css"

import *as THREE from "three"

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CubeCamera, Group, Loader } from "three";

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
scene.add(pointLight, floodLight)

//adjust position of objects
pointLight.position.set(0, 10, 20)
torus.translateY(0);

const group = new THREE.Mesh();
const rotateAround = new THREE.Mesh();

const loader = new GLTFLoader();

scene.add(group, rotateAround);

group.rotation.set(0, 4.7, 0)
group.scale.set(10, 10 ,10)
group.position.set(0, 0, 0)
rotateAround.scale.set(10, 10 ,10)  

loader.load( './htmlLogo.glb', function ( gltf ) {
  const html = gltf.scene
  group.add(html)
});
loader.load( './jsLogo.glb', function ( gltf ) {
  const js = gltf.scene; 
  rotateAround.add(js)
});

loader.load( './cssLogo.glb', function ( gltf ) {
  const css = gltf.scene
  rotateAround.add(css)
});

loader.load( './github.glb', function ( gltf ) {
  const github = gltf.scene
  github.rotateY(86.4)
  github.position.set(0, 0, 0)
  scene.add(github)
});

function onScroll() {
  
}

//Is like a gameloop and updates the website
function animate() {
  rotateAround.rotateY(0.02);
  requestAnimationFrame(animate);
  //render the canvas(renderer)
  renderer.render(scene, camera)
}

animate();