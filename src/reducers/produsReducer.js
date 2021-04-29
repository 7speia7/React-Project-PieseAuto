import {
    GET_PRODUS_LOADING_START,
    GET_PRODUS_SUCCESS,
    GET_PRODUS_ERROR,
    CREATE_PRODUS_SUCCESS,
    EDIT_PRODUS_SUCCESS,
    DELETE_PRODUS_SUCCESS,
  } from '../actions/produsActions';
  
  const initialState = {
    produs: [],
    loading: false,
    error: '',
  };
  
  const produsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUS_LOADING_START:
        return {
          ...state,
          loading: true,
        };
      case GET_PRODUS_SUCCESS:
        return {
          ...state,
          produs: action.payload,
          loading: false,
          error: '',
        };
      case GET_PRODUS_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case CREATE_PRODUS_SUCCESS:
        return {
          ...state, produs: [...state.produs, action.payload]
        };
      case EDIT_PRODUS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: '',
          produs: state.produs.map((produs) => {
            if (produs._id === action.payload.updatedProdus._id) {
              return action.payload;
            }
            return produs;
          }),
        };
      case DELETE_PRODUS_SUCCESS:
      
      return {
          ...state,
          loading: false,
          error: "",
          produs: state.produs.filter((produs) => {
            return produs._id !== action.payload.deletedProdus._id;
          })
        };
      default:
        return state;
    }
  };
  
  export default produsReducer;