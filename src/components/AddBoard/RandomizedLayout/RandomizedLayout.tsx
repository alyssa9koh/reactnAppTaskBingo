import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import uuid from 'react-native-uuid';

import { AddBoardStyles } from "../AddBoardStyles";
import { SELECTED_COLOR } from "../../../utils/defaults";

function InputtedTask({ taskText, handleRemoveTask }) {
    return (
        <View style={styles.inputtedTask}>
            <Text style={[
                styles.text
            ]}>
                { taskText }
            </Text>
            <TouchableOpacity style={styles.touchableButton} onPress={handleRemoveTask}>
                <Text style={[
                    styles.text,
                    styles.touchableButtonText
                ]}>
                    X
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default function RandomizedLayout() {
    const [inputtedTasks, setInputtedTasks] = useState([]);
    const [textInputValue, setTextInputValue] = useState('');

    function handleTextChange(value) {
        setTextInputValue(value);
    }

    function handleAddTask() {
        const newInputtedTasks = [...inputtedTasks, { id: uuid.v4(), text: textInputValue }];
        setInputtedTasks(newInputtedTasks);
        setTextInputValue('');
    }

    function handleRemoveTask(index) {
        const firstHalfNewTasks = inputtedTasks.slice(0, index);
        const secondHalfNewTasks = inputtedTasks.slice(index+1);
        setInputtedTasks(firstHalfNewTasks.concat(secondHalfNewTasks));
    }

    return (
        <View style={AddBoardStyles.addBoardForm}>
            <View style={styles.suggestionView}>
                <Text style={styles.text}>{`${inputtedTasks.length} task${inputtedTasks.length > 1 ? 's' : ''} inputted.`}</Text>
            </View>
            {inputtedTasks.map((task, index) => (
                <InputtedTask key={task.id} taskText={task.text} handleRemoveTask={() => handleRemoveTask(index)}/>
            ))}
            <View style={styles.addTask}>
                <TextInput
                    style={[styles.text, styles.textInput]}
                    placeholder="Enter task here"
                    value={textInputValue}
                    onChangeText={handleTextChange}
                />
                <TouchableOpacity onPress={handleAddTask} style={styles.touchableButton}>
                    <Text style={[styles.text, styles.touchableButtonText]}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17.5
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
    suggestionView: {
        marginTop: 10
    },
    addTask: {
        flexDirection: 'row',
        maxWidth: '75%',
        marginTop: 10
    },
    touchableButton: {
        backgroundColor: SELECTED_COLOR,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        marginLeft: 5,
    },
    touchableButtonText: {
        color: 'white'
    },
    inputtedTask: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    }
});
