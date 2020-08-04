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
 console.log(this)
  const is=x.getAttribute("is")
  const speeds=["0x Speed ( Manual )","1x Speed","2x Speed","4x Speed","8x Speed","16x Speed"];
  const ind=speeds.map(x=>x.match(/[0-9]+/g)[0]).indexOf(is)+(this==="rc"?-1:1);
  y.value=ind<0?speeds[5]:(speeds[ind]||speeds[0]);
  x.setAttribute("is",ind<0?"16":(ind<speeds.length?speeds[ind].match(/[0-9]+/g)[0]:"0"))
  if(window.pS!==1){window.scroll=x.getAttribute("is")}},
 "stopAutoScroll":(x,y)=>{
 if(y.getAttribute("is")!=="1"){
 y.setAttribute("is","1");
 window.scroll=0;
  window.pS=1
 y.value="▶"
}else{
y.setAttribute("is","0");
 window.scroll=parseInt(document.qs("#autoScroll").getAttribute("is"));
 window.pS=0
 y.value="⏸"

}
}


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
if(child&&child.type==="button"){child.addEventListener("click",fL[a.id].bind("click",a,child))
                                document.qs("#sao").addEventListener("click",fL.stopAutoScroll.bind("click",a,document.qs("#sao")))
                                child.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    fL[a.id].bind("rc",a,child)
    return false;
}, false);
                                }

  }

})


}
function SIV(n){
 //Scroll into view, first stop auto scroll
 sao()
 document.qs(".leaderboards").querySelectorAll("tr")[n].scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
 //maybe a highlight class...hm
 
}
function SIVP(player){
 player=player.toLowerCase();
let ar=Array.from(document.qs(".leaderboards").querySelectorAll("tr")).slice(1).forEach(a=>{
const c= a.querySelectorAll("td")[2].innerText.toLowerCase()
 /*
 0 is placement
 1 is head
 2 is ign which we need
 3 is score ( wins )*/
if(c.startsWith(player)||c.endsWith(player)||c.includes(player)){
 sao()
 a.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
                                                                 
                                                                }
})
}
 
function sao(){
 document.qs("#sao").dispatchEvent(new Event("click"))
}
