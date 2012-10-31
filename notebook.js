$(function() {
  $('body').append('HAHAHA');
});

$('#mag').width($('#thumb').width() / ($('#zoomed').width() / $('#thumb').width()));
$('#mag').height($('#thumb').height() / ($('#zoomed').height() / $('#thumb').height()));

$('#container_thumb').mousemove(function(event) {
  var thumbOffset = $(this).offset();   
  
  var thumbLeft = event.pageX - thumbOffset.left;
  var thumbTop = event.pageY - thumbOffset.top;
  var thumbWidth = $('#thumb').width();
  var thumbHeight = $('#thumb').height()
    
    
  var magWidth = $('#mag').width();
  var magHeight = $('#mag').height();
   
  var magLeft = thumbLeft-magWidth/2
  var magTop = thumbTop-magHeight/2;

  if (magLeft <= 0) magLeft = 0;
  if (magTop <= 0) magTop = 0;
  if (magLeft > $('#thumb').width()-magWidth) magLeft = thumbWidth-magWidth
  if (magTop > $('#thumb').height()-magHeight) magTop = thumbHeight-magHeight 
    
  $('#mag').css('left',magLeft);
  $('#mag').css('top',magTop); 

  
  var fractionOffsetLeft = -magLeft*(($('#zoomed').width())/thumbWidth);
  var fractionOffsetTop = -magTop*(($('#zoomed').height())/thumbHeight);
  $('#zoomed').css('left',fractionOffsetLeft);
  $('#zoomed').css('top',fractionOffsetTop);
});