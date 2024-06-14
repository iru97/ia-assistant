import { useEffect } from 'react';

import { supabase } from '~/utils/supabase';
import '../global.css';

import '../translation';

import { router, Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(tabs)/assistant');
      } else {
        console.log('no user');
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/(tabs)/assistant');
      } else {
        console.log('no user');
        router.replace('/(auth)/login');
      }
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
