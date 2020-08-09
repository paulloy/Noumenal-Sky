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
          getListById("object-list").appendChild(node); //append the list to the listById
        }
      } else if (categoryId === "#dwarf") {
        for (var i = 0; i < obj.dwarf.length; i++) {
          var node = document.createElement("LI"); //create list node
          var textnode = document.createTextNode(obj.dwarf[i].name); //create text node
          node.appendChild(textnode); //append text node to list
          getListById("object-list").appendChild(node); //append the list to the listById
        }
      } else if (categoryId === "#moons") {
        for (var i = 0; i < obj.moons.length; i++) {
          var node = document.createElement("LI"); //create list node
          var textnode = document.createTextNode(obj.moons[i].name); //create text node
          node.appendChild(textnode); //append text node to list
          getListById("object-list").appendChild(node); //append the list to the listById
        }
      } else if (categoryId === "#other") {
        for (var i = 0; i < obj.other.length; i++) {
          var node = document.createElement("LI"); //create list node
          var textnode = document.createTextNode(obj.other[i].name); //create text node
          node.appendChild(textnode); //append text node to list
          getListById("object-list").appendChild(node); //append the list to the listById
        }
      }
    }
  };
}

function createList(i) {
  document.createElement("LI").setAttribute("id", i);
}

function onCategoryClick(categoryId) {
  //onclick function will run when list is clicked
  $("#object-list ul").empty();
  getData(categoryId);
  $("#object-list ul").show();
}

//console.log(document.getElementById("object-list").childNodes[3]);
