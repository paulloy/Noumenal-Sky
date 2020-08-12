$("#category-list p").click(function () {
  $("#category-list ul").toggle();
  $("#object-list ul").hide();
  $("#property-list ul").hide();
});
$("#object-list p").click(function () {
  $("#object-list ul").toggle();
  $("#category-list ul").hide();
  $("#property-list ul").hide();
});
$("#property-list p").click(function () {
  $("#property-list ul").toggle();
  $("#object-list ul").hide();
  $("#category-list ul").hide();
});

$("#property-values table tbody tr td").click(function () {
  $("#explanation-container").show();
});
$("#explanation-container").click(function () {
  $(this).hide();
});

// ----------------------------------------------------

var data;

function getListById(id) {
  var listById = document.getElementById(id).childNodes[3];
  return listById;
}

var jsonUrlStart = "assets/js/json/categories/";

function getData(categoryId) {
  var xhr = new XMLHttpRequest(); //Make a new XML Http Request

  if (categoryId === "#planets") {
    //get data depending on which category is clicked
    xhr.open("GET", jsonUrlStart + "planets.json");
  } else if (categoryId === "#dwarf") {
    xhr.open("GET", jsonUrlStart + "dwarf.json");
  } else if (categoryId === "#moons") {
    xhr.open("GET", jsonUrlStart + "moons.json");
  } else if (categoryId === "#other") {
    xhr.open("GET", jsonUrlStart + "other.json");
  }
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      /*cb*/ var obj = JSON.parse(this.responseText);

      if (categoryId === "#planets") {
        for (var i = 0; i < obj.planets.length; i++) {
          displayCategoryList("planets");

          $("#" + i).click(function () {   //when list item is selected the following click function will get id attribute and call function
            var getId = $(this).attr("id");
            setObjectInfo(getId, "planets");
            });
        }
      } else if (categoryId === "#dwarf") {
        for (var i = 0; i < obj.dwarf.length; i++) {
          displayCategoryList("dwarf");
          
          $("#" + i).click(function () {   
            var getId = $(this).attr("id");
            setObjectInfo(getId, "dwarf");
            });
        }
      } else if (categoryId === "#moons") {
        for (var i = 0; i < obj.moons.length; i++) {
          displayCategoryList("moons");

          $("#" + i).click(function () {   
            var getId = $(this).attr("id");
            setObjectInfo(getId, "moons");
            });
        }        
      } else if (categoryId === "#other") {
        for (var i = 0; i < obj.other.length; i++) {
          displayCategoryList("other");

          $("#" + i).click(function () {   
            var getId = $(this).attr("id");
            setObjectInfo(getId, "other");
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
      

      var list = document.getElementById("object-list").childNodes[3].childNodes;    
        var el = document.getElementById("image"); //sets img element with id of image as a variable

      function setObjectInfo(i, cat) {  //i = array index; cat = category key (planets, moons, dwarf, other)
        el.removeAttribute("src"); // remove src attribute
        el.setAttribute("src", obj[cat][i].image); // set src attribute to contain the image values from json
        el.setAttribute("alt", obj[cat][i].alt) // set alt attribute to contain the alt values from json
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
      
    
    }
  };
}

function onCategoryClick(categoryId) {
  //onclick function will run when list is clicked
  $("#object-list ul").empty();
  getData(categoryId);
  $("#object-list ul").show();
  $("#category-list ul").hide();
} 

// Organise this code
