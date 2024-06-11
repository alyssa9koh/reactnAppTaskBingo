import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BingoBoard from '../components/BingoBoard/BingoBoard';
import { DEFAULT_TITLE, DEFAULT_PRESSED_SQUARES, DEFAULT_SIZE, DEFAULT_TASKS } from '../utils/defaults';

export default function BoardScreen({ route }) {
    const { uuid } = route.params || {};
    const [title, setTitle] = useState(DEFAULT_TITLE);
    const [tasks, setTasks] = useState(DEFAULT_TASKS);
    const [pressedSquares, setPressedSquares] = useState(DEFAULT_PRESSED_SQUARES);

    useEffect(() => {
        const getBoardInfo = async () => {
            try {
                const boardInfoJSON = await AsyncStorage.getItem(JSON.stringify(uuid));
                const boardInfo = JSON.parse(boardInfoJSON);
                setTitle(boardInfo.title);
                setTasks(boardInfo.tasks);
                setPressedSquares(boardInfo.pressedSquares);
            } catch (error) {
                console.log(error);
            }
        }

        getBoardInfo();
    });

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
