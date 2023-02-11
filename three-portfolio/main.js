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
const pointLight2 = new THREE.PointLight(0xffffff, 1, 100)
const floodLight = new THREE.AmbientLight(0xf2b179, 0.4);

//set the constrols
// const controls = new OrbitControls(camera, renderer.domElement)

//add objects
scene.add(pointLight, floodLight, pointLight2)

//adjust position of objects
pointLight.position.set(0, 10, 20)
pointLight2.position.set(-6.5, 5, 50)
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

//TRIO
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
loader.load( './3dText/trioText.glb', function ( gltf ) {
  const trioText = gltf.scene
  scene.add(trioText)
  trioText.rotation.set(1.5, 0, 0)
  trioText.position.set(-12, 20, 0)
  trioText.scale.set(5, 5, 5)
});

//Unity
loader.load( './unity.glb', function ( gltf ) {
  const unity = gltf.scene
  unity.rotation.set(-38.7, -1.5, 0)
  unity.position.set(0, 0, 25);
  scene.add(unity)
});
loader.load( './3dText/unityText.glb', function ( gltf ) {
  const uText = gltf.scene
  uText.position.set(-4, -6, 15);
  uText.rotation.set(0.7, 0, 0);
  uText.scale.set(5, 5, 5);
  scene.add(uText)
});
//C#
loader.load( './CS.glb', function ( gltf ) {
  const CS = gltf.scene
  CS.position.set(0, 30, 75);
  CS.scale.set(7, 7, 7);
  CS.rotation.set(0, 3.15, 3.13)
  scene.add(CS)
});
loader.load( './3dText/CSText.glb', function ( gltf ) {
  const CSText = gltf.scene
  CSText.position.set(-6.5, 5, 75);
  CSText.scale.set(13, 13, 13);
  CSText.rotation.set(2, 0, 0)
  scene.add(CSText)
});

//Github
loader.load( './github.glb', function ( gltf ) {
  const github = gltf.scene
  github.position.set(0, 60, 40)
  github.rotation.set(0, 4.7, 4.5)
  github.scale.set(4, 4, 4)
  scene.add(github)
});
loader.load( './3dText/gitText.glb', function ( gltf ) {
  const github = gltf.scene
  github.position.set(-6, 39, 42)
  github.rotation.set(0.7, 3.13, 3.15)
  github.scale.set(5, 5, 5)
  scene.add(github)
});

//Bash
loader.load( './3dText/bashText.glb', function ( gltf ) {
  const bash = gltf.scene
  bash.position.set(-2.5, 30, 20);
  bash.scale.set(3, 3, 3);
  bash.rotation.set(2.84, 0, 0)
  scene.add(bash)
});
loader.load( './bash.glb', function ( gltf ) {
  const bash = gltf.scene
  bash.position.set(0, 30, 13);
  bash.scale.set(4.5, 4.5, 4.5);
  bash.rotation.set(0.75, 0, 0)
  scene.add(bash)
});

//Three.js
loader.load( './threejs.glb', function ( gltf ) {
  const threejs = gltf.scene
  threejs.position.set(0, 1, 41);
  threejs.scale.set(6, 6, 6);
  threejs.rotation.set(0, 0, 0)
  scene.add(threejs)
});
loader.load( './3dText/threeText.glb', function ( gltf ) {
  const threejs = gltf.scene
  threejs.position.set(-4, -1, 36);
  threejs.scale.set(3, 3, 3);
  threejs.rotation.set(-0.3, 0, 0)
  scene.add(threejs)
});

//scene switcher
document.addEventListener("keydown", function onEvent(event) {
  if (event.key === "ArrowRight" && camera.position.x <= 40) {
    camera.position.x += 1;
}
  if (event.key === "ArrowLeft" && camera.position.x >= -40) {
    camera.position.x += -1;
}
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