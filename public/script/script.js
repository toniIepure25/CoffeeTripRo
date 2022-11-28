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

// const autoSlide = () => {
//   if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
//     return;

//   positionDiff = Math.abs(positionDiff);
//   let firstImgWidth = firstImg.clientWidth + 18;
//   let valDifference = firstImgWidth - positionDiff;

//   if (carousel.scrollLeft > prevScrollLeft) {
//     return (carousel.scrollLeft +=
//       positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
//   }
//   carousel.scrollLeft -=
//     positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
// };

// const dragStart = (e) => {
//   isDragStart = true;
//   prevPageX = e.pageX || e.touches[0].pageX;
//   prevScrollLeft = carousel.scrollLeft;
// };

// const dragging = (e) => {
//   if (!isDragStart) return;
//   e.preventDefault();
//   carousel.classList.add("dragging");
//   positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
//   carousel.scrollLeft = prevScrollLeft - positionDiff;
// };

// const dragStop = () => {
//   isDragStart = false;
//   carousel.classList.remove("dragging");
//   autoSlide();
// };
// carousel.addEventListener("mousedown", dragStart);
// carousel.addEventListener("touchstart", dragStart);

// carousel.addEventListener("mousemove", dragging);
// carousel.addEventListener("touchmove", dragging);

// carousel.addEventListener("mouseup", dragStop);
// carousel.addEventListener("mouseleave", dragStop);
// carousel.addEventListener("touchend", dragStop);
