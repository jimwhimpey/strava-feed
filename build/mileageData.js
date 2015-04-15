var MileageData = React.createClass({
	
	displayName: 'MileageData',
	
	getInitialState: function() {
		return { isMetric: this.props.isMetric };
	},
	
	componentWillReceiveProps: function(nextProps) {
		this.setState({ isMetric: nextProps.isMetric });
	},
	
	render: function() {
		return (
			React.createElement("div", {className: "mileageData"}, 
				
				React.createElement("table", null, 
				
					React.createElement("tr", null, 
						React.createElement("td", {className: "data", align: "right"}, formatNumber(this.props.rideData.ytdDistance, '0,0', 'big', this.state.isMetric)), 
						React.createElement("td", null, "This year's distance")
					), 
					React.createElement("tr", {className: "gap"}, 
						React.createElement("td", {className: "data", align: "right"}, formatNumber(this.props.rideData.ytdElevation, '0,0', 'small', this.state.isMetric)), 
						React.createElement("td", null, "This year's elevation gain")
					), 
			
					React.createElement("tr", null, 
						React.createElement("td", {className: "data", align: "right"}, formatNumber(this.props.rideData.ytdDistancePerDay, '0,0', 'big', this.state.isMetric)), 
						React.createElement("td", null, "Average distance per day this year")
					), 
					React.createElement("tr", null, 
						React.createElement("td", {className: "data", align: "right"}, formatNumber(this.props.rideData.ytdElevationPerDay, '0,0', 'small', this.state.isMetric)), 
						React.createElement("td", null, "Average elevation gain per day this year")
					), 
					React.createElement("tr", null, 
						React.createElement("td", {className: "data", align: "right"}, formatNumber(this.props.rideData.ytdDistancePerWeek, '0,0', 'big', this.state.isMetric)), 
						React.createElement("td", null, "Average distance per week this year")
					), 
					React.createElement("tr", {className: "gap"}, 
						React.createElement("td", {className: "data", align: "right"}, formatNumber(this.props.rideData.ytdElevationPerWeek, '0,0', 'small', this.state.isMetric)), 
						React.createElement("td", null, "Average elevation gain per week this year")
					), 
			
					React.createElement("tr", null, 
						React.createElement("td", {className: "data", align: "right"}, this.props.rideData.daysLeftInYear), 
						React.createElement("td", null, "Days left in year")
					), 
					React.createElement("tr", null, 
						React.createElement("td", {className: "data", align: "right"}, formatNumber(this.props.rideData.projectedAnnualDistance, '0,0', 'big', this.state.isMetric)), 
						React.createElement("td", null, "Projected annual distance")
					), 
					React.createElement("tr", null, 
						React.createElement("td", {className: "data", align: "right"}, formatNumber(this.props.rideData.projectedAnnualElevation, '0,0', 'small', this.state.isMetric)), 
						React.createElement("td", null, "Projected annual elevation gain")
					)
			
				)
			
			)
		);
	}
	
});