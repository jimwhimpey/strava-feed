var Feed = React.createClass({
	
	displayName: 'Feed',
	
	getInitialState: function() {
		return { isMetric: this.props.isMetric };
	},
	
	componentWillReceiveProps: function(nextProps) {
		this.setState({ isMetric: nextProps.isMetric });
	},
	
	render: function() {
		
		var activities = [];
		
		for (var i = 0; i < this.props.activities.length; i++) {
			activities.push(<Activity activity={this.props.activities[i]} />);
		}
		
		return <div className="feed">{activities}</div>;

	}
	
});