import React, { Component } from 'react'
import PersonCard from './PersonCard';

export default class extends Component {
	state = {
		questionAnswers: [],
		score: {
			correct: 0,
			total: 0
		},
	};

	componentDidMount() {
		this.makeQuizQuestion();
	}

	randomNumbers = (max, length) => {
		var arr = [];
		while(arr.length < length){
			var r = Math.floor(Math.random() * max);
			if(arr.indexOf(r) === -1) arr.push(r);
		}
		return arr;
	}

	makeQuizQuestion = () => {
		this.setState((state, props) => ({
			questionAnswers: this.randomPeople(props.posts),
			questionAnswer: this.randomNumbers(4, 1),
		}));
	}

	handleCardClick = (correct) => {
		this.setState((state, props) => ({
			score: {
				correct: state.score.correct + correct,
				total: state.score.total + 1,
			}
		}));
		if ( correct ) {
			this.makeQuizQuestion();
		}
	}

	randomPeople = (posts) => {
		if ( posts ) {
			const randomFour = [];
			const numPeople = posts.length;
			const randomIndexes = this.randomNumbers(numPeople, 4);
			randomFour.push(posts[randomIndexes[0]]);
			randomFour.push(posts[randomIndexes[1]]);
			randomFour.push(posts[randomIndexes[2]]);
			randomFour.push(posts[randomIndexes[3]]);
			return randomFour;
		}
	}

	render (){
		return (
			<>
				<p>
					{ this.state.questionAnswers && this.state.questionAnswer && 
		`Who is ${ this.state.questionAnswers[this.state.questionAnswer[0]].name }?`	
					}
				</p>
				<ul className="people-list">
				{
					this.state.questionAnswers.map( (post, i) => {
						return (
							<PersonCard 
								post={ post }
								key={ post.id }
								index={ i }
								correct={ i === this.state.questionAnswer[0] }
								clickCallback={ this.handleCardClick }
							/>
						)
					})
				}
				</ul>

				<button onClick={this.makeQuizQuestion}>Skip</button>
				
				<p className="score">
					{ this.state.score.total &&
						`${ this.state.score.correct }
						of
						${ this.state.score.total }
						:
						${ this.state.score.correct / this.state.score.total * 100 }%`
					}
				</p>

			</>
		)
	}
}