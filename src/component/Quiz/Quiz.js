import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {initialQuiz, loadQuiz} from '../../actions/Quizs';
import {SaveResult} from '../../actions/Result';

const Quiz = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.Quizes.status);

  const quiz = useSelector((state) => state.Quizes.quiz);

  const [answer, setQusAnswer] = useState([]);

  const [saveData, setSaveData] = useState([]);

  const _SaveResult = () => {
    if (answer.length === 0) {
      alert('empty result');
    } else {
      dispatch(SaveResult(answer));
    }
  };

  const chkQuiz = async () => {
    let admin = await AsyncStorage.getItem('quiz@Data');

    let data = JSON.parse(admin);

    return data == null ? true : false;
  };

  useEffect(() => {
    try {
      chkQuiz().then((e) => {
        setSaveData(e);
        e === true ? dispatch(initialQuiz()) : dispatch(loadQuiz());
      });
    } catch (err) {
      console.log('ERROR IS', err);
    }
  }, []);

  const setAnswer = (ans, qus) => {
    let data = answer;

    console.log(qus);

    let savedata = {
      [qus]: ans,
    };

    data.push(savedata);

    setQusAnswer(data);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Quiz List</Text>
      </View>

      <View style={{flex: 5}}>
        {status === true
          ? saveData === true
            ? quiz.map((e, i) => (
                <View style={{flex: 1}} key={i}>
                  <View>
                    <Text>
                      {' '}
                      {i + 1 + '.'} {e.question}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Answer : </Text>
                    {e.option.map((i) => (
                      <TouchableOpacity
                        onPress={() => setAnswer(i, e.question)}>
                        <Text>{i + '      '}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))
            : quiz.map((e, i) => (
                <View style={{flex: 1}} key={i}>
                  <View>
                    <Text>
                      {' '}
                      {i + 1 + '.'} {e[0].question}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Answer : </Text>
                    {e[0].option.map((i) => (
                      <TouchableOpacity
                        onPress={() => setAnswer(i, e[0].question)}>
                        <Text>{i + '      '}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))
          : null}
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => _SaveResult()}>
          <Text>Save Result</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quiz;
