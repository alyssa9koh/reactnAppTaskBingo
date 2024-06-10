import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import uuid from 'react-native-uuid';

import { MIN_SIZE, MAX_SIZE, DEFAULT_SIZE } from '../utils/defaults';

export default function AddBoardScreen({ navigation }) {
    const [textInput, setTextInput] = useState('My Bingo Board');
    const [sizeInput, setSizeInput] = useState(DEFAULT_SIZE);

    function handleTextChange(value) {
        setTextInput(value);
    }

    function handleValueChange(value) {
        setSizeInput(value);
    }

    function handleCreateBoard() {
        const newUUID = uuid.v4();
        console.log(`i cooka da new board`);
        console.log(`new board uuid: ${newUUID}`);
        console.log(`new board name: ${textInput}`);
        console.log(`new board size: ${sizeInput}`);
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
