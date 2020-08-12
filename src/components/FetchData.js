import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile, fetchFoodPlaces } from '../redux';

function FetchData() {
    const dispatch = useDispatch()
    const username = "MotherZeit420"

    useEffect(() => {
        dispatch(fetchProfile(username))
        dispatch(fetchFoodPlaces())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null
}

export default FetchData;