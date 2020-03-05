import React from 'react';

import Quiz from './components/Quiz';
import PersonCard from './components/PersonCard';
import scrapeTeam from './utils/API';
import firebase from './utils/firebase';
import logo from './10up-logo.svg';
import './App.css';

/**
 * TODO
 * Add options to quiz: 
 * 		subject: name, title, pod, 
 * Add high scores?
 * Add analytics events to card clicks
 * 
 * TOFIX
 * Bug when person repeats on next question and clicked val persists
 * Bug you can click the same person multiple times and it affects your score
 */
export default class App extends React.Component {
	state = {
		isLoading: true,
		team: null,
		groups: [],
		selectedTeam: null,
		selectedName: null,
		selectedAvatar: null,
		isQuiz: false,
		testing: true,
		lastQuiz: null,
		leaderboard: [],
	};

	beginQuiz = () => {
		this.setState({ 
			isQuiz: true,
		});
	}

	endQuiz = (quiz) => {
		this.setState({ 
			isQuiz: false,
			lastQuiz: quiz,
		});
		this.addToLeaderboard(quiz);

		const message = `
Congratulations! You finished the quiz!
You scored ${quiz.score.average}% (${quiz.score.correct} of ${quiz.score.total}) in ${quiz.duration/1000}s!

Try again or try a different quiz!
`
		alert(message);
		
	}

	setGroups = (team) => {
		// parse unique group names
		let groupnames = [...new Set(team.map(person => person.group))];
		// construct groups from names
		let groups = groupnames.map(group => {
			let o = {};
			if ( group === '') { // override for all
				o.title = 'All';
				o.team = team;
			} else {
				o.title = group;
				o.team = team.filter((person) => person.group === group );
			}
			return o;
		});
		groups.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)); 

		// Create test group *van
		if( this.state.testing) {
		groups.push({
			title: "Test *van",
			team: team.filter((person) => person.name.includes("van"))
		});
	}
		// console.log(groups);
		this.setState({
			groups: groups,
			selectedTeam: groups.find(o => o.title === 'All' ),
		});
	}

	handleCardClick = (correct) => {
		// do nothing so cards have a click to display name
		return correct;
	}

	handleTeamChange = (event) => {
		this.setState({ 
			selectedTeam: this.state.groups.find(o => o.title === event.target.value ),
		});
	}

	async componentDidMount() {
		// load async data
		let team = await scrapeTeam();

		// set groups from team data
		// read team groups values and filter team into sub groups
		// create buttons for each group
		this.setGroups(team);

		// update state with new data
		this.setState({
			team: team,
		});

		this.loadLeaderboard();
		
		// render app
		this.setState({
			isLoading: false,
		});
	}

	loadLeaderboard = () => {
		// load leaderboard from firebase
		const fbLeaderboardRef = firebase.database().ref('leaderboard');
		fbLeaderboardRef.on('value', (snapshot) =>{
			let leaderboard = snapshot.val();
			this.setState({
				leaderboard: leaderboard,
			});
		});
	}

	addToLeaderboard = (quizrecord) => {
		// load leaderboard from firebase
		const fbLeaderboardRef = firebase.database().ref('leaderboard');
		fbLeaderboardRef.push(quizrecord);
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
								this.state.team.map( person => {
									return (
										<PersonCard 
											person={ person }
											key={ person.id }
											clickCallback={ this.handleCardClick }
										/>
									)
								})
							}
							</ul>

							<select 
								value={this.state.selectedTeam.title}
								onChange={this.handleTeamChange}
							>
								{
									this.state.groups.map( group => {
										return (
											group !== '' &&
											<option name={group.title} key={group.title}>{group.title}</option>
										)
									})
								}
							</select>
							<button onClick={this.beginQuiz}>
								Begin Quiz
							</button>
								{ this.state.lastQuiz && 
									<p>
										Previous quiz: {this.state.lastQuiz.teamName} - {this.state.lastQuiz.score.average}% in {Math.round(this.state.lastQuiz.duration/1000)}s
									</p>
								}
						</>
					}

					{ this.state.isQuiz &&
						<Quiz 
							teamName={this.state.selectedTeam.title}
							team={this.state.selectedTeam.team}
							endCallback={this.endQuiz}
						/>
					}
				</header>
			</div>
		);
	}
}