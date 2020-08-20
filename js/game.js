// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.

//imports
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
// import {GLTFLoader} from './GLTFLoader.js';
import * as TWEEN from './imported_modules/tween.esm.js';
import * as Calc from './game_functions/calc.js';
import * as Game from './game_functions/classes.js';
import * as Misc from './game_functions/misc.js';
import * as ModelLoader from './game_functions/model_loader.js';

document.getElementById("playGame").addEventListener("click", function onEvent(event){
  document.getElementById("mainMenu").style.display="none";
  start();
});

function start(){
  //Create the scene
  var scene = new THREE.Scene();
  //Create the camera
  //THREE.PerspectiveCamera(fov, aspectRatio, nearClippingPlane, farClippingPlane)
  var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  //setup DOM elements
  Misc.changeDOM(renderer);
  //Create the plane
  var geometry = new THREE.BoxGeometry(1000,1,1000);
  var material = new THREE.MeshToonMaterial({color: "#0000ff"});
  var cube = new THREE.Mesh( geometry, material );
  scene.add(cube);
  // White directional light at half intensity shining from the top.
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  scene.add(directionalLight);
  //Load the model
  let actualModelArr=ModelLoader.loadModel(scene);
  //load the sword (placeholder)
  let swordShape = new THREE.BoxGeometry(1,5,1);
  let swordMaterial = new THREE.MeshToonMaterial({color:"#ffa500"});
  let sword = new THREE.Mesh(swordShape,swordMaterial);
  scene.add(sword);
  sword.position.y = 10.5;
  sword.position.z = 1;
  sword.position.x = 2;
  let swordItem = new Game.Item("Test Sword", "Sword",[new Game.Stat("damage",1)],new Game.Rarity("Exclusive","salmon"),null,sword);
  let actualPlayer = new Game.Player("amc",actualModelArr,camera,"100","100",new Game.Inventory(new Game.Equip(new Game.PlayerArmor(null,null,null,null,null),swordItem),[]));
  console.info("inventory:",actualPlayer.inventory);
  console.info("array:",actualModelArr);
  //Keypress event listeners
  let num = 0;
  document.addEventListener("keydown", function onEvent(event) {
    console.info("key:",event.key);
    if(event.key==="a") actualPlayer.move("x",-0.1,false);
    if(event.key==="d") actualPlayer.move("x",0.1,false);
    if(event.key==="w") actualPlayer.move("z",-0.1,true);
    if(event.key==="s") actualPlayer.move("z",0.1,false);
    if(event.key===" ") actualPlayer.jump(true);
    if(event.key==="Shift") actualPlayer.move("y",-0.1,false);
    if(event.key==="ArrowLeft") actualPlayer.rotate("y",2.5,false);
    if(event.key==="ArrowRight") actualPlayer.rotate("y",-2.5,false);
    if(event.key==="ArrowUp") actualPlayer.rotate("x",2.5,false);
    if(event.key==="ArrowDown") actualPlayer.rotate("x",-2.5,false);
    if(event.key==="Escape") num=Misc.displayEscapeMenu(num);
    //if(event.key==="F5"){
    //  promeniKameruU3Lice();
    //}
  });
  //default camera position and orientation
  camera.position.y = 10.5;
  camera.position.z = 1;
  camera.rotation.y = Calc.deg2Rad(180);
  //Animation
  function animate() {
    requestAnimationFrame(animate);
    if (Calc.rad2Deg(camera.rotation.y) > 360) camera.rotation.y -= Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.x) > 360) camera.rotation.x -= Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.y) < -360) camera.rotation.y += Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.x) < -360) camera.rotation.x += Calc.deg2Rad(360);
    renderer.render(scene, camera);
  }
  animate();
}
