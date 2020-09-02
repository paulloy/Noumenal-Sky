$.getJSON("assets/js/json/references.json").done(function (data) {
  for (key in data) {
    var referenceId = "[" + key + "] ";
    var newReference =
      "<p><span>" +
      referenceId +
      "</span>" +
      data[key].author +
      "<br>" +
      data[key].title +
      ' <a href="' +
      data[key].href +
      '" target="_blank"><i class="fas fa-external-link-alt"></i></a></p>';
    $("#references").append(newReference);
  }
});
