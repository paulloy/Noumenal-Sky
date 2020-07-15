$("#navbarToggle").click(function(){ // This will add classes that animates the navbarToggle icon
    $("#top-bar").toggleClass("top-bar");
    $("#middle-bar").toggleClass("middle-bar");
    $("#bottom-bar").toggleClass("bottom-bar");
    $("#navbar").toggleClass("mobile-nav");
    $("nav").toggle();
    $("#navbar").toggleAttr("id")
});

