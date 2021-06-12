$(function () {
  // $('.accordions__title:first').css('display', 'block');
  $('.accordions__title').click(function () {
      $(this).next().slideToggle(300);
      $(this).toggleClass('accordions__title--active');
      $('.accordions__content').not($(this).next()).slideUp(300);
  });
});