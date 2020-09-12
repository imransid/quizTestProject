import actionType from '../constant/constant';

let defaultQuiz = [
  {
    question: 'what date is today ?',
    answer: 12,
    option: [10, 11, 12],
  },
];

const initialState = {
  status: false,
  quiz: defaultQuiz,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOAD_QUIZES:
      return {
        ...state,
      };
    case actionType.UPDATE_QUIZ:
      return {
        ...state,
        quiz: action.quiz,
        status: true,
      };
    default:
      return state;
  }
};
