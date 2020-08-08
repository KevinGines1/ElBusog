import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile, fetchFoodPlaces } from '../redux';
// import axios from 'axios';

// NOT WORKING:
// axios.patch("https://ancient-garden-70007.herokuapp.com/api/editFoodPlace", {
//     newName: "Cora's 2",
//     newLocation: "within UPLB",
//     newPrice: ">100",
//     newDesc: "Tita Cora's is a small store located near dorms and apartments inside Raymundo Gate that offers a variety of student-friendly meals. It has a warm atmosphere due to its family-like setting with a single long table to seat its customers.",
//     newOpen: null,
//     closeTime: null,
//     newDays: "12345",
//     newFoodTypes: "Meat, Vegetables",
//     owner: "tita_cora1"
// })

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
    useEffect(() => {
        dispatch(fetchProfile("tita_cora1"))
        dispatch(fetchFoodPlaces())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null
}

export default FetchData;