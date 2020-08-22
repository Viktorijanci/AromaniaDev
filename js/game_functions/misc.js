function changeDOM(renderer){
  document.getElementById("gameRender").appendChild( renderer.domElement );
  document.getElementById("gameRender").style.display="inherit";
  document.getElementById("profile").style.display="flex";
  document.getElementById("ha").style.display="flex";
  document.getElementById("orientation").style.display="flex";
  document.getElementById("name").innerHTML="amc, Level 1 Human";
}

function displayEscapeMenu(num){
  if(num===0) document.getElementById("escapeMenu").style.display="flex";
  if(num===1) document.getElementById("escapeMenu").style.display="none";
  return num ? 0 : 1;
}

function bobbing(camera,num){
  if(Math.round(num)%2===0){
    if(camera.position.y+0.1>10.6){
      camera.position.y=10.6;
    }else{
      camera.position.y+=0.1;
    }
  }else {
    if(camera.position.y-0.1<10.4){
      camera.position.y=10.4;
    }else {
      camera.position.y-=0.1;
    }
  }
  camera.updateProjectionMatrix();
}

function evaluateMap(map,actualPlayer,num){
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
  if(map.Escape){
    num=displayEscapeMenu(num);
  }
}

export {changeDOM, displayEscapeMenu, bobbing, evaluateMap};
