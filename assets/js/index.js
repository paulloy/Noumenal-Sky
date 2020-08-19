function openCloseLists(listElement) {
  var listElement; //category-list, object-list, property-list
  $("#" + listElement)
    .find("p")
    .click(function () {
      //when the listElements daughter <p> element is clicked, run function
      var root = $(this).parent(); // set root as the parent of the <p> element
      root.find("ul").toggle(); // find the <ul> child element and toggle it
      root.siblings().find("ul").hide(); // find the two siblings of the listElement and hide their <ul> elements
    });
}
openCloseLists("category-list"); // run this function for each listElement clicked
openCloseLists("object-list");
openCloseLists("property-list");

$("#property-values table tbody tr td").click(function () {
  $("#explanation-container").show();
});
$("#explanation-container").click(function () {
  $(this).hide();
});

$("#top-container").click(function () {
  //toggle in mobile view
  $("#image-information").toggle();
  $("#image-information").toggleClass("mobile-display-image-info");
});

// ----------------------------------------------------

$("#category-list ul li").click(function () { //run this function when a category list item is clicked
  var categoryId = "#" + $(this).attr("id"); //get id of current list item and add "#" to start of it
  $("#object-list ul").empty(); //empty any values currently displayed in object list
  getData(categoryId); 
  $("#object-list ul").show(); //display object list
  $("#category-list ul").hide(); //hide category list after being clicked
});

function getListById(id) {
  var listById = document.getElementById(id).childNodes[3];
  return listById;
}

var jsonUrlStart = "assets/js/json/categories/";

function getData(categoryId) {
  var xhr = new XMLHttpRequest(); //Make a new XML Http Request
  var category = categoryId.substring(1); //remove "#" from string

  xhr.open("GET", jsonUrlStart + category + ".json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var obj = JSON.parse(this.responseText);

      for (var i = 0; i < obj[category].length; i++) {
        displayCategoryList(category);

        $("#" + i).click(function () { //when list item is selected the following click function will get id attribute and call function
          var getId = $(this).attr("id");
          setObjectInfo(getId, category);
        });
      }
    }

    function displayCategoryList(cat) {
      var node = document.createElement("LI"); //create list node
      var textnode = document.createTextNode(obj[cat][i].name); //create text node
      node.appendChild(textnode); //append text node to list
      node.setAttribute("id", i); //set id
      getListById("object-list").appendChild(node); //append the list to the listById
    }

    var el = document.getElementById("image"); //sets img element with id of image as a variable

    function setObjectInfo(i, cat) {
      //i = array index; cat = category key (planets, moons, dwarf, other)
      el.removeAttribute("src");
      el.removeAttribute("alt");
      el.setAttribute("src", obj[cat][i].image); // set src attribute to contain the image values from json
      el.setAttribute("alt", obj[cat][i].alt); // set alt attribute to contain the alt values from json
      $("#image-information article h2").text(obj[cat][i].name); // set text of <h2> in #image-information to value of name from json
      $("#image-information article p").text(obj[cat][i].alt); // set text of <p> in #image-information to value of name from json
      $("#property-values").empty(); // empty all content from #property-values
      var createArticle = document.createElement("ARTICLE"); // create an <article> node, set as variable
      var createH2 = document.createElement("H2"); // create a <h2> node, set as variable
      var createParagraph = document.createElement("P"); // create a <p> node, set as variable
      var h2TextNode = document.createTextNode(obj[cat][i].name); // create a text node containing name value from json, set as variable
      var paragraphTextNode = document.createTextNode(obj[cat][i].about); // create a text node containing about value from json, set as variable
      createH2.appendChild(h2TextNode); // The following 4 lines will append the text nodes to their respective <h2> or <p> node, then append it all to the <article> node
      createParagraph.appendChild(paragraphTextNode);
      createArticle.appendChild(createH2);
      createArticle.appendChild(createParagraph);
      document.getElementById("property-values").appendChild(createArticle); // Get #property-values and append the createArticle variable
      $("#object-list ul").hide(); // Hide the list after it is clicked
    }
  };
}

// Organise this code
