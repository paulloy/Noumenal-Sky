/*globals $:false */
/*jshint esversion: 6 */

//This allows a user to send an email using Email.js
let emailjs;
(function () {
  emailjs.init("user_Bhu3aze5EPVtC6BlZNdyc");
})();

$("#form").submit(function () {
  //After submission, disable and clear the form so that multiple emails are not sent and a user knows the message was successfully sent.
  $("#name, #email, #message, #submit").attr("disabled", "disabled").val("");
  return sendEmail(this); //Send email on form submit.
});
$("#form").submit(function () {});

function sendEmail(contactForm) {
  emailjs.send("gmail", "noumenal_sky_contact", {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value,
  });
  return false;
}
