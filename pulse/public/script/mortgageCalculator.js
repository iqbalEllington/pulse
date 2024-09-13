// function rangeSlider(id) {
//   const setValue = () => {
//     const newValue = Number(((id.value - id.min) * 100) / (id.max - id.min)),
//       newPosition = 16 - newValue * 0.32;
//     document.documentElement.style.setProperty(
//       `--${id.id}-progress`,
//       `calc(${newValue}% + (${newPosition}px))`
//     );
//   };
//   console.log(id.id);
//   document.addEventListener("DOMContentLoaded", setValue);
//   id.addEventListener("input", setValue);
// }

// // ===================================== Property Price =====================================
// const propertyPrice = document.getElementById("propertyPrice");
// rangeSlider(propertyPrice);
// // ===================================== Down Payment =====================================
// const downPayment = document.getElementById("downPayment");
// rangeSlider(downPayment);
