/**
 * TODO: A lot of functions don't return a boolean, even though they should
 * I should probably fix that as fast as I can...
 * ...because as it stands, the documentation is not accurate
*/

import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import * as Calc from './calc.js';
import * as Misc from './misc.js';

/**
 * Define 3D vectors for storing camera position and direction
 * Probably will implement it somehow to GameState
*/
let worldPosition = new THREE.Vector3();
let worldOrientation = new THREE.Vector3();

/**
 * Class that stores game's state, will be useful in the future
*/
class GameState {

  constructor(player,level){

    this.player=player;

    if(level===undefined){
      this.level="admin_room";
    }else{
      this.level=level;
    }

  }

}

/**
 * Class for game items
*/
class Item {

  constructor(name, type,stats, rarity,thumbnail,model){

    /**
     * The name of the item
     * @name Item#name
     * @type {?string}
    */
    this.name=name;

    /**
     * The type of the Item
     * @name Item#type
     * @type {?string}
    */
    this.type=type;

    /**
     * The stats of the item, if they exist
     * @name Item#stats
     * @type {Stat}
    */
    this.stats=stats;

    /**
     * The rarity of the item
     * @name Item#rarity
     * @type {Rarity}
    */
    this.rarity=rarity;

    /**
     * The thumbnail url of the item
     * @name Item#thumbnail
     * @type {?string}
    */
    this.thumbnail=thumbnail;

    /**
     * The model of the item
     * @name Item#model
     * @type {ActualModel}
    */
    this.model=model;

  }

}

class Stat {

  constructor(name, delta,level){

    /**
     * The stat name
     * @name Stat#name
     * @type {?string}
    */
    this.name=name;

    /**
     * The "delta" (or strength) of the stat
     * @name Stat#delta
     * @type {number}
    */
    this.delta=delta;

    /**
     * The level of the stat, parameter can be omitted
     * Upon levelup, strengthens the delta of the stat
     * @name Stat#level
     * @type {number}
    */
    if(level===undefined){
      this.level=1;
    }else{
      this.level=level;
    }

  }

  /**
   * Levels up the stat
   * TODO: allow levelling up multiple times at once
   * @params {number} amount of times to level up
   * @returns {?boolean} whether it was successful or not
  */
  levelUp(){

  }

}

/**
 * TODO: Evaluate if this class is even worth defining...
 * ...since it's just an Object with 2 properties
*/
class Rarity {

  constructor(name, color){

    /**
     * The rarity name
     * @name Rarity#name
     * @type {?string}
    */
    this.name=name;

    /**
     * The rarity color (inventory, glow, etc)
     * @name Rarity#color
     * @type {?string}
    */
    this.color=color;

  }

}

class PlayerArmor {

  constructor(helmet, chest, leg, boots, gloves){

    /**
     * Helmet
     * @name PlayerArmor#helmet
     * @type {Item}
    */
    this.helmet=helmet;

    /**
     * Chestplate
     * @name PlayerArmor#chest
     * @type {Item}
    */
    this.chest=chest;

    /**
     * Leggings
     * @name PlayerArmor#leg
     * @type {Item}
    */
    this.leg=leg;

    /**
     * Boots
     * @name PlayerArmor#boots
     * @type {Item}
    */
    this.boots=boots;

    /**
     * Gloves
     * @name PlayerArmor#gloves
     * @type {Item}
    */
    this.gloves=gloves;

  }

}

/**
 * TODO: Evaluate if this class is even worth defining...
 * ...since it's just an Object with 2 properties
*/
class Equip {

  constructor(armor, weapon){

    /**
     * Currently equipped armor
     * @name Equip#armor
     * @type {PlayerArmor}
    */
    this.armor=armor;

    /**
     * Currently equipped weapon
     * @name Equip#weapon
     * @type {Item}
    */
    this.weapon=weapon;

  }

}

/**
 * TODO: Evaluate if this class is even worth defining...
 * ...since it's just an Object with 2 properties
*/
class Inventory {

  constructor(equip, pocket){

    /**
     * Currently equipped items
     * TODO: Clarify if equipped items count as part of Inventory.pocket...
     * ...or if they are seperate from eachother
     * @name Inventory#equip
     * @type {Equip}
    */
    this.equip=equip;

    /**
     * Not equipped items in inventory
     * @name Inventory#pocket
     * @type {array}
    */
    this.pocket=pocket;

  }

}

/**
 * TODO: Rename this class because "ActualModel" is just a dumb name...
 * ...perhaps "Model" would be more appropriate?
*/
class ActualModel{

  constructor(animations, scene, scenes, cameras, asset){

    /**
     * Loaded model animations
     * @name ActualModel#animations
     * @type {array}
    */
    this.animations=animations;

    /**
     * The main model
     * @name ActualModel#scene
     * @type {Object3D}
    */
    this.scene=scene;

    /**
     * Unsure what this is for...
     * ...in my tests it mostly had the same value as ActualModel.scene
     * @name ActualModel#scenes
     * @type {Object3D}
    */
    this.scenes=scenes;

    /**
     * Camera placed on model, probably a PerspectiveCamera
     * @name ActualModel#cameras
     * @type {Camera}
    */
    this.cameras=cameras;

    /**
     * Forgot what this does
     * @name ActualModel#asset
     * @type
    */
    this.asset=asset;

  }

}

class Player {

