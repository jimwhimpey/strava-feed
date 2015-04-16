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
		
		return (
			<div>{this.props.activity.name}</div>
		);
		
	}
	
});