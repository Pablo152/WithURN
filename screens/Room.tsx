import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import YouTube from 'react-native-youtube';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import {NativeEventEmitter} from 'react-native';
import {RoomProps} from '../types/NavigatorTypes';
import {ScrollView} from 'react-native-gesture-handler';

// Takes a youtube url, parses it into a valid ID.
function getYouTubeId(url: string): string {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
}

export default function Room({route}: RoomProps): JSX.Element {
  const theme = useTheme();
  const [isChatOpened, setOpenedChat] = useState<boolean>(false);
  const ref = useRef<BottomSheetBehavior>(null);
  const window = useWindowDimensions();

  const id = getYouTubeId(route.params.youtubeUrl);

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

  return (
    <>
      <ScrollView style={styles.container}>
        <YouTube
          videoId={id} // The YouTube video ID
          apiKey="AIzaSyDbsPO5O1xuisa2ecDlTEs7wIIwtfS2wz0"
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
        borderRadius={20}
        onCloseEnd={() => setOpenedChat(false)}
        renderContent={() => (
          <View
            style={{
              backgroundColor: theme.colors.surface,
              ...styles.bottomSheetContainer,
            }}>
            <Text style={styles.bottomSheetText}>Chat</Text>
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
  bottomSheetContainer: {
    padding: 10,
    height: 450,
  },
  bottomSheetText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
