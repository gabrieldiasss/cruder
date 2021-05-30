import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Feed from './pages/Feed.js'
import Post from './pages/Post.js'
import Edit from './pages/Edit.js'
import ListOne from './pages/listOne.js'

function App() {
	return (

		<Router>
			<Switch>
				<Route path="/" exact component={Feed} />
				<Route path="/post" exact component={Post} />
				<Route path="/edit/:id" exact component={Edit}/>
				<Route path="/ler/:id" exact component={ListOne} />
			</Switch>
		</Router>

	);
}

export default App;