  constructor(name, scene, camera, health, armor, inventory){

    /**
     * The name of the player
     * @name Player#name
     * @type {?string}
    */
    this.name=name;

    /**
     * This player's model
     * @name Player#scene
     * @type {array}
    */
    this.scene=scene;

    /**
     * This player's camera
     * @name Player#camera
     * @type {PerspectiveCamera}
    */
    this.camera=camera;

    /**
     * This player's health
     * @name Player#health
     * @type {number}
    */
    this.health=health;

    /**
     * This player's armor
     * @name Player#armor
     * @type {number}
    */
    this.armor=armor;

    /**
     * This player's inventory
     * @name Player#inventory
     * @type {Inventory}
    */
    this.inventory=inventory;

  }

  /**
   * Linear movement on a axis
   * @name Player#legacyMove
   * @param {?string} direction Axis
   * @param {number} delta Distance travelled
   * @param {boolean} debug Show console messages
   * @returns {boolean}
  */
  legacyMove(direction,delta,debug){

    try{

      if(direction==="x"){

        //move the camera
        this.camera.position.x+=delta;
        this.camera.updateProjectionMatrix();

        //move the player model
        this.scene.forEach(item => {
          item.scene.position.x+=delta;
        });

        //visual effects
        Misc.bobbing(this.camera, this.camera.position.x);

        //generic debugging
        if(debug) console.info("camera location:",this.camera.getWorldPosition(worldPosition));

      }

      if(direction==="z"){

        //move the camera
        this.camera.position.z+=delta;
        this.camera.updateProjectionMatrix();

        //move the player model
        this.scene.forEach(item => {
          item.scene.position.x+=delta;
        });

        //visual effects
        Misc.bobbing(this.camera, this.camera.position.z);

        //generic debugging
        if(debug) console.info("camera location:",this.camera.getWorldPosition(worldPosition));

      }

      if(direction==="y"){

        //move the camera
        this.camera.position.y+=delta;
        this.camera.updateProjectionMatrix();

        //move the player model
        this.scene.forEach(item => {
          item.scene.position.x+=delta;
        });

        //generic debugging
        if(debug) console.info("camera location:",this.camera.getWorldPosition(worldPosition));

      }

    }catch(e){

      //generic error catching
      console.log(e);

    }

  }

  /**
   * Relative, linear movement
   * @name Player#move
   * @param {?string} direction Direction
   * @param {boolean} debug Show console messages
   * @returns {boolean}
  */
  move(direction,debug){

    //calculating how much to move in what direction
    let cameraDirection = this.camera.getWorldDirection(worldOrientation);

    //scaling
    cameraDirection.x/=10;
    cameraDirection.z/=10;
    cameraDirection.y=0;

    if(direction==="forward"){

      //moving the camera
      this.camera.position.add(cameraDirection);

      //moving the weapon model
      this.inventory.equip.weapon.model.position.add(cameraDirection);

    }else if(direction==="backward"){

      //scaling
      cameraDirection.x*=-1;
      cameraDirection.z*=-1;

      //moving the camera
      this.camera.position.add(cameraDirection);

      //moving the weapon model
      this.inventory.equip.weapon.model.position.add(cameraDirection);

    }else if(direction==="left"){

      //translating camera
      let leftCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
      leftCamera.copy(this.camera,true);
      leftCamera.rotation.y+=Calc.deg2Rad(-90);

      //calculating directional movement
      let newDirection = leftCamera.getWorldDirection(worldOrientation);

      //scaling
      newDirection.y=0;

      //moving the camera
      this.camera.position.add(newDirection);

      //moving the weapon model
      this.inventory.equip.weapon.model.position.add(newDirection);

    }else if(direction==="right"){

      //translating camera
      let leftCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
      leftCamera.copy(this.camera,true);
      leftCamera.rotation.y+=Calc.deg2Rad(90);

      //calculating directional movement
      let newDirection = leftCamera.getWorldDirection(worldOrientation);

      //scaling
      newDirection.y=0;

      //moving the camera
      this.camera.position.add(newDirection);

      //moving the weapon model
      this.inventory.equip.weapon.model.position.add(newDirection);

    }

    //generic debugging
    if(debug) console.info("camera position:", this.camera.getWorldPosition(worldPosition));

  }

  /**
   * DEPRECATED: USE FirstPersonControls FOR THIS
   * Rotate the player camera
   * @name Player#rotate
   * @param {?string} direction Axis
   * @param {number} delta Amount
   * @param {boolean} debug Enable console messages
  */
  rotate(direction,delta,debug){
    try {
      // delta=Calc.deg2Rad(delta);
      if(direction==="x"){
        this.camera.rotation.x+=delta;
        if(debug) console.info("camera direction:",this.camera.getWorldDirection(worldOrientation));
      }
      if(direction==="y"){
        this.camera.rotation.y+=delta;
        this.scene.forEach(item => {
          item.scene.rotation.y+=delta;
        });
        if(debug) console.info("camera direction:",this.camera.getWorldDirection(worldOrientation));
      }
    }catch(e){
      console.log(e);
    }
  }
  //nisam ni završio iz nekog razloga lol
  jump(debug){
    try{
      if(debug) console.info("camera position:",camera.position);
    }catch(e){
      console.log(e);
    }
  }
  //možda započnem uskoro
  attack(){
    try{

    }catch(e){
      console.log(e);
    }
  }
}

export {Item, PlayerArmor, Equip, ActualModel, Player, Stat, Inventory, Rarity, GameState};
