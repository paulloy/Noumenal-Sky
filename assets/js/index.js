var url = "assets/js/json/";

/* When clicked this will hide the span containing the i element, and the #object-list.
The #category-list will then display */
$("#menu-title i").on("click",function () {
  $("#menu-title span").hide();
  $("#object-list").hide();
  $("#category-list").show();
});

/* When #open-modal is clicked, #image-information will be displayed in #image-information. 
#image-information-background will display. 
#open-modal is hidden. */
$("#open-modal").click(function () {
  $("#image-modal").prepend($("#image-container")); //Instead of append, create a new div
  $("#open-modal").hide();
  $("#image-information-background").show();
  $("#image-modal").show().css("display", "flex");
});
/* When #close-modal or #image-information-background is clicked,
#close-modal, #image-information, and #image-information-background will hide.
#image-container will display.
#open-modal will display. */
$("#close-modal, #image-information-background").click(function () {
  $("#image-information-background, #image-modal").hide();
  $("#top-container").prepend($("#image-container"));
  $("#open-modal").show();
});

/* When a list-item in #category-list is clicked:
loadObjectList function is called with two variables defined in this function.
#category-list is hidden, #object-list is emptied, and then displayed with a new list.
#menu-title span is display so the user can return to #category-list */
$("#category-list li").click(function () {
  objectUrl = "categories/" + $(this).attr("id");
  catId = $(this).attr("id");
  loadObjectList(objectUrl, catId);
  $("#category-list").hide();
  $("#object-list").empty();
  $("#object-list, #menu-title span").show();
});

var el = document.getElementById("image"); //sets img element with id of image as a variable

function setObjectInfo(i, cat, data) {
  //write in jQuery to remain consistent
  //i = array index; cat = category key (planets, moons, dwarf, other)
  el.removeAttribute("src");
  el.removeAttribute("alt");
  el.setAttribute("src", data[cat][i].image); // set src attribute to contain the image values from json
  el.setAttribute("alt", data[cat][i].alt); // set alt attribute to contain the alt values from json
  newImageArticle = `<article><h2>${data[cat][i].name}</h2><p>${data[cat][i].alt}</p></article>`;
  $("#image-modal article h2").empty().append(data[cat][i].name);
  $("#image-modal article p").empty().append(data[cat][i].alt);
  $("#property-values").empty();
  $("#object-list ul").hide(); // Hide the list after it is clicked
}

function loadObjectList(objectUrl, cat) {
  $.getJSON(url + objectUrl + ".json").done(function (data) {
    for (var i = 0; i < data[cat].length; i++) {
      var newListItem = `<li id="${i}" tabindex="0">${data[cat][i].name}</li>`;
      $("#object-list").append(newListItem);
      var objectKey;
      $("#" + i).click(function () {
        var getId = $(this).attr("id");
        setObjectInfo(getId, catId, data);
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
  $.getJSON(`assets/js/json/objects/${cat}/${objectKeyToLC}.json`)
    .done(function (data) {
      for (objectKeyToLC in data);
      $("#property-values")
        .append(`<h2>${objectKeyToLC}</h2>`)
        .append(`<ul role="directory"></ul>`);
      for (var propertyKey in data[objectKeyToLC]) {
        var newListItem = `<li tabindex="0">${propertyKey}</li>`;
        $("#property-values ul").prepend(newListItem);
        $("#property-values").show();
        $("#display-values").hide();
        $("#display-more-info").empty().hide();
      }

      $("#property-values ul li").click(function () {
        propertyKey = $(this).text();
        $("#property-values").hide();
        $("#display-values").empty().show();
        var heading = `<table><tr><th>Property</th><th>Value</th><th>Unit</th></tr></table>`;
        $("#display-values").append(
          `<span id="return" aria-label="return to previous menu" tabindex="0" role="button"><i class="fas fa-chevron-left"></i></span>`
        );

        if (propertyKey === "about") {
          var newArticle = "<article></article>";
          $("#display-values").append(newArticle);
          for (key in data[objectKeyToLC][propertyKey]) {
            var newPoint = `<h2>${key}</h2><p>${data[objectKeyToLC][propertyKey][key]}</p>`;
            $("#display-values article").append(newPoint);
          }
        } else {
          $("#display-values")
            .append(`<h3>${propertyKey}</h3>`)
            .append(
              `<p><i class="fas fa-mouse"></i> Click on a table row for more information.</p>`
            )
            .append(heading);
          for (key in data[objectKeyToLC][propertyKey]) {
            var newRow = `<tr tabindex="0"><td>${key}</td><td>${data[objectKeyToLC][propertyKey][key][0]}</td><td>${data[objectKeyToLC][propertyKey][key][1]}</td><td style="display: none;">${data[objectKeyToLC][propertyKey][key][2]}</td></tr>`;
            $("#display-values table tbody").append(newRow);
          }

          $("#display-values tr").click(function () {
            var referenceKeyNumber = $(this).children().last().text();
            var referenceIndex = referenceKeyNumber.match(/\d+/)[0];
            $("#display-values").hide();
            $("#display-more-info")
              .show()
              .append(
                `<span id="return-again" aria-label="return to previous menu" tabindex="0" role="button"><i class="fas fa-chevron-left"></i></span>`
              )
              .append($(this).clone());
              $("#display-more-info tr").removeAttr("tabindex"); //This clone isnt interactive so focus isn't required.
            $.getJSON("assets/js/json/explanation.json").done(function (data) {
              explanationPropertyKey = $(
                "#display-more-info tr td:first-of-type"
              )
                .text()
                .toLowerCase();
              explanationUnitKey = $("#display-more-info tr td:nth-child(3)")
                .text()
                .toLowerCase();
              $("#display-more-info")
                .append(
                  `<h3>${explanationPropertyKey}</h3><p>${data[explanationPropertyKey]}</p>`
                )
                .append(
                  `<h3>${explanationUnitKey}</h3><p>${data[explanationUnitKey]}</p>`
                );
            });
            $.getJSON("assets/js/json/references.json").done(function (data) {
              var newReference = `<p>
              <span>${referenceKeyNumber}</span> ${data[referenceIndex].author}<br>
              ${data[referenceIndex].title} 
              <a href='"${data[referenceIndex].href}"' target='_blank'>
              <i class='fas fa-external-link-alt'></i>
              </a></p><br>
              <p><a href='references.html'>Click for full references</a></p>`;
              $("#display-more-info")
                .append("<h3>Data Reference</h3>")
                .append(newReference);
            });

            $("#return-again").click(function () {
              $("#display-more-info").hide().empty();
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

