import React from 'react';

import Quiz from './components/Quiz';
import PersonCard from './components/PersonCard';
import scrapeTeam from './utils/API';
import logo from './10up-logo.svg';
import './App.css';

/**
 * TODO
 * 
 * Make score as component with visual track
 * Make quiz layout 2x2
 * Extract groups and have a quiz per group - different button per group?
 * Add timer for quiz duration
 * Add high scores?
 * 
 * TOFIX
 * Bug when person repeats on next question and clicked val persists
 * 
 */
export default class App extends React.Component {
	state = {
		isLoading: true,
		team: null,
		isQuiz: false,
	};

	beginQuiz = () => {
		this.setState({ 
			isQuiz: true,
		});
	}



	handleCardClick = (correct) => {
		return correct;
	}

	render() {
	
		return (
			<div className="App">
				<header className="App-header">
					
					<img src={logo} className="App-logo" alt="logo" />

					{ this.state.isLoading && 
						<p>Loading...</p>
					}

					{ this.state.team && !this.state.isQuiz && 	
						<>
							<p>Who are these people?</p>
							<ul className="people-list -mini">
							{
								this.state.team.map( post => {
									return (
										<PersonCard 
											post={ post }
											key={ post.id }
											clickCallback={ this.handleCardClick }
										/>
									)
								})
							}
							</ul> 
							<button onClick={this.beginQuiz}>
								Begin Quiz
							</button>
						</>
					}

					{ this.state.isQuiz &&
						<Quiz 
							posts={this.state.team}
						/>
					}
				</header>
			</div>
		);
	}

	async componentDidMount() {
		// load async data
		let team = await scrapeTeam();
		// update state with new data
		// console.log(request.data);
		this.setState({
			team: team,
			isLoading: false,
		});
		// rerender app
	}
}