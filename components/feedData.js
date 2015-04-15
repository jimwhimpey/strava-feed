var FeedData = React.createClass({
	
	displayName: 'FeedData',
	
	getInitialState: function() {
		return { isMetric: this.props.isMetric };
	},
	
	componentWillReceiveProps: function(nextProps) {
		this.setState({ isMetric: nextProps.isMetric });
	},
	
	render: function() {
		return (
			<div className="activityData">
				
				var rows = [];
				for (var i=0; i < numrows; i++) {
				    rows.push(<ObjectRow />);
				}
				return <tbody>{rows}</tbody>;
				
				<table>
					<tr>
						<td className="data" align="right">{formatNumber(this.props.rideData.ytdDistancePerDay, '0,0', 'big', this.state.isMetric)}</td>
						<td>Average distance per day this year</td>
					</tr>
				</table>
			
			</div>
		);
	}
	
});