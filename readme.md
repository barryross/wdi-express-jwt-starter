### Crud operations using JWTs without storing all the info in the JWT

# Key differences between student projects

### JWT storage
-  The only user info we store in the token is the user's `_id`
- We refer to the decoded version of this as `tokenPayload`
- We do not re-sign or store the JWT after a user updates their profile 

### How our app stays aware of user info
- We ping our api endpoint at `/api/users/:id` for detailed user info
--- When the app initially loads
--- After login
--- After signup
--- After the user's profile is updated
--- The source of truth for the user's profile is `currentUser` in the state of `App.js`


### How to test?

Create a new user
Check the `tokenPayload` value in state
Refresh the page and ensure user data still deploys in header
Edit the profile and check `tokenPayload` again to ensure it contains limited data
Refresh the page and ensure user info is still present
Logout and ensure tokenPayload is empty and user appears logged out