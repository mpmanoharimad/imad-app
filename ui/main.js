
var button = document.getElementById('counter');
var span= document.getElementById('count');
var counter=0;

button.onclick = function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState  === XMLHttpRequest.DONE)
      {
          if ( request.status===200)
          {
              var counter=request.responseText;
              span.innerHTML = counter.toString();
          }
      }
    };
    
    request.open('GET', 'http://mpmanohar.imad.hasura-app.io/counter', true);
    request.send();
};


var nameInput=document.getElementById('name');
var nameul=document.getElementById('nameul');
var submit=document.getElementById('submit_btn');

var myname=nameInput.value;

submit.onclick = function () {
    nameList='<li>name1</li><li>name2</li><li>name3</li><li>name4</li>';
    nameul.innerHTML=nameList;
};