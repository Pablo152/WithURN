import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {HomeProps} from '../types/NavigatorTypes';

export default function HomeScreen({navigation}: HomeProps) {
  const [text, setText] = React.useState('');

  return (
    <View style={style.container}>
      <Text style={style.mainText}>WithU - RN</Text>
      <TextInput
        label="Youtube URL"
        placeholder="Type the url here..."
        value={text}
        onChangeText={val => setText(val)}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Room', {youtubeUrl: text})}>
        Create
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
