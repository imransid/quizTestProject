import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {loadResult} from '../../actions/Result';

const Result = () => {
  const dispatch = useDispatch();

  const result = useSelector((state) => state.Admin.result);
  const status = useSelector((state) => state.Quizes.status);

  useEffect(() => {
    try {
      dispatch(loadResult());
    } catch (err) {
      console.log('ERROR IS', err);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Result is</Text>
      </View>

      <View style={{flex: 5}}>
        {result.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Exam Done</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            {result.map((e, i) => (
              <View key={i} style={{flex: 1, flexDirection: 'column'}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Answer Creator : {e.name}</Text>
                </View>

                {e.answer.map((i, j) => (
                  <View
                    key={j}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Qustion : {i.qus}</Text>
                    <Text>Answer : {i.ans}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Result;
