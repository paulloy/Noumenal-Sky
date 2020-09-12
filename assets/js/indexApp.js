var url = "assets/js/json/";

$("#menu-title i").click(function () {
  $("#menu-title span").hide();
  $("#object-list").hide();
  $("#cat-list").show();
});

$("#image-container").click(function () {
  $("#image-information").prepend($("#image-container"));
  $("#expand").hide();

  $("#close").show();
  $("#image-information").css("display", "flex");
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
      $("#object-list").append(newListItem);
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
      $("#property-values").append("<h2>" + objectKeyToLC + "</h2>");
      $("#property-values").append("<ul></ul>");
      for (var propertyKey in data[objectKeyToLC]) {
        var newListItem = "<li>" + propertyKey + "</li>";
        $("#property-values ul").prepend(newListItem);
        $("#property-values").show();
        $("#display-values").hide();
        $("#display-more-info").empty().hide();
      }

      $("#property-values ul li").click(function () {
        propertyKey = $(this).text();
        $("#property-values").hide();
        $("#display-values").empty();
        $("#display-values").show();
        var heading =
          "<table><tbody><tr><th>Property</th><th>Value</th><th>Unit</th></tr></tbody></table>";
        $("#display-values").append(
          '<span id="return"><i class="fas fa-chevron-left"></i></span>'
        );

        if (propertyKey === "about") {
          var newArticle = "<article></article>";
          $("#display-values").append(newArticle);
          for (key in data[objectKeyToLC][propertyKey]) {
            var newPoint =
              "<h2>" +
              key +
              "</h2><p>" +
              data[objectKeyToLC][propertyKey][key] +
              "</p>";
            $("#display-values article").append(newPoint);
          }
        } else {
          $("#display-values").append("<h3>" + propertyKey + "</h3>");
          $("#display-values").append("<p><i class='fas fa-mouse'></i> Click on a table row for more information.</p>");
          $("#display-values").append(heading);
          for (key in data[objectKeyToLC][propertyKey]) {
            var newRow =
              "<tr><td>" +
              key +
              "</td><td>" +
              data[objectKeyToLC][propertyKey][key][0] +
              "</td><td>" +
              data[objectKeyToLC][propertyKey][key][1] +
              "</td><td style='display: none;'>" +
              data[objectKeyToLC][propertyKey][key][2] +
              "</td></tr>";
            $("#display-values table tbody").append(newRow);
          }

          $("#display-values tr").click(function () {
            var referenceKeyNumber = $(this).children().last().text();
            var referenceIndex = referenceKeyNumber.match(/\d+/)[0];
            $("#display-values").hide();
            $("#display-more-info").show();
            $("#display-more-info").append(
              '<span id="return-again"><i class="fas fa-chevron-left"></i></span>'
            );
            $("#display-more-info").append($(this).clone());
            $.getJSON("assets/js/json/explanation.json").done(function (data) {
              explanationPropertyKey = $("#display-more-info tr td:first-of-type").text()
                .toLowerCase();
              explanationUnitKey = $("#display-more-info tr td:nth-child(3)").text().toLowerCase();
              $("#display-more-info").append("<h3>"+explanationPropertyKey+"</h3><p>"+data[explanationPropertyKey]+"</p>");
              $("#display-more-info").append("<h3>"+explanationUnitKey+"</h3><p>"+data[explanationUnitKey]+"</p>");
            });
            $.getJSON("assets/js/json/references.json").done(function (data) {
              var newReference =
                "<p><span>" +
                referenceKeyNumber +
                "</span> " +
                data[referenceIndex].author +
                "<br>" +
                data[referenceIndex].title +
                ' <a href="' +
                data[referenceIndex].href +
                '" target="_blank"><i class="fas fa-external-link-alt"></i></a></p><br><p><a href="references.html">Click for full references</a></p>';
              $("#display-more-info").append("<h3>Data Reference</h3>");
              $("#display-more-info").append(newReference);
            });

            $("#return-again").click(function () {
              $("#display-more-info").hide();
              $("#display-more-info").empty();
              $("#display-values").show();
            });
          });
        }
        $("#return").click(function () {
          $("#display-values").hide();
          $("#property-values").show();
        });
      });
    })
    .fail(function () {
      console.log("status: 404; Could not load property data");
    });
}

$("#category-list ul li").click(function () {
  //run this function when a category list item is clicked
  objectUrl = "categories/" + $(this).attr("id"); //get id of current list item
  console.log($(this).attr("id"));
  catId = $(this).attr("id");
  loadObjectList(objectUrl, catId);
  $("#category-list ul").hide();
  $("#object-list").empty();
  $("#object-list").append('<div id="spinner"></div>');
  $("#object-list").show();
  $("#menu-title span").show();
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
