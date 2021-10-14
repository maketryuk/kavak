// Nav Dropdowns =====>
$(".nav .dropdown__trigger").click(function() {
  $(".nav .dropdown__trigger").not($(this)).removeClass('active');
  $(".nav .dropdown-list").not($(this).parent().find('.dropdown-list')).removeClass('active');
});

$(document).mouseup(function (e){
  var div = $(".nav .dropdown__trigger");
  if (!div.is(e.target)
      && div.has(e.target).length === 0) {
    $('.nav .dropdown-list').removeClass('active');
    $('.nav .dropdown__trigger').removeClass('active');
  }
  
  var div = $(".sort .dropdown__trigger");
  if (!div.is(e.target)
      && div.has(e.target).length === 0) {
    $('.sort .dropdown-list').removeClass('active');
    $('.sort .dropdown__trigger').removeClass('active');
  }
});

// Burger =====>
$(function() {
  $('.burger').click(function() {
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
  });
});

// Popup =====>
$('.postal__trigger').click(function () {
  $('.popup').addClass('active');
  $('.overlay').addClass('active');
});

$('.overlay').click(function () {
  $('.popup').removeClass('active');
  $('.overlay').removeClass('active');
});

$('.modal-close').click(function () {
  $('.popup').removeClass('active');
  $('.overlay').removeClass('active');
});

// Ayuda =====>
$('.ayuda .close').click(function () {
  $(this).parent().removeClass('active');
})