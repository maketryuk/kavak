$(function() {
  $('.burger').click(function() {
    $('.burger').toggleClass('burger--active');
    $('body').toggleClass('lock');
  });
});