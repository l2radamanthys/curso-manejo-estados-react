import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }));
  const {
    sincronizedItem,
    item,
    loading,
    error
  } = state;

  const onError = (error) => dispatch({ type: actionTypes.error, paylaod: error });
  const onSuccess = (item) => dispatch({ type: actionTypes.success, payload: item });
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item }); 
  const onSincronize = () => dispatch({ type: actionTypes.sincronize });

  console.log(item)

  React.useEffect(() => {
    console.log("iniciando sincronizacion")

    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        // setItem(parsedItem);
        // setLoading(false);
        // setSincronizedItem(true);
        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
      console.log("fin lectura localstorage")
    }, 1000);
  }, [sincronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch(error) {
      onError(error);
    }
  };

  const sincronizeItem = () => {
    onSincronize();
  };

  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
}

const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  error: false,
  loading: true,
  item: initialValue,
});

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  save: 'SAVE',
  sincronize: 'SINCRONIZE',
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    loading: true,
    sincronizedItem: false,
  },
});

const reducer = (state, action) => {
  console.log(action)
  console.log(state)
  return reducerObject(state, action.payload)[action.type] || state;
};



export { useLocalStorage };