document.qs=(x)=>document.querySelector(x)
window.addEventListener("ready",loadOptions)
function loadOptions(){
let inps=document.qs(".options").querySelectorAll("input")
Array.from(inps).forEach((a)=>{
a.addEventListener("edit",fL[a.id])



})


}
