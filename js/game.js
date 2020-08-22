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
  var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  //Setup DOM elements
  Misc.changeDOM(renderer);
  //Create the plane and add it to the scene
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
  let swordShape = new THREE.BoxGeometry(0.5,5,0.5);
  let swordMaterial = new THREE.MeshToonMaterial({color:"#ffa500"});
  let sword = new THREE.Mesh(swordShape,swordMaterial);
  scene.add(sword);
  sword.position.y = 10.5;
  sword.position.z = 4;
  sword.position.x = -3;
  let swordItem = new Game.Item("Test Sword", "Sword",[new Game.Stat("damage",1)],new Game.Rarity("Exclusive","salmon"),null,sword);
  let actualPlayer = new Game.Player("amc",actualModelArr,camera,"100","100",new Game.Inventory(new Game.Equip(new Game.PlayerArmor(null,null,null,null,null),swordItem),[]));
  //Debugging, will probably delete later because stable
  console.info("inventory:",actualPlayer.inventory);
  console.info("array:",actualModelArr);
  //Keypress event listeners
  let num = 0, map={};
  document.addEventListener("keyup", function onEvent(event) {
    console.info("key:",event.key);
    map[event.key]=true;
    if(map.a && map.w){
      actualPlayer.move("left",true);
      actualPlayer.move("forward",true);
    }
    if(map.a && map.s){
      actualPlayer.move("left",true);
      actualPlayer.move("backward",true);
    }
    if(map.a && map[" "]){
      actualPlayer.move("left",true);
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.d && map.w){
      actualPlayer.move("right",true);
      actualPlayer.move("forward",true);
    }
    if(map.d && map.s){
      actualPlayer.move("right",true);
      actualPlayer.move("backward",true);
    }
    if(map.d && map[" "]){
      actualPlayer.move("right",true);
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.w && map[" "]){
      actualPlayer.move("forward",true);
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.w && map.Shift){
      actualPlayer.move("forward",true);
      actualPlayer.legacyMove("y",-0.1,false);
    }
    if(map.s && map[" "]){
      actualPlayer.move("backward",true);
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.s && map.Shift){
      actualPlayer.move("backward",true);
      actualPlayer.legacyMove("y",-0.1,false);
    }
    if(map.a){
      actualPlayer.move("left",true);
    }
    if(map.d){
      actualPlayer.move("right",true);
    }
    if(map.w){
      actualPlayer.move("forward",true);
    }
    if(map.s){
      actualPlayer.move("backward",true);
    }
    if(map[" "]) {
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.Shift){
      actualPlayer.legacyMove("y",-0.1,false);
    }
    if(map.ArrowLeft){
      actualPlayer.rotate("y",0.1,true);
    }
    if(map.ArrowRight) {
      actualPlayer.rotate("y",-0.1,true);
    }
    if(map.ArrowUp) {
      actualPlayer.rotate("x",0.1,false);
    }
    if(map.ArrowDown) {
      actualPlayer.rotate("x",-0.1,false);
    }
    if(map.Escape){
      num=Misc.displayEscapeMenu(num);
    }
    map={};
    //if(event.key==="F5"){
    //  promeniKameruU3Lice();
    //}
  });
  document.addEventListener("keydown", function onEvent(event) {
    console.info("key:",event.key);
    map[event.key]=true;
    if(map.a && map.w){
      actualPlayer.move("left",true);
      actualPlayer.move("forward",true);
    }
    if(map.a && map.s){
      actualPlayer.move("left",true);
      actualPlayer.move("backward",true);
    }
    if(map.a && map[" "]){
      actualPlayer.move("left",true);
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.d && map.w){
      actualPlayer.move("right",true);
      actualPlayer.move("forward",true);
    }
    if(map.d && map.s){
      actualPlayer.move("right",true);
      actualPlayer.move("backward",true);
    }
    if(map.d && map[" "]){
      actualPlayer.move("right",true);
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.w && map[" "]){
      actualPlayer.move("forward",true);
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.w && map.Shift){
      actualPlayer.move("forward",true);
      actualPlayer.legacyMove("y",-0.1,false);
    }
    if(map.s && map[" "]){
      actualPlayer.move("backward",true);
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.s && map.Shift){
      actualPlayer.move("backward",true);
      actualPlayer.legacyMove("y",-0.1,false);
    }
    if(map.a){
      actualPlayer.move("left",true);
    }
    if(map.d){
      actualPlayer.move("right",true);
    }
    if(map.w){
      actualPlayer.move("forward",true);
    }
    if(map.s){
      actualPlayer.move("backward",true);
    }
    if(map[" "]) {
      actualPlayer.legacyMove("y",0.1,false);
    }
    if(map.Shift){
      actualPlayer.legacyMove("y",-0.1,false);
    }
    if(map.ArrowLeft){
      actualPlayer.rotate("y",0.1,true);
    }
    if(map.ArrowRight) {
      actualPlayer.rotate("y",-0.1,true);
    }
    if(map.ArrowUp) {
      actualPlayer.rotate("x",0.1,false);
    }
    if(map.ArrowDown) {
      actualPlayer.rotate("x",-0.1,false);
    }
    if(map.Escape){
      num=Misc.displayEscapeMenu(num);
    }
    map={};
    //if(event.key==="F5"){
    //  promeniKameruU3Lice();
    //}
  });
  //Set the "spawn point" for the camera (and player)
  camera.position.y = 10.5;
  camera.position.z = 1;
  camera.rotation.y = Calc.deg2Rad(180);
  //Animation
  function animate() {
    requestAnimationFrame(animate);
    document.getElementById("pos").innerHTML="position: x:"+camera.getWorldPosition().x+" y:"+camera.getWorldPosition().y+" z:"+camera.getWorldPosition().z;
    document.getElementById("orient").innerHTML="orientation: x:"+camera.getWorldDirection().x+" y:"+camera.getWorldDirection().y+" z:"+camera.getWorldDirection().z;
    if (Calc.rad2Deg(camera.rotation.y) > 360) camera.rotation.y -= Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.x) > 360) camera.rotation.x -= Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.y) < -360) camera.rotation.y += Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.x) < -360) camera.rotation.x += Calc.deg2Rad(360);
    renderer.render(scene, camera);
  }
  animate();
}
