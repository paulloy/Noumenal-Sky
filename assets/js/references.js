/*globals $:false */
/*jshint esversion: 6 */

/*Get references.json and add the list of references to references.html.
New references need only be added to references.json to update references.html*/
$.getJSON("assets/js/json/references.json").done(function (data) {
  var key;
  for (key in data) {
    if (data.hasOwnProperty(key)) {
    var referenceId = `[${key}] `;
    var newReference =
      `<p><span>${referenceId}</span>${data[key].author}<br>${data[key].title} <a aria-label="open external reference" href="${data[key].href}" target="_blank"><i class="fas fa-external-link-alt"></i></a></p>`;
    $("#references").append(newReference);
  }
  }
});
        