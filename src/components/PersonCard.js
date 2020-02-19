import React, { Component } from 'react'

export default class extends Component {
	state = {
		clicked: false,
	};

	clickPresident = () => {

		this.setState({
			clicked: true,
		});

		this.props.clickCallback( this.props.correct );
	}

	render () {
		return (
			<li
				onClick={ this.clickPresident }
				data-clicked={ this.state.clicked }
			>
				<img 
					src={ this.props.post.acf.portrait[0].sizes.thumbnail } 
					alt={ this.props.post.title.rendered } 
				/>
				<p>
					{ this.props.post.title.rendered }
				</p>
			</li>
		)
	}
}