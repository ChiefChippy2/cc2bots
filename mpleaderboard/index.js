document.qs=(x)=>document.querySelector(x);
window.addEventListener("ready",()=>{
/*Ok... load js told us everything is ready. We can now start adding event listeners*/
 const entry= document.qs("#entry");
  entry.addEventListener("keyup",entrySuggest)
  entry.addEventListener("unfocus",checkValid)
 const sub= document.qs(".sub")
  sub.addEventListener("click",validEntry)

})

/*Suggest alias/game names when user is typing*/
function entrySuggest(ev){
  let suggestions=[];
  document.qs(".errorInput").innerHTML="";
  const va=this.value.toLowerCase();
  if(va) document.qs(".sub").disabled=false;
  if(!va) return document.qs(".sub").disabled="disabled";
  /*use the fuse
  1st check for alias(es). Map it to an object with type : alias, value : the actual alias, fullName : the full name*/
  const su=document.qs(".suggest");
  su.style="display:yes;";
  suggestions=suggestions.concat(Object.keys(window.alias)
                     .filter(x=>x.startsWith(va))
                     .map(e=>({type:"alias",value:e,fullName:window.alias[e]})))
  /* now, add the fuse*/
  suggestions=suggestions.concat(window.lbsearch.search(va)
                     .sort((a,b)=>a.score-b.score)
                     .map(x=>({type:"Game",value:x.item})))
  /*if user pressed tab, autocomplete*/
  if(ev.keyCode===9) this.value=suggestions[0]||this.value;
  /* finally, check if suggestions is empty*/
  if(suggestions.length===0) suggestions.push({type:"Warning",value:"No matches"})
  /*and add to the html.. oops forgot :p*/
  su.innerHTML="";
  for(let ele of suggestions){
   let a = document.createElement("div");
   a.className="suggestitem";
   a.innerHTML=`<span class="type ${ele.type}">${ele.type}</span> - <span class="valu">${ele.value}</span>`;
   if(ele.type==="alias") a.innerHTML+=`<br><span class="smal">AKA ${ele.fullName}</span>`;
   if(ele.type!=="Warning") a.onclick = handleSuggest;
   su.appendChild(a)
   su.appendChild(document.createElement("br"))
    
  } 
  
}
function handleSuggest(){
  document.qs("#entry").value=this.querySelector(".valu").innerText;
  document.qs(".suggest").style.display="none";
  checkValid()
}

function checkValid(){
 const inp=document.qs("#entry").value.toLowerCase();
  const game=window.alias[inp]||inp;
  /* check if invalid. if yes, x*/
  if(!Object.keys(window.lbs).includes(game)) return document.qs(".errorInput").innerHTML="&times; Invalid Game Name.";
const sel=document.qs("#sel");
/* Prompt*/
sel.innerHTML="";
for(const type of Object.keys(window.lbs[game])){
  const chil=document.createElement("option");
  chil.value=type;
  chil.innerHTML=type;
  sel.appendChild(chil)
  
}
  
}

function validEntry(){
  //Same logic 
  const inp=document.qs("#entry").value.toLowerCase();
  const game=window.alias[inp]||inp;
  /* check if invalid. if yes, x*/
  if(!Object.keys(window.lbs).includes(game)) return document.qs(".errorInput").innerHTML="&times; Invalid Game Name.";
  const sel=document.qs("#sel");
  const type=sel.options[sel.selectedIndex].text;
  /*Also Check... you never know*/
  if(!window.lbs[game][type]) return document.qs(".errorInput").innerHTML="&times; Invalid Game Type. Weird.";
  fetch("https://cors-anywhere.herokuapp.com/"+window.lbs[game][type])
  .then(r=>r.text())
  .then(re=>{
   /*NoScript*/
   const lead=document.qs(".leaderboards")
   lead.style.display="none";
   lead.innerHTML=re.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")
            /*Make the table look better*/
            let trs= lead.querySelectorAll("tr")
let cc=lead.querySelector("tbody")
var dd=""
for(let i=101;i<trs.length;i++){
if(trs[i].className!="LeaderboardsHead"){
dd+=trs[i].outerHTML
trs[i].remove()
}}
cc.innerHTML+=dd
 /*Only preserve the table*/
   lead.innerHTML=document.qs(".leaderboardTable").outerHTML
    /*Show result*/
   lead.style.display="block";
            })
  
}
