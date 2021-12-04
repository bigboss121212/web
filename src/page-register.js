import {register} from './chat-api';

let canevas = null;
let ctx = null;
let spriteList = [];
let doge = new Image();
doge.src = "img/unnamed.jpg";
let n = 0;

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return register(this);
    }

    canevas = document.querySelector("#canvas");
    ctx = canevas.getContext("2d");

    canevas.width = window.innerWidth;
    canevas.height = window.innerHeight;
   
    console.log(canevas.width); 
    console.log(canevas.height); 

    tick();
})


class Ninja{
  constructor(gauche){
    let columCount = 7.8;
    let rowCount = 3.8;
    let delay = 100;
    let loop = true;
    let scale = 1.8;

    this.tiledImage = new TiledImage("img/run.png", columCount, rowCount, delay, loop, scale)
    this.tiledImage.changeRow(0); // s'il y a seulement une range

    this.tiledImage.changeMinMaxInterval(0,7);
    this.tiledImage.nodeID = n
    
    this.tiledImage.opacity = 0.5;
    
    this.y = Math.random() * 700 + 100;

    this.gauche=gauche;
    console.log(this.gauche)
    if(this.gauche == true){
      this.x = -1;
    }
    else if(this.gauche == false){
      this.x = 2000;
      this.tiledImage.flipped = true;
    }

  }

  tick () {

        let alive = true;
        this.tiledImage.changeRow(1);

        if(this.gauche == true){
          this.x +=5
          alive = this.x < 1500;
        

        }
        else if(this.gauche == false){
          console.log(this.x)
          this.x -=5
          alive = this.x > -5;
      
        }
        this.tiledImage.tick(this.x, this.y, ctx)
        console.log(alive)
        return alive;
        
      }
}

const tick = () => {
  let x = 0;
  if(doge.complete) {
      ctx.drawImage(doge,0,0,1900,1000);  
  }
  x = Math.random()
  if(x < 0.01){
    
    spriteList.push(new Ninja(true)); 
  }
  else if(x < 0.03){
    
    spriteList.push(new Ninja(false)); 
  }
 
  for (let i = 0; i < spriteList.length; i++) {
  
    let alive = spriteList[i].tick();

    if (!alive) {
      spriteList.splice(i, 1);
      console.log(spriteList[i])
      i--;
    }
    console.log(spriteList[i])

  
  }
  window.requestAnimationFrame(tick); //appelle le mm objet a un endroit different 

} 
