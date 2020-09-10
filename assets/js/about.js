$(".title").click(function () {
  $(this).next().slideToggle();
});

$("#contact").click(function() {
    $(this).hide();
    $("#q-and-a").hide();
    $("#qA").show();
    $("#form").show();
});
$("#qA").click(function() {
    $(this).hide();
    $("#form").hide();
    $("#q-and-a").show();
    $("#contact").show();
});

document.getElementsByTagName("body")[0].onresize = function () {
    if (window.innerWidth > 900) {
        $("#q-and-a").removeAttr("style");
        $("#form").removeAttr("style");
        $("#qA").removeAttr("style");
        $("#contact").removeAttr("style");
    }
}