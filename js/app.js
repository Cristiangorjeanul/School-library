$(function () {

  var category = $('.category');
  category.find('dd').hide();
  var blink = $('.blink');

  function blinkNews() {
    $('.blink').fadeOut(1000);
    $('.blink').fadeIn(1000);
  }
  setInterval(blinkNews, 2500);

  category.find('dt').on('click', function () {
    // toggle hide an element if is visible
    // or display the element if is not visible
    $(this).next().toggle();
  });



});