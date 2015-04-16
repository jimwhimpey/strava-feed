var FeedContent = React.createClass({displayName: "FeedContent",
	
	getInitialState: function() {
		// Read from local storage if we have it
		var isMetric = (typeof localStorage.getItem('isMetric') === "undefined") ? true : localStorage.getItem('isMetric');
		return { isMetric: (isMetric === "false") ? false : true };
	},
	
	handleSystemChange: function(e) {
		// Update local storage
		localStorage.setItem('isMetric', e);
		// Update state
		this.setState({isMetric: e});
		return;
	},
	
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(Feed, {activities: this.props.activities, isMetric: this.state.isMetric})
			)
		);
	}
});