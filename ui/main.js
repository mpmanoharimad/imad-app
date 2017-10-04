
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

submit.onclick = function () {

    var request = new XMLHttpRequest();
    var names=['name1', 'name2', 'name3', 'name4'];
    var myname=nameInput.value;

    request.onreadystatechange = function() {
      if (request.readyState  === XMLHttpRequest.DONE)
      {
          if ( request.status===200)
          {
            nameList="";
            for (var i=0;i<names.length;i++)
                nameList=nameList+'<li>'+names[i]+'@'+myname+'.com</li>';
            nameul.innerHTML=nameList;
          }
      }
    };
    
    request.open('GET', 'http://mpmanohar.imad.hasura-app.io/submit-name?name='+myname, true);
    request.send();
    
};


var lyriclist=document.getElementById('showlist');
var lyrictxt=document.getElementById('lyrictxt');

lyriclist.onchange = function () {
    var request = new XMLHttpRequest();
    var myfile=showlist.value+".txt";

    request.onreadystatechange = function() {
      if (request.readyState  === XMLHttpRequest.DONE)
      {
          if ( request.status===200)
          {
              var counter=request.responseText;
              lyrictxt.innerHTML=counter.toString();
          }
      }
    };
    
    request.open('GET', 'http://mpmanohar.imad.hasura-app.io/getlyric?myfile='+myfile, true);
    request.send();
    
};