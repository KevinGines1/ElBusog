import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile, fetchFoodPlaces } from '../redux';
import axios from 'axios';

axios.get("https://ancient-garden-70007.herokuapp.com/api/getAllUsers")
    .then(response => {
        console.log(response.data)
    })
axios.get("https://ancient-garden-70007.herokuapp.com/api/photos/17")
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error.message)
    })

    axios.delete(`https://ancient-garden-70007.herokuapp.com/api/removeFoodPlace/16`)
    .then(response => {
        console.log(response.data, "Removed cora's 2")
    })
// axios.post("https://ancient-garden-70007.herokuapp.com/api/addComment", {
//     userID: 5,
//     foodPlaceID: 5,
//     rating: 5,
//     comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
// })
//     .then(response => {
//         console.log(response.data)
//     })

// axios.patch("https://ancient-garden-70007.herokuapp.com/api/profile/update",
//     {
//         userID: 5,
//         origUsername: "eiz",
//         newName: "Zeit",
//         newUsername: "eiz",
//         newEmail: "eiz@gmail.com",
//         newPassword: "temporary",
//         newPicturePath: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
//         accType: "Customer"
//     })
//     .then(response => {
//         console.log(response.data)
//     })
//     .catch(error => {
//         console.log(error.message)
//     })

function FetchData() {
    const dispatch = useDispatch()
    const username = "tita_cora1"

    useEffect(() => {
        dispatch(fetchProfile(username))
        dispatch(fetchFoodPlaces())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null
}

export default FetchData;