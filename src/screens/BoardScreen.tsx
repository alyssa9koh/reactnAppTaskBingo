import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BingoBoard from '../components/BingoBoard/BingoBoard';
import { DEFAULT_TITLE, DEFAULT_PRESSED_SQUARES, DEFAULT_SIZE, DEFAULT_TASKS } from '../utils/defaults';

export default function BoardScreen({ route }) {
    const { uuid, boardUUIDList } = route.params || {};
    const [size, setSize] = useState(DEFAULT_SIZE)
    const [title, setTitle] = useState(DEFAULT_TITLE);
    const [tasks, setTasks] = useState(DEFAULT_TASKS);
    const [pressedSquares, setPressedSquares] = useState(DEFAULT_PRESSED_SQUARES);
    const [pressedCount, setPressedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBoardInfo = async () => {
            try {
                const boardInfoJSON = await AsyncStorage.getItem(JSON.stringify(uuid));
                const boardInfo = JSON.parse(boardInfoJSON);
                setSize(boardInfo.size);
                setTitle(boardInfo.title);
                setTasks(boardInfo.tasks);
                setPressedSquares(boardInfo.pressedSquares);
                setPressedCount(boardInfo.pressedCount);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getBoardInfo();
        console.log('boardscreen useeffect');
        console.log(uuid);
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BingoBoard 
                size={size} 
                uuid={uuid}
                initialTitle={title} 
                initialTasks={tasks} 
                initialPressedSquares={pressedSquares} 
                initialPressedCount={pressedCount}
                boardUUIDList={boardUUIDList}
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
