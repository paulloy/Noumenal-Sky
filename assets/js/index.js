const url = "assets/js/json/";

/* When #return-category-list button is clicked:
#return-category parent span will hide.
#object-list will hide.
#category-list will show */
$("#return-category-list").on("click",function () {
  $("#menu-title span").hide();
  $("#object-list").hide();
  $("#category-list").show();
});

/* When #open-modal is clicked:
#image-information-background will show.
#image-modal will add inline css with a display of flex. */
$("#open-modal").click(function () {
  $("#image-information-background").show();
  $("#image-modal").css("display", "flex");
});
/* When #close-modal or #image-information-background is clicked:
#image-information-background and #image-modal will hide */
$("#close-modal, #image-information-background").click(function () {
  $("#image-information-background, #image-modal").hide();
});

/* When a listitem in #category-list is clicked:
objectUrl will be defined.
catId will be defined.
loadObjectList will be called with objectUrl and catId as variables.
#category-list will hide.
#object-list will empty so a new list may be appended.
#object-list and #menu-title span will show. */
$("#category-list li").click(function () {
  objectUrl = "categories/" + $(this).attr("id");
  catId = $(this).attr("id");
  loadObjectList(objectUrl, catId);
  $("#category-list").hide();
  $("#object-list").empty();
  $("#object-list, #menu-title span").show();
});

/* When setObjectInfo is called:
#image img src will be set.
#image img alt will be set.
#image-modal img src will be set. 
#image-modal img alt will be set.
#image-modal h2 will be set. 
#image-modal p will be set.
#info-selection h2 and #info-selection ul will empty. */
function setObjectInfo(i, cat, data) {
 $("#image img").attr("src", data[cat][i].image);
  $("#image img").attr("alt", data[cat][i].alt);
  $("#image-modal img").attr("src", data[cat][i].image);
  $("#image-modal img").attr("alt", data[cat][i].alt);
  $("#image-modal h2").empty().append(data[cat][i].name);
  $("#image-modal p").empty().append(data[cat][i].alt);
  $("#info-selection h2, #info-selection ul").empty();
}

