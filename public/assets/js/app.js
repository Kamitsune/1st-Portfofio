'use strict';

const portfolio = document.querySelector('.portfolio');

setTimeout(() => {
    portfolio.style.opacity = "0";
}, 3000);

const myName = document.querySelector('.myName'),
      myNameText = document.getElementsByClassName('animeName'),
      overlay = document.querySelector('.overlay'),
      bio = document.querySelector('.bio'),
      projects = document.querySelector('.projects'),
      one = document.querySelector('.one'),
      two = document.querySelector('.two'),
      three = document.querySelector('.three'),
      four = document.querySelector('.four'),
      five = document.querySelector('.five'),
      six = document.querySelector('.six'),
      contact = document.querySelector('.contact'),
      info = document.querySelector('.card-container'),
      card = document.getElementById('card');

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
    projectsPos: -260,
    onePos: -420,
    twoPos: -580,
    threePos: -740,
    fourPos: -900,
    fivePos: -1060,
    sixPos: -1220,
    contactPos: -1380,
    infoPos: -1540,
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
        if (el.classList.contains("title") && deltaY > 0) {
            this.opacityRate = 0.5;
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

        // Gére la façon dont se déplace le titre Projets
        const lastProjectOriginalPosAbs = Math.abs(this.originalPos["sixPos"]);
        if (el.classList.contains("projects") && pos > 0) {
            if (pos < lastProjectOriginalPosAbs + this.originalPos["projectsPos"] / 2) { // + pcq flm de prendre la val abs
                pos = Math.min(pos, 0);
                this.opacityBaseOut[prop] = 1;
                el.style.transition = "transform 0.5s linear, opacity 0.2s linear";
            } else {
                el.style.transition = "transform 5s linear, opacity 2s linear";
            }
        }

        // Gére la façon dont se déplace le titre Contact
        const infoOriginalPosAbs = Math.abs(this.originalPos["infoPos"]);
        if (el.classList.contains("contact") && pos > 0) {
            if (pos < infoOriginalPosAbs - lastProjectOriginalPosAbs + 75) { // 75 pour qu'il parte 5 scroll après
                pos = Math.min(pos, 0);
                this.opacityBaseOut[prop] = 1;
                el.style.transition = "transform 0.5s linear, opacity 0.2s linear";
            } else {
                el.style.transition = "transform 5s linear, opacity 2s linear";
            }
        }

        // Gère la carte de contact
        // multiple de 15 (speed [-10 - +5]) car speed renvoie 15 ou -15
        if (this.infoPos >= -40 && this.infoPos <= 155 && pos >= -40 && pos <= 155 && !el.classList.contains("contact")) {
            
            if (pos >= -40 && pos <= 65) {
                pos = Math.min(pos, -25);
                this.opacityBaseOut[prop] = 1;
                card.style.transform = "rotateY(0deg)";
            }
            if (pos > 65 && pos <= 155) {
                pos = Math.min(pos, -25);
                this.opacityBaseOut[prop] = 1;
                card.style.transform = "rotateY(180deg)";
            }
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

let placeholders = [    
                    "Berners-Lee",
                    "Tim",
                    "tim.bl@mail.com",
                    "Votre message...",
                    "1 - 50 caractères",
                    "< 75 caractères et doit être valide",
                    "Veuillez entrer un message valide"
                    ],
    underline = document.querySelectorAll("[id^='underline']");

//Defines behaviour of the labels when the corresponding input is in focus
for(let i = 1; i < 5; i++){
    let inputEl = document.getElementById("input" + i),
        labelEl = document.getElementById("label" + i),
        placeholdersIndex = i - 1;

    inputEl.addEventListener("focus", function(){
        labelEl.classList.add("focusedLabel");
        this.classList.add("focusedInput");
        this.placeholder = placeholders[placeholdersIndex];
        underline[(i - 1)].classList.add("underline-animation");
    });
};

//Sets back the original properties of the labels unless the corresponding input has been filled in
for(let i = 1; i < 5; i++){
    let inputEl = document.getElementById("input" + i);
    let labelEl = document.getElementById("label" + i);

    inputEl.addEventListener("focusout", function(){

        this.classList.remove("focusedInput");
        this.placeholder = "";

        if(inputEl.value == ""){
            labelEl.classList.remove("focusedLabel");
            underline[(i - 1)].classList.remove("underline-animation");
        }
    })
};

const form = document.getElementById('form-message'),
      inputs = form.querySelectorAll("[id^='input']"),
      submit = form.querySelector('.submit'),
      btnForm = form.querySelector('#btnForm'),
      inputMsg = form.querySelectorAll('input, textarea'),
      labelMsg = form.querySelectorAll('label'),
      checkmark = document.getElementById('svg-container');

function checkInputs() {
  let values = [];

  for (let input of inputs) {
    values.push(input.value);
  }

  if (values.every(value => value !== "")) {
    submit.classList.add("ready");
    btnForm.style.color = "black";
} else {
    submit.classList.remove("ready");
    btnForm.style.color = "white";
  }
}
setInterval(checkInputs, 750);

function validateForm() {
    checkmark.classList.toggle('hide');
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const lastname = document.getElementById('input1'),
          firstname = document.getElementById('input2'),
          email = document.getElementById('input3'),
          message = document.getElementById('input4'),
          underlineAnim = ["underline-animation", "underline-animation-error"];
    email.value = email.value.toLowerCase();

    let formData = new FormData(form);
    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(function(response) {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Erreur de réponse réseau.');
    })
    .then(function(responseText) {
        for (let i = 0; i < inputMsg.length; i++) {
            inputMsg[i].value = "";
            inputMsg[i].placeholder = "";
            labelMsg[i].classList.remove("focusedLabel");
            underline[i].classList.remove(...underlineAnim);
        }
        card.style.transform = "rotateY(180deg)";
        setTimeout(validateForm, 1400);
        setTimeout(validateForm, 3900);
        setTimeout(() => { card.style.transform = "rotateY(0deg)"; }, 4000);
    })
    .catch(function(error) {
        if (lastname.value.length < 1 || lastname.value.length > 50) {
            underline[0].classList.add('underline-animation-error');
            lastname.value = "";
            lastname.placeholder = placeholders[4];
        }
        
        if (firstname.value.length < 1 || firstname.value.length > 50) {
            underline[1].classList.add('underline-animation-error');
            firstname.value = "";
            firstname.placeholder = placeholders[4];
        }
        
        if (email.value.length > 75 || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
            underline[2].classList.add('underline-animation-error');
            email.value = "";
            email.placeholder = placeholders[5];
        }
        
        if (message.value.length < 1) {
            underline[3].classList.add('underline-animation-error');
            message.value = "";
            message.placeholder = placeholders[6];
        }
    });
});

const circle = document.querySelector('.progress-circle'),
      circleLen = circle.getTotalLength();

function track() {
    const currentPos = position.infoPos; // infoPos car c'est le dernier élément actuellement - Equivalent de scrollY - Valeur initiale = -1540
    const lastElPos = -1540; // Equivalent de offsetHeight
    const endPos = lastElPos - currentPos; // endPos = la distance restante à parcourir
    
    circle.style.strokeDashoffset =  circleLen - (currentPos / lastElPos * circleLen)
    circle.style.strokeDasharray = circleLen;
    circle.style.strokeDashoffset = circleLen - ((endPos / lastElPos) * circleLen);
};

window.addEventListener('wheel', track);

window.onload = () => {
    circle.style.strokeDasharray = circle.style.strokeDashoffset = circleLen;
};

const outerCursor = document.getElementById("outerCursor"),
      innerCursor = document.getElementById("innerCursor");

let mouseX = null,
    mouseY = null,
    dim = {
        largest: 50,
        small: 10,
        large: 40,
        smallest: 5
    };

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function moveCursor() {
    const largeWidth = outerCursor.offsetWidth / 2,
          smallWidth = innerCursor.offsetWidth / 2;

    outerCursor.style.left = mouseX - largeWidth + window.scrollX + "px";
    outerCursor.style.top = mouseY - largeWidth + window.scrollY + "px";

    innerCursor.style.left = mouseX - smallWidth + window.scrollX + "px";
    innerCursor.style.top = mouseY - smallWidth + window.scrollY + "px";

    window.addEventListener("mousedown", () => {
        outerCursor.style.height = dim.large + "px";
        outerCursor.style.width = dim.large + "px";
        innerCursor.style.height = dim.smallest + "px";
        innerCursor.style.width = dim.smallest + "px";
    });

    window.addEventListener("mouseup", () => {
        outerCursor.style.height = dim.largest + "px";
        outerCursor.style.width = dim.largest + "px";
        innerCursor.style.height = dim.small + "px";
        innerCursor.style.width = dim.small + "px";
    });
    
    requestAnimationFrame(moveCursor);
}

requestAnimationFrame(moveCursor);