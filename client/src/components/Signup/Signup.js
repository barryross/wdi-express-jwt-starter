import React from 'react'
import Form from '../common/Form/Form'
import Header from '../common/Header/Header'
import httpClient from '../../utilities/httpClient';



const Signup = (props) => {

	const handleSubmit = async (user) => {
<<<<<<< Updated upstream
		let res = await httpClient.authenticate(user, "/api/users", "post");
=======
		let res = await httpClient.authenticate(user, "/api/users");
>>>>>>> Stashed changes
		props.onSignupSuccess();
		props.history.push('/')
	}
	return (
		<React.Fragment>
			<Header text={"Signup"}/>
			<Form onSubmit={handleSubmit}/>
		</React.Fragment>
	)
}

export default Signup