Usage:

1. 
<a href="[fullsize image]" class="zoom">
	<img src="[thumbnail]" />
</a>

2.
$(document).ready(function() {
	$('.zoom').zoomify({
		'width':500, //optional, default is 500px
		'height':500, //optional, default is 500px
		'opacity':0.3 //optional, default is 0.3
	});
});

To see the plugin in action: http://dev.ghost.no/demo/trond/zoomify/example.html