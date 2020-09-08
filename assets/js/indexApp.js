var url = "assets/js/json/";
var mainMenu =
  '<li id="planets">Planets</li><li id="dwarf">Dwarf Planets</li><li id="moons">Moons</li><li id="other">Other</li>';
var categoryList = true;

$("#menu-title i").click(function () {
  $("#category-list ul").empty();
  $("#menu-title span").hide();
  $("#category-list ul").append(mainMenu);
  categoryList = true;
});

var headerHeight = $("header").height();
var topContainerHeight = $("#top-container").height();
var sum = headerHeight + topContainerHeight + 8 + 8 + 16 + 16;
var remainingHeight = screen.availHeight - sum;
$("#property-values").css("height", remainingHeight);

$("#image-container").click(function () {
  $("#image-information").prepend($("#image-container"));
  $("#expand").hide();

  $("#close").show();
  $("#image-information").show();
});
$("#image-information").click(function () {
  $("#top-container").prepend($("#image-container"));
  $("#image-information").hide();
  $("#expand").show();
  $("#close").hide();
});

function loadObjectList(objectUrl, cat) {
  $.getJSON(url + objectUrl + ".json").done(function (data) {
    for (var i = 0; i < data[cat].length; i++) {
      var newListItem = "<li id=" + i + ">" + data[cat][i].name + "</li>";
      categoryList = false;
      $("#category-list ul").append(newListItem);
      var objectKey;
      $("#" + i).click(function () {
        //when list item is selected the following click function will get id attribute and call function
        var getId = $(this).attr("id");
        setObjectInfo(getId, catId, data);
        //get id of current list item
        objectKey = data[cat][getId].name;
        LoadPropertyList(objectKey, cat);
        
        
      });
    }
  });
}
function LoadPropertyList(objectKey, cat) {
  var objectKeyToLC = objectKey.toLowerCase();
  if (objectKeyToLC === "tesla roadster") {
    objectKeyToLC = "teslaRoadster";
  } 
  $.getJSON("assets/js/json/objects/" + cat + "/" + objectKeyToLC + ".json")
    .done(function (data) {
      for (objectKeyToLC in data) {
        console.log(objectKeyToLC);
      }
      $("#property-values").append("<ul></ul>");
      for (var propertyKey in data[objectKeyToLC]) {
        var newListItem = "<li>" + propertyKey + "</li>";
        $("#property-values ul").prepend(newListItem);
        $("#property-values").show();
      }

      $("#property-values ul li").click(function () {
        propertyKey = $(this).text();
        $("#property-values").empty();
        var heading =
          "<table><tbody><tr><th>Property</th><th>Value</th><th>Unit</th></tr></tbody></table>";
    //    $("#property-values").append(
       //   '<span id="return"><i class="fas fa-chevron-left"></i><p>RETURN</p></span>'
     //   );
        

        if (propertyKey === "about") {
          var newArticle = "<article></article>";
          $("#property-values").append(newArticle);
          for (key in data[objectKeyToLC][propertyKey]) {
            var newPoint = "<h2>"+key+"</h2><p>"+data[objectKeyToLC][propertyKey][key]+"</p>"
            $("#property-values article").append(newPoint);
          }
        } else {
          $("#property-values").append(heading);
          for (key in data[objectKeyToLC][propertyKey]) {
            var newRow =
              "<tr><td>" +
              key +
              "</td><td>" +
              data[objectKeyToLC][propertyKey][key][0] +
              "</td><td>" +
              data[objectKeyToLC][propertyKey][key][1] +
              "</td></tr>";
            $("#property-values table tbody").append(newRow);
          }
        }
      });
    })
    .fail(function () {
      console.log("status: 404; Could not load property data");
    });
}
$("#category-list").click(function () {
  if (categoryList === true) {
    $("#category-list ul li").click(function () {
      //run this function when a category list item is clicked
      objectUrl = "categories/" + $(this).attr("id"); //get id of current list item
      console.log($(this).attr("id"));
      catId = $(this).attr("id");
      loadObjectList(objectUrl, catId);
      $("#category-list ul").empty();
      $("#menu-title span").show();
    });
  }
});

var el = document.getElementById("image"); //sets img element with id of image as a variable

function setObjectInfo(i, cat, data) {
  //i = array index; cat = category key (planets, moons, dwarf, other)
  el.removeAttribute("src");
  el.removeAttribute("alt");
  el.setAttribute("src", data[cat][i].image); // set src attribute to contain the image values from json
  el.setAttribute("alt", data[cat][i].alt); // set alt attribute to contain the alt values from json
  newImageArticle =
    "<article><h2>" +
    data[cat][i].name +
    "</h2><p>" +
    data[cat][i].alt +
    "</p></article>";
  $("#image-information").empty();
  $("#image-information").append(newImageArticle);
  //$("#image-information article h2").text(data[cat][i].name); // set text of <h2> in #image-information to value of name from json
  //$("#image-information article p").text(data[cat][i].alt); // set text of <p> in #image-information to value of name from json
  $("#property-values").empty(); // empty all content from #property-values
  // var createArticle = document.createElement("ARTICLE"); // create an <article> node, set as variable
  //var createH2 = document.createElement("H2"); // create a <h2> node, set as variable
  //var createParagraph = document.createElement("P"); // create a <p> node, set as variable
  //var h2TextNode = document.createTextNode(data[cat][i].name); // create a text node containing name value from json, set as variable
  //var paragraphTextNode = document.createTextNode(data[cat][i].about); // create a text node containing about value from json, set as variable
  //createH2.appendChild(h2TextNode); // The following 4 lines will append the text nodes to their respective <h2> or <p> node, then append it all to the <article> node
  //createParagraph.appendChild(paragraphTextNode);
  //createArticle.appendChild(createH2);
  //createArticle.appendChild(createParagraph);
  $("#object-list ul").hide(); // Hide the list after it is clicked
}
