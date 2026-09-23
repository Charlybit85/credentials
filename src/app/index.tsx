import CustomInput from '@/components/custom-input';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [usuarioError, setUsuarioError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const isFormValid = usuario.trim() == '' && password.trim().length >= 6;

  const handleLogin = () => {
    let isValid = true;

    if(usuario.trim() === '') {
      setUsuarioError('La matricula es obligatoria');
      isValid = false;
    }else{
      setUsuarioError('');
    }

    if(password.trim() === ''){
      setPasswordError('La contraseña es obligatoria');
      isValid = false;
    }else if(password.length < 6){
      setPasswordError('Contraseña incompleta');
      isValid = false;
    }else{
      setPasswordError('');
    }

    if (isValid){
      router.replace('/(tabs)');
    }
  }

  return (
    <View style= {styles.container}>
        <View style={styles.logoContainer}>
          <Image 
          source = {require('../../assets/images/ittslogo.png')}
          style = {styles.logo} 
          resizeMode='contain'
          />
          <Text style={styles.institutionText}>
            Bienvenido
          </Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            icon="person-outline"
            placeholder="Usuario (Matricula)"
            secureTextEntry = {false}
            value={usuario}
            onChangeText={setUsuario} 
          />
          {usuarioError && <Text>{usuarioError}</Text>}
          <CustomInput
            icon="key-outline"
            placeholder="Contraseña"
            secureTextEntry = {true}
            value={password}
            onChangeText={setPassword}
          />
          {passwordError && <Text>{passwordError}</Text>}
          <Pressable
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            disabled = {!isFormValid}
            onPress={handleLogin}>
            
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 130,
    height: 130,
  },
  institutionText: {
    color: Colors.goldAccent,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  form: {
    width: '100%',
  },
  button: {
  backgroundColor: Colors.primary,
  height: 55,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},
buttonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},
buttonDisabled: {
  backgroundColor: '#B0B0B0',
},
});

