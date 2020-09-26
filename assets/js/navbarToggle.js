
/*When the navbar is hidden, this function will be called when a user clicks #navbarToggle.*/
function navbarIsOpen() { 
  $("html, body").css("position", "absolute");
  $("#navbar-cover").fadeIn(200); //A dark background is added behind the navbar to cover body.
  /*Toggle between navbar styles.*/
  $("#navbar").toggleClass("navbar-mobile"); 
  $("#navbar").toggleClass("navbar-browser"); 
  $("body").prepend($("nav"));
  $("html").children().animate({ left: "250px" }, 200);
/*Classes are added and removed to toggle an animation on #navbarToggle, so it toggles between a burger button
and a cross.*/
  $("#top-bar").removeClass("top-bar-close"); 
  $("#middle-bar").removeClass("middle-bar-close");
  $("#bottom-bar").removeClass("bottom-bar-close");
  $("#top-bar").addClass("top-bar-open"); 
  $("#middle-bar").addClass("middle-bar-open"); 
  $("#bottom-bar").addClass("bottom-bar-open"); 
/*#navbar is animated to move from the left onto the screen when opening.*/
  $("#navbar").animate({ left: "0px" }, 200); 
}
/*When the navbar is displayed, this function will be called when a user clicks #navbarToggle.*/
function navbarIsClosed() {
  $("#navbar-cover").fadeOut(200); //Fade out dark background.
/*Animate html, body, and #navbar*/
  $("html, body").children().animate({ left: "0" }, 200); 
  $("#navbar").animate({ left: "-250px" }, 200);
  /*After the animation is complete, the nav will be appended back to header.
  The class for the navbar will be toggled after the animation completes.*/
  setTimeout(function () {
    $("header").append($("nav")); 
  }, 200);
  setTimeout(function () {
    $("#navbar").toggleClass("navbar-browser"); 
    $("#navbar").toggleClass("navbar-mobile"); 
  }, 200); 
/*Classes are added and removed to toggle an animation on #navbarToggle, so it toggles between a burger button
and a cross.*/
  $("#top-bar").removeClass("top-bar-open");
  $("#middle-bar").removeClass("middle-bar-open");
  $("#bottom-bar").removeClass("bottom-bar-open");
  $("#top-bar").addClass("top-bar-close");
  $("#middle-bar").addClass("middle-bar-close"); 
  $("#bottom-bar").addClass("bottom-bar-close"); 
  //clear position: absolute.
  setTimeout(function () {
    $("html, body").removeAttr("style");
  }, 200);
}

var clickCount = 0; //1 is added when a user clicks #navbarToggle or #navbar-cover
$("#navbarToggle, #navbar-cover").click(function () { 
  clickCount++; 
  toggleNavbar(clickCount); 
});

//This function will run either navbarIsOpen(), or navbarIsClosed()
function toggleNavbar(clickCount) {
    //When #navbarToggle is clicked, 1 will be added to clickCount.
  oddEven = clickCount % 2;   
    //When oddEven = 1, navbarIsOpen will be called and nav displayed.
  if (oddEven === 1) {
    navbarIsOpen(); 
    $("nav").show();
  } else if (oddEven === 0) {
    //When oddEven = 0, navbarIsClosed will be called and nav hidden, after animation is complete.
    navbarIsClosed();
    setTimeout(function () { 
      $("nav").hide(); 
    }, 200);
  }
}

/*When the body is resized a function is called which will reset
#navbarToggle and the nav to their original conditions when the page was first loaded.
i.e. nav will be hidden, and the body will return to a static position.*/
document.getElementsByTagName("body")[0].onresize = function () {
  $("html, body").children().css("left", "0px");
  $("header").append($("nav"));
  $("#navbar-cover").fadeOut(200);
  $("#top-bar").removeClass("top-bar-open");
  $("#middle-bar").removeClass("middle-bar-open");
  $("#bottom-bar").removeClass("bottom-bar-open");
  $("#top-bar").addClass("top-bar-close"); 
  $("#middle-bar").addClass("middle-bar-close"); 
  $("#bottom-bar").addClass("bottom-bar-close"); 
  clickCount = 0; //clickCount will be returned to 0
  //check if window.innerWidth is larger or smaller than 750px
  if (window.innerWidth > 750) {
    $("#navbar").attr("class", "navbar-browser");
    $("#navbar").removeAttr("style"); 
  } else if (window.innerWidth <= 750) {
    $("#navbar").attr("class", "navbar-browser");
    $("nav").css("display", "none"); 
    $("#top-bar").removeClass("top-bar");
    $("#middle-bar").removeClass("middle-bar"); 
    $("#bottom-bar").removeClass("bottom-bar");
    $("#navbar").removeAttr("style"); 
  }
};


