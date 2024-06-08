import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';

import BingoBoard from '../components/BingoBoard/BingoBoard';

export default function BoardScreen({ navigation }) {
    const defaultTitle = 'My Bingo Board';
    const initialSize = 5;
    const initialTasks = Array(initialSize ** 2).fill('default task');
    const initialPressedSquares = Array(initialSize ** 2).fill(false);

    return (
        <View style={styles.container}>
            <BingoBoard 
                size={initialSize} 
                initialTitle={defaultTitle} 
                initialTasks={initialTasks} 
                initialPressedSquares={initialPressedSquares} 
                initialPressedCount={0}
            />
            <StatusBar style="auto" />
        </View>
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
