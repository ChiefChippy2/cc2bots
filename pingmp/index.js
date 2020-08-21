window.addEventListener("DOMContentLoaded",start)

function start(n,excludes){
let lon=["us","clans"]
let poa=lon.filter(x=>!excludes.includes(x)).map(y=>fetch("https://dns.google.com/resolve?name="+y+".mineplex.com&type=a"))
Promise.all(poa).then(ress=>{
Promise.all(ress.filter(x=>x.ok||x.status===200).map(x=>x.json())).then(allips=>{
const ip=allips.filter(x=>x.Answer&&x.Answer[0].data).map(x=>x.Answer[0].data).map(x=>x).flat()
displayIP(ip);
(async function(){
for(let s of ip){
let results=[];
for(let i=1;i<n;i++){
let pin=await ping(s)
results.push(pin)
}
displayPing(s,results.reduce((a,c)=>a+c)/n)
}
})()


})


})
}

function displayIP(x){console.log(x)}
function displayPing(x,y){console.log(x,y)}
function ping(IP){
  //ofc their mc servers dont have https servers, thus erroring
  let a = new Date()
  return new Promise(r=>{
  fetch("https://"+IP,{method:"no-cors"}).catch(_=>r(new Date()-a))
  })
}
