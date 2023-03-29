const bk = document.getElementById('beck');
const addvote = document.getElementById('addvote');
const thumbnails = document.getElementById('thumb');
const cancel = document.getElementById('cancel');
const create = document.getElementById('create');

bk.addEventListener("click",function(event){
  event.preventDefault();
  window.location.replace("../index.html");
})

addvote.addEventListener("click",function (event) {
  var rform = document.querySelector('.form-box');
  var blur = document.querySelector('.bgform');
  rform.style.display = 'inline-flex'
  blur.style.display = 'flex';
})

function canceller(event) {
  var rform = document.querySelector('.form-box');
  var blur = document.querySelector('.bgform');
  rform.style.display = 'none';
  blur.style.display = 'none';
}

create.addEventListener('click',function (event) {
  var election = document.getElementById('eleccat').value;
  var newBox = document.createElement('div');
  newBox.setAttribute('class','box');

  var newInner = document.createElement('div');
  newInner.setAttribute('class','inner');

  var newH = document.createElement('h2');
  newH.innerHTML= election;

  var newButton = document.createElement('a');
  newButton.setAttribute('class','button fit')
  newButton.innerHTML='View';

  canceller(event);

  newInner.appendChild(newH);
  newInner.appendChild(newButton);
  newBox.appendChild(newInner);
  thumbnails.appendChild(newBox);
})