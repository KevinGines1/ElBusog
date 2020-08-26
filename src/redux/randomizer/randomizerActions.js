import { RANDOMIZE_FOODPLACE, GET_JEEP_STOP } from './randomizerTypes';
import axios from 'axios'
import { SERVER_URL } from '../serverUrl'

// Actions
export const randomizeAction = (payload) => ({
	type: RANDOMIZE_FOODPLACE,
	payload: payload
})


export const getJeepRoute = (lat, lng, id) => {
	return (dispatch) => {
		axios.get(`${SERVER_URL}/locate/${lat}&${lng}&${id}`)
		.then(response => {
			// console.log(response.data)
			dispatch({
				type: GET_JEEP_STOP,
				payload: response.data
			})
		})
	}
}