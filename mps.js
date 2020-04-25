async function bSta(){
let a;
let b;
Promise.race([new Promise((resolve) => {setTimeout(resolve,3000)}),new Promise((re,rj)=>{ a = (new Date()).getTime();fetch("https://tangy-bold-elderberry.glitch.me").then(r=>r.text()).then(r=>{setTimeout(() =>{document.querySelector("#bSa").innerHTML+=(String((new Date()).getTime()-a) +" ms.")},450);if(r==="OK") re;else rj;})})]).then(k=>{document.querySelector("#bSa").innerHTML="Bot is UP, response time : "}).catch(e=>document.querySelector("#bSa").innerHTML="Bot is currently down, maybe check your internet connection?")

            


} 
