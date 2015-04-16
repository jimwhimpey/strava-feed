var Activity = React.createClass({
	
	displayName: 'Activity',
	
	getInitialState: function() {
		return { isMetric: this.props.isMetric };
	},
	
	componentWillReceiveProps: function(nextProps) {
		this.setState({ isMetric: nextProps.isMetric });
	},
	
	render: function() {
		
		console.log(this.props.activity);
		var mapImageURL = "http://maps.googleapis.com/maps/api/staticmap?sensor=false&maptype=%7B0%7D&size=150x150&path=weight:3%7Ccolor:pink%7Cenc:" + this.props.activity.map.summary_polyline,
		    activityURL = "https://www.strava.com/activities/" + this.props.activity.id;
		
		return (
			React.createElement("div", {className: "activity"}, 
				React.createElement("h2", null, React.createElement("a", {href: activityURL}, this.props.activity.name)), 
				React.createElement("p", {className: "who"}, this.props.activity.athlete.firstname, " ", this.props.activity.athlete.lastname), 
				React.createElement("p", null, React.createElement("img", {src: mapImageURL})), 
				React.createElement("ul", null, 
					React.createElement("li", null, "Time started: ", this.props.activity.start_date_local), 
					React.createElement("li", null, "Ride time: ", this.props.activity.moving_time), 
					React.createElement("li", null, "Ride distance: ", this.props.activity.distance)
				)
			)
		);
		
	}
	
});