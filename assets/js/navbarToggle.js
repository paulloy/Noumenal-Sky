// Functional but needs fine tuning so it can be really good

function navbarIsOpen() {
  $("html, body").css("position", "fixed");
  $("#navbar-cover").fadeIn();
  $("#navbar").toggleClass("navbar-mobile"); //Default display of navbar-mobile is none;
  $("#navbar").toggleClass("navbar-browser"); //Default display of navbar-browser is block;

  $("body").prepend($("nav"));
  $("html").children().animate({ left: "250px" }, 500);

  $("#navbar").append($("footer"));
  $("footer").show();

  $("#top-bar").removeClass("top-bar-close");
  $("#middle-bar").removeClass("middle-bar-close");
  $("#bottom-bar").removeClass("bottom-bar-close");
  $("#top-bar").addClass("top-bar-open"); //This class will rotate the top bar
  $("#middle-bar").addClass("middle-bar-open"); //This class will display the middle bar as none
  $("#bottom-bar").addClass("bottom-bar-open"); //This class will rotate the bottom bar

  $("#navbar").animate({ left: "0px" }, 500);
}
function navbarIsClosed() {
  $("#navbar-cover").fadeOut();
  setTimeout(function () {
    $("#navbar").toggleClass("navbar-browser"); //Default display of navbar-browser is block;
    $("#navbar").toggleClass("navbar-mobile"); //Default display of navbar-mobile is none;
  }, 525);

  $("html, body").children().animate({ left: "0" }, 500);
  $("#navbar").animate({ left: "-250px" }, 500, function () {
    $("header").append($("nav"));
  });

  setTimeout(function () {
    $("body").append($("footer"));
    $("footer").hide();
  }, 525);

  $("#top-bar").removeClass("top-bar-open");
  $("#middle-bar").removeClass("middle-bar-open");
  $("#bottom-bar").removeClass("bottom-bar-open");
  $("#top-bar").addClass("top-bar-close"); //This class will rotate the top bar
  $("#middle-bar").addClass("middle-bar-close"); //This class will display the middle bar as none
  $("#bottom-bar").addClass("bottom-bar-close"); //This class will rotate the bottom bar
  setTimeout(function () {
    $("html, body").css("position", "static");
  }, 525);
}
function toggleButtonAnimation(clickCount) {
  oddEven = clickCount % 2;
  if (oddEven === 1) {
    navbarIsOpen();
    $("nav").show();
  } else if (oddEven === 0) {
    navbarIsClosed();
    setTimeout(function () {
      $("nav").hide();
    }, 525);
  }
  //When called this function will toggle the classes that animates the navbar toggle icon
}

// Figure out a method better than nested if else statements

document.getElementsByTagName("body")[0].onresize = function () {
  $("html, body").children().css("left", "0px");
  $("header").append($("nav"));
  $("#navbar-cover").fadeOut();
  $("#top-bar").removeClass("top-bar-open");
  $("#middle-bar").removeClass("middle-bar-open");
  $("#bottom-bar").removeClass("bottom-bar-open");
  $("#top-bar").addClass("top-bar-close"); //This class will rotate the top bar
  $("#middle-bar").addClass("middle-bar-close"); //This class will display the middle bar as none
  $("#bottom-bar").addClass("bottom-bar-close"); //This class will rotate the bottom bar
  clickCount = 0;
  //This event listener will run when the screen size changes. Such as when a user rotates their mobile or tablet
  var windowWidth = window.innerWidth; //Gets value of window width in px
  if (windowWidth > 750) {
    //If window width is larger than 750px, the nested if statement will run
    $("#navbar").attr("class", "navbar-browser");
    $("#navbar").removeAttr("style"); //stops displaying wrong css
    //The switch from navbar-mobile to navbar-browser is incase a user switches from a screen larger than 750px to less than.

    //$(".navbar-browser").css("display", "flex"); (probably not needed now)
  } else if (windowWidth <= 750) {
    $("#navbar").attr("class", "navbar-browser"); //change class
    $("nav").css("display", "none"); //display nav to none
    $("#top-bar").removeClass("top-bar");
    $("#middle-bar").removeClass("middle-bar"); //remove classes so a cross doesn't appear when the navbar is closed.
    $("#bottom-bar").removeClass("bottom-bar");
    $("#navbar").removeAttr("style"); //stops displaying wrong css
  }
};

var clickCount = 0;
$("#navbarToggle, #navbar-cover").click(function () {
  clickCount++;
  toggleButtonAnimation(clickCount);
});
