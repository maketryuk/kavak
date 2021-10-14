// More Filters =====>
$('.more__trigger').click(function () {
  $(this).toggleClass('active');
  $(this).parent().find('.more-list').toggleClass('active');
  if ($(this).hasClass('active')) {
    $(this).children('span').text('Menos filtros');
  } else {
    $(this).children('span').text('Más filtros');
  }
});

$('.filters-apply').click(function () {
  $('.filters').removeClass('active');
  $('body').removeClass('lock');
});

// Slider Price =====>
$("#slider-range-price").slider({
  range: true,
  orientation: "horizontal",
  min: 72.999,
  max: 1614,
  values: [0, 1614],
  step: 1,

  slide: function (event, ui) {
    if (ui.values[0] == ui.values[1]) {
      return false;
    }
    
    $("#min_price").val(ui.values[0]);
    $("#max_price").val(ui.values[1]);
  }
});

// Slider KM =====>
$("#slider-range-km").slider({
  range: true,
  orientation: "horizontal",
  min: 600,
  max: 193500,
  values: [0, 193500],
  step: 1,

  slide: function (event, ui) {
    if (ui.values[0] == ui.values[1]) {
      return false;
    }
    
    $("#min_km").val(ui.values[0]);
    $("#max_km").val(ui.values[1]);
  }
});

// Active Filters =====>
const filterList = []

$('.checkbox-custom-label').click(function () {
  var checkbox = $(this).text();
  if (filterList.includes(checkbox)) {
    null
  } else {
    $('.active-list').append('<li class="active-item"><button class="active-btn"><span>' + checkbox + '</span><i class="icon-close"></i></button></li>')
  }

  filterList.push(checkbox);

  $(document).on('click', '.active-item', function() {
    $(this).remove();
  })



  
  if ($('.active-list').length > 0) {
    $('.active-list').css('display', 'flex');
  } else {
    $('.active-list').css('display', 'none');
  }
})