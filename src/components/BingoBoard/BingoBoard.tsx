import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";

function BingoSquare({ onPressSquare, onLongPressSquare, task, pressed }) {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState(task);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleChange = () => {
        onLongPressSquare(inputValue);
        setVisible(false);
    }

    return (
        <TouchableOpacity
            style={styles.bingoSquare}
            activeOpacity={0.7} 
            onPress={onPressSquare}
            onLongPress={showDialog}
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

function BingoRow({ tasks, onPressSquare, onLongPressSquare, pressedSquares }) {
    return (
        <View style={styles.bingoRow}>
            {tasks.map((task, index) => (
                <BingoSquare
                    key={index}
                    task={task}
                    pressed={pressedSquares[index]}
                    onPressSquare={() => onPressSquare(index)}
                    onLongPressSquare={(newTask) => onLongPressSquare(index, newTask)}
                />
            ))}
        </View>
    )
}

export default function BingoBoard() {
    const [tasks, setTasks] = useState(Array(25).fill('default task'));
    const [pressedSquares, setPressedSquares] = useState(Array(25).fill(false));
    const [pressedCount, setPressedCount] = useState(0);

    const handlePressSquare = (index) => {
        const newPressedSquares = [...pressedSquares];
        newPressedSquares[index] = !newPressedSquares[index];
        setPressedSquares(newPressedSquares);
        if (pressedSquares[index]) {
            setPressedCount(pressedCount - 1);
        } else {
            setPressedCount(pressedCount + 1);
        }
        console.log(pressedCount);
    }

    const handleLongPressSquare = (index, newTask) => {
        const newTasks = [...tasks];
        newTasks[index] = newTask;
        setTasks(newTasks);
    };

    return (
        <View style={styles.bingoBoard}>
            {[0, 1, 2, 3, 4].map(row => (
                <BingoRow
                    key={row}
                    tasks={tasks.slice(row * 5, row * 5 + 5)}
                    pressedSquares={pressedSquares.slice(row * 5, row * 5 + 5)}
                    onPressSquare={(index) => handlePressSquare(row * 5 + index)}
                    onLongPressSquare={(index, newTask) => handleLongPressSquare(row * 5 + index, newTask)}
                />
            ))}
            {/* {pressedCount === 25 && (
                <Text style={styles.boardFilledText}>The board is completely filled out!</Text>
            )} */}
            {pressedCount === 25 &&
                <Text>BLACKOUT!</Text>
            }
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
