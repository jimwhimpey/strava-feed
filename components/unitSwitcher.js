var UnitSwitcher = React.createClass({
	
	getInitialState: function() {
		return { isMetric: this.props.isMetric };
	},
	
	handleSystemChange: function(e) {
		this.setState({ isMetric: e });
		this.props.handleSystemChange(e);
	},
	
	render: function() {
		return (
			<div className="unitSwitcher">
				<button className={(this.state.isMetric) ? 'selected' : ''} onClick={this.handleSystemChange.bind(null, true)}>metric</button>
				<button className={(!this.state.isMetric) ? 'selected' : ''} onClick={this.handleSystemChange.bind(null, false)}>imperial</button>
			</div>
		);
	}
	
});