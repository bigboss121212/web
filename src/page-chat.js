import { doc } from 'prettier';
import Vue from 'vue'
import App from './App.vue'
import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';

let id = 0;
let long = 0;
let spriteList = [];
let bool = true;
export let mouseLocation = {x: 350, y : 400}

export let messageList = [
    {
        id: ++id,
        fromUser: "",
        message:"",
        isPrivate:""
    }
];

export let memberList = [
    {
        id: "",
        members: "Participant: "
    }
];

window.addEventListener("load", () => {
    document.querySelector("textarea").onkeyup = function (evt) {
        sendMessage(evt, this)
    };
    document.querySelector("#sign-out-btn").onclick = signout;
    registerCallbacks(newMessage, memberListUpdate);
    chatMessageLoop();
})

// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
const newMessage = (fromUser, message, isPrivate) => {
    messageList.push({
        id: ++id,
        fromUser: fromUser,
        message: message,
        isPrivate: isPrivate,
    })
}

// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres
// connectés dans votre interface.
const memberListUpdate = members => {

    if(bool){
        for(let i = 0; i< members.length; i++){
            memberList.push({
                id:i,
                members: members[i]
            })
            spriteList.push(new pDiablo(i));    
        }
        bool = false;
    }
    else if(members.length > memberList.length){
        memberList.push({
            id:members.length,
            members: members[members.length]
        })
        spriteList.push(new pDiablo(members.length)); 
    }
    else if(members.length < memberList.length){
        for(let i = 0; i < memberList.length; i ++){
            if (members[i]!= memberList[i]){
                memberList.splice(i,1);
                let cla = ".pDiablo" + i;
                let pDiablo = document.querySelector(cla)
                document.querySelector("body").removeChild(pDiablo);
            }
        }
    }

    long = members.length;

    for (let i =0; i < spriteList.length; i++) {
        let sprite = spriteList[i];
        let alive = sprite.tick();

        if (!alive) {
            spriteList.splice(i,1);
            i--;
        }
    }
}

new Vue({
	el: '#main-container',
	components: { App },
	template: '<App/>'
})

window.addEventListener("load", () => {
    tick();
});

const tick = () => {
    window.requestAnimationFrame(tick)
}

class pDiablo{
    constructor(max){
        this.x = 50 + max * 200;
        this.y = Math.random() * 600;
        this.mstNo =  Math.floor(Math.random() * 5 + 1);
        this.node = document.createElement("img");
        this.node.setAttribute("class", "pDiablo pDiablo" + this.mstNo);
        this.node.setAttribute("src", "img/Wing_"+this.mstNo+".gif");
        this.node.style.top = this.y + "px";
        this.max = max;
        this.nom = false;
        this.mems = memberList[this.max + 1].members

        if (this.mstNo>1){
            this.node.style.top = 50 + "vh";
            if(this.x > window.innerWidth){
                this.node.style.top = 35 + "vh";
            } 
            console.log(this.node.style.top)
 
        }

       //pour que les persos ne sortent pas du cadre
        if(this.x > window.innerWidth){
            this.x = 100 ;
        } 

        this.node.style.opacity = 1;
        document.querySelector("body").appendChild(this.node);

        this.node.onclick = event => {
            console.log("yo")
            mouseLocation.x = event.pageX;
            console.log(mouseLocation.x)
            mouseLocation.y = event.pageY;
            this.x = mouseLocation.x
            this.y = mouseLocation.y 
        }
    }

    tick() {
        this.node.style.left = this.x + "px";
        let alive = this.node.style.opacity > 0;
        
        if(this.nom ==false){
            this.div = document.createElement("u3");
            
            let newText = document.createTextNode(this.mems);
            this.div.appendChild(newText);
            this.div.style.position = "absolute"; 
            this.div.style.top = this.node.style.top;
            this.div.style.left = this.node.style.left;
            this.div.style.color = "white";
            this.div.style.border = "3px solid black";
            this.div.style.padding = "3px";
            let parent = document.querySelector("body");
            parent.appendChild(this.div)
            this.nom = true;
        }

        //pour supprimer l'image
        /*for(let i =0 ; i < memberList.length; i++){
            if (memberList[i].members==this.mems){
                return alive;
            }
            else if(i+1 == memberList.length){
                alive = false;
            }
        }*/

        if (!alive){
            document.querySelector("body").removeChild(this.node);
            parent.removeChild(this.div)
        }

        return alive;
    }

}

