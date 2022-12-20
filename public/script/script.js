// const primulcarousel = document.querySelector(".carousel #primul");
const primulcarousel = document.getElementById("primul");
const aldoileacarousel = document.getElementById("aldoilea");
const firstImg = document.querySelector(".wrapper img");
const firstImgMachines = document.getElementById("imgMachine");
const bagsarrowIcons = document.querySelectorAll(".wrapper .bags");
const machinesarrowIcons = document.querySelectorAll(".wrapper .machines");

let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;
let firstImgWidth = firstImg.clientWidth + 64;  
let firstImgWidthMachines;
if(firstImgMachines){
    firstImgWidthMachines = firstImgMachines.clientWidth + 52;
}

bagsarrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    primulcarousel.scrollLeft +=
      icon.id == "left" ? -firstImgWidth : firstImgWidth;
  });
});

machinesarrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    aldoileacarousel.scrollLeft +=
      icon.id == "left" ? -firstImgWidthMachines : firstImgWidthMachines;
  });
});

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

let cookieModal = document.querySelector('.cookie-consent-modal');
let cancelCookieBtn = document.querySelector('.cbtn.cancel');
let acceptCookieBtn = document.querySelector('.cbtn.accept');

cancelCookieBtn.addEventListener('click', function() {
  cookieModal.classList.remove('active');
});
acceptCookieBtn.addEventListener('click', function() {
  cookieModal.classList.remove('active');
  localStorage.setItem('cookieAccepted', "yes");
});

setTimeout(() => {
  let cookieAccepted = localStorage.getItem('cookieAccepted');
  if(cookieAccepted != 'yes') {
    cookieModal.classList.add('active');
  }
}, 2000);