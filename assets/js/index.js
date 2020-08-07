$("#category-list p").click(function(){
    $("#category-list ul").toggle();
    $("#object-list ul").hide();
    $("#property-list ul").hide();
});
$("#object-list p").click(function(){
    $("#object-list ul").toggle();
    $("#category-list ul").hide();
    $("#property-list ul").hide();
});
$("#property-list p").click(function(){
    $("#property-list ul").toggle();
    $("#object-list ul").hide();
    $("#category-list ul").hide();
});

$("#property-values table tbody tr td").click(function(){
    $("#explanation-container").show();
});
$("#explanation-container").click(function(){
    $(this).hide();
});


var xhr = new XMLHttpRequest(); //Make a new XML Http Request

xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) { //if status is 200 then get json data
        document.getElementById("category-list").childNodes[3] = this.responseText;
        console.log(JSON.parse(this.responseText));
    }
};

xhr.open("GET", "assets/js/json/space-catalog.json");
xhr.send();