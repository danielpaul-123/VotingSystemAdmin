const firebaseConfig = {
  apiKey: "AIzaSyCjkXPnUijS3uYWvuPheSjJeFvoiZ7nrQ0",
  authDomain: "election-online-prj.firebaseapp.com",
  databaseURL: "https://election-online-prj-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "election-online-prj",
  storageBucket: "election-online-prj.appspot.com",
  messagingSenderId: "281761267368",
  appId: "1:281761267368:web:fb0663844a76d66df40c9d"
};

firebase.initializeApp(firebaseConfig);

var id = 1;

const skipp = document.getElementById('skp');
const headers = document.querySelectorAll('th');
const err = document.getElementById('err');
const submiter = document.getElementById('submit');

let currentHeader = 0;

highligter();
var a=0;
//hides the skip button when pressed
skipp.onclick = function()
{
  a++;
  if(a>2)
  {
    id++;
    skipp.style.display='none';
  }
  else
  {
    id++;
  }
  err.style.display = "none";
  highligter();
  form.reset();
};

//formSumbitHandler
submiter.addEventListener("click",async function(event){
  event.preventDefault();

  //Read from firebase code, compare keyword with argon2id hash to login
  // argon2.hash({
  //   pass:"dibin",
  //   salt:random(16),
  //   time:2,
  //   mem:16384,
  //   hashLen:32,
  //   parallelism:1,
  //   type:argon2.ArgonType.Argon2id,
  //   }).then(h => console.log("Username: ",h.encoded))
  //   .catch(e => console.error(e.message, e.code));
          
    let adminid = "Admin"+id;
    const firestore = firebase.firestore();
    var docref = firestore.collection("Admin_User").doc(adminid);
    docref.get().then((doc) => {
      if(doc.exists)
      {
        let uname = doc.data().Username;
        let pswd = doc.data().Password;
        var name = document.getElementById("unm").value;
        var pass = document.getElementById("pwd").value;
        
        argon2.verify({pass:name, encoded:uname})
        .then(() =>{

          argon2.verify({pass:pass, encoded:pswd})
          .then(() => {

            id++;
            highligter();

          }).catch(e => err.style.display = "block");

        }).catch(e => err.style.display = "block");
      }
      else
      {
        console.log("No Document!");
      }
    }).catch((error) => {
      console.log("Error!");
      console.log(error);
    });
        
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
  currentHeader++;
  document.getElementById("unm").value = "";
  document.getElementById("pwd").value = "";
}