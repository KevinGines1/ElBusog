import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editingFoodPlace, deleteFoodPlace } from '../redux';

// HINDI NADEDELETE FOOD PLACE KAPAG KAKA-ADD LANG

function DashboardItemButtons(props) {
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        confirmDelete: false
    })

    const confirmDelete = () => {
        setState({ confirmDelete: true })
    }

    const dispatchDelete = () => {
        dispatch(deleteFoodPlace(props.foodPlace.Food_place_id))
        setState({ confirmDelete: false })
    }

    return (
        <div className="dashboardItemButtons">
            {(!state.confirmDelete &&
                <div>
                    <button
                        className="dashboardItemBtn"
                        disabled={profile.addingFoodPlace || profile.isEditing}
                        onClick={() => dispatch(editingFoodPlace(props.foodPlace))}
                    >Edit</button>
                    <button
                        className="dashboardItemBtn"
                        disabled={profile.addingFoodPlace || profile.isEditing}
                        onClick={() => confirmDelete()}
                    >Delete</button>
                </div>
            )}
            {(state.confirmDelete &&
                <div className="confirmDeleteContainer">
                    <div className="confirmDeleteMsg">Are you sure you want to delete {props.foodPlace.Food_place_name}?</div>
                    <button
                        className="dashboardItemBtn"
                        onClick={dispatchDelete}
                    >Yes</button>
                    <button
                        className="dashboardItemBtn"
                        type="button"
                        onClick={() => setState({ confirmDelete: false })}
                    >No</button>
                </div>
            )}
        </div>
    );
}

export default DashboardItemButtons;