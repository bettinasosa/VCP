$(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $("header").addClass("changeheader");
      $("header").removeClass("header");
    }
    if ($(this).scrollTop() < 50) {
      $("header").removeClass("changeheader");
      $("header").addClass("header");
    }
  });
});

var d = new Date();
window.onload = function what() {
  document.getElementById("demo").innerHTML = d.getDate();
};
