import React from 'react'
import Form from '../common/Form/Form'
import Header from '../common/Header/Header'
import httpClient from '../../utilities/httpClient';

const Profile = ({history, onUpdateSuccess, currentUser}) => {
	const handleSubmit = async (user) =>{
		console.log("USER PATCHING", user)
			await httpClient({ method:"PATCH", url: `/api/users/${currentUser._id}`, data:user }); //Notice we aren't working with the JWT here
			onUpdateSuccess(user); //Let's update the current user object in our App.js state so it trickles down the hierarchy
	}
	//Notice that we only render the form if the currentUser object exists
	return (
		<React.Fragment>
			<Header text={"Profile"}/>
			 {currentUser && <Form currentUser={currentUser} onSubmit={handleSubmit}/> }
	</React.Fragment>
	)
}

export default Profile