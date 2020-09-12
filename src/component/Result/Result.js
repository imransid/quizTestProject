import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const Result = () => {
  const dispatch = useDispatch();

  const result = useSelector((state) => state.Admin.result);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Result is</Text>
      </View>

      <View style={{flex: 5}}>{result.length !== 0 ? null : null}</View>
    </View>
  );
};

export default Result;
