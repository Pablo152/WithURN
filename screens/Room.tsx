import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import YouTube from 'react-native-youtube';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import {NativeEventEmitter} from 'react-native';
import {RoomProps} from '../types/NavigatorTypes';
import {ScrollView} from 'react-native-gesture-handler';
import Chat, {Message} from '../components/Chat';

import {API_KEY} from 'react-native-dotenv';

// Takes a youtube url, parses it into a valid ID.
function getYouTubeId(url: string): string {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
}

export default function Room({route}: RoomProps): JSX.Element {
  const theme = useTheme();
  const window = useWindowDimensions();
  const id = getYouTubeId(route.params.youtubeUrl);

  const ref = useRef<BottomSheetBehavior>(null);

  const [isChatOpened, setOpenedChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const emitter = new NativeEventEmitter();
    // Emitted from CustomNavigationBar.tsx everythime the 'Chat' button is clicked.
    emitter.addListener('open_chat', () => {
      if (isChatOpened) {
        setOpenedChat(false);
        ref.current?.snapTo(2);
      } else {
        setOpenedChat(true);
        ref.current?.snapTo(0);
      }
    });
    // Need to cleanup the event listener or you will end up with a bunch of them
    // everytime the state changes.
    return function cleanup() {
      emitter.removeAllListeners('open_chat');
    };
  }, [isChatOpened]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        user: 'Pablo',
        text: 'XDDD',
        avatar: 123,
        direction: 'in',
        date: new Date(),
      },
    ]);
  }, []);

  const messageHandler = (message: Message) => {
    setMessages([...messages, message]);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <YouTube
          videoId={id} // The YouTube video ID
          apiKey={API_KEY}
          style={{
            height: window.height - 56,
            width: window.width,
            ...styles.youtubeFrame,
          }}
        />
      </ScrollView>
      <BottomSheet
        ref={ref}
        snapPoints={['45%', '20%', 0]}
        initialSnap={2}
        onCloseEnd={() => setOpenedChat(false)}
        enabledHeaderGestureInteraction={true}
        renderHeader={() => (
          <View
            style={{
              backgroundColor: theme.colors.surface,
              ...styles.bottomSheetHeader,
            }}>
            <Text style={styles.bottomSheetText}>Chat</Text>
          </View>
        )}
        renderContent={() => (
          <View
            style={{
              backgroundColor: theme.colors.surface,
              ...styles.bottomSheetContent,
            }}>
            <Chat messages={messages} messageHandler={messageHandler} />
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  youtubeFrame: {
    alignSelf: 'stretch',
  },
  bottomSheetContent: {
    height: '100%',
  },
  bottomSheetHeader: {
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  bottomSheetText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
