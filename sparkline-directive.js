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
                var strokeColour = "#007AC9";  // Initial path colour
                ctx.beginPath();
                ctx.fillStyle = "#007AC9"; // Fill colour
                ctx.lineWidth = "6";
                ctx.strokeStyle = "#007AC9";  // Stroke colour
                ctx.arc(margin, spark[0] * ratioH + margin, 8, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                angular.forEach(spark, function (option, index) {
                    if (index == 0) {
                        // First time
                        ctx.beginPath();
                        ctx.lineWidth = "6";
                        ctx.moveTo(10, spark[index] * ratioH + margin);
                        ctx.fillStyle = "transparent";
                    } else {
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
                        ctx.beginPath();
                        ctx.moveTo((index - 1) * ratioW + margin, spark[index - 1] * ratioH + margin);
                        ctx.lineTo(x, y);
                        ctx.stroke();
                    }
                });

                ctx.beginPath();
                ctx.fillStyle = "#00c972"; // Fill colour
                ctx.lineWidth = "6";
                ctx.strokeStyle = "#00c972";  // Stroke colour
                ctx.arc(x, y, 8, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        };
    }
};

