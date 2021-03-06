import { doc } from 'prettier';
import Vue from 'vue'
import App from './App.vue'
import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';

let id = 0;
let long = 0;
let max = 0;
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
    console.log(fromUser, message, isPrivate);
    messageList.push({
        id: ++id,
        fromUser: fromUser,
        message: message,
        isPrivate: isPrivate,
    })
    console.log(messageList)
}

// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres
// connectés dans votre interface.
const memberListUpdate = members => {
    
    if(long > members.length){
        messageList = [];
    }
    long = members.length;

    console.log(long)
    if (long > max){
        if(bool){
            memberList.push({
            id:max,
            members: members[max]
            })
        }
        else if(!bool){
                memberList.push({
                id:max,
                members: members[0]
            })
        }
        spriteList.push(new pDiablo(max));
        max++ 
    }
    
    if(long < max){
        if(!bool)
            bool= true;
        else if(bool)
            bool= false;
    }

    for (let i =0; i < spriteList.length; i++) {
        let sprite = spriteList[i];
        let alive = sprite.tick();

        if (!alive) {
            // le 1 veut dire enleve 1 element
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

    document.querySelector(".pDiablo").onclick = event => {
        let gifDiablo = document.querySelector(".pDiablo");

        mouseLocation.x = event.pageX;
        mouseLocation.y = event.pageY;

    }
    tick();
});

const tick = () => {

    window.requestAnimationFrame(tick)
}

class pDiablo{
    constructor(max){

        this.x = Math.random() * 700 + 300;
        this.y = Math.random() * 600;
        this.mstNo =  Math.floor(Math.random() * 5 + 1);
        this.node = document.createElement("img");
        this.node.setAttribute("class", "pDiablo pDiablo" + this.mstNo);
        this.node.setAttribute("src", "img/Wing_"+this.mstNo+".gif");
        this.node.style.top = this.y + "px";
        this.max = max;
        this.nom = false;
        if (this.mstNo>1){

            this.node.style.top =  50 + "vh";
            console.log(this.node.style.top)
        }
        this.node.style.opacity = 1;
  
        document.querySelector("body").appendChild(this.node);

    }

    tick() {

        this.node.style.left = this.x + "px";
        let alive = this.node.style.opacity > 0;
        if(this.nom ==false){
            this.div = document.createElement("u3");
            let mems = memberList[this.max + 1].members
            let newText = document.createTextNode(mems);
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

        if (!alive){
            document.querySelector("body").removeChild(this.node);
        }

        return alive;
    }

}

