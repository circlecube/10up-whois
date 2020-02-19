import React from 'react';

import Quiz from './components/Quiz';
import PersonCard from './components/PersonCard';
import API from './utils/API';
import logo from './10up-logo.svg';
import './App.css';

export default class App extends React.Component {
	state = {
		isLoading: true,
		data: null,
		isQuiz: false,
	};

	beginQuiz = () => {
		this.setState({ 
			isQuiz: true,
		});
	}

	render() {
	
		return (
			<div className="App">
				<header className="App-header">
					
					<img src={logo} className="App-logo" alt="logo" />

					{ this.state.data && !this.state.isQuiz ? 	
						<>
							<p>Who are these people?</p>
							<ul className="people-list -mini">
							{
								this.state.data.map( post => {
									return (
										<PersonCard post={ post } key={ post.slug } />
									)
								})
							}
							</ul> 
							<button onClick={this.beginQuiz}>
								Begin Quiz
							</button>
						</>
						:
						<p>Loading...</p>
					}

					{ this.state.isQuiz &&
						<Quiz 
							posts={this.state.data}
						/>
					}
				</header>
			</div>
		);
	}

	async componentDidMount() {
		// load async data
		let request = await API.get('/president', {
			//per_page=50&order=asc&orderby=meta_value_num&meta_key=took_office
			params: {
				per_page: 50,
				order: 'asc',
				orderby: 'meta_value_num',
				meta_key: 'took_office',
			}
		});
		// update state with new da
		// console.log(request.data);
		this.setState({
			data: request.data,
			isLoading: false,
		});
		// rerender app
	}
}