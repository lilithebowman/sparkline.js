;// sparkline.js - draws a canvas sparkline

/* Usage: <canvas class="sparkline" data-sparkline="1,2,7,5,2,9,10,3,7,8">Your browser does not support the HTML5 canvas tag.</canvas> */
/* Where data-sparkline is a list of values representing the data to be displayed. */

function max(array) {
	return Math.max.apply(Math, array);
};

function sparkline(obj) {
	var c = obj;
	var ctx = c.getContext("2d");
	var data = c.getAttribute("data-sparkline");
	var spark = data.split(',');
	for (a in spark) {
		spark[a] = parseInt(spark[a], 10);
	}
	var ratioW = ( ( c.width - margin*2 ) * 1 ) / spark.length;
	var ratioH = ( ( c.height - margin*2 ) * .8 ) / Math.max.apply(Math, spark);
	var margin = 10;
	
	var x = 0;
	var y = 0;
	var grad = ctx.createLinearGradient(0, 0, c.width, c.height);
	grad.addColorStop(0, "#007AC9");  // Initial path colour
	grad.addColorStop(1, "#00c972");  // End stroke colour

	ctx.strokeStyle = grad;
	ctx.fillStyle = grad;
	
	ctx.beginPath();
	ctx.lineWidth = "6";
	ctx.arc(margin, c.height - ( spark[0] * ratioH + margin ), 8, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	for (index in spark) {
		if (index == 0) {
			// First time
			ctx.beginPath();
			ctx.lineWidth = "6";
			ctx.moveTo(margin, c.height - ( spark[index] * ratioH + margin ) );
		} else {
			x = index * ratioW + margin;
			y = c.height - ( spark[index] * ratioH + margin );
			ctx.lineTo(x,y);
		}
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "6";
	ctx.arc(x, y, 8, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
};

var _sparklines_ = document.querySelectorAll('.sparkline');
for (i = 0; i < _sparklines_.length; i++) {
	sparkline(_sparklines_[i]);
};
