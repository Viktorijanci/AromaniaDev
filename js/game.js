// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.
'use strict';

//imports
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import {FirstPersonControls} from './imported_modules/FirstPersonControls.js';
import * as Calc from './game_functions/calc.js';
import * as Game from './game_functions/classes.js';
import * as Misc from './game_functions/misc.js';
import * as ModelLoader from './game_functions/model_loader.js';

//self-explanatory
document.getElementById("playGame").addEventListener("click", function onEvent(event){
  document.getElementById("mainMenu").style.display="none";
  start();
});

//the actual start function
function start(){

  //Create the scene
  let scene = new THREE.Scene();

  //Create the camera
  let camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  //Setup DOM elements
  Misc.changeDOM(renderer);

  //Create the plane and add it to the scene
  let geometry = new THREE.BoxGeometry(1000,1,1000);
  let material = new THREE.MeshToonMaterial({color: "#0000ff"});
  let cube = new THREE.Mesh( geometry, material );
  scene.add(cube);

  // White directional light at half intensity shining from the top.
  let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  scene.add(directionalLight);

  //Load the player model
  let actualModelArr=ModelLoader.loadModel(scene);

  //load the sword (placeholder)
  let swordShape = new THREE.BoxGeometry(0.5,5,0.5);

  //material testing lol
  let swordTestTexture = new THREE.TextureLoader().load("../resources/textures/HumanBaseColor.jpg");
  swordTestTexture.wrapS = THREE.RepeatWrapping;
  swordTestTexture.wrapT = THREE.RepeatWrapping;
  swordTestTexture.repeat.set( 4, 4 );
  let swordMaterial = new THREE.MeshToonMaterial({color:"#ffa500"});
  swordMaterial.map=swordTestTexture;

  //defining the actual sword Object3D
  let sword = new THREE.Mesh(swordShape,swordMaterial);
  scene.add(sword);

  //setting the swords default position
  sword.position.y = 10.5;
  sword.position.z = 4;
  sword.position.x = -3;



  //creating the attack rectangle and adding it
  let attackShape = new THREE.BoxGeometry(3,2,3);
  let attackMesh = new THREE.MeshToonMaterial({color: "#ffffff"});
  let attack = new THREE.Mesh(attackShape,);
  scene.add(attack);

  //setting the default position for the rectangle
  attack.position.y =10.5;
  attack.position.z = -1;

  //assigning data to newly defined classes
  let swordItem = new Game.Item("Test Sword", "Sword",[new Game.Stat("damage",1)],new Game.Rarity("Exclusive","salmon"),null,sword);
  let actualPlayer = new Game.Player("amc",actualModelArr,camera,attack,"100","100",new Game.Inventory(new Game.Equip(new Game.PlayerArmor(null,null,null,null,null),swordItem),[]));

  //Debugging player, will probably delete later because stable
  console.info("inventory:",actualPlayer.inventory);
  console.info("array:",actualModelArr);

  //Creating GameState class
  let game = new Game.GameState(actualPlayer);

  //Keypress event listeners
  let num = 0, map={};
  document.addEventListener("keyup", event => {
    console.log(event.key);
    map[event.key]=false;
  });
  document.addEventListener("keydown", event => {
    console.log(event.key);
    map[event.key]=true;
  });
  renderer.domElement.addEventListener("mousedown", event => {
    console.log("Mouse"+event.button);
    map["Mouse"+event.button]=true;
  });
  renderer.domElement.addEventListener("mouseup", event => {
    console.log("Mouse"+event.button);
    map["Mouse"+event.button]=false;
  });

  //create the controls
  let controls = new FirstPersonControls(camera,renderer.domElement);

  //Set the "spawn point" for the camera (and player)
  camera.position.y = 10.5;
  camera.position.z = 1;
  camera.rotation.y=Calc.deg2Rad(180);
  console.info("first:",camera.getWorldDirection());

  //change controls settings
  controls.movementSpeed = 0;
	controls.domElement = renderer.domElement;
  controls.rollSpeed = Math.PI / 24;
	controls.autoForward = false;
	controls.dragToLook = false;

  //Animation
  function animate() {
    requestAnimationFrame(animate);
    Misc.evaluateMap(map,actualPlayer,num);
    let trash = new THREE.Vector3();
    document.getElementById("pos").innerHTML="position: x:"+camera.getWorldPosition(trash).x+" y:"+camera.getWorldPosition(trash).y+" z:"+camera.getWorldPosition(trash).z;
    document.getElementById("orient").innerHTML="orientation: x:"+camera.getWorldDirection(trash).x+" y:"+camera.getWorldDirection(trash).y+" z:"+camera.getWorldDirection(trash).z;
    if (Calc.rad2Deg(camera.rotation.y) > 360) camera.rotation.y -= Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.x) > 360) camera.rotation.x -= Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.y) < -360) camera.rotation.y += Calc.deg2Rad(360);
    if (Calc.rad2Deg(camera.rotation.x) < -360) camera.rotation.x += Calc.deg2Rad(360);
    controls.update(1);
    renderer.render(scene, camera);
  } animate();

}
