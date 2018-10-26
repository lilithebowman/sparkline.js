'use strict';
/* sparkline-directive.js */

var sparkline = {
	'sparkline': function ($rootScope, $log) {
		return {
			restrict: 'A',
			scope: true,
			link: function (scope, element, attrs, ngModel) {
				var c = element[0];
				var ctx = c.getContext("2d");
				var data = c.getAttribute("data-sparkline");
				var spark = data.split(',');
				var min = Math.min.apply(Math, spark);
				var max = Math.max.apply(Math, spark);
				for (a in spark) {
					spark[a] = parseInt(spark[a], 10);
					spark[a] += Math.abs(0-min);
				}
				var scale = max - min;
				var margin = 10;
				var ratioW = ( ( c.width - margin*2 ) * 1 ) / spark.length;
				var ratioH = ( ( c.height - margin*2 ) * .8 ) / scale;

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
				angular.forEach(spark, function (option, index) {
					if (index == 0) {
						// First time
						ctx.beginPath();
						ctx.lineWidth = "6";
						ctx.moveTo(10, c.height - ( spark[index] * ratioH + margin ) );
					} else {
						x = index * ratioW + margin;
						y = c.height - ( spark[index] * ratioH + margin );
						ctx.lineTo(x,y);
					}
				});
				ctx.stroke();

				ctx.beginPath();
				ctx.lineWidth = "6";
				ctx.arc(x, y, 8, 0, 2 * Math.PI);
				ctx.fill();
				ctx.stroke();
			}
		};
	}
};

