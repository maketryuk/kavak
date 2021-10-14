$('.dropdown__trigger').click(function() {
  $(this).toggleClass('active');
  $(this).parent().find('.dropdown-list').toggleClass('active');
});

$('.brand__trigger label').click(function () {
  $(this).parent().parent().find('.brand-list').toggleClass('active');
})

$('.year-item').click(function () {
  $(this).toggleClass('active');
})