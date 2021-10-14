$('.sort-btn').click(function () {
  var selectItem = $(this).text();
  
  $(this).addClass('active');
  $('.sort .dropdown__trigger').parent().find('.dropdown-list').removeClass('active');
  $('.sort-btn').not($(this)).removeClass('active');
  $('.sort .select-value').text(selectItem);
  $('body').removeClass('lock');
});

if (window.matchMedia("(max-width: 991px)").matches) {
  // Fixed header on scroll =====>
  $(window).scroll(function () {
    let offsetItem1 = $('.header-main').height()

    if ($(this).scrollTop() > offsetItem1 ) {
      $('.header-main').addClass('fixed');
    } else {
      $('.header-main').removeClass('fixed');
    }
  });
  $('.sort .dropdown__trigger').click(function () {
    $('body').toggleClass('lock');
  });
  $('.sort__trigger').click(function () {
    $('.sort .dropdown-list').removeClass('active');
    $('body').removeClass('lock');
  });
} else {
  $('.sort .dropdown__trigger').click(function () {
    $('body').removeClass('lock');
  });
  // Fixed header on scroll =====>
  $(window).scroll(function () {
    let offsetItem1 = $('.header-main').height()

    if ($(this).scrollTop() > offsetItem1 ) {
      $('.header-search').addClass('fixed');
    } else {
      $('.header-search').removeClass('fixed');
    }
  });
}