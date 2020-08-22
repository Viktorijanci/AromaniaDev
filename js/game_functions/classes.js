import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import * as Calc from './calc.js';
import * as Misc from './misc.js';

class Item {
  constructor(name, type,stats, rarity,thumbnail,model){
    this.name=name;
    this.type=type;
    this.stats=stats;
    this.rarity=rarity;
    this.thumbnail=thumbnail;
    this.model=model;
  }
}
class Stat {
  constructor(name, delta){
    this.name=name;
    this.delta=delta;
  }
}
class Rarity {
  constructor(name, color){
    this.name=name;
    this.color=color;
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
class Inventory {
  constructor(equip, pocket){
    this.equip=equip;
    this.pocket=pocket;
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
  constructor(name, scene, camera, health, armor, inventory){
    this.name=name;
    this.scene=scene;
    this.camera=camera;
    this.health=health;
    this.armor=armor;
    this.inventory=inventory;
  }
  //pomeranje po nekoj osi, linearno
  legacyMove(direction,delta,debug){
    try{
      if(direction==="x"){
        this.camera.position.x+=delta;
        this.camera.updateProjectionMatrix();
        this.scene.forEach(item => {
          item.scene.position.x+=delta;
        });
        Misc.bobbing(this.camera, this.camera.position.x);
        if(debug) console.info("camera location:",this.camera.getWorldPosition());
      }
      if(direction==="z"){
        this.camera.position.z+=delta;
        this.camera.updateProjectionMatrix();
        this.scene.forEach(item => {
          item.scene.position.x+=delta;
        });
        Misc.bobbing(this.camera, this.camera.position.z);
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
  move(direction,debug){
    let cameraDirection = this.camera.getWorldDirection();
    cameraDirection.x/=10;
    cameraDirection.z/=10;
    cameraDirection.y=0;
    if(direction==="forward"){
      this.camera.position.add(cameraDirection);
      this.inventory.equip.weapon.model.position.add(cameraDirection);
    }else if(direction==="backward"){
      cameraDirection.x*=-1;
      cameraDirection.z*=-1;
      this.camera.position.add(cameraDirection);
      this.inventory.equip.weapon.model.position.add(cameraDirection);
    }else if(direction==="left"){
      let leftCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
      leftCamera.copy(this.camera,true);
      leftCamera.rotation.y+=Calc.deg2Rad(-90);
      let newDirection = leftCamera.getWorldDirection();
      newDirection.y=0;
      this.camera.position.add(newDirection);
      this.inventory.equip.weapon.model.position.add(newDirection);
    }else if(direction==="right"){
      let leftCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
      leftCamera.copy(this.camera,true);
      leftCamera.rotation.y+=Calc.deg2Rad(90);
      let newDirection = leftCamera.getWorldDirection();
      newDirection.y=0;
      this.camera.position.add(newDirection);
      this.inventory.equip.weapon.model.position.add(newDirection);
    }
    if(debug) console.info("camera position:", this.camera.getWorldPosition());
  }
  rotate(direction,delta,debug){
    try {
      // delta=Calc.deg2Rad(delta);
      if(direction==="x"){
        this.camera.rotation.x+=delta;
        if(debug) console.info("camera direction:",this.camera.getWorldDirection());
      }
      if(direction==="y"){
        this.camera.rotation.y+=delta;
        this.scene.forEach(item => {
          item.scene.rotation.y+=delta;
        });
        if(debug) console.info("camera direction:",this.camera.getWorldDirection());
      }
    }catch(e){
      console.log(e);
    }
  }
  jump(debug){
    try{
      if(debug) console.info("camera position:",camera.position);
    }catch(e){
      console.log(e);
    }
  }
}

export {Item, PlayerArmor, Equip, ActualModel, Player,Stat,Inventory,Rarity};
