import actionType from '../constant/constant';

const initialState = {
  status: false,
  name: '',
  email: '',
  result: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_ADMIN:
      return {
        ...state,
        status: true,
        name: action.name,
        email: action.email,
      };
    case actionType.SAVE_RESULT_QUIZ:
      return {
        ...state,
        result: action.result,
      };
    default:
      return state;
  }
};
