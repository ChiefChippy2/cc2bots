async function bSta(){
let a;
let b;
Promise.race([new Promise((resolve) => {
            setTimeout(resolve,3000)}),
new Promise((re,rj)=>{
 a = (new Date()).getTime();
 fetch("https://tangy-bold-elderberry.glitch.me",{mode:"no-cors"}).then(r=>r.text()).then(r=>{
 if(r==="OK") re(new Date().getTime());else rj;})})
 ]).then(k=>{document.querySelector("#bSa").innerHTML=("Bot is UP, response time : "+String(k-a) +" ms.")} ).catch(e=>document.querySelector("#bSa").innerHTML="Bot is currently down, maybe check your internet connection?")

            


} 
