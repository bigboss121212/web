import {signin} from './chat-api';
let spriteList = [];

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }

    tick();
});


/******/ 	// pour faire apparaitre des faces de monstre de maniere aleatoire

const tick = () => {

  if(Math.random() < 0.01){
      spriteList.push(new Monstre());
  }

  if(Math.random() < 0.005){ //plus faire un requestAnimation frame pour que diablo apparaisse au mm moment
    spriteList.push(new Diablo());
    let n = Math.random();
    spriteList.push(new Balls(140,475,n));
    spriteList.push(new Balls(1440,475,n)); //corriger la balle n'est pas tjrs au mm endroit dependament du navigateur (mettre 1440 pour les plus gros navigateur)
  }
  
  for (let i = 0; i < spriteList.length; i++) {
      let sprite = spriteList[i];
      let alive = sprite.tick();

      if (!alive) {
          // le 1 veut dire enleve 1 element
          spriteList.splice(i,1);
          i--;
      }
  }

  window.requestAnimationFrame(tick);
}

class Monstre {
  constructor(){
      this.x = Math.random() * 700 + 200;
      this.y = Math.random() * 600;
      this.mstNo =  Math.floor(Math.random() * 4 + 1);
      this.node = document.createElement("div");
      this.node.setAttribute("class", "monstre monstre_" + this.mstNo);
      this.node.style.top = this.y + "px";
      this.node.style.opacity = 1;

      document.querySelector("body").appendChild(this.node);
  }

  tick() {

      this.node.style.top = this.y + "px";
      this.node.style.left = this.x + "px";
      this.node.style.opacity -= 0.01;
      let alive = this.node.style.opacity > 0;

      if (!alive){
          document.querySelector("body").removeChild(this.node);
      }

      return alive;
  }
}

class Diablo{
  constructor(){
    this.node = document.createElement("div");
    this.node.setAttribute("class", "diablo");
    this.node.style.opacity = 1;
    this.node.style.top = 0 + "px";
    this.node.style.width = window.innerWidth;
    this.node.style.height = window.innerHeight;
    console.log(this.node.style.width)

    document.querySelector("body").appendChild(this.node);

  }

  tick() {

    this.node.style.opacity -= 0.01;
    let alive = this.node.style.opacity > 0;

    if (!alive){
        document.querySelector("body").removeChild(this.node);
    }

    return alive;
}


}

class Balls{
  constructor(x,y,n){
    this.node = document.createElement("div");
    this.node.setAttribute("class", "balls");
    this.x =  x;
    this.y =  y;
    this.node.style.top = this.y + "px";
    this.node.style.left = this.x + "px";
    this.n = n;
    this.speed = this.size/3;

    document.querySelector("body").appendChild(this.node);
  }

  tick() {

    let up = 5;
    this.y -= up;
    let alive = this.y > 0;
    this.node.style.top = this.y + "px";
    this.node.style.left = this.x + "px";
    if (this.x == 1440){
      this.node.style.left = 80 + "vw";
    }
    if (!alive){
      document.querySelector("body").removeChild(this.node);
  }
  return alive;
}
}
