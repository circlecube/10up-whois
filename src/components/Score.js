import React from 'react'

export default class Score extends React.Component {

	render() {
		return(
			<div className="score">
				<div className="label average">
					{ this.props.average }
				</div>
				<div className="label total">
					{ this.props.correct + ' / ' + this.props.total }
				</div>
				{
					this.props.record.map( (r, i) => {
						return(
							<div
								className="record"
								data-correct={r}
								key={i}
							/>
						)
					})
				}
			</div>
		)
	}
}