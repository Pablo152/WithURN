import React from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import {Appbar, useTheme, Button, Switch} from 'react-native-paper';
import {PreferencesContext} from '../contexts/PreferencesContext';
import {NativeEventEmitter} from 'react-native';

export default function CustomNavigationBar({
  navigation,
  previous,
  scene,
}: StackHeaderProps) {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  const emitter = new NativeEventEmitter();

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={scene.route?.name} />

      {scene.route?.name === 'Room' && (
        <Button
          compact
          icon="wechat"
          mode="contained"
          color={theme?.colors.primary}
          onPress={() => emitter.emit('open_chat')}>
          Chat
        </Button>
      )}
      <Switch
        onValueChange={() => toggleTheme()}
        style={[{backgroundColor: theme?.colors.surface}]}
        color={theme?.colors.accent}
        value={isThemeDark}
      />
    </Appbar.Header>
  );
}
