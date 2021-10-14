$('.filters__trigger').click(function () {
  $(this).toggleClass('active');
  $('.filters').toggleClass('active');
  $('.product').toggleClass('active');
  $('.filters .dropdown-list').removeClass('active');
  $('.filters .dropdown__trigger').removeClass('active');
})

$('.filters__trigger.brand').click(function () {
  $('.dropdown__trigger.brand').toggleClass('active');
  $('.dropdown-list.brand').toggleClass('active');
})

$('.filters__trigger.year').click(function () {
  $('.dropdown__trigger.year').toggleClass('active');
  $('.dropdown-list.year').toggleClass('active');
})

$('.filters__trigger.price').click(function () {
  $('.dropdown__trigger.price').toggleClass('active');
  $('.dropdown-list.price').toggleClass('active');
})

if (window.matchMedia("(max-width: 991px)").matches) {
  $('.filters').removeClass('active');
  $('.filters__trigger').click(function () {
    $('body').toggleClass('lock');
  })
  
} else {
  $('.filters__trigger').click(function () {
    if ($(this).hasClass('active')) {
      $(this).children('span').text('Ocultar Filtros')
    } else {
      $(this).children('span').text('Mostrar Filtros')
    }
  })
}