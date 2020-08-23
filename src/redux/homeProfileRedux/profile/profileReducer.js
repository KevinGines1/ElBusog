import {
    FETCH_PROFILE,
    FETCH_OWN_FOODPLACE,
    EDIT_PROFILE,
    CHECK_USERNAME,
    CHECK_EMAIL,
    CHECK_PASSWORD,
    SAVE_CHANGES,
    CANCEL_CHANGES,
    DELETE_ACCOUNT,
    LOGOUT_PROFILE,
    EDITING_FOOD_PLACE,
    EDIT_FOOD_PLACE,
    ADDING_FOOD_PLACE,
    ADD_FOOD_PLACE,
    DELETE_FOOD_PLACE,
    UPLOAD_IMAGE
} from './profileTypes';

const initialState = {
    User_id: "",
    Name: "",
    Username: "",
    Email: "",
    Picture: null,
    User_type: "",
    Password: "",
    ownedFoodPlaces: [],
    editingProfile: false,
    usernameAvailable: true,
    emailAvailable: true,
    correctPassword: true,
    editingFoodPlace: false,
    editingData: {},
    addingFoodPlace: false,
    isLoggedIn: null,
    uploadedImage: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE:
            return {
                ...state,
                User_id: action.payload.User_id,
                Name: action.payload.Name,
                Username: action.payload.Username,
                Email: action.payload.Email,
                Picture: action.payload.Picture,
                User_type: action.payload.User_type,
                isLoggedIn: true
            }
        case FETCH_OWN_FOODPLACE:
            return {
                ...state,
                ownedFoodPlaces: [
                    ...state.ownedFoodPlaces,
                    action.payload
                ]
            }
        case EDIT_PROFILE:
            return {
                ...state,
                editingProfile: !state.editingProfile
            }
        case CHECK_USERNAME:
            return {
                ...state,
                usernameAvailable: action.payload.infoValid
            }
        case CHECK_EMAIL:
            return {
                ...state,
                emailAvailable: action.payload.infoValid
            }
        case CHECK_PASSWORD:
            return {
                ...state,
                correctPassword: action.payload
            }
        case SAVE_CHANGES:
            return {
                ...state,
                uploadedImage: "",
                Name: action.payload.Name,
                Username: action.payload.Username,
                Email: action.payload.Email,
                Picture: action.payload.Picture,
                User_type: action.payload.User_type,
                editingProfile: false
            }
        case CANCEL_CHANGES:
            return {
                ...state,
                uploadedImage: "",
                usernameAvailable: true,
                emailAvailable: true
            }
        case DELETE_ACCOUNT:
            return {
                ...initialState,
                isLoggedIn: false
            }
        case LOGOUT_PROFILE:
            return {
                ...initialState,
                isLoggedIn: false
            }
        case EDITING_FOOD_PLACE:
            return {
                ...state,
                uploadedImage: "",
                editingFoodPlace: !state.editingFoodPlace,
                editingData: action.payload
            }
        case EDIT_FOOD_PLACE:
            return {
                ...state,
                uploadedImage: "",
                ownedFoodPlaces: 
                    state.ownedFoodPlaces.map(foodPlace =>
                        foodPlace.Food_place_id === action.payload.foodPlaceID ?
                            {
                                ...foodPlace,
                                Food_place_id: action.payload.foodPlaceID,
                                Food_place_name: action.payload.newName,
                                Location: action.payload.newLocation,
                                Price_range: action.payload.newPrice,
                                Description: action.payload.newDesc,
                                Opening_time: action.payload.newOpen,
                                Closing_time: action.payload.newClose,
                                Food_types: action.payload.newFoodTypes,
                                Days_open: action.payload.newDays,
                                User_id: action.payload.owner,
                                Picture: action.payload.foodPlacePhoto
                            }
                            : { ...foodPlace }
                    )
            }
        case ADDING_FOOD_PLACE:
            return {
                ...state,
                uploadedImage: "",
                addingFoodPlace: !state.addingFoodPlace
            }
        case ADD_FOOD_PLACE:
            return {
                ...state,
                uploadedImage: "",
                ownedFoodPlaces: [
                    ...state.ownedFoodPlaces,
                    {
                        Food_place_id: action.payload.foodPlaceID,
                        Food_place_name: action.payload.foodPlaceName,
                        Location: action.payload.location,
                        Price_range: action.payload.priceRange,
                        Description: action.payload.description,
                        Opening_time: action.payload.openTime,
                        Closing_time: action.payload.closeTime,
                        Days_open: action.payload.daysOpen,
                        Food_types: action.payload.foodTypes,
                        User_id: action.payload.owner,
                        Picture: action.payload.foodPlacePhoto,
                        Reviews: []
                    }
                ]
            }
        case DELETE_FOOD_PLACE:
            return {
                ...state,
                ownedFoodPlaces: state.ownedFoodPlaces.filter(foodPlace => 
                    foodPlace.Food_place_id !== action.payload
                )
            }
        case UPLOAD_IMAGE:
            return {
                ...state,
                uploadedImage: action.payload
            }
        default: return state
    }
}

export default profileReducer;