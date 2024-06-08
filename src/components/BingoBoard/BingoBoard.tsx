import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";

function BingoSquare() {
    const [pressed, setPressed] = useState(false);
    const [task, setTask] = useState('default task');

    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState(task);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleChange = () => {
        setTask(inputValue);
        setVisible(false);
    }

    return (
        <TouchableOpacity
            style={styles.bingoSquare}
            activeOpacity={0.7} 
            onPress={() => {
                setPressed(!pressed);
            }}
            onLongPress={()=>{
                showDialog();
            }}
        >
            <Text 
                style={[styles.bingoSquareText, pressed && styles.bingoSquareTextPressed]}
            >
                {task}
            </Text>
            <Dialog.Container visible={visible}>
                <Dialog.Title>
                    Change Task
                </Dialog.Title>
                <Dialog.Input
                    placeholder="Type here"
                    onChangeText={(text) => setInputValue(text)}
                    value={inputValue}
                />
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Change" onPress={handleChange} />
            </Dialog.Container>
        </TouchableOpacity>
    )
}

function BingoRow() {
    return (
        <View style={styles.bingoRow}>
            <BingoSquare/>
            <BingoSquare/>
            <BingoSquare/>
            <BingoSquare/>
            <BingoSquare/>
        </View>
    )
}

export default function BingoBoard() {
    return (
        <View style={styles.bingoBoard}>
            <BingoRow/>
            <BingoRow/>
            <BingoRow/>
            <BingoRow/>
            <BingoRow/>
        </View>
    );
}

const styles = StyleSheet.create({
    bingoBoard: {
        flexDirection: 'column'
    },
    bingoRow: {
        flexDirection: 'row'
    },
    bingoSquare: {
        aspectRatio: 1,
        width: '20%',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bingoSquareText: {
        color: 'white',
        textAlign: 'center'
    },
    bingoSquareTextPressed: {
        opacity: 0.2
    }
});
