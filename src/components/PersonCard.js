import React, { Component } from 'react'

export default class PersonCard extends Component {

	clickCard = () => {
		if ( !this.props.clicked ) {
			this.props.onClick( this.props.person, this.props.index, this.props.correct );
		}
	}

	render () {
		return (
			<li
				className="person-card"
				onClick={ this.clickCard }
				data-clicked={ this.props.clicked }
				data-correct={ this.props.correct }
			>
				<img 
					src={ this.props.person.image } 
					alt={ this.props.person.name } 
				/>
				<p className="detail">
					<span className="person-name">{ this.props.person.name }</span>
					<span className="person-title">{ this.props.person.title }</span>
				</p>
			</li>
		)
	}
}