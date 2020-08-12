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
          var node = document.createElement("LI"); //create list node
          var textnode = document.createTextNode(obj.planets[i].name); //create text node
          node.appendChild(textnode); //append text node to list
          node.setAttribute("id", i); //set id
          getListById("object-list").appendChild(node); //append the list to the listById

          $("#" + i).click(function () {   //when list item is selected the following click function will get id attribute and call function
            var getId = $(this).attr("id");
            setPlanet(getId);
            });
        }
      } else if (categoryId === "#dwarf") {
        for (var i = 0; i < obj.dwarf.length; i++) {
          var node = document.createElement("LI"); //create list node
          var textnode = document.createTextNode(obj.dwarf[i].name); //create text node
          node.appendChild(textnode); //append text node to list
          node.setAttribute("id", i); //set id
          getListById("object-list").appendChild(node); //append the list to the listById
          
          $("#" + i).click(function () {   
            var getId = $(this).attr("id");
            setDwarf(getId);
            });
        }
      } else if (categoryId === "#moons") {
        for (var i = 0; i < obj.moons.length; i++) {
          var node = document.createElement("LI"); //create list node
          var textnode = document.createTextNode(obj.moons[i].name); //create text node
          node.appendChild(textnode); //append text node to list
          node.setAttribute("id", i); //set id
          getListById("object-list").appendChild(node); //append the list to the listById

          $("#" + i).click(function () {   
            var getId = $(this).attr("id");
            setMoons(getId);
            });
        }
        
      } else if (categoryId === "#other") {
        for (var i = 0; i < obj.other.length; i++) {
          var node = document.createElement("LI"); //create list node
          var textnode = document.createTextNode(obj.other[i].name); //create text node
          node.appendChild(textnode); //append text node to list
          node.setAttribute("id", i); //set id
          getListById("object-list").appendChild(node); //append the list to the listById

          $("#" + i).click(function () {   
            var getId = $(this).attr("id");
            setOther(getId);
            });
        }
      }

       
      
      

      var list = document.getElementById("object-list").childNodes[3].childNodes;    
        var el = document.getElementById("image");

      function setPlanet(i) {  //use constructor functions?
        el.removeAttribute("src");
        el.setAttribute("src", obj.planets[i].image);
        el.setAttribute("alt", obj.planets[i].alt)
        $("#image-information article h2").text(obj.planets[i].name);
        $("#image-information article p").text(obj.planets[i].alt);
        $("#property-values").empty();
        var createArticle = document.createElement("ARTICLE");
        var createH2 = document.createElement("H2");
        var createParagraph = document.createElement("P");
        var h2TextNode = document.createTextNode(obj.planets[i].name);
        var paragraphTextNode = document.createTextNode(obj.planets[i].about);
        createH2.appendChild(h2TextNode);
        createParagraph.appendChild(paragraphTextNode);
        createArticle.appendChild(createH2);
        createArticle.appendChild(createParagraph);
        document.getElementById("property-values").appendChild(createArticle);      
        $("#object-list ul").hide();
      }
      function setDwarf(i) { 
        el.removeAttribute("src");
        el.setAttribute("src", obj.dwarf[i].image);
        el.setAttribute("alt", obj.dwarf[i].alt)
        $("#image-information article h2").text(obj.dwarf[i].name);
        $("#image-information article p").text(obj.dwarf[i].alt);
        $("#property-values").empty();
        var createArticle = document.createElement("ARTICLE");
        var createH2 = document.createElement("H2");
        var createParagraph = document.createElement("P");
        var h2TextNode = document.createTextNode(obj.dwarf[i].name);
        var paragraphTextNode = document.createTextNode(obj.dwarf[i].about);
        createH2.appendChild(h2TextNode);
        createParagraph.appendChild(paragraphTextNode);
        createArticle.appendChild(createH2);
        createArticle.appendChild(createParagraph);
        document.getElementById("property-values").appendChild(createArticle);      
        $("#object-list ul").hide();
      }
      function setMoons(i) { 
        el.removeAttribute("src");
        el.setAttribute("src", obj.moons[i].image);
        el.setAttribute("alt", obj.moons[i].alt)
        $("#image-information article h2").text(obj.moons[i].name);
        $("#image-information article p").text(obj.moons[i].alt);
        $("#property-values").empty();
        var createArticle = document.createElement("ARTICLE");
        var createH2 = document.createElement("H2");
        var createParagraph = document.createElement("P");
        var h2TextNode = document.createTextNode(obj.moons[i].name);
        var paragraphTextNode = document.createTextNode(obj.moons[i].about);
        createH2.appendChild(h2TextNode);
        createParagraph.appendChild(paragraphTextNode);
        createArticle.appendChild(createH2);
        createArticle.appendChild(createParagraph);
        document.getElementById("property-values").appendChild(createArticle);      
        $("#object-list ul").hide();
      }
      function setOther(i) { 
        el.removeAttribute("src");
        el.setAttribute("src", obj.other[i].image);
        el.setAttribute("alt", obj.other[i].alt)
        $("#image-information article h2").text(obj.other[i].name);
        $("#image-information article p").text(obj.other[i].alt);
        $("#property-values").empty();
        var createArticle = document.createElement("ARTICLE");
        var createH2 = document.createElement("H2");
        var createParagraph = document.createElement("P");
        var h2TextNode = document.createTextNode(obj.other[i].name);
        var paragraphTextNode = document.createTextNode(obj.other[i].about);
        createH2.appendChild(h2TextNode);
        createParagraph.appendChild(paragraphTextNode);
        createArticle.appendChild(createH2);
        createArticle.appendChild(createParagraph);
        document.getElementById("property-values").appendChild(createArticle);      
        $("#object-list ul").hide();
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
