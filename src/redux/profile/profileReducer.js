import {
    FETCH_PROFILE,
    FETCH_OWN_FOODPLACE,
    EDIT_PROFILE,
    DISABLE_SAVE,
    ENABLE_SAVE,
    CHECK_USERNAME,
    CHECK_EMAIL,
    SAVE_CHANGES,
    CANCEL_CHANGES,
    EDITING_FOOD_PLACE,
    EDIT_FOOD_PLACE,
    ADDING_FOOD_PLACE,
    ADD_FOOD_PLACE
} from './profileTypes';

// need to add napapalitan na picture
const initialState = {
    User_id: "",
    Name: "",
    Username: "",
    Email: "",
    Picture: "",
    User_type: "",
    Password: "",
    ownedFoodPlaces: [],
    isEditing: false,
    disabledSaveBtn: true,
    usernameAvailable: true,
    emailAvailable: true,
    editingFoodPlace: false,
    editingData: {},
    addingFoodPlace: false
}

const profileReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_PROFILE:
            return {
                ...state,
                User_id: action.payload.User_id,
                Name: action.payload.Name,
                Username: action.payload.Username,
                Email: action.payload.Email,
                Picture: action.payload.Picture,
                User_type: action.payload.User_type,
                Password: action.payload.Password
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
                isEditing: !state.isEditing
            }
        case DISABLE_SAVE:
            return {
                ...state,
                disabledSaveBtn: true
            }
        case ENABLE_SAVE:
            return {
                ...state,
                disabledSaveBtn: false
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
        case SAVE_CHANGES:
            return {
                ...state,
                Name: action.payload.newName,
                Username: action.payload.newUsername,
                Email: action.payload.newEmail,
                Picture: action.payload.newPicturePath,
                Password: action.payload.newPassword,
                User_type: action.payload.accType
            }
        case CANCEL_CHANGES:
            return {
                ...state,
                usernameAvailable: true,
                emailAvailable: true
            }
        case EDITING_FOOD_PLACE:
            return {
                ...state,
                editingFoodPlace: !state.editingFoodPlace,
                editingData: action.payload
            }
        case EDIT_FOOD_PLACE:
            return {
                ...state,
                ownedFoodPlaces: [
                    ...state.ownedFoodPlaces,
                    state.ownedFoodPlaces.map(foodPlace => {
                        return foodPlace.Food_place_id === action.payload.foodPlaceId ? 
                        {
                            Food_place_id: action.payload.foodPlaceId,
                            Food_place_name: action.payload.newName,
                            Location: action.payload.newLoc,
                            Price_range: action.payload.newPrice,
                            Description: action.payload.newDesc,
                            Opening_time: action.payload.newOpen,
                            Closing_time: action.payload.newClose,
                            Days_open: action.payload.newDays,
                            User_id: action.payload.owner
                        }
                        : {...foodPlace}
                    })
                ]
            }
        case ADDING_FOOD_PLACE:
            return {
                ...state,
                addingFoodPlace: !state.addingFoodPlace
            }
        case ADD_FOOD_PLACE:
            return {
                ...state,
                ownedFoodPlaces: [
                    ...state.ownedFoodPlaces,
                    {
                        Food_place_id: action.payload.owner,
                        Food_place_name: action.payload.foodplaceName,
                        Location: action.payload.location,
                        Price_range: action.payload.priceRange,
                        Description: action.payload.description,
                        Opening_time: action.payload.openTime,
                        Closing_time: action.payload.closeTime,
                        Days_open: action.payload.daysOpen,
                        User_id: action.payload.owner
                    }
                ]
            }
        default: return state
    }
}

export default profileReducer;