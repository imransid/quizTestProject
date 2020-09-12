import {takeEvery, select, call, put, retry} from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import actionType from '../constant/constant';

const save_quiz = function* (action) {
  try {
    const alllQuizData = yield call(loadQuizes);

    const newQuiz = yield call(
      createNewQuiz,
      action.qustion,
      action.answer,
      action.option,
      alllQuizData,
    );

    yield put({
      type: actionType.UPDATE_QUIZ,
      quiz: newQuiz,
    });
  } catch (err) {
    console.log(err);
  }
};

const save_admin = function* (action) {
  try {
    const alllAdminData = yield call(loadAdmin);
    yield call(createNewAdmin, action.name, action.email, alllAdminData);

    yield put({
      type: actionType.UPDATE_ADMIN,
      name: action.name,
      email: action.email,
    });
  } catch (err) {
    console.log(err);
  }
};

async function createNewAdmin(name, email, alllAdminData) {
  try {
    let data = [{name: name}, {email, email}];
    alllAdminData.push(data);

    await AsyncStorage.setItem('admin@Data', JSON.stringify(alllAdminData));
  } catch (error) {
    console.log('async save prlm', error);
  }
}

async function loadAdmin() {
  try {
    let admin = await AsyncStorage.getItem('admin@Data');

    let data = JSON.parse(admin);

    return data == null ? [] : data;
  } catch (error) {
    console.log('async save prlm', error);
  }
}

async function createNewQuiz(qus, ans, option, alldata) {
  try {
    let Quiz = [
      {
        question: qus,
        answer: ans,
        option: [option, ans],
      },
    ];

    alldata.push(Quiz);

    await AsyncStorage.setItem('quiz@Data', JSON.stringify(alldata));

    return alldata;
  } catch (error) {
    console.log('async save prlm', error);
  }
}

const load_quiz = function* (action) {
  try {
    const alllQuizData = yield call(loadQuizes);

    yield put({
      type: actionType.UPDATE_QUIZ,
      quiz: alllQuizData,
    });
  } catch (err) {
    console.log(err);
  }
};

async function loadQuizes() {
  try {
    let admin = await AsyncStorage.getItem('quiz@Data');

    let data = JSON.parse(admin);

    return data == null ? [] : data;
  } catch (error) {
    console.log('async save prlm', error);
  }
}

async function createNeResult(data, alldata) {
  try {
    alldata.push(data);

    await AsyncStorage.setItem('result@Data', JSON.stringify(alldata));

    return alldata;
  } catch (error) {
    console.log('async save prlm', error);
  }
}

async function loadResult() {
  try {
    let admin = await AsyncStorage.getItem('result@Data');

    let data = JSON.parse(admin);

    return data == null ? [] : data;
  } catch (error) {
    console.log('async save prlm', error);
  }
}

const save_result = function* (action) {
  try {
    const allResult = yield call(loadResult);

    const newQuiz = yield call(createNeResult, action.data, allResult);

    yield put({
      type: actionType.SAVE_RESULT_QUIZ,
      result: newQuiz,
    });
  } catch (err) {
    console.log(err);
  }
};
const intQuiz = function* (action) {
  try {
    yield put({
      type: actionType.LOAD_INTI_QUIZES,
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const initloadResultNow = function* (action) {
  try {
    const allResult = yield call(loadResult);
    yield put({
      type: actionType.SAVE_RESULT_QUIZ,
      result: allResult,
    });
  } catch (err) {
    console.log(err);
  }
};

const rootSaga = function* () {
  yield takeEvery(actionType.SAVE_RESULT, save_result);
  yield takeEvery(actionType.ADD_ADMIN, save_admin);
  yield takeEvery(actionType.SAVE_QUIZES, save_quiz);
  yield takeEvery(actionType.LOAD_QUIZES_DB, load_quiz);
  yield takeEvery(actionType.LOAD_QUIZES, intQuiz);

  yield takeEvery(actionType.LOAD_ALL_RESULT, initloadResultNow);
};

export default rootSaga;
