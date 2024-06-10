import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BoardScreen from './src/screens/BoardScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddBoardScreen from './src/screens/AddBoardScreen';

import BingoBoard from './src/components/BingoBoard/BingoBoard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name={'Home'} 
          component={HomeScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title={'+'}
                onPress={() => navigation.navigate('Add Board')}
              />
            )
          })}
        />
        <Stack.Screen name={'Board'} component={BoardScreen} />
        <Stack.Screen name={'Add Board'} component={AddBoardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
