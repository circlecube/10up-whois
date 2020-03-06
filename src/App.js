import React from 'react';

import Quiz from './components/Quiz';
import PersonCard from './components/PersonCard';
import Leaderboard from './components/Leaderboard';
import scrapeTeam from './utils/API';
import firebase from './utils/firebase';
import logo from './10up-logo.svg';
import './App.css';

/**
 * TODO
 * Add options to quiz: 
 * 		subject: name, title, pod, 
 * Add high scores:
 * 		set up google account authentication - 10up accounts only for user selection
 * Add analytics events to card clicks
 * 
 */
export default class App extends React.Component {
	state = {
		isLoading: true,
		team: null,
		groups: [],
		selectedTeam: null,
		selectedName: 'Anonymous',
		selectedAvatar: logo,
		isQuiz: false,
		testing: true,
		lastQuiz: null,
		leaderboard: [],
		selectedLeaderboard: [],
		message: `
<h2>Welcome!</h2>
<p>Click yourself and then select a group for your quiz.</p>`,
	};

	beginQuiz = () => {
		this.setState({ 
			isQuiz: true,
			message: null,
		});
	}

	cancelQuiz = () => {
		this.setState({
			isQuiz: false,
		});
	}

	endQuiz = (quiz) => {
		this.setState({ 
			isQuiz: false,
			lastQuiz: quiz,
		});

		// if score is high enough
		if ( quiz.score.average === 100 ) {
			// save to leaderboard
			quiz.name = this.state.selectedName;
			quiz.avatar = this.state.selectedAvatar;
			this.addToLeaderboard(quiz);
		}

		this.setState({
			message: `
<h2>Congratulations! You finished the quiz!</h2>
<h3>You scored ${quiz.score.average}% (${quiz.score.correct} of ${quiz.score.total}) in ${parseFloat(quiz.duration / 1000).toFixed(2)}s!</h3>
<p>Try again or try a different quiz! You must score 100% to be added to the leaderboard!</p>`,
		});

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

	handleCardClick = ( person, i, correct ) => {
		// set selected name and avatar
		this.setState({
			selectedName: person.name,
			selectedAvatar: person.image,
		});
		// unclick all other cards

	}

	handleTeamChange = (event) => {
		this.setSelectedTeam(event.target.value)
	}

	setSelectedTeam = (teamName) => {
		let teamLeaderboard = [];
		if ( this.state.leaderboard.length > 0 ) {
			teamLeaderboard = this.state.leaderboard.filter((record) => record.teamName === teamName );
		}
		this.setState({ 
			selectedTeam: this.state.groups.find(o => o.title === teamName ),
			selectedLeaderboard: teamLeaderboard,
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

	async loadLeaderboard() {
		// load leaderboard from firebase
		const fbLeaderboardRef = await firebase.database().ref('leaderboard').orderByChild('duration');
		fbLeaderboardRef.on('value', (snapshot) =>{
			let leaderboard = snapshot.val();
			let leaderboard_ar = [];
			// convert to array
			if ( !Array.isArray(leaderboard) ) {
				leaderboard_ar = Object.keys(leaderboard).map(function(key, i) {
					return leaderboard[key];
				  });
			} else {
				leaderboard_ar = leaderboard;
			}

			this.setState({
				leaderboard: leaderboard_ar,
			}, () => {
				this.setSelectedTeam( this.state.selectedTeam.title);
			});
		});
	}

	addToLeaderboard = (quizrecord) => {
		// load leaderboard from firebase
		const fbLeaderboardRef = firebase.database().ref('leaderboard');
		fbLeaderboardRef.push(quizrecord);

		var joined = this.state.leaderboard.concat(quizrecord);
		
		this.setState({
			leaderboard: joined,
		}, () => {
			// refresh with latest scores
			this.loadLeaderboard();
		});
	}

	render() {
	
		return (
			<div className="app">
				<header className="header">
					
					<img 
						src={logo} 
						className="logo" 
						alt="Who is 10up" 
						onClick={ this.cancelQuiz }
					/>

					{ this.state.message &&
						<div className="message" dangerouslySetInnerHTML={{__html: this.state.message}}></div>
					}

					{ this.state.isLoading && 
						<p>Loading...</p>
					}

					{ this.state.team && !this.state.isQuiz && 	
						<>
							<p>Who are these people?</p>
							<ul className="people-list -mini">
							{
								this.state.selectedTeam.team.map( person => {
									return (
										<PersonCard 
											person={ person }
											key={ person.id }
											clicked={ person.name === this.state.selectedName }
											correct={ true }
											onClick={ this.handleCardClick }
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
							
							{ this.state.leaderboard && this.state.leaderboard.length > 0 &&
								<Leaderboard
									title="High Scores"
									records={this.state.selectedLeaderboard}
									teamName={this.state.selectedTeam.title}
								/>
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