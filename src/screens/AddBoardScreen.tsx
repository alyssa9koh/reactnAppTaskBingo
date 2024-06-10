import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import uuid from 'react-native-uuid';

import { MIN_SIZE, MAX_SIZE, DEFAULT_SIZE, BOARD_UUID_LIST_KEY, DEFAULT_TITLE } from '../utils/defaults';

import ClearStorage from '../utils/dev_tools/clearStorage';

export default function AddBoardScreen({ navigation }) {
    const [textInput, setTextInput] = useState(DEFAULT_TITLE);
    const [sizeInput, setSizeInput] = useState(DEFAULT_SIZE);

    function handleTextChange(value) {
        setTextInput(value);
    }

    function handleValueChange(value) {
        setSizeInput(value);
    }

    async function handleCreateBoard() {
        const newUUID = uuid.v4();

        const newBoard = {
            uuid: uuid.v4(),
            title: textInput,
            size: sizeInput,
            tasks: Array(sizeInput ** 2).fill('default task'),
            pressedSquares: Array(sizeInput ** 2).fill(false)
        };

        const storedBoardList = await AsyncStorage.getItem(BOARD_UUID_LIST_KEY);
        let updatedBoardList;
        if (storedBoardList) {
            updatedBoardList = [[newBoard.uuid, textInput], ...JSON.parse(storedBoardList)];
        } else {
            updatedBoardList = [[newBoard.uuid, textInput]];
        }

        console.log(JSON.stringify(updatedBoardList));

        try {
            await AsyncStorage.setItem(BOARD_UUID_LIST_KEY, JSON.stringify(updatedBoardList));
            await AsyncStorage.setItem(JSON.stringify(newBoard.uuid), JSON.stringify(newBoard));
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <View style={styles.addBoardScreen}>
            <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Enter board name"
                value={textInput}
                onChangeText={handleTextChange}
            />
            <View style={styles.sizeSelect}>
                <Text style={styles.text}>{`${sizeInput}x${sizeInput} board`}</Text>
                <Slider
                    style={styles.sizeSlider}
                    minimumValue={MIN_SIZE}
                    maximumValue={MAX_SIZE}
                    step={1}
                    value={DEFAULT_SIZE}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="black"
                    onValueChange={handleValueChange}
                />
            </View>
            <Button 
                title={'Create Board'} 
                onPress={handleCreateBoard}
            />
            <ClearStorage/>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17.5
    },
    addBoardScreen: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '20%'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: '75%',
        textAlign: 'center',
        backgroundColor: 'white'
    },
    sizeSelect: {
        margin: 25,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeSlider: {
        width: '60%',
        padding: 10
    }
});
