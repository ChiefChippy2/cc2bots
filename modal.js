/*w3schools shit yay*/
document.onload=function(){
var modal = document.getElementById("myModal");


// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

/* When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}*/

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
document.querySelector("#invbut").onclick=()=>{
modal.style.display="none";
document.cookie="disc=innit;max-age:"+60*60*24*365.25
//very important 1/4 days
}

if(document.cookie.includes("disc=innit")||document.cookie.includes("disc=innit")) modal.style.display="none";

}
