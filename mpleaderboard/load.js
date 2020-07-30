
/* Load everything and warn user */
//Appearently weird stuff can happen, so had to add that

window.addEventListener("DOMContentLoaded",function(){
       const needed=["alias.json","lbs.json","options.html"]   
          Promise.all(
needed
.map(x=>fetch(x)
.then(r=>x.endsWith("json")?r.json():r.text())
.then(re=>[x.split(".")[0],re])
.catch(e=>{if(confirm("Uh oh, something went wrong whilst trying to load one of all of the resources. Retry now?")) location.reload()
          })))
.then(e=>{
          e.forEach(a=>window[a[0]]=a[1]
          )
          window.dispatchEvent(new Event("AllLoaded"))})
//Tmw = timeout warning ( to prompt for reload if it takes too long )
window.tmw=window.setTimeout(
()=>{if(confirm("Uh oh, something went wrong whilst trying to load one of all of the resources. Retry now?")) location.reload()
    },10*1000)
                                                     })
window.addEventListener("AllLoaded",()=>{
          clearTimeout(tmw)
          window.lb=0
 //We know all stuff has been loaded, now setup fuse
  const options = {
  includeScore: true,
    ignoreLocation:true
}
/*init settings*/
  window.lessData=(navigator.connection.saveData||["2g","3g","4g"].includes(navigator.connection.type));
 window.noLink=false;
       window.shortDate=false;
window.lbsearch = new Fuse(Object.keys(window.lbs), options)
/*Now, addition : Show the options thingy. Depends in screen width/ehgith.*/
window.cW=document.body.clientWidth
window.cH=window.innerHeight
          if(cW<520||cW<cH) document.querySelector("#beneath").innerHTML=(window.options);
          else document.querySelector("#right").innerHTML=(window.options);
         /*If client has a limited width, we should use short Names*/
         if(cW<400) window.shortDate=true;
//Now show the body div
document.querySelector(".bod").style="display:yes";
document.querySelector(".loading").style.display="none";
//Emit ready
window.dispatchEvent(new Event("ready"))
})
 if(document.readyState!=="loading") window.dispatchEvent(new Event("DOMContentLoaded")); 
