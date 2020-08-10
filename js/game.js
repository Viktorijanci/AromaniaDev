// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import {GLTFLoader} from './GLTFLoader.js';
document.getElementById("clickOnThis").addEventListener("click", function onEvent(event){
  event.target.style.display="none";
  start();
});
function start(){
  var scene = new THREE.Scene();
  //THREE.PerspectiveCamera(fov, aspectRatio, nearClippingPlane, farClippingPlane)
  var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  var geometry = new THREE.BoxGeometry(1000,1,1000);
  var material = new THREE.MeshToonMaterial({color: "#0000ff", gradientMap: "fiveTone"});
  var cube = new THREE.Mesh( geometry, material );
  scene.add(cube);
  var light = new THREE.AmbientLight( 0x0000ff ); // soft white light
  scene.add(light);
  var loader = new GLTFLoader();
  let modelGroup= new THREE.Group();
  loader.load( '../models/humanbody2.0.glb', function ( gltf ) {
     modelGroup.add(gltf.scene);
	   scene.add(gltf.scene);
     console.log(gltf.scene);
   }, undefined, function ( error ) {
	    console.error( error );
   }
  );
  loader.load( '../models/humanbody2.0.glb', function ( gltf ) {
     gltf.scene.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
     modelGroup.add(gltf.scene);
	   scene.add(gltf.scene);
     console.log(gltf.scene);
   }, undefined, function ( error ) {
	    console.error( error );
   }
  );
  console.log(modelGroup);
  function deg2Rad(x) {
      return x * Math.PI / 180;
  }
  function rad2Deg(x) {
      return x * 180 / Math.PI;
  }
  function walkCamera(e){
    if(e%2==0){
      camera.position.y+=0.1;
    }else{
      camera.position.y-=0.1;
    }
  }
  document.addEventListener("keydown", function onEvent(event) {
    console.info("key:",event.key);
    if (event.key === "a") {
      camera.position.x-=1;
      walkCamera(camera.position.x);
      camera.updateProjectionMatrix();
    }
    if(event.key==="d"){
      camera.position.x+=1;
      walkCamera(camera.position.x);
      camera.updateProjectionMatrix();
    }
    if (event.key === "w") {
      camera.position.z-=1;
      walkCamera(camera.position.z);
      camera.updateProjectionMatrix();
    }
    if(event.key==="s"){
      camera.position.z+=1;
      walkCamera(camera.position.z);
      camera.updateProjectionMatrix();
    }
    if(event.key===" "){
      camera.position.y+=0.1;
      camera.updateProjectionMatrix();
    }
    if(event.key==="Shift"){
      camera.position.y-=0.1;
      camera.updateProjectionMatrix();
    }
    if(event.key==="ArrowLeft"){
      camera.rotation.y+=deg2Rad(2.5);
    }
    if(event.key==="ArrowRight"){
      camera.rotation.y-=deg2Rad(2.5);
    }
    if(event.key==="ArrowUp"){
      camera.rotation.x+=deg2Rad(2.5);
    }
    if(event.key==="ArrowDown"){
      camera.rotation.x-=deg2Rad(2.5);
    }
  });
  camera.position.y = 10;
  let vector = new THREE.Vector3();
  function animate() {
    requestAnimationFrame( animate );
    camera.getWorldDirection(vector);
    console.log(vector);
    if (camera.position.y<1) camera.position.y=10;
    if (rad2Deg(camera.rotation.y) > 360) camera.rotation.y -= deg2Rad(360);
    if (rad2Deg(camera.rotation.x) > 360) camera.rotation.x -= deg2Rad(360);
    if (rad2Deg(camera.rotation.y) < -360) camera.rotation.y += deg2Rad(360);
    if (rad2Deg(camera.rotation.x) < -360) camera.rotation.x += deg2Rad(360);
    renderer.render( scene, camera );
  }
  animate();
}
