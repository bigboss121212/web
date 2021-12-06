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
    tick();
})

class Ninja{
    constructor(gauche){
      let columCount = 7.8;
      let rowCount = 3.8;
      let delay = 100;
      let loop = true;
      let scale = 1.8;
      this.bouleList = [];
      this.tiledImage = new TiledImage("img/run.png", columCount, rowCount, delay, loop, scale)
      this.tiledImage.changeRow(0); 
      this.tiledImage.changeMinMaxInterval(0,6);
      this.tiledImage.nodeID = n
      this.tiledImage.opacity = 0.5;
      this.y = Math.random() * 700 + 100;
      this.gauche=gauche;
    
      if(this.gauche == true){
        this.x = -1;
        for (let i = 0; i < 3; i++) {
          this.bouleList.push(new Goute(this.x,this.y,i,this.gauche));
        }
      }
      else if(this.gauche == false){
        this.x = 1500;
        this.tiledImage.flipped = true;
        for (let i = 0; i < 4; i++) {
          this.bouleList.push(new Goute(this.x,this.y,i,this.gauche));
        }
      }
    }

    tick(){

      let alive = true;
      this.tiledImage.changeRow(1);
      
      if(this.gauche == true){
        this.x +=5
        alive = this.x < 1500;
        if(Math.random() < 0.1){
          this.bouleList.push(new Goute(this.x,this.y,5,this.gauche));
        }
        
      }
      else if(this.gauche == false){
        this.x -=5
        alive = this.x > -5;
        if(Math.random() < 0.1){
          this.bouleList.push(new Goute(this.x,this.y,5,this.gauche));
        }
        
      }

      for (let i = 0; i < this.bouleList.length; i++) {
        let alive = this.bouleList[i].tick();
        if (!alive) {
          this.bouleList.splice(i, 1);
          i--;
        }
      }
      this.tiledImage.tick(this.x, this.y, ctx)
      console.log(alive)
      return alive;
          
    }
}

class Goute {
  constructor(x,y,id,gauche){
      this.monte = 15;
      this.x = x
      this.y = y
      this.dude = 0
      this.id = id
      this.gauche= gauche
      this.diff = Math.random() *70;
      if(!this.gauche)
        this.x-=50
  }

  tick(){
      this.dude++
      if(this.gauche)
        this.x +=5
      else if(!this.gauche)
        this.x -=5
      this.monte +=1
      let degrade = ctx.createRadialGradient(this.x+this.diff,this.y-100-this.monte-(this.id*10.5),10,this.x+7+this.diff,this.y+5-100-this.monte-(this.id*10.5),20);  
      degrade.addColorStop(0, '#CF0A2C');  
      degrade.addColorStop(0.9, '#079F62');  
      degrade.addColorStop(1, 'rgba(1,159,98,0)'); 
      ctx.globalAlpha =0.5;
      ctx.fillStyle = degrade;  
      ctx.fillRect(this.x-150+this.diff,this.y-150-100-this.monte-(this.id*10.5),this.x+150+this.diff,this.y+150-100-this.monte-(this.id*10.5));
       
      let alive = this.dude <30
      
      if (this.y < -10) {
          alive = false;
      }
      
      return alive;
  }

}

const tick = () => {
  let x = 0;

  canevas.width = window.innerWidth;
  canevas.height = window.innerHeight;

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
      i--;
    }

  }
  window.requestAnimationFrame(tick); 
} 