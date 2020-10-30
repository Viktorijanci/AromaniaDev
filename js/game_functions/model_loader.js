import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import {GLTFLoader} from '../imported_modules/GLTFLoader.js';
import * as Game from './classes.js';

function loadModel(scene){
  let actualModelArr=[];
  var loader = new GLTFLoader();
  loader.load( '../resources/models/humanbody.glb', function ( gltf ) {
    gltf.scene.visible=false;
    scene.add(gltf.scene);
    actualModelArr[0]=new Game.ActualModel(gltf.animations,gltf.scene,gltf.scenes,gltf.cameras,gltf.asset);
    console.log(gltf.scene);
  }, undefined, function ( error ) {
    console.error( error );
  });
  loader.load( '../resources/models/humanbody.glb', function ( gltf ) {
    gltf.scene.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
    gltf.scene.visible=false;
    scene.add(gltf.scene);
    actualModelArr[1]=new Game.ActualModel(gltf.animations,gltf.scene,gltf.scenes,gltf.cameras,gltf.asset);
    console.log(gltf.scene);
  }, undefined, function ( error ) {
    console.error( error );
  });
  return actualModelArr;
}

export {loadModel};
