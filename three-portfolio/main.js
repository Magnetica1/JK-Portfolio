import "./style.css"

import *as THREE from "three"

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Camera, CubeCamera, Group, Loader } from "three";


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
renderer.setClearColor(0x0c0924)
//change camera position
camera.position.set(0, 15, 25);

const positioner = new THREE.AxesHelper
scene.add(positioner)

const geometry = new THREE.TorusGeometry(10, 2, 16, 100)
//This material does not need any lights to be rendered
const material = new THREE.MeshStandardMaterial({color: 0x0073ad});
const torus = new THREE.Mesh(geometry, material);

//Create a light (0x means hex code(like pound))(light helper to find light)
const pointLight = new THREE.PointLight(0xffffff, 2, 100)
const floodLight = new THREE.AmbientLight(0xf2b179, 0.4);

//set the constrols
// const controls = new OrbitControls(camera, renderer.domElement)

//add objects
scene.add(pointLight, floodLight)

//adjust position of objects
pointLight.position.set(0, 10, 20)
torus.translateY(0);


//OBJECT CREATOR

const group = new THREE.Mesh();
const rotateAround = new THREE.Mesh();
const controls = new OrbitControls(camera, renderer.domElement)

const loader = new GLTFLoader();

scene.add(group, rotateAround);

group.rotation.set(0, 4.7, 0)
group.scale.set(10, 10 ,10)
group.position.set(0, 0, 0)
rotateAround.scale.set(10, 10 ,10)  


// 3D OBJECT LOADER

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

loader.load( './unity.glb', function ( gltf ) {
  const unity = gltf.scene
  unity.rotation.set(-39, -1.5, 0)
  unity.position.set(0, 0, 35);
  scene.add(unity)
});
loader.load( './unityText.glb', function ( gltf ) {
  const uText = gltf.scene
  uText.rotateY(0);
  uText.position.set(0, 0, 0);
  scene.add(uText)
});

// Text Randomizer

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 20);
}
 

// Camera Movement

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

    // camera.position.z = t * -0.03;
    camera.rotation.x = t * 0.0044;
  console.log(t)
}

document.body.onscroll = moveCamera;
moveCamera();


//Animation

//Is like a gameloop and updates the website
function animate() {
  rotateAround.rotateY(0.02);
  requestAnimationFrame(animate); 
  //render the canvas(renderer)
  renderer.render(scene, camera)
}

animate();