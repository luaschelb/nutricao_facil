import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler"
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DatabaseInit from './database/database-init';


export default function App() {
  let db = new DatabaseInit
  console.log("initialize database")
  
  return (
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
