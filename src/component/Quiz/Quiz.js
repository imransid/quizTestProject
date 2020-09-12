import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {initialQuiz, loadQuiz} from '../../actions/Quizs';
import {SaveResult} from '../../actions/Result';

const Quiz = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.Quizes.status);

  const mod = useSelector((state) => state.Quizes.mod);

  const quiz = useSelector((state) => state.Quizes.quiz);

  const [answer, setQusAnswer] = useState([]);

  const [nameUser, setnameUser] = useState('');

  const [showUser, setshowUser] = useState(false);

  const [saveData, setSaveData] = useState([]);

  const submitResultNow = () => {
    nameUser === '' ? alert('enter name and try') : null;

    let result = {
      name: nameUser,
      answer: answer,
    };

    nameUser !== '' ? dispatch(SaveResult(result)) : null;

    setshowUser(false);
    setQusAnswer([]);
  };

  const _SaveResult = () => {
    if (answer.length === 0) {
      alert('empty result');
    } else {
      setshowUser(true);
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

    let savedata = {
      qus: qus,
      ans: ans,
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
          ? saveData === true && mod == 'init'
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
                    {e[0].option.map((i, m) => (
                      <TouchableOpacity
                        key={m}
                        onPress={() => setAnswer(i, e[0].question)}>
                        <Text>{i + '      '}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))
          : null}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showUser}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000066',
          }}>
          <View
            style={{
              width: '80%',
              height: '30%',
              backgroundColor: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text> Please Enter Your Name To Submit Answer :</Text>

            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                width: '80%',
              }}
              onChangeText={(text) => setnameUser(text)}
              placeholder={'Enter your name'}
            />

            <TouchableOpacity
              onPress={() => submitResultNow()}
              style={{marginTop: 15}}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => _SaveResult()}>
          <Text>Save Result</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quiz;
