// ===============================================
// Requirements
// ===============================================

	var express = require('express'),
		app = express(),
		sass = require('node-sass'),
		handlebars = require('express-hbs'),
		https = require('https'),
		querystring = require('querystring'),
		moment = require('moment'),
		cookieParser = require('cookie-parser'),
		numeral = require('numeral');


// ===============================================
// Setup handlebars and SASS
// ===============================================

	handlebars.registerHelper('formatNumber', function(meters, format, scale, isMetric) {
		
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
		
	});
	
	app.engine('hbs', handlebars.express3({
		partialsDir: __dirname + '/views/partials',
		layoutsDir: __dirname + '/views/layouts',
		defaultLayout: __dirname + '/views/layouts/default.hbs'
	}));

	app.set('view engine', 'hbs');
	app.set('views', __dirname + '/views');
	
	sass.renderSync({
		file: __dirname + '/styles/desktop.scss',
		outFile: __dirname + '/public/desktop.css',
		outputStyle: 'compressed'
	});

	app.use(express.static(__dirname + '/public'));
	
	// Cookies!
	app.use(cookieParser('annualmileage'));


// ===============================================
// Routes
// ===============================================

	app.get('/', function(req, pageResponse) {
		
		// Check if we have a cookie holding the auth token
		if (req.cookies.annualMileageToken) {
			
			// Get this user's list of activities from the start of the year
			var activityRequest = https.get({
				host: 'www.strava.com',
				port: 443,
				path: '/api/v3/athlete/activities?after=' + moment(moment().year() + "-01-01").format("X"),
				headers: {
					Authorization: 'Bearer ' + req.cookies.annualMileageToken
				}
			}, function(activityResponse) {
				
				var data = "",
				    ytdDistance = 0,
				    ytdElevation = 0,
				    ytdDistancePerDay = 0,
				    ytdElevationPerDay = 0,
				    dayOfYear = moment().dayOfYear(),
				    monthOfYear = moment().month() + 1,
				    daysInYear = (moment().isLeapYear()) ? 366 : 365,
				    daysLeftInYear = daysInYear - dayOfYear,
				    rideData;

				activityResponse.on('data', function (chunk) { data += chunk; });
				
				activityResponse.on('end', function () {
					
					// Loop through all the activities
					JSON.parse(data).forEach(function(activity) {
						
						// Only if this activity is a ride
						if (activity.type === "Ride") {
							ytdDistance = ytdDistance + activity.distance;
							ytdElevation = ytdElevation + activity.total_elevation_gain;
						}
						
					});
					
					// Calculate YTD
					ytdDistancePerDay = ytdDistance / dayOfYear;
					ytdElevationPerDay = ytdElevation / dayOfYear;

					rideData = {
						ytdDistance: ytdDistance,
						ytdElevation: ytdElevation,
						ytdDistancePerDay: ytdDistancePerDay,
						ytdElevationPerDay: ytdElevationPerDay,
						ytdDistancePerWeek: ytdDistancePerDay * 7,
						ytdElevationPerWeek: ytdElevationPerDay * 7,
						daysLeftInYear: daysLeftInYear,
						projectedAnnualDistance: ytdDistancePerDay * daysLeftInYear,
						projectedAnnualElevation: ytdElevationPerDay * daysLeftInYear
					};

					// Put it all out on the page
					pageResponse.render('mileage-page', {
						rideData: rideData,
						rideDataForTemplate: JSON.stringify(rideData)
					});
					
				});

			});
			
		} else {
			// No cookie, homepage with a connect to Strava link
			pageResponse.render('home-page', {
				host: req.headers.host
			});
		}
		
	});
	
	app.get('/token_exchange', function(req, res) {
		
		var data = "";
		
		// Setup data to pass
		var postData = querystring.stringify({
			client_id: '1417',
			client_secret: '31f4b47f603ee7edddae2a88c00d166f401b4ee4',
			code: req.query.code
		});

		// Setup the request
		var tokenRequest = https.request({
			hostname: 'www.strava.com',
			port: 443,
			path: '/oauth/token',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': postData.length
			}
		}, function(tokenResponse) {
			
			tokenResponse.on('data', function (chunk) { data += chunk; });
			
			tokenResponse.on('end', function() {
				if (JSON.parse(data).access_token) {
					// Remember the access token on the cookie
					res.cookie('annualMileageToken', JSON.parse(data).access_token);
				}
				// Redirect to the homepage
				res.redirect('/');
			});
			
		});
		
		// Post the data
		tokenRequest.write(postData);
		tokenRequest.end();

	});
	
	// Just deletes the cookie
	app.use('/logout', function(req, res) {
		res.clearCookie('annualMileageToken');
		res.redirect('/');
	});
	
	// Static build directory serving
	app.use('/build', express.static(__dirname + '/build'));


// ===============================================
// Just a HTTP server
// ===============================================

	var server = app.listen(process.env.PORT || 3000, function () {
		console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
	});