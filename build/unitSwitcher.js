var UnitSwitcher = React.createClass({displayName: "UnitSwitcher",
	
	getInitialState: function() {
		return { isMetric: this.props.isMetric };
	},
	
	handleSystemChange: function(e) {
		this.setState({ isMetric: e });
		this.props.handleSystemChange(e);
	},
	
	render: function() {
		return (
			React.createElement("div", {className: "unitSwitcher"}, 
				React.createElement("button", {className: (this.state.isMetric) ? 'selected' : '', onClick: this.handleSystemChange.bind(null, true)}, "metric"), 
				React.createElement("button", {className: (!this.state.isMetric) ? 'selected' : '', onClick: this.handleSystemChange.bind(null, false)}, "imperial")
			)
		);
	}
	
});