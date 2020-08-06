// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import * as OrbitControls from './OrbitControls.js';
document.getElementById("clickOnThis").addEventListener("click", function onEvent(event){
  event.target.style.display="none";
  start();
})
function start(){
  var scene = new THREE.Scene();
  //THREE.PerspectiveCamera(fov, aspectRatio, nearClippingPlane, farClippingPlane)
  var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  var geometry = new THREE.BoxGeometry(100,1,100);
  var material = new THREE.MeshToonMaterial({color: "#0000ff", gradientMap: "fiveTone"});
  var cube = new THREE.Mesh( geometry, material );
  scene.add(cube);
  var pLocal = new THREE.Vector3( 0, 0, -1 );
  var pWorld = pLocal.applyMatrix4( camera.matrixWorld );
  var dir = pWorld.sub( camera.position ).normalize();
  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add(light);
  function deg2Rad(x) {
      return x * Math.PI / 180;
  };
  function rad2Deg(x) {
      return x * 180 / Math.PI;
  };
  document.addEventListener("keydown", function onEvent(event) {
    console.info("key:",event.key);
    if (event.key === "a") {
      camera.position.x-=deg2Rad(2.5);
      camera.updateProjectionMatrix();
    }
    if(event.key==="d"){
      camera.position.x+=deg2Rad(2.5);
      camera.updateProjectionMatrix();
    }
    if (event.key === "w") {
      camera.position.z-=deg2Rad(2.5);
      camera.updateProjectionMatrix();
    }
    if(event.key==="s"){
      camera.position.z+=deg2Rad(2.5);
      camera.updateProjectionMatrix();
    }
    if(event.key===" "){
      camera.position.y+=deg2Rad(2.5);
      camera.updateProjectionMatrix();
    }
    if(event.key==="Shift"){
      camera.position.y-=deg2Rad(2.5);
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
  if (rad2Deg(camera.rotation.y) > 360) camera.rotation.y -= deg2Rad(360);
  if (rad2Deg(camera.rotation.x) > 360) camera.rotation.x -= deg2Rad(360);
  if (rad2Deg(camera.rotation.y) < -360) camera.rotation.y += deg2Rad(360);
  if (rad2Deg(camera.rotation.x) < -360) camera.rotation.x += deg2Rad(360);
  camera.position.y = 1;
  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();
}
