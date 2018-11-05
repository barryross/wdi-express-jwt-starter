import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import VIP from './components/VIP/VIP';
import httpClient from './utilities/httpClient';
import './App.css';

class App extends Component {
	state = { 
		tokenPayload: httpClient.getTokenPayload(), 
		currentUser:null
	};

	componentDidMount(){

		//If token exists, let's call 
		if (this.state.tokenPayload)	this.getUserInfo()
	
	}
	getUserInfo = async() => {
		let tokenPayload = httpClient.getTokenPayload()
		console.log("token pay", tokenPayload)

		let res = await httpClient({ method: "get", url:`/api/users/${tokenPayload._id}` });
		let user = res.data.payload //parse the response from our /users/:id endpoint
		this.setState({currentUser: user}) 
	}
	onAuthSuccess = async () => {
		alert('auth success')
		let tokenPayload = httpClient.getTokenPayload()
		this.setState({ tokenPayload});
		this.getUserInfo() //On successful auth, let's query the user info and pass it to our components
	}

	onLogout = () => {
		httpClient.logOut();
		this.setState({ tokenPayload: null, currentUser: null }); //Let's clear out the token and the user
	}

	

  	render() {
		let { tokenPayload, currentUser } = this.state;
		let { onAuthSuccess, onLogout, getUserInfo} = this;
		return (
			<Layout currentUser={currentUser}>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/login" render={(props) => {
						return <Login {...props} onLoginSuccess={onAuthSuccess}/>
					}}/>
					<Route path="/logout" render={() => {
						return <Logout onLogout={onLogout}/>
					}} />
					<Route path="/signup" render={(props) => {
						return <Signup {...props} onSignupSuccess={onAuthSuccess}/>
					}}/>
					<Route path="/profile" render={(props) => {
						return  tokenPayload ? <Profile onUpdateSuccess={getUserInfo} currentUser={currentUser} {...props}/> : <Redirect to="/login"/>
					}}/>
					<Route path="/vip" render={() => {
						return tokenPayload ?  <VIP/> : <Redirect to="/login"/>
					}}/>
				</Switch>
			</Layout>
		);
	}
}

export default App;
