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
