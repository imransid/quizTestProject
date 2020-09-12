import actionType from '../constant/constant';

export function initialQuiz() {
  return {
    type: actionType.LOAD_QUIZES,
  };
}

export function loadQuiz() {
  return {
    type: actionType.LOAD_QUIZES_DB,
  };
}

export function saveQuiz(qustion, answer, option) {
  return {
    type: actionType.SAVE_QUIZES,
    qustion: qustion,
    answer: answer,
    option: option,
  };
}
