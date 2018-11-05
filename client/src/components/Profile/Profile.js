import React from 'react'
import Form from '../common/Form/Form'
import Header from '../common/Header/Header'
import httpClient from '../../utilities/httpClient';

const Profile = ({history, onUpdateSuccess, currentUser}) => {
	const handleSubmit = async (user) =>{
		console.log("USER PATCHING", user)
			let res = await httpClient({method:"PATCH", url: `/api/users/${currentUser._id}`, data:user});
			// let { user } = res.data
			onUpdateSuccess(user);
	}
	return (
		<React.Fragment>
			<Header text={"Profile"}/>
			{currentUser && <Form currentUser={currentUser} onSubmit={handleSubmit}/> }
	</React.Fragment>
	)
}

export default Profile