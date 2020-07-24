//cookie
const needed=["https://combinatronics.com/ChiefChippy2/cc2bots/master/mpleaderboard/alias.json","https://combinatronics.com/ChiefChippy2/cc2bots/master/mpleaderboard/lbs.json"]
/* load everything and warn user */
Promise.all(
needed
.map(x=>fetch(x)
.then(r=>r.json())
.then(re=>res(window[x.split("/").reverse()[0].split(".")[0]]=re))
.catch(e=>if(prompt("Uh oh, something went wrong whilst trying to load one of all of the resources. Retry now?")) window.reload())
)
.then(e=>window.emit("AllLoaded"))
//Tmw = timeout warning ( to prompt for reload if it takes too long )
window.tmw=window.setTimeout(
()=>if(prompt("Uh oh, something went wrong whilst trying to load one of all of the resources. Retry now?")) window.reload()
,10*1000)

window.on("AllLoaded",()=>{
 //We know all stuff has been loaded, now setup fuse
  const options = {
  includeScore: true,
    ignoreLocation:true
}

window.lbsearch = new Fuse(Object.keys(window.lbs), options)
//now show the body div
document.querySelector(".bod").style.display="yes";
document.querySelector(".loading").style.display="none";
//emit ready
windiw.emit("ready")
})
  
