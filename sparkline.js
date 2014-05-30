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
	var ratioW = ( c.width * 1 ) / spark.length;
	var ratioH = ( c.height * .8 ) / Math.max.apply(Math, spark);
	var margin = 10;
	
	var x = 0;
	var y = 0;
	var strokeColour = "#007AC9";  // Initial path colour
	ctx.beginPath();
	ctx.fillStyle = "#007AC9"; // Fill colour
	ctx.lineWidth = "6";
	ctx.strokeStyle = "#007AC9";  // Stroke colour
	ctx.arc(margin, spark[0] * ratioH + margin, 8, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	for (index in spark) {
		ctx.fillStyle = "transparent";
		if (index == 0) {
			// First time
			ctx.beginPath();
			ctx.lineWidth = "6";
			ctx.moveTo(10, spark[index] * ratioH + margin);
		} else {
			/* Set up the colour based on how far right in the graph we are */
			if (index / spark.length > .5) {
				ctx.strokeStyle = "#00a6c9";  // Second stroke colour
			} else if (index / spark.length > .75) {
				ctx.strokeStyle = "#00c9c7";  // Third stroke colour
			} else if (index / spark.length > .85) {
				ctx.strokeStyle = "#00c993";  // Fourth stroke colour
			} else if (index / spark.length > .95) {
				ctx.strokeStyle = "#00c972";  // Fifth stroke colour
			}
			x = index * ratioW + margin;
			y = spark[index] * ratioH + margin;
			/* Draw the line */
			ctx.beginPath();
			ctx.moveTo((index - 1) * ratioW + margin, spark[index - 1] * ratioH + margin);
			ctx.lineTo(x, y);
			/* Draw a circle at the vertex to avoid a broken line */
			if (index / spark.length > .5) {
				ctx.fillStyle = "#00a6c9";  // Second fill colour
			} else if (index / spark.length > .75) {
				ctx.fillStyle = "#00c9c7";  // Third fill colour
			} else if (index / spark.length > .85) {
				ctx.fillStyle = "#00c993";  // Fourth fill colour
			} else if (index / spark.length > .95) {
				ctx.fillStyle = "#00c972";  // Fifth fill colour
			}
			ctx.arc(x, y, .5, 0, 2 * Math.PI);
			ctx.stroke();
		}
	}


	ctx.beginPath();
	ctx.fillStyle = "#00c972"; // Fill colour
	ctx.lineWidth = "6";
	ctx.strokeStyle = "#00c972";  // Stroke colour
	ctx.arc(x, y, 8, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
};

var _sparklines_ = document.querySelectorAll('.sparkline');
for (i = 0; i < _sparklines_.length; i++) {
	sparkline(_sparklines_[i]);
};
