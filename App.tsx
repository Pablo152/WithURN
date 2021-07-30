import 'react-native-gesture-handler';

import React from 'react';
import {PreferencesContext} from './contexts/PreferencesContext';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';

import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import Room from './screens/Room';

import CustomNavigationBar from './components/CustomNavigationBar';
import {RootStackParamList} from './types/NavigatorTypes';

const primary = '#F53E2A';
const accent = '#A444FC';

const paperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary,
    accent,
  },
};

const darkPaperTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary,
    accent,
  },
};

const navigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary,
    accent,
  },
};

const darkNavigationTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary,
    accent,
  },
};

const CombinedDefaultTheme = merge(paperTheme, navigationTheme);
const CombinedDarkTheme = merge(darkPaperTheme, darkNavigationTheme);

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    // Context is wired into the local state of our main component, so that its values could be propagated throughout the entire application
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: props => <CustomNavigationBar {...props} />,
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Welcome'}}
            />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Room" component={Room} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

export default App;
