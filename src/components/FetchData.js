import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFoodPlaces, getUserFromToken } from '../redux';

function FetchData() {
    const dispatch = useDispatch()
    // quoted-out codes are from an old version where username is kept in
    // localStorage instead of token
    // const username = useSelector(state => state.aaron.user.userInfo.Username);

    useEffect(() => {
        const token = localStorage.getItem('token')
        // localStorage.setItem('username', 'aaron')
        // const username = localStorage.getItem('username')
        // console.log(token)
        if(token) {
            console.log("Token found")
            dispatch(getUserFromToken(token))
        }
        // if(username) {
        //     // dispatch(fetchProfile(username))
        //     // dispatch(getUser(username))
        // }
        dispatch(fetchFoodPlaces())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null
}

export default FetchData;