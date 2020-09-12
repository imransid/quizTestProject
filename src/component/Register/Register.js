import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {saveQuiz} from '../../actions/Quizs';

import {saveAdmin} from '../../actions/Register';

const Register = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.Admin.status);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [qustion, setqustion] = useState('');
  const [answer, setAnswer] = useState('');
  const [option, setOption] = useState('');

  const submit_now = () => {
    if (name == '' || email == '') {
      alert('cannot send blank feold');
    } else {
      dispatch(saveAdmin(name, email));
    }
  };

  const save_question_now = () => {
    if (qustion == '' || answer == '' || option == '') {
      alert('cannot send blank feold');
    } else {
      dispatch(saveQuiz(qustion, answer, option));
    }
  };

  return status === false ? (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to admin page</Text>
      </View>

      <View style={{flex: 1}}>
        <View style={{flex: 0.5}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => setName(text)}
            placeholder={'name'}
          />
        </View>

        <View style={{flex: 0.5}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => setEmail(text)}
            placeholder={'email'}
          />
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => submit_now()}
          style={{borderColor: '#000', borderWidth: 2, padding: 5}}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Add new Question</Text>
      </View>
      <View style={{flex: 4}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>Questiuon :</Text>
          </View>
          <View style={{flex: 3}}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => setqustion(text)}
              placeholder={'qustion'}
            />
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>Answer :</Text>
          </View>
          <View style={{flex: 3}}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => setAnswer(text)}
              placeholder={'answer'}
            />
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>Option :</Text>
          </View>
          <View style={{flex: 3}}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => setOption(text)}
              placeholder={'option'}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => save_question_now()}>
            <Text>Add More Question</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
