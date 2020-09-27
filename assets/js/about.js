//When .question is selected, .paragraph will slideToggle
$('.question').click(function () {
  $(this).next().slideToggle();
});
$('.question').keypress(function (e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    $(this).next().slideToggle();
  }
});

/*When #view-contact is clicked:
#view-contact and #faq will hide.
#view-faq and #form will hide.*/
$('#view-contact').click(function () {
  $(this).hide();
  $('#faq').hide();
  $('#view-faq, #form').show();
});
/*When #view-faq is clicked:
#view-faq and #form will hide.
#faq and #view-contact will hide.*/
$('#view-faq').click(function () {
  $(this).hide();
  $('#form').hide();
  $('#faq, #view-contact').show();
});

/*On the resizing of the body:
If the innerWidth of the window is greater than 900 px,
then the style attribute of #faq, #form, #view-faq, and #view-contact,
will be removed.
This is so about.css will display instead of inline styling.*/
document.getElementsByTagName('body')[0].onresize = function () {
  if (window.innerWidth > 900) {
    $('#faq, #form, #view-faq, #view-contact').removeAttr('style');
  }
};
