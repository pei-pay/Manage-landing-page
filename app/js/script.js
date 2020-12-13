//Hamburger Menu
const body = document.querySelector('body');
const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');


btnHamburger.addEventListener('click', function(){//open hamburger menu
    body.classList.add('noscroll');
    header.classList.add('open');
    
    fadeElems.forEach(function(element) {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });
  
});

overlay.addEventListener('click', function(){ //close hamburger menu
    body.classList.remove('noscroll');
    header.classList.remove('open');
    
    fadeElems.forEach(function(element){
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
    });

});


//Slide show
const controls = document.querySelector('.testimonial__controls');
const container = document.querySelector('.testimonial__container');
const allBox = container.children;
const containerWidth = container.offsetWidth;
const margin = 30;
var items = 0;
var totalItems = 0;
var jumpSlideWidth = 0;
// items setup per slide

responsive = [
  {breakPoint:{width: 0, item: 1}}, //if width greater than 0 (1 item show)
  {breakPoint:{width: 640, item: 2}}, //if width greater than 640 (2 item show)
  {breakPoint:{width: 1024, item: 3}} //if width greater than 1024 (3 item show)
]

function load() {
  for(let i = 0; i < responsive.length; i++){
    if(window.innerWidth > responsive[i].breakPoint.width){
      items = responsive[i].breakPoint.item
    }
  }
  start();
}

function start() {
  var totalItemsWidth = 0;
  for(let i = 0; i < allBox.length; i++){
    //width and margin setup of item
    allBox[i].style.width = (containerWidth / items) - margin + "px";
    allBox[i].style.margin = (margin / 2) + "px";
    totalItemsWidth += containerWidth / items;
    totalItems++;
  }
  //testimonial__container width set up
  container.style.width = totalItemsWidth + "px";

  //slides controls set up
  const allSlides = Math.ceil(totalItems/items);
  const ul = document.createElement("ul");
    for(let i=1; i<=allSlides; i++){
      const li = document.createElement("li");
        li.id=i;
        // li.innerHTML=i;
        li.setAttribute("onclick", "controlSlides(this)");
        ul.appendChild(li);
        if(i==1) {
          li.className="active";
        }
    }
    controls.appendChild(ul);
}

// when click on numbers slide to next slide 
function controlSlides(ele) {
  //select controls ul element
  const ul = controls.children;

  //select ul children 'li' elements
  const li = ul[0].children;

  var active;

  for(let i=0; i<li.length; i++){
    if(li[i].className=="active"){
      //find who is now active
      active=i;
      //remove active class from all 'li' elements
      li[i].className="";
    }
  }
  //add active class to current slide
  ele.className="active";

  var numb=(ele.id-1)-active;
    jumpSlideWidth=jumpSlideWidth+(containerWidth*numb);
    container.style.marginLeft=-jumpSlideWidth + "px";
}

window.onload=load();



//emial validation
const form = document.querySelector('[data-js=form]');
const emailInput = document.querySelector('[data-js=form-email-input]');
  
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const regexForEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (!emailInput.value || !regexForEmail.test(emailInput.value)) {
    form.setAttribute('data-form-not-valid', 'true');
    setTimeout(
      () => form.setAttribute('data-form-not-valid', 'false'),
      3 * 1000
    );
    return;
  }
  alert(`Email: ${emailInput.value}`);
  emailInput.value = '';
  emailInput.blur();

});