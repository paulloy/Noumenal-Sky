/*globals $:false */
/*jshint esversion: 6 */
var emailjs;

//This allows a user to send an email using Email.js
(function () {
  emailjs.init("user_Bhu3aze5EPVtC6BlZNdyc");
})();

$("#form").submit(function () {
  return sendEmail(this); //Send email on form submit.
});
$("#form").submit(function () {
  //After submission, disable and clear the form so that multiple emails are not sent and a user knows the message was successfully sent.
  $("#name, #email, #message, #submit").attr("disabled", "disabled").val("");
});

function sendEmail(contactForm) {
  emailjs.send("gmail", "noumenal_sky_contact", {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value,
  });
  return false;
}
