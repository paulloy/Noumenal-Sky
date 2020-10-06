/*globals $:false */
/*jshint esversion: 6 */

//var target refers to the element that was selected
//e refers to the event object
//keyCode of Enter button is 13
//keyCode of Space button is 32
//keypress is used alongside click to improve assessibilty for visual impairment
//Comments are placed above the code they refer to

//This is used constantly in $.getJSON requests
const url = "assets/js/json/";

//selecting #return-category-list will hide #object-list and #return-category-list, then display #category-list
$("#return-category-list").click(function () {
  $("#menu-title span").hide();
  $("#object-list").hide();
  $("#category-list").show();
});
$("#return-category-list").keypress(function (e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    $("#menu-title span").hide();
    $("#object-list").hide();
    $("#category-list").show();
  }
});
//selecting #return-info-selection will hide #display-info, then display #info-selection
$("#return-info-selection").click(function () {
  $("#display-info").hide();
  $("#info-selection").show();
});
$("#return-info-selection").keypress(function (e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    $("#display-info").hide();
    $("#info-selection").show();
  }
});
//selecting #return-display-info will hide #row-info, then display #display-info
$("#return-display-info").click(function () {
  $("#row-info").hide();
  $("#display-info").show();
});
$("#return-display-info").keypress(function (e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    $("#row-info").hide();
    $("#display-info").show();
  }
});
//selecting #open-modal will display #image-modal-background and #image-modal
$("#open-modal").click(function () {
  $("#image-modal-background").show();
  $("#image-modal").css("display", "flex");
});
$("#open-modal").keypress(function (e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    $("#image-modal-background").show();
    $("#image-modal").css("display", "flex");
  }
});
//selecting #close-modal or #image-modal-background will hide #close-modal and #image-modal-background
$("#close-modal, #image-modal-background").click(function () {
  $("#image-modal-background, #image-modal").hide();
});
$("#close-modal, #image-modal-background").keypress(function (e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    $("#image-modal-background, #image-modal").hide();
  }
});

//selecting a #category-list listitem will call the selectCategoryList function
$("#category-list li").click(selectCategoryList);
$("#category-list li").keypress(function (e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    selectCategoryList(e);
  }
});
/*This function will get the variables needed to 
call loadObjectList. After it is called #category-list 
will hide then #object-list and #menu-title span will display*/
function selectCategoryList(e) {
  var target, targetId, objectUrl;
  target = e.target;
  targetId = target.getAttribute("id") || $(this).attr("id");
  objectUrl = "categories/" + targetId;
  //LoadObjectList function is called
  loadObjectList(objectUrl, targetId);
  $("#category-list").hide();
  $("#object-list").empty();
  $("#object-list, #menu-title span").show();
}

/*This function will load new listitems into #object-list
then add new click and keypress functions to these listitems*/
function loadObjectList(objectUrl, cat) {
  //cat = Category Id. e.g. planets, dwarf, moons, other
  //cat = targetId from selectCategoryList function
  $.getJSON(url + objectUrl + ".json").done(function (data) {
    for (var i = 0; i < data[cat].length; i++) {
      var newListItem = `<li id="${i}" tabindex="0">${data[cat][i].name}</li>`;
      $("#object-list").append(newListItem);      
    }
    //selecting a listitem will call the selectObjectList function
      $("#object-list li").click(function (e) {
        selectObjectList(e, cat, data);
      });
      $("#object-list li").keypress(function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
          selectObjectList(e, cat, data);
        }
      });
  });
}

/*This function declares the variables that will be used 
as arguments in displayImage and loadInfoSelection. */
function selectObjectList(e, cat, data) {
  $("#bottom-container").show();
  var target, targetId, objectKey;
  target = e.target;
  targetId = target.getAttribute("id");
  displayImage(targetId, cat, data);
  objectKey = data[cat][targetId].name;
  loadInfoSelection(objectKey, cat);
}

/*When called this function will display an image in
#image img, and #image-modal div img.
A description of the image will be added to #image-modal article,
and the same description will be used in an alt attribute
for the images to be used by screenreaders.*/
function displayImage(i, cat, data) {
  $("#image img").attr("src", data[cat][i].image);
  $("#image img").attr("alt", data[cat][i].alt);
  $("#image-modal img").attr("src", data[cat][i].image);
  $("#image-modal img").attr("alt", data[cat][i].alt);
  $("#image-modal h2").empty().append(data[cat][i].name);
  $("#image-modal p").empty().append(data[cat][i].alt);
}

/*When called this function will get the unique json file 
for each object, and create a list in #info-selection.
When a listitem is selected the selectInfoSelection function
will be called.*/
function loadInfoSelection(objectKey, cat) {
  /*This is a small fix to a problem where tesla roadster has a space.
  Not a big problem now, but may be a future problem if similar objects
  such as Alpha Centauri are later added to this project*/
  if (objectKey === "tesla roadster") {
    objectKey = "teslaRoadster";
  }
  //Get the json file for selected object
  $.getJSON(`assets/js/json/objects/${cat}/${objectKey}.json`).done(function (
    data
  ) {
    $("#info-selection").empty().append(`<h2>${objectKey}</h2><ul></ul>`);

    //add listitems to #info-selection ul.
    for (var propertyKey in data[objectKey]) {
      if(data[objectKey].hasOwnProperty(propertyKey)) {
      var newListItem = `<li tabindex="0">${propertyKey}</li>`;
      $("#info-selection ul").prepend(newListItem);
      $("#info-selection").show();
      //If a user selects a new object at anytime, return to #info-selection.
      $("#display-info").hide();
      $("#row-info").find("*").not("span, span i").remove();
      $("#row-info").hide();
      }
    }

    //Selecting #info-selection ul listitem will call selectInfoSelection
    $("#info-selection ul li").click(function (e) {
      selectInfoSelection(e, data, objectKey);
    });
    $("#info-selection ul li").keypress(function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        selectInfoSelection(e, data, objectKey);
      }
    });
  });
}

