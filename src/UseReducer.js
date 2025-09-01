import React from "react";



const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
}

// const reducer = (state, action) => {
// };

const reducerIfElse = (state, action) => {
  if (action.type === 'ERROR') {
    return {
      ...state,
      error: true,
      loading: false
    };
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === 'CONFIRM') {
    return {
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    };
  } else if (action.type === 'DELETE') {
    return {
      ...state,
      deleted: true,
    };
  } else if (action.type === 'RESET') {
    return {
      ...initialState
    };
  } else if (action.type === 'WRITE') {
    return {
      ...state
    };
  } else {
    return {
      ...state
    };
  }
};


const reducerSwitch = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false
      };
    case 'CHECK':
      return {
        ...state,
        loading: true,
      };
    case 'RESET':
      return {
        ...initialState
      };
    default:
      return {
        ...state
      };
  }
};



const reducerObject = (state) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false
  },
  'CHECK': {
    ...state,
    loading: true
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
};
