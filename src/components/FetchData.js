import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, fetchFoodPlaces } from '../redux';

function FetchData() {
    const dispatch = useDispatch()
    const username = useSelector(state => state.aaron.user.userInfo.Username);

    useEffect(() => {
        if(username) {
            dispatch(fetchProfile(username))
        }
        dispatch(fetchFoodPlaces())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null
}

export default FetchData;