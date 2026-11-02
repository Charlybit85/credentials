import { loginRequest } from '@/services/api';
import { saveToken } from '@/services/storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../constants/these';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    //Esto por ahora lo dejare como prueba con el console de mostrar nadamas
    // console.log('Login:', email, password);
    setLoading(true);
    setError('');

    try{
      const data = await loginRequest(email, password);
      await saveToken(data.token);
      router.replace('/(tabs)');
    } catch (e){
      setError(e instanceof Error ? e.message : "Ocurrio un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#C8DFF0', '#E3F0F1', '#F1F4F7']}
      style={styles.flex}
    >
      {/* Destello menta arriba a la derecha */}
      <LinearGradient
        colors={['rgba(178,230,208,0.75)', 'rgba(178,230,208,0)']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.3, y: 0.45 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>I</Text>
              </View>
              <View>
                <Text style={styles.brand}>Instituto Tecnologico de la</Text>
                <Text style = {styles.brand}>region sierra</Text>
                <Text style={styles.brandSub}>PORTAL ESTUDIANTIL</Text>
              </View>
            </View>

            {/* Título */}
            <Text style={styles.title}>Bienvenido a tu portal</Text>
            <Text style={styles.subtitle}>
              Ingresa para consultar tu credencial
            </Text>

            {/* Tarjeta */}
            <View style={styles.card}>
              <Text style={styles.label}>CORREO INSTITUCIONAL</Text>
              <TextInput
                style={[styles.input, focused === 'email' && styles.inputFocused]}
                placeholder="tucorreo@universidad.edu"
                placeholderTextColor={colors.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />

              <Text style={[styles.label, { marginTop: 18 }]}>CONTRASEÑA</Text>
              <TextInput
                style={[styles.input, focused === 'password' && styles.inputFocused]}
                placeholder="••••••••"
                placeholderTextColor={colors.placeholder}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />
            
              <Pressable style={styles.forgotWrap}>
                <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
              </Pressable>
              {/* , textAlign: 'center', paddingBottom:'50px'  */}
              {error ? <Text style={{ color: '#D64545', marginTop: 10, paddingBottom: "13%", textAlign:"center"}}>{error}</Text> : null}                  
              <Pressable
                onPress={handleLogin}
                disabled = {loading}
                style={({ pressed }) => [styles.button, (pressed || loading) && { opacity: 0.85 }]}
              >
                
                <Text style={styles.buttonText}>
                  {loading ? 'Entrando...' : 'Iniciar sesión'}
                  </Text>
              </Pressable>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },

  header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 48 },
  logo: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { color: colors.white, fontSize: 20, fontFamily: fonts.extrabold },
  brand: { fontSize: 16, fontFamily: fonts.bold, color: colors.ink },
  brandSub: {
    fontSize: 11, fontFamily: fonts.medium, color: colors.muted,
    letterSpacing: 2, marginTop: 2,
  },

  title: {
    fontSize: 34, lineHeight: 40, fontFamily: fonts.extrabold,
    color: colors.ink, letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15, lineHeight: 22, fontFamily: fonts.regular,
    color: colors.muted, marginTop: 14, marginBottom: 36,
  },

  card: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 24, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#0E2A3B', shadowOpacity: 0.08,
    shadowRadius: 24, shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  label: {
    fontSize: 12, fontFamily: fonts.semibold, color: colors.label,
    letterSpacing: 1.5, marginBottom: 8,
  },
  input: {
    height: 50, borderRadius: 16, borderWidth: 1,
    borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 16, fontSize: 15,
    fontFamily: fonts.medium, color: colors.ink,
  },
  inputFocused: { borderColor: colors.primary, borderWidth: 1.5 },

  forgotWrap: { alignSelf: 'flex-end', marginTop: 12, marginBottom: 24 },
  forgot: { fontSize: 13, fontFamily: fonts.semibold, color: colors.primary },

  button: {
    height: 52, borderRadius: 16, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  buttonText: { color: colors.white, fontSize: 16, fontFamily: fonts.bold },
});