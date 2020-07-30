document.qs=(x)=>document.querySelector(x)
window.addEventListener("ready",loadOptions)
const fL={
 "postProc":(x,y)=>{x.setAttribute("is",y.checked?"on":"off");window[x.id]=y.checked},
"lessData":(x,y)=>fL.postProc(x,y),
 "noLink":(x,y)=>fL.postProc(x,y),
"shortDate":(x,y)=>fL.postProc(x,y),
"goTo":(x,y)=>{if(parseInt(x.innerText)!=x.innerText) return x.style.color="red";
             else x.style.color="black";
             x.setAttribute("is",x.innerText);
             SIV(parseInt(x.innerText))
            
            },
"highlight":(x,y)=>{x.setAttribute("is",y.value);SIVP(y.value)},
"autoScroll":(x,y)=>{
  const is=x.getAttribute("is")
  const speeds=["0x Speed ( Manual )","1x Speed","2x Speed","4x Speed","8x Speed","16x Speed"];
  const ind=speeds.map(x=>x.match(/[0-9]+/g)[0]).indexOf(is)+1;
  y.value=speeds[ind]||speeds[0];
  x.setAttribute("is",ind<speeds.length?speeds[ind].match(/[0-9]+/g)[0]:0)
  window.scroll=x.getAttribute("is")}


}
function loadOptions(){
let inps=document.qs(".options").querySelectorAll("span")
Array.from(inps).forEach((a)=>{
  if(a.getAttribute("is")){
let child=a.nextSibling;
while(child && child.nodeType != 1) {
    child = child.nextSibling
}
   child=child.querySelector("input")
if(child) child.addEventListener("input",fL[a.id].bind(a,a,child));else a.addEventListener("input",fL[a.id].bind(a,a));
if(child&&child.type==="button") a.querySelector("input").addEventListener("click",fL[a.id].bind(a,a,child))

  }

})


}
