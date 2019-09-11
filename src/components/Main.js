import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../styles/Main.css'

// Background Components
import Navigation from './Navigation.js'
import DoesNotExist from './DoesNotExist.js'

// Tabs
import About from './About.js'
import Beginner from './Beginner/Beginner.js'
// import Easy from './Easy/Easy.js'

function Main() {
	return (
		<div className="Main">
			<h1>Clue Scroll Sim v0.01</h1>
			<Router>
				<div>
					<Navigation />
					<Switch>
						<Route path='/' exact component={About}/>
						<Route path='/Beginner' component={Beginner}/>
						<Route component={DoesNotExist}/>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default Main;
