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
			<div className="mileageData">
				
				<table>
				
					<tr>
						<td className="data" align="right">{formatNumber(this.props.rideData.ytdDistance, '0,0', 'big', this.state.isMetric)}</td>
						<td>This year's distance</td>
					</tr>
					<tr className="gap">
						<td className="data" align="right">{formatNumber(this.props.rideData.ytdElevation, '0,0', 'small', this.state.isMetric)}</td>
						<td>This year's elevation gain</td>
					</tr>
			
					<tr>
						<td className="data" align="right">{formatNumber(this.props.rideData.ytdDistancePerDay, '0,0', 'big', this.state.isMetric)}</td>
						<td>Average distance per day this year</td>
					</tr>
					<tr>
						<td className="data" align="right">{formatNumber(this.props.rideData.ytdElevationPerDay, '0,0', 'small', this.state.isMetric)}</td>
						<td>Average elevation gain per day this year</td>
					</tr>
					<tr>
						<td className="data" align="right">{formatNumber(this.props.rideData.ytdDistancePerWeek, '0,0', 'big', this.state.isMetric)}</td>
						<td>Average distance per week this year</td>
					</tr>
					<tr className="gap">
						<td className="data" align="right">{formatNumber(this.props.rideData.ytdElevationPerWeek, '0,0', 'small', this.state.isMetric)}</td>
						<td>Average elevation gain per week this year</td>
					</tr>
			
					<tr>
						<td className="data" align="right">{this.props.rideData.daysLeftInYear}</td>
						<td>Days left in year</td>
					</tr>
					<tr>
						<td className="data" align="right">{formatNumber(this.props.rideData.projectedAnnualDistance, '0,0', 'big', this.state.isMetric)}</td>
						<td>Projected annual distance</td>
					</tr>
					<tr>
						<td className="data" align="right">{formatNumber(this.props.rideData.projectedAnnualElevation, '0,0', 'small', this.state.isMetric)}</td>
						<td>Projected annual elevation gain</td>
					</tr>
			
				</table>
			
			</div>
		);
	}
	
});