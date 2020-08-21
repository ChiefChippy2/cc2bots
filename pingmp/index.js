window.addEventListener("DOMContentLoaded",start)

function start(n,excludes){
let lon=["eu","us","clans"]
let poa=lon.filter(x=>!excludes.includes(x)).map(x=>fetch("https://dns.google.com/resolve?name="+x+".mineplex.com&type=a"))
Promise.all(poa).then(ress=>{
Promise.all(ress.filter(x=>x.ok||x.status===200).map(x=>x.json())).then(allips=>{
const ip=allips.filter(x=>x.Answer&&x.Answer[0].data).map(x=>x.Answer[0].data).map(x=>x).flat()
displayIP(ip)
(async function(){
for(let s of ip){
let results=[];
for(let i=1;i<n;i++){
results.push(await ping(s))
}
displayPing(s,results.reduce((a,c)=>a+=c)/n)
}
})()


})


})

function displayIP(x){console.log(x)}
function displayPing(x,y){console.log(x,y)}
