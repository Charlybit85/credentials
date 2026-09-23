import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>Pantalla Home (temporal)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    color: Colors.primary,
  }
});

