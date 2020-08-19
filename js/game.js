// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import {GLTFLoader} from './GLTFLoader.js';
document.getElementById("playGame").addEventListener("click", function onEvent(event){
  document.getElementById("mainMenu").style.display="none";
  start();
});
//important functions
function deg2Rad(x) {
    return x * Math.PI / 180;
}
function rad2Deg(x) {
    return x * 180 / Math.PI;
}
function changeDOM(renderer){
  document.getElementById("gameRender").appendChild( renderer.domElement );
  document.getElementById("gameRender").style.display="inherit";
  document.getElementById("profile").style.display="flex";
  document.getElementById("ha").style.display="flex";
  document.getElementById("name").innerHTML="amc, Level 1 Human";
}
function displayEscapeMenu(num){
  if(num===0) document.getElementById("escapeMenu").style.display="flex";
  if(num===1) document.getElementById("escapeMenu").style.display="none";
  return num ? 0 : 1;
}
//classes
class Item {
  constructor(name, type, rarity,thumbnail,model){
    this.name=name;
    this.type=type;
    this.rarity=rarity;
    this.thumbnail=thumbnail;
    this.model=model;
  }
}
class PlayerArmor {
  constructor(helmet, chest, leg, boots, gloves){
    this.helmet=helmet;
    this.chest=chest;
    this.leg=leg;
    this.boots=boots;
    this.gloves=gloves;
  }
}
class Equip {
  constructor(armor, weapon){
    this.armor=armor;
    this.weapon=weapon;
  }
}
class ActualModel{
  constructor(animations, scene, scenes, cameras, asset){
    this.animations=animations;
    this.scene=scene;
    this.scenes=scenes;
    this.cameras=cameras;
    this.asset=asset;
  }
}
class Player {
  constructor(name, scene, camera, health, armor, inventory, equipped){
    this.name=name;
    this.scene=scene;
    this.camera=camera;
    this.health=health;
    this.armor=armor;
    this.inventory=inventory;
    this.equipped=equipped;
  }
  move(direction,delta,debug){
    try{
      if(direction==="x"){
        this.camera.position.x+=delta;
        this.camera.updateProjectionMatrix();
        this.scene.forEach(item => {
          item.scene.position.x+=delta;
        });
        if(debug) console.info("camera location:",this.camera.getWorldPosition());
      }
      if(direction==="z"){
        this.camera.position.z+=delta;
        this.camera.updateProjectionMatrix();
        this.scene.forEach(item => {
          item.scene.position.x+=delta;
        });
        if(debug) console.info("camera location:",this.camera.getWorldPosition());
      }
      if(direction==="y"){
        this.camera.position.y+=delta;
        this.camera.updateProjectionMatrix();
        this.scene.forEach(item => {
          item.scene.position.x+=delta;
        });
        if(debug) console.info("camera location:",this.camera.getWorldPosition());
      }
    }catch(e){
      console.log(e);
    }
  }
  rotate(direction,delta,debug){
    try {
      delta=deg2Rad(delta);
      if(direction==="x"){
        this.camera.rotation.x+=delta;
        if(debug) console.info("camera location:",this.camera.getWorldDirection());
      }
      if(direction==="y"){
        this.camera.rotation.y+=delta;
        this.scene.forEach(item => {
          item.scene.rotation.y+=delta;
        });
        if(debug) console.info("camera location:",this.camera.getWorldDirection());
      }
    }catch(e){
      console.log(e);
    }
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
  //setup DOM elements
  changeDOM(renderer);
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
  let actualPlayer = new Player("amc",actualModelArr,camera,"100","100",[],false);
  console.info("array:",actualModelArr);
  //Keypress event listeners
  let num = 0;
  document.addEventListener("keydown", function onEvent(event) {
    console.info("key:",event.key);
    if(event.key==="a") actualPlayer.move("x",-0.1,false);
    if(event.key==="d") actualPlayer.move("x",0.1,false);
    if(event.key==="w") actualPlayer.move("z",-0.1,true);
    if(event.key==="s") actualPlayer.move("z",0.1,false);
    if(event.key===" ") actualPlayer.move("y",0.1,false);
    if(event.key==="Shift") actualPlayer.move("y",-0.1,false);
    if(event.key==="ArrowLeft") actualPlayer.rotate("y",2.5,false);
    if(event.key==="ArrowRight") actualPlayer.rotate("y",-2.5,false);
    if(event.key==="ArrowUp") actualPlayer.rotate("x",2.5,false);
    if(event.key==="ArrowDown") actualPlayer.rotate("x",-2.5,false);
    if(event.key==="Escape") num=displayEscapeMenu(num);
    //if(event.key==="F5"){
    //  promeniKameruU3Lice();
    //}
  });
  //default camera position and orientation
  camera.position.y = 10.5;
  camera.position.z = 1;
  camera.rotation.y = deg2Rad(180);
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
