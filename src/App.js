import React from 'react';

import Quiz from './components/Quiz';
import PersonCard from './components/PersonCard';
import scrapeTeam from './utils/API';
import logo from './10up-logo.svg';
import './App.css';

/**
 * TODO
 * Add options to quiz: 
 * 		subject: name, title, pod, 
 * 		team: exec, eng, design, 
 * Add timer for quiz duration
 * Add high scores?
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
		isQuiz: false,
		testing: true,
	};

	beginQuiz = () => {
		this.setState({ 
			isQuiz: true,
		});
	}

	endQuiz = (score) => {
		this.setState({ 
			isQuiz: false,
		});

		const message = `
Congratulations! You finished the quiz!
You scored ${score.average}% (${score.correct} of ${score.total})!

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
		
		// rerender app
		this.setState({
			isLoading: false,
		});
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
						</>
					}

					{ this.state.isQuiz &&
						<Quiz 
							team={this.state.selectedTeam.team}
							endCallback={this.endQuiz}
						/>
					}
				</header>
			</div>
		);
	}
}