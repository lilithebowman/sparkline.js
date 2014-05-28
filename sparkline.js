;// sparkline.js - draws a canvas sparkline

/* Usage: <canvas class="sparkline" data-sparkline="1,2,7,5,2,9,10,3,7,8">Your browser does not support the HTML5 canvas tag.</canvas> */
/* Where data-sparkline is a list of values representing the data to be displayed. */

function max(array) {
    return Math.max.apply(Math, array);
};

function sparkline(obj) {
    var c = obj;
    console.log(c);
    var ctx = c.getContext("2d");
    var data = c.getAttribute("data-sparkline");
    var spark = data.split(',');
    for (a in spark) {
        spark[a] = parseInt(spark[a], 10);
    }
    var ratioW = c.width / spark.length;
    var ratioH = c.height / max(spark);
    console.log(ratioW + ', ' + ratioH);

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "green";  // Green path
    for (i = 0; i < spark.length; i++) {
        if (i == 0) {
            // First time
            ctx.moveTo(0, spark[i] * ratioH);
        } else {
            ctx.lineTo(i * ratioW, spark[i] * ratioH);
        }
    }
    ctx.stroke();  // Draw it
};

var _sparklines_ = document.querySelectorAll('.sparkline');
for (i = 0; i < _sparklines_.length; i++) {
    sparkline(_sparklines_[i]);
};