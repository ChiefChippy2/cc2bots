window.addEventListener("DOMContentLoaded",start)

function start(n,excludes){
let lon=["us","clans"]
let poa=lon.filter(x=>!excludes.includes(x)).map(y=>fetch("https://dns.google.com/resolve?name="+y+".mineplex.com&type=a"))
Promise.all(poa).then(ress=>{
Promise.all(ress.filter(x=>x.ok||x.status===200).map(x=>x.json())).then(allips=>{
const ip=allips.filter(x=>x.Answer&&x.Answer[0].data).map(x=>x.Answer.map(y=>y.data)).map(x=>x).flat()
displayIP(ip);
(async function(){
for(let s of ip){
let results=[];
for(let i=0;i<n;i++){
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
  function ping(host, port, pong) {

  var started = new Date().getTime();

  var http = new XMLHttpRequest();

  http.open("GET", "http://" + host + ":" + port, /*async*/true);
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      var ended = new Date().getTime();
      var milliseconds = ended - started;
      r(milliseconds);
    }
  };
  try {
    http.send(null);
  } catch(exception) {
    // this is expected
  }

}
  })
}
