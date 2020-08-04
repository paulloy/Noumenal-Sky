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

/*var xhr = new XMLHttpRequest();

xhr.onload = function() {
    if(xhr.status === 200) {
        responseObject = JSON.parse(xhr.responseText);
        console.log(this.responseText);
    }
    else {
        console.log("what is wrong");
    }
}

xhr.open("GET", "/json/space-catalog.json", true);
xhr.send(null);*/