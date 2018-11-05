import React, { Component } from 'react';
import Header from '../Header/Header';

class Form extends Component {
	constructor(props){
		super(props)

		this.state = { 
			user:{
				email: "",
				name: "",
				age: "",
				password: ""
			}
		
	}


	}
	 componentDidMount(){
		 let { currentUser } = this.props
		 console.log("CURRENT USER", currentUser)
		 if(currentUser) this.setState({user: currentUser})
	 }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState((state)=>{
						return ({user: {...state.user, [name]:value}})
				})
					
    }

    handleSubmit = async (e) => {
				e.preventDefault();
				let { user } = this.state
				this.props.onSubmit(user)
    }

    render() {
        let { email, name, age, password } = this.state.user;
        let { handleChange, handleSubmit } = this;
        return (
            <div>
                <div className="row">
                    <div className="column column-50 column-offset-25">
                        <form onSubmit={handleSubmit}>
                            <label>Name: </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Johnny Appleseed"
                                onChange={handleChange}
                                value={name}
                            />
														 <label>Age: </label>
                            <input
                                type="text"
                                name="age"
                                placeholder="25"
                                onChange={handleChange}
                                value={age}
                            />
                            <label>Email: </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="JohnnyAppleseed@hotmail.com"
                                onChange={handleChange}
                                value={email}
                            />

														 <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                placeholder=""
                                onChange={handleChange}
                                value={password}
                            />
                           
                            <input type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;