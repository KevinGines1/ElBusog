import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	var isLoggedIn = useSelector(state => state.zeit.profile.isLoggedIn);
	//this will be used to redirect user away from login page if user is already logged in

	return(
		<Route
			{...rest}
			render={props =>
				isLoggedIn
				?	<Redirect to={{ pathname: "/profile"}}/>
				:	<Component {...props}/>
			}
		/>
	)
}
export default PrivateRoute;