import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, TextInput, View } from 'react-native';
import type { ComponentProps } from 'react';

type CustomInputProps = {
  icon: ComponentProps<typeof Ionicons> ['name'] 
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

export default function CustomInput({
  icon,
  placeholder,
  secureTextEntry = false, 
  value,
  onChangeText,
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={20} color="#666" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});