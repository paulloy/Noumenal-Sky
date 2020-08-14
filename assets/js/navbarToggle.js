// Functional but needs fine tuning so it can be really good

function navbarToggle() {
  //When called this function will toggle between two css classes for the navbar
  $("#navbar").toggleClass("navbar-browser"); //Default display of navbar-browser is block;
  $("#navbar").toggleClass("navbar-mobile"); //Default display of navbar-mobile is none;
}
function navbarIsOpen() {
  $("#top-bar").removeClass("top-bar-close");
  $("#middle-bar").removeClass("middle-bar-close");
  $("#bottom-bar").removeClass("bottom-bar-close");
  $("#top-bar").addClass("top-bar-open"); //This class will rotate the top bar
  $("#middle-bar").addClass("middle-bar-open"); //This class will display the middle bar as none
  $("#bottom-bar").addClass("bottom-bar-open"); //This class will rotate the bottom bar
}
function navbarIsClosed() {
  $("#top-bar").removeClass("top-bar-open");
  $("#middle-bar").removeClass("middle-bar-open");
  $("#bottom-bar").removeClass("bottom-bar-open");
  $("#top-bar").addClass("top-bar-close"); //This class will rotate the top bar
  $("#middle-bar").addClass("middle-bar-close"); //This class will display the middle bar as none
  $("#bottom-bar").addClass("bottom-bar-close"); //This class will rotate the bottom bar
}
function toggleButtonAnimation(clickCount) {
  oddEven = clickCount % 2;
  if (oddEven === 1) {
    navbarIsOpen();
  } else if (oddEven === 0) {
    navbarIsClosed();
  }
  //When called this function will toggle the classes that animates the navbar toggle icon
}

// Figure out a method better than nested if else statements

document.getElementsByTagName("body")[0].onresize = function () {
  navbarIsClosed();
  clickCount = 0;
  //This event listener will run when the screen size changes. Such as when a user rotates their mobile or tablet
  var windowWidth = window.innerWidth; //Gets value of window width in px
  if (windowWidth > 750) {
    //If window width is larger than 750px, the nested if statement will run

    if (
      document.getElementById("navbar").hasAttribute("class", "navbar-mobile")
    ) {
      $("#navbar").attr("class", "navbar-browser");
    } //The switch from navbar-mobile to navbar-browser is incase a user switches from a screen larger than 750px to less than.

    //$(".navbar-browser").css("display", "flex"); (probably not needed now)
  } else if (windowWidth <= 750) {
    if (
      document.getElementById("navbar").hasAttribute("class", "navbar-mobile")
    ) {
      $("#navbar").attr("class", "navbar-browser"); //change class
      $("nav").css("display", "none"); //display nav to none
      $("#top-bar").removeClass("top-bar");
      $("#middle-bar").removeClass("middle-bar"); //remove classes so a cross doesn't appear when the navbar is closed.
      $("#bottom-bar").removeClass("bottom-bar");
      $("$#navbar").removeAttr("style"); //stops displaying wrong css
    }
  }
};

var clickCount = 0;
$("#navbarToggle").click(function () {
  clickCount++;
  toggleButtonAnimation(clickCount);
  navbarToggle();
  $("nav").toggle();
});
