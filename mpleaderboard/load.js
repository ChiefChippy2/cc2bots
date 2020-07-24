const needed=["alias.json","lbs.json"]
/* Load everything and warn user */
Promise.all(
needed
.map(x=>fetch(x)
.then(r=>r.json())
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

window.addEventListener("AllLoaded",()=>{
          clearTimeout(tmw)
 //We know all stuff has been loaded, now setup fuse
  const options = {
  includeScore: true,
    ignoreLocation:true
}

window.lbsearch = new Fuse(Object.keys(window.lbs), options)
//Now show the body div
document.querySelector(".bod").style.display="yes";
document.querySelector(".loading").style.display="none";
//Emit ready
window.dispatchEvent(new Event("ready"))
})
  
