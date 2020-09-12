import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Quiz from '../component/Quiz/Quiz';

import Register from '../component/Register/Register';

import Result from '../component/Result/Result';

const CustomMenu = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => props.updateMenu()}>
        <Text>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Route = () => {
  const [selectedMenu, setSelectedMenu] = useState('Quiz');

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 6}}>
        {selectedMenu === 'Quiz' ? (
          <Quiz />
        ) : selectedMenu === 'Register' ? (
          <Register />
        ) : (
          <Result />
        )}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'green',
          flexDirection: 'row',
        }}>
        <CustomMenu name="Quiz" updateMenu={() => setSelectedMenu('Quiz')} />
        <CustomMenu
          name="Register"
          updateMenu={() => setSelectedMenu('Register')}
        />
        <CustomMenu
          name="Result"
          updateMenu={() => setSelectedMenu('Result')}
        />
      </View>
    </View>
  );
};

export default Route;
