// ==UserScript==
// @name         vacme alarm
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over a impftermin
// @author       You
// @match        https://be.vacme.ch/overview/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

function check(){
   console.log('start check');
   var centre = [7,11];
   for(let i = 0;i<centre.length;i++){
       var el = document.querySelectorAll('select')[0].options[centre[i]];
       console.log('start check '+el.innerText);
       var freieTermine = el.innerText.indexOf('keine Termine') == -1;
       if(freieTermine){
           alarm();
           return;
       }
   }
     console.log('kein temrin relaod in 5 sek.')
     setTimeout(() => {
         location.reload();
     },5000);

}

function alarm(){
    document.body.style.backgroundColor = "green";
    const context = new AudioContext()
    const o = context.createOscillator()
    o.type = "sine"
    o.connect(context.destination)
    o.start();
    setTimeout(() => o.stop(), 10000);
}
console.log('waiting for page to load, start checking in 8 sec');
setTimeout(check,8000);
})();
