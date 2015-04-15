// Gets the number in a format we want
function formatNumber(meters, format, scale, isMetric) {
	
	var factor, distance;
	
	// Switch based on scale and system
	if (scale === 'big') {
		units = (isMetric) ? 'km' : 'mi';
		distance = (isMetric) ? meters/1000 : ((meters/1000) * 0.6214);
	} else {
		units = (isMetric) ? 'm' : 'ft';
		distance = (isMetric) ? meters : (meters * 3.28084);
	}
	
	// Format it
	return numeral(distance).format(format) + units;
	
};