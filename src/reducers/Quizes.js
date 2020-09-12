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
  mod: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOAD_INTI_QUIZES:
      return {
        ...state,
        status: action.status,
        mod: 'init',
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
