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

$("#image-container").click(function() {
    $("#image-information").prepend($("#image-container"));
    $("#image-information").show()
});
$("#image-information").click(function() {
    $("#top-container").prepend($("#image-container"));
    $("#image-information").hide();
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
  $("#property-list ul").empty();
  var objectKeyToLC = objectKey.toLowerCase();
  if (objectKeyToLC === "tesla roadster") {
    objectKeyToLC = "teslaRoadster";
  }
  $.getJSON("assets/js/json/objects/" + cat + "/" + objectKeyToLC + ".json")
    .done(function (data) {
      // var newListItem = "<li id=" + i + ">" + data.Ceres[0].size[0].name + "</li>";
      for (objectKeyToLC in data) {
        console.log(objectKeyToLC);
      }
      for (var i = 0; i < data[objectKeyToLC].length; i++) {
        for (var propertyKey in data[objectKeyToLC][i]) {
          var newListItem = "<li>" + propertyKey + "</li>";
          $("#property-list ul").append(newListItem);
        $("#property-values").show();
        }
      }
      $("#property-list ul li").click(function () {
        var name = $(this).text();
        var i = $(this).index();
        $("#property-values").empty();

        var newTable = "<table><tbody></tbody></table>";
        $("#property-values").append(newTable);
        for (values in data[objectKeyToLC][i][name][0]) {
          console.log(data[objectKeyToLC][i][name][0][values]);

          var newTableRow =
            "<tr><td>" +
            values +
            "</td><td>" +
            data[objectKeyToLC][i][name][0][values][0] +
            "</td><td>" +
            data[objectKeyToLC][i][name][0][values][1] +
            "</td><td><a href='references.html' target='_blank'>" +
            data[objectKeyToLC][i][name][0][values][2] +
            "</a></td></tr>";
          $("#property-values table tbody").append(newTableRow);
         // $("#property-list ul").hide();
        }

        //when list item is selected the following click function will get id attribute and call function
        /* var getId = $(this).attr("id");
          setObjectInfo(getId, catId, data);
          //get id of current list item
          objectKey = data[cat][getId].name;
          LoadPropertyList(objectKey, cat);*/
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
  var newArticle =
    "<article>" +
    "<h2>" +
    data[cat][i].name +
    "</h2>" +
    "<p>" +
    data[cat][i].about +
    "</p>" +
    "</article>";
  var newImageArticle =
    "<article>" +
    "<h2>" +
    data[cat][i].name +
    "</h2>" +
    "<p>" +
    data[cat][i].alt +
    "</p>" +
    "</article>";
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
  $("#property-values").append(newArticle); // Get #property-values and append the createArticle variable
  $("#object-list ul").hide(); // Hide the list after it is clicked
}
