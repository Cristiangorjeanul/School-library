$(function () {

  var category = $('.page');
  category.find('dd').hide();

  category.find('dt').on('click', function () {
    // toggle hide an element if is visible
    // or display the element if is not visible
    $(this).next().toggle();
  });



});