/*When called this function will add content to and 
display #display-info, then hide #info-selection.*/
function selectInfoSelection(e, data, objectKey) {
  var target, targetInnerText, key;
  target = e.target;
  targetInnerText = target.innerText.toLowerCase();
  $("#info-selection").hide();
  //Remove all content from #display-info except the span.
  $("#display-info").find("*").not("span, span i").remove();
  $("#display-info").show();
  //This heading is present above all tables in #display-info
  //The hidden reference is for validation purposes
  const tableHeading = `<table>
                            <tr>   
                                <th>Property</th>
                                <th>Value</th>
                                <th>Unit</th>
                                <th style="display:none;">hidden reference</th>
                            </tr>
                        </table>`;

  //the content is different if 'about' is selected. The other two listitems will display tables.
  if (targetInnerText === "about") {
    //if 'about' then display articles
    for (key in data[objectKey][targetInnerText]) {
      if(data[objectKey][targetInnerText].hasOwnProperty(key)) {
      var newArticle = `<article>
                            <h2>${key}</h2>
                            <p>${data[objectKey][targetInnerText][key]}</p>
                        </article>`;
      $("#display-info").append(newArticle);
    }
    }
  } else {
    //else display tables
    $("#display-info")
      .append(`<h3>${targetInnerText}</h3>`)
      //on testing it was not obvious that a user could click a table row, this will make it clearer.
      .append(
        `<p><i class="fas fa-mouse"></i> Click on a table row for more information.</p>`
      )
      .append(tableHeading);
    for (key in data[objectKey][targetInnerText]) {
     if(data[objectKey][targetInnerText].hasOwnProperty(key)) {
      //the 4th <td> is for holding the referenceKeyNumber
      var newRow = `<tr tabindex="0">
                        <td>${key}</td>
                        <td>${data[objectKey][targetInnerText][key][0]}</td>
                        <td>${data[objectKey][targetInnerText][key][1]}</td>
                        <td style="display: none;">${data[objectKey][targetInnerText][key][2]}</td>
                    </tr>`;
      //append new table rows.
      $("#display-info table").append(newRow);
     }
    }

    //When a table row is selected, selectDisplayInfo is called
    $("#display-info tr").click(function (e) {
      selectDisplayInfo(e);
    });
    $("#display-info tr").keypress(function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        selectDisplayInfo(e);
      }
    });
  }

  /*When called this function will hide #display-info then display
  #row-info with new content.*/
  function selectDisplayInfo(e) {
    //Remove all content from #row-info except the span.
    $("#row-info").find("*").not("span, span i").remove();
    var target, referenceKeyNumber, explanationPropertyKey, explanationUnitKey;
    target = e.target;
    referenceKeyNumber = target.childNodes[7].innerHTML;
    //This prevents an error that occured when match was used on [a]
    if (referenceKeyNumber != "[a]") {
      //referenceIndex is used as a key in JSON file
      var referenceIndex = referenceKeyNumber.match(/\d+/)[0];
    }
    $("#display-info").hide();
    $("#row-info").show();
    $("#row-info").append("<table></table>");
    //This clones the selected row
    var cloneTr = target.cloneNode(true);
    $("#row-info table").append(cloneTr);
    //The clone isn't interactive so tabindex is removed
    $("#row-info tr").removeAttr("tabindex");
    //Get explanantions for properties and units
    $.getJSON("assets/js/json/explanation.json").done(function (data) {
      explanationPropertyKey = $("#row-info tr td:first-of-type")
        .text()
        .toLowerCase();
      explanationUnitKey = $("#row-info tr td:nth-child(3)")
        .text()
        .toLowerCase();
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
    //Get references for values used
    $.getJSON("assets/js/json/references.json").done(function (data) {
      var newReference;
      if (referenceKeyNumber === "[a]") {
        newReference = `<p>
                                <span>${referenceKeyNumber}</span> Calculated based upon known parameters
                            </p>
                            <p>
                                <a href='references.html'>Click for full references</a>
                            </p>`;
      } else {
        newReference = `<p>
                                <span>${referenceKeyNumber}</span> ${data[referenceIndex].author}<br>${data[referenceIndex].title} 
                                <a aria-label="open external reference" href="${data[referenceIndex].href}" target="_blank">
                                    <i class='fas fa-external-link-alt'></i>
                                </a>
                            </p><br>
                            <p>
                                <a href='references.html'>Click for full references</a>
                            </p>`;
      }
      $("#row-info").append("<h3>Data Reference</h3>").append(newReference);
    });
  }
}

