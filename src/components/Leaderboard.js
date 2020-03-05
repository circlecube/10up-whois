import React from 'react'

export default class Leaderboard extends React.Component {

	render() {
		return(
			<>
				{ this.props.records.length > 0 &&
					<table className="leaderboard">
						<thead className="label">
							<tr className="leaderboard-title">
								<th colSpan="4">{ this.props.title } : { this.props.teamName }</th>
							</tr>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Score</th>
								<th>Time</th>
							</tr>
						</thead>
						<tbody>
						{
							this.props.records.map( (r, i) => {
								if ( r.teamName === this.props.teamName ) {
								return(
									<tr key={i}>
										<td><img src={r.avatar} width="50" height="50" alt={r.name} /></td>
										<td>{r.name}</td>
										<td>{r.score.average}</td>
										<td>{r.duration}</td>
									</tr>
								)
								} else {
									return null;
								}
							})
						}
						</tbody>
					</table>
				}
			</>
		)
	}
}