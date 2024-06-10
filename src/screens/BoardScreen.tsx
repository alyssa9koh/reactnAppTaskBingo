import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BingoBoard from '../components/BingoBoard/BingoBoard';
import { DEFAULT_PRESSED_SQUARES, DEFAULT_SIZE, DEFAULT_TASKS } from '../utils/defaults';

export default function BoardScreen({ route }) {
    const {
        title = 'My Bingo Board',
        tasks = DEFAULT_TASKS,
        pressedSquares = DEFAULT_PRESSED_SQUARES
    } = route.params || {};

    return (
        <View style={styles.container}>
            <BingoBoard 
                size={DEFAULT_SIZE} 
                initialTitle={title} 
                initialTasks={tasks} 
                initialPressedSquares={pressedSquares} 
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
    }
});  
