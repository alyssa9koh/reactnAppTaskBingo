import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BOARD_UUID_LIST_KEY, DEFAULT_SIZE } from '../utils/defaults';

const mock_1 = {
    title: 'My Bingo Board',
    size: DEFAULT_SIZE,
    tasks: Array(DEFAULT_SIZE ** 2).fill('default task'),
    pressedSquares: Array(DEFAULT_SIZE ** 2).fill(false)
};

function HomeItem({ navigation, listItem }) {
    return (
        <TouchableOpacity 
            style={styles.homeItem}
            onPress={() => navigation.navigate('Board', { uuid: listItem[0] })}
        >
            <Text style={styles.homeItemText}>{listItem[1]}</Text>
        </TouchableOpacity>
    );
}

export default function HomeScreen({ navigation }) {
    const [boardUUIDList, setBoardUUIDList] = useState([]);

    useEffect(() => {
        const loadStoredBoardList = async () => {
            try {
                const storedBoardList = await AsyncStorage.getItem(BOARD_UUID_LIST_KEY);
                if (storedBoardList) {
                    setBoardUUIDList(JSON.parse(storedBoardList));
                } else {
                    setBoardUUIDList([]);
                }
            } catch (error) {
                console.error('Failed to load stored board list', error);
            }
        };
    
        loadStoredBoardList();
    });

    return (
        <View>
            {boardUUIDList.map((listItem, index) => (
                <HomeItem key={index} navigation={navigation} listItem={listItem} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    homeItem: {
        backgroundColor: 'gray',
        padding: 10,
        marginBottom: 3
    },
    homeItemText: {
        fontSize: 20
    }
}); 
