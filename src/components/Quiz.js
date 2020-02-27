import React, { Component } from 'react'
import PersonCard from './PersonCard';
import Score from './Score';

export default class Quiz extends Component {
	state = {
		questionID: 0, // current correct answer - post id
		questionIndex: 0, // current correct answer - post array index
		questionAnswers: [], // current questions answers
		correctlyAnswered: [], // track correct answers
		quizLimit: 10, // number of questions
		score: {
			correct: 0, // number correct
			total: 0, // out of total clicks
			average: 0, // average score
		},
		record: [], // keep track of every click - a boolean indicating the click was correct or incorrect.

	};

	componentDidMount() {
		this.makeQuizQuestion();
	}

	makeQuizQuestion = () => {
		// check if there are any unanswered left - if not signal quiz end 
		if ( this.state.correctlyAnswered.length >= this.props.team.length ) {
			this.props.endCallback( this.state.score );
			return;
		}

		const randomAnswerIndex = this.getUnansweredPerson( this.props.team );
		const randomAnswerID = this.props.team[randomAnswerIndex].id;
		const randomAnswerChoices = this.randomPeople( this.props.team, randomAnswerIndex);

		this.setState(() => ({
			questionID: randomAnswerID,
			questionIndex: randomAnswerIndex,
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

	randomPeople = (team, correctAnswer) => {
		if ( team ) {
			let randomIndexes = [correctAnswer];
			let randomPeople = [];
			randomIndexes = this.randomUniqueNumbers(team.length, 3, randomIndexes);
			// three random people
			randomPeople.push(team[randomIndexes[0]]);
			randomPeople.push(team[randomIndexes[1]]);
			randomPeople.push(team[randomIndexes[2]]);
			randomPeople.push(team[randomIndexes[3]]);
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

	calculateScore = (correct,total) => {
		return Math.floor( correct / total * 100 );
	}

	handleCardClick = (correct) => {
		 // increment correct - if correct
		let scorecorrect = this.state.score.correct + correct;
		// increment total for every click
		let scoretotal = this.state.score.total + 1;
		// calculate average
		let scoreaverage = this.calculateScore(scorecorrect, scoretotal);
		this.setState((state) => ({
			score: {
				correct: scorecorrect,
				total: scoretotal, 
				average: scoreaverage
			},
			record: state.record.concat( correct ),
		}));
		if ( correct ) {
			this.setState((state) => ({
				correctlyAnswered: state.correctlyAnswered.concat( state.questionIndex ),
			}));
			this.makeQuizQuestion();
		}
	}

	render (){
		return (
			<>
				<p>
					{ this.state.questionAnswers && 
						`Who is ${ this.props.team[this.state.questionIndex].name }?`	
					}
				</p>
				<ul className="people-list -quiz">
				{
					this.state.questionAnswers.map( (person, i) => {
						return (
							<PersonCard 
								person={ person }
								key={ person.id }
								index={ i }
								correct={ person.id === this.state.questionID }
								clickCallback={ this.handleCardClick }
							/>
						)
					})
				}
				</ul>

				{/* <button onClick={this.makeQuizQuestion}>Skip</button> */}

				{ this.state.record.length > 0 &&
					<Score
						record={this.state.record}
						total={this.state.score.total}
						correct={this.state.score.correct}
						average={this.state.score.average}
					/>
				}

			</>
		)
	}
}