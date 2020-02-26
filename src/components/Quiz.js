import React, { Component } from 'react'
import PersonCard from './PersonCard';
import Score from './Score';

export default class Quiz extends Component {
	state = {
		questionID: 0, // current correct answer - post index
		questionAnswers: [], // current questions answers
		correctlyAnswered: [], // track correct answers
		quizLimit: 10, // number of questions
		score: {
			correct: 0, // number correct
			total: 0 // out of total clicks
		},
		record: [], // keep track of every click - a boolean indicating the click was correct or incorrect.

	};

	componentDidMount() {
		this.makeQuizQuestion();
	}

	makeQuizQuestion = () => {
		const randomAnswer = this.getUnansweredPerson( this.props.posts );
		const randomAnswerChoices = this.randomPeople( this.props.posts, randomAnswer);

		this.setState(() => ({
			questionID: randomAnswer,
			questionAnswers: randomAnswerChoices,
		}));
		// console.log( this.state );
	}

	/**
	 * Get a new person for a quiz question
	 */
	getUnansweredPerson = (people) => {
		let randomIndex = Math.floor(Math.random() * people.length);
		// check if randomIndex is already included in the correctlyAnswered array
		if ( !this.state.correctlyAnswered.includes(randomIndex) ){
			// unique found, return it
			// console.log( 'unique random found: ', randomIndex, this.state.correctlyAnswered);
			return randomIndex;
		} else {
			// found duplicate, go again - recursively
			return this.getUnansweredPerson(people);
		}
	}

	/**
	 * Get multiple random numbers
	 * max = highest possible number: (0 - max)
	 * length = number of random numbers - returned as array
	 * arr = initial array
	 */
	randomUniqueNumbers = (max, length, arr = []) => {
		const initlength = arr.length;
		length += initlength;
		while(arr.length < length){
			var r = Math.floor(Math.random() * max);
			// ensure value is unique
			while ( arr.includes(r) ) {
				r = Math.floor(Math.random() * max);
			}
			if(arr.indexOf(r) === -1) arr.push(r);
		}
		return arr;
	}

	randomPeople = (posts, correctAnswer) => {
		if ( posts ) {
			let randomIndexes = [correctAnswer];
			let randomPeople = [];
			randomIndexes = this.randomUniqueNumbers(posts.length, 3, randomIndexes);
			// three random people
			randomPeople.push(posts[randomIndexes[0]]);
			randomPeople.push(posts[randomIndexes[1]]);
			randomPeople.push(posts[randomIndexes[2]]);
			randomPeople.push(posts[randomIndexes[3]]);
			// retunr the shuffles answers
			return this.shuffle(randomPeople);
		}
	}

	shuffle = (array) => {
		let currentIndex = array.length;
		let temporaryValue, randomIndex;
	  
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
	  
		  // Pick a remaining element...
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
	  
		  // And swap it with the current element.
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}  
		return array;
	}

	handleCardClick = (correct) => {
		this.setState((state) => ({
			score: {
				correct: state.score.correct + correct, // increment correct - if correct
				total: state.score.total + 1, // increment total for every click
			},
			record: state.record.concat( correct ),
		}));
		if ( correct ) {
			this.setState((state) => ({
				correctlyAnswered: state.correctlyAnswered.concat( state.questionID ),
			}));
			this.makeQuizQuestion();
		}
	}

	render (){
		return (
			<>
				<p>
					{ this.state.questionAnswers && this.state.questionID && 
		`Who is ${ this.props.posts[this.state.questionID].name }?`	
					}
				</p>
				<ul className="people-list -quiz">
				{
					this.state.questionAnswers.map( (post, i) => {
						return (
							<PersonCard 
								post={ post }
								key={ post.id }
								index={ i }
								correct={ post.id === this.state.questionID }
								clickCallback={ this.handleCardClick }
							/>
						)
					})
				}
				</ul>

				{/* <button onClick={this.makeQuizQuestion}>Skip</button> */}

				<Score
					record={this.state.record}
					total={this.state.score.total}
					correct={this.state.score.correct}
				/>

			</>
		)
	}
}