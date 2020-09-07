(function () {
  emailjs.init("user_Bhu3aze5EPVtC6BlZNdyc");
})();

$("#form").submit(function () {
  return sendEmail(this);
});
$("#form").submit(function () {
  $("#name").attr("disabled", "disabled");
  $("#name").val("");
  $("#email").attr("disabled", "disabled");
  $("#email").val("");
  $("#message").attr("disabled", "disabled");
  $("#message").val("");
  $("#submit").attr("disabled", "disabled");
  $("#submit").val("");
});

function sendEmail(contactForm) {
  emailjs
    .send("gmail", "noumenal_sky_contact", {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value,
    })
    .then(
      function (response) {
        console.log("SUCCESS", response);
      },
      function (error) {
        console.log("balls");
      }
    );
  return false;
}
