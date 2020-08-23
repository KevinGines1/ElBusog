import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';

const PrivateRoute = ({ component: Component, ...rest }) => {
	var hasToken = localStorage.getItem('token')
	var isLoggedIn = useSelector(state => state.zeit.profile.isLoggedIn);
	//this will be used to redirect user away from login page if user is already logged in
	//needed both token and isLoggedIn to verify that user is really logged in

	return(
		<Route
			{...rest}
			render={props => {
				if(hasToken) {
					if(isLoggedIn === null) {
						return(<LoadingPage/>)
					}
					else if(isLoggedIn) {
						return(<Redirect to={{ pathname: "/profile"}}/>)
					}
					else {
						return(<Component {...props}/>)
					}
				}
				else {
					return(<Component {...props}/>)
				}
			}}
		/>
	)
}
export default PrivateRoute;
