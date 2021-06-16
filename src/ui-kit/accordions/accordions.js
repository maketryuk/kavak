$(function() {
  $('.accordion__header').click(function() {
        
    $(".accordion__body").not($(this).next()).slideUp(400);
    $(this).next().slideToggle(400);
    
    $(".accordion__item").not($(this).closest(".accordion__item")).removeClass("accordion-active");
    $(this).closest(".accordion__item").toggleClass("accordion-active");
  });
});