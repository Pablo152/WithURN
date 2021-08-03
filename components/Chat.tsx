import React, {useRef, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Divider, List, TextInput} from 'react-native-paper';

export type Message = {
  id: number;
  user: string;
  text: string;
  avatar: ImageSourcePropType;
  direction: 'in' | 'out';
  date: Date;
};

type ChatProps = {
  messages: Message[];
  messageHandler: (message: Message) => void;
};

export default function Chat({
  messages,
  messageHandler,
}: ChatProps): JSX.Element {
  const [text, setText] = useState<string>('');
  const flatRef = useRef<any>(null);

  const handlePress = () => {
    const message: Message = {
      id: Math.random() * (1 - 1000000) + 1,
      user: 'Pablo',
      text,
      avatar: 123,
      direction: 'out',
      date: new Date(),
    };
    messageHandler(message);
  };

  return (
    <>
      <FlatList
        ref={flatRef}
        contentContainerStyle={styles.flatListContainerStyle}
        style={styles.flatListChatStyle}
        ItemSeparatorComponent={() => <Divider />}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Item
            title={item.user}
            description={item.text}
            descriptionNumberOfLines={5}
            titleStyle={
              item.direction === 'in'
                ? styles.commentBaseIn
                : styles.commentBaseOut
            }
            descriptionStyle={
              item.direction === 'in'
                ? styles.commentBaseIn
                : styles.commentBaseOut
            }
            left={
              item.direction === 'in'
                ? props => <List.Icon {...props} icon="account-circle" />
                : undefined
            }
            right={
              item.direction === 'out'
                ? props => <List.Icon {...props} icon="account-circle" />
                : undefined
            }
          />
        )}
      />
      <TextInput
        multiline
        maxLength={20}
        blurOnSubmit={false}
        value={text}
        onChangeText={txt => setText(txt)}
        label="Chat"
        placeholder="Type something here..."
        right={<TextInput.Icon onPress={() => handlePress()} name="send" />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentBaseIn: {
    marginLeft: -15,
    alignSelf: 'flex-start',
  },
  commentBaseOut: {
    alignSelf: 'flex-end',
  },
  flatListContainerStyle: {
    paddingBottom: 20,
  },
  flatListChatStyle: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
});
