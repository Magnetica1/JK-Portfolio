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
const pointLight3 = new THREE.PointLight(0xffffff, 2, 100)
const pointLight4 = new THREE.PointLight(0xffffff, 1, 100)
const floodLight = new THREE.AmbientLight(0xf2b179, 0.4);
// const pointLightHelper = new THREE.PointLightHelper( pointLight4, 1);//set the constrols
// const controls = new OrbitControls(camera, renderer.domElement)

//add objects
scene.add(pointLight, pointLight2, pointLight3, pointLight4, floodLight)

//adjust position of objects
pointLight.position.set(0, 10, 20);
pointLight2.position.set(-6.5, 5, 50);
pointLight3.position.set(60, 0, 0);
pointLight4.position.set(60, 10, 30);
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
loader.load( './carousel1/htmlLogo.glb', function ( gltf ) {
  const html = gltf.scene
  group.add(html)
});
loader.load( './carousel1/jsLogo.glb', function ( gltf ) {
  const js = gltf.scene; 
  rotateAround.add(js)
});
loader.load( './carousel1/cssLogo.glb', function ( gltf ) {
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
loader.load( './carousel1/unity.glb', function ( gltf ) {
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
loader.load( './carousel1/CS.glb', function ( gltf ) {
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
loader.load( './carousel1/github.glb', function ( gltf ) {
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
loader.load( './carousel1/bash.glb', function ( gltf ) {
  const bash = gltf.scene
  bash.position.set(0, 30, 13);
  bash.scale.set(4.5, 4.5, 4.5);
  bash.rotation.set(0.75, 0, 0)
  scene.add(bash)
});

loader.load( './3dText/bashText.glb', function ( gltf ) {
  const bash = gltf.scene
  bash.position.set(-2.5, 30, 20);
  bash.scale.set(3, 3, 3);
  bash.rotation.set(2.84, 0, 0)
  scene.add(bash)
});

//Three.js
loader.load( './carousel1/threejs.glb', function ( gltf ) {
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



//Second carousel

//Tools
loader.load( './carousel2/tools.glb', function ( gltf ) {
  const tool = gltf.scene
  tool.position.set(60, 10, 0)
  tool.rotation.set(0, 0 , 0)
  tool.scale.set(10, 10 ,10)
  scene.add(tool)
});
loader.load( './3dText/toolsText.glb', function ( gltf ) {
  const tool = gltf.scene
  tool.position.set(54, 23, 0)
  tool.rotation.set(1.7, 0, 0)
  tool.scale.set(5, 5 ,5)
  scene.add(tool)
});

//Adobe Photoshop
loader.load( './carousel2/photoshop.glb', function ( gltf ) {
  const photoshop = gltf.scene
  photoshop.position.set(65, -2, 27);
  photoshop.rotation.set(4.8, 0, 0);
  photoshop.scale.set(1.5, 1.5, 1.5);
  scene.add(photoshop)
});
//Adobe Illustrator
loader.load( './carousel2/illustrator.glb', function ( gltf ) {
  const illustrator = gltf.scene
  illustrator.position.set(55, -2, 27);
  illustrator.rotation.set(4.8, 0, 0);
  illustrator.scale.set(1.5, 1.5, 1.5);
  scene.add(illustrator)
});
//Photoshop Text
loader.load( './3dText/photoshopText.glb', function ( gltf ) {
  const photoshop = gltf.scene
  photoshop.position.set(59, -2, 22);
  photoshop.rotation.set(0, 0, 0);
  photoshop.scale.set(3, 3, 3);
  scene.add(photoshop)
});
//Illustrator Text
loader.load( './3dText/illustratorText.glb', function ( gltf ) {
  const photoshop = gltf.scene
  photoshop.position.set(48, -2, 22);
  photoshop.rotation.set(0, 0, 0);
  photoshop.scale.set(3, 3, 3);
  scene.add(photoshop)
});
//Visual Studio Code
loader.load( './carousel2/vscode.glb', function ( gltf ) {
  const vsCode = gltf.scene
  vsCode.position.set(60, 0, 75);
  vsCode.scale.set(8.25, 8.25, 8.25);
  vsCode.rotation.set(0, 3.15, 3.13)
  scene.add(vsCode)
});
//VS Code Text
loader.load( './3dText/VSCodeText.glb', function ( gltf ) {
  const vsCode = gltf.scene
  vsCode.position.set(42, -15, 60);
  vsCode.scale.set(12, 12, 12);
  vsCode.rotation.set(-1, 0, 0)
  scene.add(vsCode)
});
//Kdenlive
loader.load( './carousel2/kdenlive.glb', function ( gltf ) {
  const live = gltf.scene
  live.position.set(60, 35, 40)
  live.rotation.set(2, 0, 0)
  live.scale.set(6.5, 6.5, 6.5)
  scene.add(live)
});
loader.load( './3dText/kDenliveText.glb', function ( gltf ) {
  const live = gltf.scene
  live.position.set(48, 26, 50)
  live.rotation.set(1, 3.15, 3.15)
  live.scale.set(8, 8, 8)
  scene.add(live)
});
//Blender
loader.load( './carousel2/blender.glb', function ( gltf ) {
  const bash = gltf.scene
  bash.position.set(60, 35, 13);
  bash.scale.set(5.25, 5.25, 5.25);
  bash.rotation.set(4, 0, 3.2)
  scene.add(bash)
}); 
//BLender Text
loader.load( './3dText/blenderText.glb', function ( gltf ) {
  const bash = gltf.scene
  bash.position.set(54, 30, 24);
  bash.scale.set(5.25, 5.25, 5.25);
  bash.rotation.set(0, 3.15, 3.15)
  scene.add(bash)
}); 


//scene switcher
document.addEventListener("keydown", function onEvent(event) {
  if (event.key === "ArrowRight" && camera.position.x <= 58) {
    camera.position.x += 3;
}
  if (event.key === "ArrowLeft" && camera.position.x >= -60) {
    camera.position.x += -3;
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