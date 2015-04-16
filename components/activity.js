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
			<div className="activity">
				<h2><a href={activityURL}>{this.props.activity.name}</a></h2>
				<p className="who">{this.props.activity.athlete.firstname} {this.props.activity.athlete.lastname}</p>
				<p><img src={mapImageURL} /></p>
				<ul>
					<li>Time started: {this.props.activity.start_date_local}</li>
					<li>Ride time: {this.props.activity.moving_time}</li>
					<li>Ride distance: {this.props.activity.distance}</li>
				</ul>
			</div>
		);
		
	}
	
});