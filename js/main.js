"use strict";

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
}); // Slider Price =====>

$("#slider-range-price").slider({
  range: true,
  orientation: "horizontal",
  min: 72.999,
  max: 1614,
  values: [0, 1614],
  step: 1,
  slide: function slide(event, ui) {
    if (ui.values[0] == ui.values[1]) {
      return false;
    }

    $("#min_price").val(ui.values[0]);
    $("#max_price").val(ui.values[1]);
  }
}); // Slider KM =====>

$("#slider-range-km").slider({
  range: true,
  orientation: "horizontal",
  min: 600,
  max: 193500,
  values: [0, 193500],
  step: 1,
  slide: function slide(event, ui) {
    if (ui.values[0] == ui.values[1]) {
      return false;
    }

    $("#min_km").val(ui.values[0]);
    $("#max_km").val(ui.values[1]);
  }
}); // Search Brands =====>

$(document).ready(function () {
  $(".brand .i-search").keyup(function () {
    var filter = $(this).val(),
      count = 0;
    $(".brand .checkbox-custom-label").each(function () {
      if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).parent().parent().addClass('hide');
      } else {
        $(this).parent().parent().removeClass('hide');
        count++;
      }
    });
  });
});

// Active Filters =====>
$(function () {
  var filteredItems = [];
  var results = $('.active-list');
  $(document).on('click', '.checkbox-custom-label', function () {
    var item = $(this).text();
    $(this).toggleClass('active');

    if (!filteredItems.includes(item)) {
      filteredItems.push(item);
      results.append("<li class=\"active-item\"><button class=\"active-btn\"><span>".concat(item, "</span><i class=\"icon-close\"></i></button></li>"));
    } else {
      filteredItems.splice(filteredItems.indexOf(item), 1);
      var activeFilterText = $('.active-list li');
      activeFilterText.each(function () {
        if ($(this).text() === item) {
          $(this).remove();
        }
      });
    }
  });
  $(document).on('click', '.active-list li', function () {
    var thisText = $(this).text();
    var filterText = $('.checkbox-custom-label');
    filterText.each(function () {
      if ($(this).text() === thisText) {
        filteredItems.splice(filteredItems.indexOf(thisText), 1);
        $(this).removeClass('active');
        $(this).parent().next('.brand-list').removeClass('active');
        $(this).prev().prop('checked', false);
      }
    });
    $(this).remove();
  });
  $(document).on('click', '.filters__reset', function () {
    filteredItems = [];
    $('.checkbox-custom-label').removeClass('active');
    $('.active-list li').remove();
  });

  if ($('.active-list').length > 0) {
    $('.active-list').css('display', 'flex');
  } else {
    $('.active-list').css('display', 'none');
  }
});

$('.filters__trigger').click(function () {
  $(this).toggleClass('active');
  $('.filters').toggleClass('active');
  $('.product').toggleClass('active');
  $('.filters .dropdown-list').removeClass('active');
  $('.filters .dropdown__trigger').removeClass('active');
});
$('.filters__trigger.brand').click(function () {
  $('.dropdown__trigger.brand').toggleClass('active');
  $('.dropdown-list.brand').toggleClass('active');
});
$('.filters__trigger.year').click(function () {
  $('.dropdown__trigger.year').toggleClass('active');
  $('.dropdown-list.year').toggleClass('active');
});
$('.filters__trigger.price').click(function () {
  $('.dropdown__trigger.price').toggleClass('active');
  $('.dropdown-list.price').toggleClass('active');
});

if (window.matchMedia("(max-width: 991px)").matches) {
  $('.filters').removeClass('active');
  $('.filters__trigger').click(function () {
    $('body').toggleClass('lock');
  });
} else {
  $('.filters__trigger').click(function () {
    if ($(this).hasClass('active')) {
      $(this).children('.title').text('Ocultar Filtros');
    } else {
      $(this).children('.title').text('Mostrar Filtros');
    }
  });
}

// Nav Dropdowns =====>
$(".nav .dropdown__trigger").click(function () {
  $(".nav .dropdown__trigger").not($(this)).removeClass('active');
  $(".nav .dropdown-list").not($(this).parent().find('.dropdown-list')).removeClass('active');
});
$(document).mouseup(function (e) {
  var div = $(".nav .dropdown__trigger");

  if (!div.is(e.target) && div.has(e.target).length === 0) {
    $('.nav .dropdown-list').removeClass('active');
    $('.nav .dropdown__trigger').removeClass('active');
  }

  var div = $(".sort .dropdown__trigger");

  if (!div.is(e.target) && div.has(e.target).length === 0) {
    $('.sort .dropdown-list').removeClass('active');
    $('.sort .dropdown__trigger').removeClass('active');
  }
}); // Burger =====>

$(function () {
  $('.burger').click(function () {
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
  });
}); // Popup =====>

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
});

$('.dropdown__trigger').click(function () {
  $(this).toggleClass('active');
  $(this).parent().find('.dropdown-list').toggleClass('active');
});
$('.brand__trigger label').click(function () {
  $(this).parent().parent().find('.brand-list').toggleClass('active');
});
$('.year-item').click(function () {
  $(this).toggleClass('active');
});

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
    var offsetItem1 = $('.header-main').height();

    if ($(this).scrollTop() > offsetItem1) {
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
  }); // Fixed header on scroll =====>

  $(window).scroll(function () {
    var offsetItem1 = $('.header-main').height();
    var offsetItem2 = $('.header-search').height();

    if ($(this).scrollTop() > offsetItem1 + offsetItem2) {
      $('.header-search').addClass('fixed');
    } else {
      $('.header-search').removeClass('fixed');
    }
  });
}
