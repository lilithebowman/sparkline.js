'use strict';
/* sparkline-directive.js */

var sparkline = {
	'sparkline': function ($rootScope, $log) {
		return {
			restrict: 'A',
			scope: true,
			link: function (scope, element, attrs, ngModel) {
				//TODO: MAKE THIS DATA REAL!
				var spark = [1, 2, 7, 5, 2, 9, 10, 3, 7, 8];

				//TODO: DELETE THE FOLLOWING LINES TO REMOVE THE RANDOM GRAPH DATA
				var i;
				for (i = 0; i < 10; i++) {
					spark[i] = Math.random(10);
				}

				var c = element[0];
				var ctx = c.getContext("2d");
				var ratioW = ( c.width * 1 ) / spark.length;
				var ratioH = (c.height * .8) / Math.max.apply(Math, spark);
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

