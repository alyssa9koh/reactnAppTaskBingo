import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';

import BingoBoard from '../components/BingoBoard/BingoBoard';
import { DEFAULT_SIZE } from '../utils/defaults';

export default function BoardScreen({ route }) {
    const {
        title = 'My Bingo Board',
        tasks = Array(DEFAULT_SIZE ** 2).fill('default task'),
        pressedSquares = Array(DEFAULT_SIZE ** 2).fill(false)
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
    },
});  
