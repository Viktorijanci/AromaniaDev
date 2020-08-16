// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import {GLTFLoader} from './GLTFLoader.js';
document.getElementById("playGame").addEventListener("click", function onEvent(event){
  event.target.style.display="none";
  start();
});
class ActualModel{
  constructor(animations, scene, scenes, cameras, asset){
    this.animations=animations;
    this.scene=scene;
    this.scenes=scenes;
    this.cameras=cameras;
    this.asset=asset;
  }
}
function start(){
  //Create the scene
  var scene = new THREE.Scene();
  //Create the camera
  //THREE.PerspectiveCamera(fov, aspectRatio, nearClippingPlane, farClippingPlane)
  var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.findElementsById("gameRender").appendChild( renderer.domElement );
  //Create the plane
  var geometry = new THREE.BoxGeometry(1000,1,1000);
  var material = new THREE.MeshToonMaterial({color: "#0000ff"});
  var cube = new THREE.Mesh( geometry, material );
  scene.add(cube);
  // White directional light at half intensity shining from the top.
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  scene.add(directionalLight);
  //Load the model
  let actualModelArr=[];
  var loader = new GLTFLoader();
  loader.load( '../models/humanbody2.0.glb', function ( gltf ) {
	   scene.add(gltf.scene);
     gltf.scene.visible=false;
     actualModelArr[0]=new ActualModel(gltf.animations,gltf.scene,gltf.scenes,gltf.cameras,gltf.asset);
     console.log(gltf.scene);
   }, undefined, function ( error ) {
	    console.error( error );
   }
  );
  loader.load( '../models/humanbody2.0.glb', function ( gltf ) {
     gltf.scene.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
	   scene.add(gltf.scene);
     gltf.scene.visible=false;
     actualModelArr[1]=new ActualModel(gltf.animations,gltf.scene,gltf.scenes,gltf.cameras,gltf.asset);
     console.log(gltf.scene);
   }, undefined, function ( error ) {
	    console.error( error );
   }
  );
  console.info("array:",actualModelArr);
  function deg2Rad(x) {
      return x * Math.PI / 180;
  }
  function rad2Deg(x) {
      return x * 180 / Math.PI;
  }
  //Keypress event listeners
  document.addEventListener("keydown", function onEvent(event) {
    console.info("key:",event.key);
    if (event.key === "a") {
      camera.position.x-=0.1;
      camera.updateProjectionMatrix();
      actualModelArr.forEach(item => {
        console.log(item);
        item.scene.position.x-=0.1;
        // item.scene.updateProjectionMatrix();
      });
      console.log(camera.getWorldPosition());
    }
    if(event.key==="d"){
      camera.position.x+=0.1;
      camera.updateProjectionMatrix();
      actualModelArr.forEach(item => {
        console.log(item);
        item.scene.position.x+=0.1;
        // item.scene.updateProjectionMatrix();
      });
      console.log(camera.getWorldPosition());
    }
    if (event.key === "w") {
      camera.position.z-=0.1;
      camera.updateProjectionMatrix();
      actualModelArr.forEach(item => {
        console.log(item);
        item.scene.position.z-=0.1;
        // item.scene.updateProjectionMatrix();
      });
      console.log(camera.getWorldPosition());
    }
    if(event.key==="s"){
      camera.position.z+=0.1;
      camera.updateProjectionMatrix();
      actualModelArr.forEach(item => {
        console.log(item);
        item.scene.position.z+=0.1;
        // item.scene.updateProjectionMatrix();
      });
      console.log(camera.getWorldPosition());
    }
    if(event.key===" "){
      camera.position.y+=0.1;
      camera.updateProjectionMatrix();
      console.log(camera.getWorldPosition());
    }
    if(event.key==="Shift"){
      camera.position.y-=0.1;
      camera.updateProjectionMatrix();
      console.log(camera.getWorldPosition());
    }
    if(event.key==="ArrowLeft"){
      console.log(camera.getWorldDirection());
      camera.rotation.y+=deg2Rad(2.5);
    }
    if(event.key==="ArrowRight"){
      console.log(camera.getWorldDirection());
      camera.rotation.y-=deg2Rad(2.5);
    }
    if(event.key==="ArrowUp"){
      console.log(camera.getWorldDirection());
      camera.rotation.x+=deg2Rad(2.5);
    }
    if(event.key==="ArrowDown"){
      console.log(camera.getWorldDirection());
      camera.rotation.x-=deg2Rad(2.5);
    }
  });
  camera.position.y = 10.5;
  camera.position.z = 1;
  camera.rotation.y = deg2Rad(180);
  let vector = new THREE.Vector3();
  //Animation
  function animate() {
    requestAnimationFrame(animate);
    if (rad2Deg(camera.rotation.y) > 360) camera.rotation.y -= deg2Rad(360);
    if (rad2Deg(camera.rotation.x) > 360) camera.rotation.x -= deg2Rad(360);
    if (rad2Deg(camera.rotation.y) < -360) camera.rotation.y += deg2Rad(360);
    if (rad2Deg(camera.rotation.x) < -360) camera.rotation.x += deg2Rad(360);
    renderer.render(scene, camera);
  }
  animate();
}
