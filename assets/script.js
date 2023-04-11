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
const progress = document.querySelector('progress-bar');

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
    console.log("Skipped");
  }
  else
  {
    id++;
    console.log("Skipped");
  }
  highligter();
  form.reset();
};

//formSumbitHandler
submiter.addEventListener("click",async function(event){
  event.preventDefault();
  document.getElementById("progress").style.display = "block";

  
          
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
            
            document.getElementById("progress").style.display = "none";
            highligter();
            console.log("Success");

          }).catch(e => {
            err.style.display = "block";
            document.getElementById("progress").style.display = "none";
          });

        }).catch(e => {
          err.style.display = "block";
          document.getElementById("progress").style.display = "none";
        });
      }
      else
      {
        console.log("No Document!");
        document.getElementById("progress").style.display = "none";
      }
    }).catch((error) => {
      console.log("Error!");
      console.log(error);
      document.getElementById("progress").style.display = "none";
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

function setname()
{
  var id = 1
  
  const firestore = firebase.firestore();
  var collectionref = firestore.collection("Admin_User");

  collectionref.get().then((querySnapshot) => {
    // Loop through the documents
    querySnapshot.forEach((doc) => {
      // doc.data() is the document contents
      let thid = "admin"+id;
      const name = doc.data().Name;
      var thElement = document.getElementById(thid);
      thElement.innerHTML = name;
      id++;
    });
  });
  console.log("Success!");
}
