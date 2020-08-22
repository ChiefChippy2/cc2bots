//window.addEventListener("DOMContentLoaded",start)

function start(n,excludes){
  n=n>10||n<1?3:(n||3);
  excludes=excludes||[];
let lon=["us","clans"]
let poa=lon.filter(x=>!excludes.includes(x)).map(y=>fetch("https://dns.google.com/resolve?name="+y+".mineplex.com&type=a"))
Promise.all(poa).then(ress=>{
Promise.all(ress.filter(x=>x.ok||x.status===200).map(x=>x.json())).then(allips=>{
const ip=allips.filter(x=>x.Answer&&x.Answer[0].data).map(x=>x.Answer.map(y=>y.data)).map(x=>x).flat()
displayIP(ip);
window.count=1; //thead is 0
(async function(){
for(let s of ip){
let results=[];
for(let i=0;i<n;i++){
let pin=await ping(s)
results.push(pin)
}
if(results.every(x=>x===999)) displayPing(s,"N/A");
else displayPing(s,String(Math.floor(results.reduce((a,c)=>a+c))/n)+"ms");
}
})()


})


})
}

function displayIP(x){
let htmls=x.map(ip=>`<tr><td>${ip}</td><td>...</td></tr>`)
  document.querySelector("tbody").innerHTML=htmls.join("")
}

function displayPing(x,y){
  document.querySelectorAll("tr")[window.count].querySelectorAll("td")[1].innerHTML=y;
window.count++
}
function ping(IP){
  //ofc their mc servers dont have https servers, thus erroring
  let a = new Date()
  return new Promise(r=>{
setTimeout(()=>r(999),999)
  var started = new Date().getTime();

  var http = new XMLHttpRequest();

  http.open("GET", "https://" + IP + ":25565", /*async*/true);
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      var ended = new Date().getTime();
      var milliseconds = ended - started;
      r(milliseconds/4);
    }
  };
  try {
    http.send(null);
  } catch(exception) {
    // this is expected
  }


  })
}
