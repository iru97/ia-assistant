import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View, Button } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert('Sign In Error', error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Sign Up Error', error.message);
      return;
    }

    if (!data.user) {
      Alert.alert('No se pudo registrar el usuario');
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Login' }} />
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Contraseña"
            autoCapitalize="none"
          />
        </View>
        {!isSignUp && (
          <>
            <Button
              title="Iniciar Sesión"
              disabled={loading}
              onPress={() => signInWithEmail()}
              className="mt-4 w-full rounded bg-blue-500 p-4"
            />
            <Button
              title="Quiero registrarme"
              disabled={loading}
              onPress={() => setIsSignUp(true)}
              className="bg-black-500 mt-4 w-full rounded p-4"
            />
          </>
        )}
        {isSignUp && (
          <Button
            title="Registrar Usuario"
            disabled={loading}
            onPress={() => signUpWithEmail()}
            className="mt-4 w-full rounded bg-blue-500 p-4"
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: '#000968',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  textInput: {
    borderColor: '#000968',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12,
    margin: 8,
  },
});
