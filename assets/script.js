const skipp = document.getElementById('skp');
const headers = document.querySelectorAll('th');
const err = document.getElementById('err');
const submiter = document.getElementById('submit');
let currentHeader = 0;

highligter();

//hides the skip button when pressed
skipp.onclick = function(){
  skipp.style.display='none';
  err.style.display = "none";
  highligter();
  form.reset();
};

//formSumbitHandler
submiter.addEventListener("click",function(event){
  event.preventDefault();
  
  //for test purposes checks pass and uname were hello or not ,later replace with proper firebasecode
  var name = document.getElementById("unm").value;
  var pass = document.getElementById("pass").value;
  if(name != "hello" && pass != "hello")
  err.style.display = "block";//if login is unsuccesfull throws a error message
  
  //else clears the form and highlights next admins name
  else{
    highligter();
  }
})

//function to highlight each admin's name on a succesfull login and a skip
function highligter(){

  err.style.display = "none";
  if(currentHeader > 0){
    headers[currentHeader -1].classList.remove('foc');
  }

  if(currentHeader >= 7){
    currentHeader = 0
    window.location.replace("./pages/main.html");
  }
  
  headers[currentHeader].classList.add('foc');
  /* var x  = document.getElementsById('jaba');
  var d = x.innerHTML;
  console.log(x);
  console.log(d);
  this.window.alert("hi") */
  currentHeader++;
  document.getElementById("unm").value = "";
  document.getElementById("pass").value = "";
}