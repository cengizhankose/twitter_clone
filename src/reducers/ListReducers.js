import {
    LIST_START,
    LIST_SUCCESS,
    LIST_FAILD,

    ADD_ITEM_START,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILD,

    REMOVE_ITEM_START,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAILD,

} from '../actions/types';

const INITIAL_STATE = {
    loadingCharacter: false,
    loadingAddItem: false,
    loadingRemoveItem: false,
    characters: []
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LIST_START:
            return {
                ...state,
                loadingCharacter: true,
            };


        case LIST_SUCCESS:
            return {
                ...state,
                loadingCharacter: false,
                characters: action.payload.characters
            };

        case LIST_FAILD:
            return {
                ...state,
                loadingCharacter: false,
            };


        case ADD_ITEM_START:
            return {
                ...state,
                loadingAddItem: true,
            };


        case ADD_ITEM_SUCCESS:
            const newItem = action.payload.newCharacter

            return {
                ...state,
                loadingAddItem: false,
                characters: [...state.characters, newItem]
            };

        case ADD_ITEM_FAILD:
            return {
                ...state,
                loadingAddItem: false,
            };


        case REMOVE_ITEM_START:
            return {
                ...state,
                loadingRemoveItem: true,
            };


        case REMOVE_ITEM_SUCCESS:
            const id = action.payload
            const newData = state.characters.filter((dt) => dt._id != id)
            return {
                ...state,
                loadingRemoveItem: false,
                characters: newData
            };

        case REMOVE_ITEM_FAILD:
            return {
                ...state,
                loadingRemoveItem: false,
            };

        default:
            return state;
    }
};