import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Room: {youtubeUrl: string};
};

export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;
export type DetailsProps = StackScreenProps<RootStackParamList, 'Details'>;
export type RoomProps = StackScreenProps<RootStackParamList, 'Room'>;
