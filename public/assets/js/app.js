'use strict';

const portfolio = document.querySelector('.portfolio');

setTimeout(() => {
    portfolio.style.opacity = "0";
}, 3000);

const myName = document.querySelector('.myName'),
      myNameText = document.getElementsByClassName('animeName'),
      overlay = document.querySelector('.overlay'),
      bio = document.querySelector('.bio');

setTimeout(() => {
    myNameText[0].style.display = "block";
    myNameText[1].style.display = "block";
    portfolio.style.display = "none";
}, 6000);

setTimeout(() => {
    myNameText[0].style.transform = "translateY(0)";
    myNameText[1].style.transform = "translateY(0)";
}, 6500);

let namePos = 0;

const position = {
    opacityRate: 0.2,
    opacityBaseOut: {},
    opacityBaseIn: 0, // inutile à enlever
    originalPos: {},
    bioPos: -100,
    speed: function(deltaY, velocity) {
        return deltaY * velocity;
    },
    fade: function(prop, el, deltaY, velocity) {

        if (!(prop in this.originalPos)) {
            this.originalPos[prop] = this[prop];
        }
        if (!(prop in this.opacityBaseOut)) {
            this.opacityBaseOut[prop] = 1;
        }

        const originalPos = this.originalPos[prop];

        let pos = this[prop];
        if (this.speed(deltaY, velocity) > 0) {
            pos += 15;
        } else if (this.speed(deltaY, velocity) < 0) {
            pos -= 15;
        }
        pos = (pos < originalPos) ? originalPos : pos;

        if (pos >= 0 && pos <= 60 && deltaY > 0) {
            this.opacityBaseOut[prop] = (this.opacityBaseOut[prop] < 0) ? 0 : this.opacityBaseOut[prop] - this.opacityRate;
        } else if (pos >= 0 && pos <= 60 && deltaY < 0) {
            this.opacityBaseOut[prop] = (this.opacityBaseOut[prop] > 1) ? 1 : this.opacityBaseOut[prop] + this.opacityRate;
        } else if (pos < 0) {
            this.opacityBaseOut[prop] = 1;
        } else {
            this.opacityBaseOut[prop] = 0;
        }

        let pos2 = this[prop];
        if (this.speed(deltaY, velocity) > 0) {
            pos2 += this.speed(deltaY, velocity);
        } else if (this.speed(deltaY, velocity) < 0) {
            pos2 -= Math.abs(this.speed(deltaY, velocity));
        }
        pos2 = (pos2 < originalPos) ? originalPos : pos2;

        if (pos2 >= -160 && pos2 <= -100 && deltaY > 0) {
            this.opacityBaseOut[prop] = (this.opacityBaseOut[prop] < 0) ? 0 : this.opacityBaseOut[prop] - this.opacityRate;
        } else if (pos2 >= -160 && pos2 <= -100 && deltaY < 0) {
            this.opacityBaseOut[prop] = (this.opacityBaseOut[prop] > 1) ? 1 : this.opacityBaseOut[prop] + this.opacityRate;
        } else if (pos2 < -160) {
            this.opacityBaseOut[prop] = 0;
        } else if (pos2 == -100) {
            this.opacityBaseOut[prop] = 1;
        }

        this[prop] = pos;
        this[prop] = pos2;
        this.opacityRate = 0.2;

        el.style.transform = `translateZ(${pos}px)`;
        el.style.opacity = this.opacityBaseOut[prop];
    },
};

setTimeout(() => {
    
    document.addEventListener("wheel", (e) => {
        const y = e.deltaY,
        v = 0.15;
        
        namePos += position.speed(y, (v * 20)); 
        namePos = (namePos < 0) ? 0 : namePos;
        myNameText[0].style.transform = `translateX(${namePos}px)`;
        myNameText[0].style.opacity = (namePos > 0) ? "0" : "1";
        myNameText[1].style.transform = `translateX(${-namePos}px)`;
        myNameText[1].style.opacity = (namePos > 0) ? "0" : "1";
        overlay.style.opacity = (namePos > 0) ? "0" : "1";

        position.fade("bioPos", bio, y, v);
        position.fade("projectsPos", projects, y, v);
        position.fade("onePos", one, y, v);
        position.fade("twoPos", two, y, v);
        position.fade("threePos", three, y, v);
        position.fade("fourPos", four, y, v);
        position.fade("fivePos", five, y, v);
        position.fade("sixPos", six, y, v);
        position.fade("contactPos", contact, y, v);
        position.fade("infoPos", info, y, v);
    });
}, 8000);