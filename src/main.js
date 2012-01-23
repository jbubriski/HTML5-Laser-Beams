window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

(function($) {
	$(function() {
		var $canvas = $('#uxCanvas');
		var objectCount = 10;
		var objects = [];
		var center = { x: 300, y: 300 };
		
		$canvas.on('click', function(e) {
			objects[objectCount] = { x: e.offsetX, y: e.offsetY };
			objectCount++;
		});
		
		for (var i = 0; i < objectCount; i++)
		{
			objects[i] = { x: Math.floor(Math.random() * 600), y: Math.floor(Math.random() * 600), xSpeed: Math.floor(Math.random() * 5), ySpeed: Math.floor(Math.random() * 5) };
		}
		
		draw(objects, center);
	});
})(jQuery);

function draw(objects, center) {
	var canvas = document.getElementById("uxCanvas");
	var context = canvas.getContext("2d");
	
    context.clearRect(0, 0, canvas.width, canvas.height);
	
	drawCircle(context, center, 3);
	
	for(var i = 0; i < objects.length; i++)
	{
		var object = objects[i];
		
		drawCircle(context, object, 1);
		
		if(calculateDistance(center, object) <= 200) {
			drawLine(context, center, object);
		}
		
		objects[i].x += object.xSpeed;
		objects[i].y += object.ySpeed;
		
		if(objects[i].x >= canvas.width || objects[i].x <= 0)
		{
			objects[i].xSpeed *= -1;
		}
		
		if(objects[i].y >= canvas.height || objects[i].y <= 0)
		{
			objects[i].ySpeed *= -1;
		}
	}
	
	requestAnimFrame(function(){
        draw(objects, center);
    });
}

function drawCircle(context, location, radius) {
	context.beginPath();
    context.arc(location.x, location.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#8ED6FF";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
}

function drawLine(context, from, to) {
    context.lineWidth = 1;
	context.moveTo(from.x, from.y);
	context.lineTo(to.x, to.y);
	context.stroke();
}

function calculateDistance(from, to) {
	var xDistance = Math.abs(from.x - to.x);
	var yDistance = Math.abs(from.y - to.y);
	
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}