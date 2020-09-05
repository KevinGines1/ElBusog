import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFoodPlaces, getUserFromToken } from '../redux';

function FetchData() {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            dispatch(getUserFromToken(token))
        }
        dispatch(fetchFoodPlaces())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null
}

export default FetchData;