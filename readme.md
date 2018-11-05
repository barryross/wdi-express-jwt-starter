### Crud operations using JWTs without storing all the info in the JWT

# Key differences between student projects

### JWT storage
-  The only user info we store in the token is the user's `_id`
- We refer to the decoded version of this as `decodedToken`
- We do not re-sign or store the JWT after a user updates their profile 

### How our app stays aware of user info
- We ping our api endpoint at `/api/users/:id` for detailed user info
--- When the app initially loads
--- After login
--- After signup
--- After the user's profile is updated
--- The source of truth for the user's profile is `currentUser` in the state of `App.js`