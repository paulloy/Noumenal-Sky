$("#navbarToggle").click(function () {
  // This will add classes that animates the navbarToggle icon
  $("#top-bar").toggleClass("top-bar");
  $("#middle-bar").toggleClass("middle-bar");
  $("#bottom-bar").toggleClass("bottom-bar");

  if ($("#navbar").attr("id") != $("navbar")) {
    $("#navbar").attr("id", "navbar-mobile");
  } else {
    $("#navbar-mobile").attr("id", "navbar");
  }
  $("nav").toggle();
  $("#navbar-mobile").slideToggle();

  $("#follow-us").toggle(
    function () {
      $("#follow-us").text("Follow Us");
    }
  );
});

/*if (("#navbarToggle").attr("style") == "display: none;") {        Use event listener
    $("#navbar").attr("style", "display: block;");
}*/
