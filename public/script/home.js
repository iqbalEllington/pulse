// ============================  property dropdown ============================
// ============================ dropdown function============================
// function openCloseDropdown(dropdown, dropdownBTN) {
//   dropdownBTN.forEach((property) => {
//     property.addEventListener("click", function () {
//       dropdownBTN.forEach((removeActive) => {
//         removeActive.classList.remove("active");
//       });
//       property.classList.add("active");
//       if (dropdown.classList.contains("opened")) {
//         dropdown.classList.remove("opened");
//       } else {
//         dropdown.classList.add("opened");
//       }
//     });
//   });
// }
// ============================ open/close|change property dropdown value ============================
// var propertyDropDown = document.querySelector(".property_content .dropdown");
// var propertyPropertyBtn = document.querySelectorAll(
//   ".property_content .dropdown .secondary_btn"
// );
// openCloseDropdown(propertyDropDown, propertyPropertyBtn);
// // ============================ open/close|change Handpicked Properties in Dubai Section dropdown value ============================
// var handpickedDropDown = document.querySelector(
//   ".handpicked_property .dropdown"
// );
// var handpickedPropertyBtn = document.querySelectorAll(
//   ".handpicked_property .dropdown .secondary_btn"
// );
// openCloseDropdown(handpickedDropDown, handpickedPropertyBtn);
// // ============================ open/close|change Latest Videos Section dropdown value ============================
// var LatestVideosDropDown = document.querySelector(".latest_videos .dropdown");
// var LatestVideosPropertyBtn = document.querySelectorAll(
//   ".latest_videos .dropdown .secondary_btn"
// );
// openCloseDropdown(LatestVideosDropDown, LatestVideosPropertyBtn);

// // ============================ open/close Search tab ============================
// var openSearchTabBtn = document.querySelector(
//   ".property_content .search input"
// );
// var searchTab = document.querySelector(".property_content .search .search_tab");
// var closeSearchTab = document.querySelector(
//   ".property_content .search .close_input"
// );
// // openSearchTabBtn.addEventListener("input", function () {
// //   searchTab.classList.add("opened_tab");
// //   closeSearchTab.style.display = "block";
// // });
// // closeSearchTab.addEventListener("click", function () {
// //   searchTab.classList.remove("opened_tab");
// //   closeSearchTab.style.display = "none";
// //   openSearchTabBtn.value = "";
// // });
var ReCaptchaCallbackV3 = function () {
    grecaptcha.ready(function () {
        grecaptcha.execute("6LdUfochAAAAAMu4bM4w1a-U0PoGS5WazhaqEn65").then(function (token) {
            document.getElementById('recaptcha').value = token;
        });
    });
  };