/*When called this function will display a list within #object-list.*/
function loadObjectList(objectUrl, cat) {
  $.getJSON(url + objectUrl + ".json").done(function (data) {
    for (var i = 0; i < data[cat].length; i++) {
        //for loop is used to create a new object list
      var newListItem = `<li id="${i}" tabindex="0">${data[cat][i].name}</li>`;
      $("#object-list").append(newListItem);
      var objectKey;
      //A new function is applied to each list item.
      //setObjectInfo and LoadPropertyList are called.
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
  //var objectKeyToLC = objectKey.toLowerCase();
  //This is a small fix to the problem of the objectKey of tesla roadster having a space in it. Not a hude problem now but may become a problem later if other objects such as Alpha Centauri are added later.
  if (objectKey === "tesla roadster") {
    objectKey = "teslaRoadster";
  }
  //Get the json file for clicked on object.
  $.getJSON(`assets/js/json/objects/${cat}/${objectKey}.json`)
    .done(function (data) {
        //empty contents of #info-selection and append new <h2> with objectKey, and blank <ul>
        $("#info-selection").empty()
        .append(
            `<h2>${objectKey}</h2>
            <ul></ul>`
            );
        //Create a new listitem with propertyKey and prepend each list to blank <ul>
      for (var propertyKey in data[objectKey]) {
        var newListItem = `<li tabindex="0">${propertyKey}</li>`;
        $("#info-selection ul").prepend(newListItem);
        //display #info-selection after list is complete.
        $("#info-selection").show();
        //hide these if a user clicks a new object instead of clicking the return buttons
        $("#display-info").hide();
        $("#row-info").empty().hide();
      }

      //Add a new function to each listitem in #info-selection
      $("#info-selection ul li").click(function () {
        propertyKey = $(this).text();
        $("#info-selection").hide();
        //empty and display #display-info
        $("#display-info").empty().show();
        const tableHeading =    `<table>
                                    <tr>   
                                        <th>Property</th>
                                        <th>Value</th>
                                        <th>Unit</th>
                                        <th style="display:none;">hidden reference</th>
                                    </tr>
                                </table>`;
        $("#display-info")
        .append(
            `<span id="return-info-selection" aria-label="return to previous menu" tabindex="0" role="button">
                <i class="fas fa-chevron-left"></i>
            </span>`
        );

        //the content is different if about is clicked. The other two buttons will display tables.

        if (propertyKey === "about") {
            //display new articles with "about" content
          for (key in data[objectKey][propertyKey]) {
            var newArticle =    `<article>
                                    <h2>${key}</h2>
                                    <p>${data[objectKey][propertyKey][key]}</p>
                                </article>`;
            $("#display-info").append(newArticle);
          }
        } else {
            //if not "about" then do this
          $("#display-info")
            .append(`<h3>${propertyKey}</h3>`)
            .append( //on testing it was not obvious that a user could click a table row, this will make it clearer.
              `<p><i class="fas fa-mouse"></i> Click on a table row for more information.</p>`
            )
            .append(tableHeading);
          for (key in data[objectKey][propertyKey]) {
            var newRow =    `<tr tabindex="0">
                                <td>${key}</td>
                                <td>${data[objectKey][propertyKey][key][0]}</td>
                                <td>${data[objectKey][propertyKey][key][1]}</td>
                                <td style="display: none;">${data[objectKey][propertyKey][key][2]}</td>
                            </tr>`;
            $("#display-info table").append(newRow);
          }
        //When a table row is clicked a function is run
          $("#display-info tr").click(function () {
            var referenceKeyNumber = $(this).children().last().text();
            if (referenceKeyNumber != "[a]") {
                var referenceIndex = referenceKeyNumber.match(/\d+/)[0];
            }
            $("#display-info").hide();
            $("#row-info")
              .show()
              .append(
                `<span id="return-display-info" aria-label="return to previous menu" tabindex="0" role="button">
                    <i class="fas fa-chevron-left"></i>
                </span>`
              );
              $("#row-info").append("<table></table>");
              $("#row-info table")
              .append($(this).clone());
              $("#row-info tr").removeAttr("tabindex"); //This clone isnt interactive so focus isn't required.
              // get explanantion.json
            $.getJSON("assets/js/json/explanation.json").done(function (data) {
              explanationPropertyKey = $("#row-info tr td:first-of-type").text().toLowerCase();
              explanationUnitKey = $("#row-info tr td:nth-child(3)").text().toLowerCase();
              $("#row-info")
                .append(
                    `<article>
                        <h3>${explanationPropertyKey}</h3>
                        <p>${data[explanationPropertyKey]}</p>
                    </article>`
                )
                .append(
                    `<article>
                        <h3>${explanationUnitKey}</h3>
                        <p>${data[explanationUnitKey]}</p>
                    </article>`
                );
            });
            $.getJSON("assets/js/json/references.json").done(function (data) {
            if (referenceKeyNumber === "[a]") {
                var newReference = `<p>
                                        <span>${referenceKeyNumber}</span> Calculated based upon known parameters
                                    </p>
                                    <p>
                                        <a href='references.html'>Click for full references</a>
                                    </p>`
            } else {
              var newReference =    `<p>
                                        <span>${referenceKeyNumber}</span> ${data[referenceIndex].author}<br>${data[referenceIndex].title} 
                                            <a aria-label="open external reference" href="${data[referenceIndex].href}" target='_blank'>
                                                <i class='fas fa-external-link-alt'></i>
                                            </a>
                                    </p><br>
                                    <p>
                                        <a href='references.html'>Click for full references</a>
                                    </p>`;
            }
              $("#row-info")
                .append("<h3>Data Reference</h3>")
                .append(newReference);
            });
        //when clicked, return to #display-info
            $("#return-display-info").click(function () {
              $("#row-info").hide().empty();
              $("#display-info").show();
            });
          });
        }
        $("#return-info-selection").click(function () {
          $("#display-info").hide();
          $("#info-selection").show();
        });
      });
    })
    .fail(function () {
      console.log("status: 404; Could not load property data");
    });
}

