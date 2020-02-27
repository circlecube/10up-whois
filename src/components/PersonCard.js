import React, { Component } from 'react'

export default class PersonCard extends Component {
	state = {
		clicked: false,
	};

	clickPerson = () => {

		this.setState({
			clicked: true,
		});

		setTimeout(
			function() { 
				this.props.clickCallback( this.props.correct ); 
			}.bind(this), 
			500
		);
		
	}

	render () {
		return (
			<li
				className="person-card"
				onClick={ this.clickPerson }
				data-clicked={ this.state.clicked }
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