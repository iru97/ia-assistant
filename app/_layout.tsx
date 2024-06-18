import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '~/providers/AuthProvider';
import { ThemeProvider } from '~/themes/ThemeProvider';
import { supabase } from '~/utils/supabase';

import '../global.css';

import '../translation';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { setUser } = useAuth();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session);
        router.replace('/(tabs)/assistant');
      } else {
        setUser();
        console.log('no user');
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session);
        router.replace('/(tabs)/assistant');
      } else {
        setUser();
        console.log('no user');
        router.replace('/(auth)/login');
      }
    });
  }, []);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
