

function navbarIsOpen() { 
  $("html, body").css("position", "fixed"); //Display the body as fixed.
  $("#navbar-cover").fadeIn(); // Fade in the navbar-cover
  $("#navbar").toggleClass("navbar-mobile"); //Default display of navbar-mobile is none;
  $("#navbar").toggleClass("navbar-browser"); //Default display of navbar-browser is block;
// Toggle between the two navbar css styles.
  $("body").prepend($("nav")); //prepend the nav to the body when it is being opened.
  $("html").children().animate({ left: "250px" }, 500); //Animate the body so that it slides to the right of the screen.


  $("#top-bar").removeClass("top-bar-close"); //The following classes are responsible for the navbar toggle icon animation
  $("#middle-bar").removeClass("middle-bar-close");
  $("#bottom-bar").removeClass("bottom-bar-close");
  $("#top-bar").addClass("top-bar-open"); //This class will rotate the top bar
  $("#middle-bar").addClass("middle-bar-open"); //This class will display the middle bar as none
  $("#bottom-bar").addClass("bottom-bar-open"); //This class will rotate the bottom bar

  $("#navbar").animate({ left: "0px" }, 500); // animate the navbar so it slides to the right, giving the look of pushing the body off the screen.
}
function navbarIsClosed() {
  $("#navbar-cover").fadeOut(); //hide the navbar cover when the navbar is being closed.

  $("html, body").children().animate({ left: "0" }, 500); // move the body back to the left.
  $("#navbar").animate({ left: "-250px" }, 500); // move the navbar to the left.
  setTimeout(function () {
    $("header").append($("nav")); //append the nav back to the header.
  }, 500);

  setTimeout(function () {
    $("#navbar").toggleClass("navbar-browser"); //Default display of navbar-browser is block;
    $("#navbar").toggleClass("navbar-mobile"); //Default display of navbar-mobile is none;
  }, 500); // Gives time for the navbar to close before toggling the classes.

 

  $("#top-bar").removeClass("top-bar-open");
  $("#middle-bar").removeClass("middle-bar-open");
  $("#bottom-bar").removeClass("bottom-bar-open");
  $("#top-bar").addClass("top-bar-close"); //This class will rotate the top bar
  $("#middle-bar").addClass("middle-bar-close"); //This class will display the middle bar as none
  $("#bottom-bar").addClass("bottom-bar-close"); //This class will rotate the bottom bar
  setTimeout(function () {
    $("html, body").css("position", "static");
  }, 500);
}
function toggleButtonAnimation(clickCount) {
    /* When the navbar is opened the clickCount will be odd, so oddEven will be 1. When closed, clickCount will be even
    and so oddEven will be 0. */
  oddEven = clickCount % 2; 
  if (oddEven === 1) {
    navbarIsOpen(); // When navbar is being opened, run the navbarIsOpen function on line 3, and show the nav element.
    $("nav").show();
  } else if (oddEven === 0) {
    navbarIsClosed();
    setTimeout(function () { // When navbar is being closed, run the navbarIsClosed function on line 24.
      $("nav").hide(); // After 500ms hide the nav. This gives the nav time to run its closing animation before hiding.
    }, 500);
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
  clickCount = 0; // on resize set clickCount to 0;
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

var clickCount = 0; // This counter will count how many times the user has clicked #navbarToggle or #navbar-cover
$("#navbarToggle, #navbar-cover").click(function () { // Run this function when #navbarToggle or #navbar-cover are clicked
  clickCount++; // On each click add 1 to clickCount
  toggleButtonAnimation(clickCount); // Run function on line 52
});
