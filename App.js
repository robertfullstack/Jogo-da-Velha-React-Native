import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Front from './contents/front';

export default function App() {
  return (
    <View style={styles.container}>
      <Front />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
