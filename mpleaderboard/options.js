document.qs=(x)=>document.querySelector(x)
window.addEventListener("ready",loadOptions)
const fL={
 "postProc":(x)=>{/*testing*/console.log(x);x.setAttribute("is",x.querySelector("input").checked?"on":"off");window[x.id]=x.querySelector("input").checked},
"lessData":(x)=>this.postProc(x),
 "noLink":(x)=>this.postProc(x),
"shortDate":(x)=>this.postProc(x),
"goTo":(x)=>{if(parseInt(x.innerText)!=x.innerText) return x.style.color="red";
             else x.style.color:black;
             x.setAttribute("is",x.innerText);
             SIV(parseInt(x.innerText))
            
            },
"highlight":(x)=>{x.setAttribute("is",x.querySelector("input").value);SIVP(x.querySelector("input").value)},
"autoScroll":(x)=>{
  const is=x.getAttribute("is")
  const speeds=["0x Speed ( Manual )","1x Speed","2x Speed","4x Speed","8x Speed","16x Speed"];
  const ind=speeds.map(x=>x.match(/[0-9]+/g)[0]).indexOf(is)+1;
  x.querySelector("input").value=speeds[ind]||speeds[0];
  x.setAttribute("is",ind<speeds.length?speeds[ind].match(/[0-9]+/g)[0]:0)
  window.scroll=x.getAttribute("is")}


}
function loadOptions(){
let inps=document.qs(".options").querySelectorAll("span")
Array.from(inps).forEach((a)=>{
  if(a.getAttribute("is")){
a.querySelector("input").addEventListener("input",fL[a.id].bind(a))
a.addEventListener("input",fL[a.id])
if(a.querySelector("input").type==="button") a.querySelector("input").addEventListener("click",fL[a.id].bind(a))

  }

})


}
