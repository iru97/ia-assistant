import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import Chat from '~/components/Chat';

export default function Assistant() {
  return (
    <>
      <Stack.Screen options={{ title: 'Assistant' }} />
      <View style={styles.container}>
        <Chat />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
