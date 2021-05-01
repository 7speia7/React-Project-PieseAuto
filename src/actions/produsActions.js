export const GET_PRODUS_LOADING_START = 'GET_PRODUS_LOADING_START';
export const GET_PRODUS_SUCCESS = 'GET_PRODUS_SUCCESS';
export const GET_PRODUS_ERROR = 'GET_PRODUS_ERROR';


export const getProdusAction = () => 
  async (dispatch) => {
    dispatch({
      type: GET_PRODUS_LOADING_START,
    });

    try {
      const produs = await fetch(`https://pieseautonodejs.herokuapp.com/api/produs`,{
        method: 'GET',  
      headers: {
          Authorization: localStorage.getItem('token'),
        },
      }).then((res) => res.json());
    console.log(produs);
      if(Array.isArray(produs)){
        dispatch({
          type: GET_PRODUS_SUCCESS,
          payload: produs,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PRODUS_ERROR,
        payload: 'Ceva nu a mers bine',
      });
    }
  };


export const CREATE_PRODUS_ERROR = 'CREATE_PRODUS_ERROR';
export const CREATE_PRODUS_SUCCESS = 'CREATE_PRODUS_SUCCESS';

export const createProdusAction = (produs) => {
  return async (dispatch) => {
    try {
      const createdProdus = await fetch(
        `https://pieseautonodejs.herokuapp.com/api/produs/`,
        {
          method: "POST",
          body: JSON.stringify({ title: produs.title, text: produs.text, price: produs.price, isBought: false}),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      ).then((res) => res.json());
      dispatch({ type: CREATE_PRODUS_SUCCESS, payload: createdProdus });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUS_ERROR,
        payload: 'Ceva nu a mers bine',
      });
    }
  };
};

export const EDIT_PRODUS_ERROR = 'EDIT_PRODUS_ERROR';
export const EDIT_PRODUS_SUCCESS = 'EDIT_PRODUS_SUCCESS';

export const editProdusAction = (produsId, produs) => {
  return async (dispatch) => {
    try {
      const editedProdus = await fetch(
        `https://pieseautonodejs.herokuapp.com/api/produs/${produsId}`,
        {
          method: "PUT",
          body: JSON.stringify({ title: produs.title, text: produs.text, price: produs.price, isBought: false }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      ).then((res) => res.json());
  
      dispatch({ type: EDIT_PRODUS_SUCCESS, payload: editedProdus });
    } catch (error) {
      dispatch({
        type: EDIT_PRODUS_ERROR,
        payload: 'Ceva nu a mers bine',
      });
    }
  };
};

export const DELETE_PRODUS_ERROR = 'DELETE_PRODUS_ERROR';
export const DELETE_PRODUS_SUCCESS = 'DELETE_PRODUS_SUCCESS';

export const deleteProdusAction = (produsId) => async (dispatch) => {
  try {
    const deletedProdus = await fetch(
      `https://pieseautonodejs.herokuapp.com/api/produs/${produsId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    ).then((res) => res.json());
      console.log(deletedProdus);
    dispatch({ type: DELETE_PRODUS_SUCCESS, payload: deletedProdus });
  } catch (error) {
    dispatch({ type: DELETE_PRODUS_ERROR, payload: error.message });
  }
};

export const GET_PRODUS_FOR_USER_SUCCESS = 'GET_PRODUS_FOR_USER_SUCCESS';
export const GET_PRODUS_FOR_USER_ERROR = 'GET_PRODUS_FOR_USER_ERROR';

export const getProdusActionForUser = () => 
  async (dispatch) => {
    dispatch({
      type: GET_PRODUS_LOADING_START,
    });

    try {
      const produs = await fetch(`https://pieseautonodejs.herokuapp.com/api/produs/onlyUser`,{
        method: 'GET',  
      headers: {
          Authorization: localStorage.getItem('token'),
        },
      }).then((res) => res.json());
    console.log(produs);
      if(Array.isArray(produs)){
        dispatch({
          type: GET_PRODUS_FOR_USER_SUCCESS,
          payload: produs,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PRODUS_FOR_USER_ERROR,
        payload: 'Ceva nu a mers bine',
      });
    }
  };