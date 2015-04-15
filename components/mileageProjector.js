var MileageProjector = React.createClass({
	
	displayName: 'MileageProjector',
	
	getInitialState: function() {
		return {
			requiredDistancePerDay: 0,
			distancePerDayDifference: 0,
			requiredElevationPerDay: 0,
			elevationPerDayDifference: 0,
			isMetric: this.props.isMetric
		};
	},
	
	componentDidMount: function() {
		this.refs.annualGoalDistance.getDOMNode().value = (localStorage.getItem("goalDistance") && localStorage.getItem("goalDistance") !== "") ? localStorage.getItem("goalDistance") : "20,000";
		this.refs.annualGoalElevation.getDOMNode().value = (localStorage.getItem("goalElevation") && localStorage.getItem("goalElevation") !== "") ? localStorage.getItem("goalElevation") : "300,000";
		this.handleDistanceGoal({ target: this.refs.annualGoalDistance.getDOMNode() });
		this.handleElevationGoal({ target: this.refs.annualGoalElevation.getDOMNode() });
	},
	
	handleDistanceGoal: function(e) {
		var goalInMeters = (this.props.isMetric) ? parseInt(e.target.value.replace(/\D/g,''), 10) * 1000 : parseInt(e.target.value.replace(/\D/g,''), 10) * 1.609344 * 1000,
		    requiredDistancePerDay = (goalInMeters - this.props.rideData.ytdDistance) / this.props.rideData.daysLeftInYear;
		
		this.setState({
			requiredDistancePerDay: requiredDistancePerDay,
			distancePerDayDifference: requiredDistancePerDay - this.props.rideData.ytdDistancePerDay
		});
		
		// Remember it
		localStorage.setItem("goalDistance", e.target.value);
		
	},
	
	handleElevationGoal: function(e) {
		
		var goalInMeters = (this.props.isMetric) ? parseInt(e.target.value.replace(/\D/g,''), 10) : parseInt(e.target.value.replace(/\D/g,''), 10) * 0.3048,
		    requiredElevationPerDay = (goalInMeters - this.props.rideData.ytdElevation) / this.props.rideData.daysLeftInYear;
		
		this.setState({
			requiredElevationPerDay: requiredElevationPerDay,
			elevationPerDayDifference: requiredElevationPerDay - this.props.rideData.ytdElevationPerDay
		});
		
		// Remember it
		localStorage.setItem("goalElevation", e.target.value);
		
	},
	
	componentDidUpdate: function(prevProps, prevState) {
		
		var annualGoalDistance = parseInt(this.refs.annualGoalDistance.getDOMNode().value.replace(/\D/g,''), 10),
		    annualGoalElevation = parseInt(this.refs.annualGoalElevation.getDOMNode().value.replace(/\D/g,''), 10);
		
		// Update the input fields as the units change
		if (annualGoalDistance !== "") {
			if (this.props.isMetric && !prevProps.isMetric) {
				this.refs.annualGoalDistance.getDOMNode().value = Math.floor(annualGoalDistance * 1.609344);
			} else if (!this.props.isMetric && prevProps.isMetric) {
				this.refs.annualGoalDistance.getDOMNode().value = Math.floor(annualGoalDistance * 0.6213711922);
			}
		}
		
		if (annualGoalElevation !== "") {
			if (this.props.isMetric && !prevProps.isMetric) {
				this.refs.annualGoalElevation.getDOMNode().value = Math.floor(annualGoalElevation * 0.3048);
			} else if (!this.props.isMetric && prevProps.isMetric) {
				this.refs.annualGoalElevation.getDOMNode().value = Math.floor(annualGoalElevation * 3.280839895);
			}
		}

	},
	
	render: function() {
		
		var bigUnits = (this.props.isMetric) ? "km" : "mi",
		    smallUnits = (this.props.isMetric) ? "m" : "ft";
		
		return (
			
			<div className="mileageProjector">
			
				<div className="mileage">
			
					<p>
						Annual goal distance <input type="text" onChange={this.handleDistanceGoal} class="annualGoalDistance" ref="annualGoalDistance" placeholder="20000" /> <span className="units">{bigUnits}</span>
					</p>

					<table>
						<tr>
							<td className="data requiredDistancePerDay">{formatNumber(this.state.requiredDistancePerDay, '0,0.00', 'big', this.props.isMetric)}</td>
							<td>Required distance per day</td>
						</tr>
						<tr>
							<td className="data distancePerDayDifference">{formatNumber(this.state.distancePerDayDifference, '0,0.00', 'big', this.props.isMetric)}</td>
							<td>Current distance per day difference</td>
						</tr>
						<tr>
							<td className="data requiredDistancePerWeek">{formatNumber(this.state.requiredDistancePerDay * 7, '0,0.00', 'big', this.props.isMetric)}</td>
							<td>Required distance per week</td>
						</tr>
						<tr>
							<td className="data distancePerWeekDifference">{formatNumber(this.state.distancePerDayDifference * 7, '0,0.00', 'big', this.props.isMetric)}</td>
							<td>Current distance per week difference</td>
						</tr>
					</table>
			
				</div>
			
				<div className="elevation">

					<p>
						Annual goal elevation gain <input type="text" onChange={this.handleElevationGoal} class="annualGoalElevation" ref="annualGoalElevation" placeholder="300000" /> <span className="units">{smallUnits}</span>
					</p>
						
					<table>
						<tr>
							<td className="data requiredElevationPerDay">{formatNumber(this.state.requiredElevationPerDay, '0,0', 'small', this.props.isMetric)}</td>
							<td>Required elevation gain per day</td>
						</tr>
						<tr>
							<td className="data elevationPerDayDifference">{formatNumber(this.state.elevationPerDayDifference, '0,0', 'small', this.props.isMetric)}</td>
							<td>Current elevation per day difference</td>
						</tr>
						<tr>
							<td className="data requiredElevationPerWeek">{formatNumber(this.state.requiredElevationPerDay * 7, '0,0', 'small', this.props.isMetric)}</td>
							<td>Required elevation gain per week</td>
						</tr>
						<tr>
							<td className="data elevationPerWeekDifference">{formatNumber(this.state.elevationPerDayDifference * 7, '0,0', 'small', this.props.isMetric)}</td>
							<td>Current elevation per week difference</td>
						</tr>
					</table>
			
				</div>
			
			</div>

		);
	}
	
});