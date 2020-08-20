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

function bobbing(camera,num){
  if(Math.round(num)%2===0){
    camera.position.y+=0.1;
  }else {
    camera.position.y-=0.1;
  }
  camera.updateProjectionMatrix();
}

export {changeDOM, displayEscapeMenu, bobbing};
