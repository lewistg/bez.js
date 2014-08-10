/**
Utility functions for choose.
*/
var choose = function(n, k) {
	// TODO: Find out if this is necessary.
	if (k == 0) {
		return 1;
	}

	var prod = 1;
	for (var i = 1; i <= (n - k); i++) {
		prod *= k + i;
		prod /= i;
	}
	return prod;
};

var Bezier = function(ctrlPoints) {
	this.ctrlPoints = ctrlPoints;
	this.bernPoly = []

	var n = ctrlPoints.length - 1;
	for (var i = 0; i <= n; i++) {
		this.bernPoly.push(
			(function(i) {
				var leadingCoeff = choose(n, i)
				return function(t) {
					return leadingCoeff * Math.pow(t, i) * Math.pow(1 - t, n - i)
				}
			})(i)
		);
	}
};

Bezier.prototype.getPoint = function(t) {
	var x = 0;
	var y = 0;
	for (var i = 0; i < this.ctrlPoints.length; i++) {
		var coeff = this.bernPoly[i](t);
		x += coeff * this.ctrlPoints[i].x;
		y += coeff * this.ctrlPoints[i].y;
	}

	return {
		x: x,
		y: y
	};
};
