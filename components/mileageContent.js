var MileageContent = React.createClass({
	
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
			<div>
				<UnitSwitcher isMetric={this.state.isMetric} handleSystemChange={this.handleSystemChange} />
				<MileageData rideData={this.props.rideData} isMetric={this.state.isMetric} />
				<MileageProjector rideData={this.props.rideData} isMetric={this.state.isMetric} />
			</div>
		);
	}
});