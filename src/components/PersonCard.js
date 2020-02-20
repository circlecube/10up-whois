import React, { Component } from 'react'

export default class extends Component {
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
					src={ this.props.post.image } 
					alt={ this.props.post.name } 
				/>
				<p className="detail">
					<span className="person-name">{ this.props.post.name }</span>
					<span className="person-title">{ this.props.post.title }</span>
				</p>
			</li>
		)
	}
}