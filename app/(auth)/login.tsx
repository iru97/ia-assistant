import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

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
        <SvgUri
          style={styles.tinyLogo}
          uri="https://www.svgrepo.com/show/285252/robot.svg"
          width="100"
          height="100"
        />
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            placeholderTextColor="rgb(148, 163, 184)"
            autoCapitalize="none"
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Contraseña"
            placeholderTextColor="rgb(148, 163, 184)"
            autoCapitalize="none"
          />
        </View>
        {!isSignUp && (
          <>
            <View style={styles.buttonText}>
              <Button
                title="Iniciar Sesión"
                disabled={loading}
                onPress={() => signInWithEmail()}
                color="white"
              />
            </View>

            <Button
              title="Quiero registrarme"
              disabled={loading}
              onPress={() => setIsSignUp(true)}
              color="white"
            />
          </>
        )}
        {isSignUp && (
          <>
            <View style={styles.buttonText}>
              <Button
                title="Registrar Usuario"
                disabled={loading}
                onPress={() => signUpWithEmail()}
                color="white"
              />
            </View>
            <Button
              title="Volver"
              disabled={loading}
              onPress={() => setIsSignUp(false)}
              color="white"
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(15, 23, 42)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 16,
  },
  textInput: {
    borderColor: 'rgb(148, 163, 184)',
    color: 'rgb(148, 163, 184)',
    borderRadius: 26,
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 16,
    margin: 8,
  },
  buttonText: {
    alignSelf: 'center',
    borderColor: 'rgb(148, 163, 184)',
    backgroundColor: 'rgb(148, 163, 184)',
    borderRadius: 26,
    borderStyle: 'solid',
    borderWidth: 2,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    width: 230,
  },
  tinyLogo: {
    color: 'white',
    alignSelf: 'center',
    marginBottom: 14,
  },
});
