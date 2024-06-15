import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";

import { BOARD_UUID_LIST_KEY } from '../../utils/defaults';

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

export default function BingoBoard({ size, uuid, initialTitle, initialTasks, initialPressedSquares, initialPressedCount, boardUUIDList }) {
    const [title, setTitle] = useState(initialTitle);
    const [tasks, setTasks] = useState(initialTasks);
    const [pressedSquares, setPressedSquares] = useState(initialPressedSquares);
    const [pressedCount, setPressedCount] = useState(initialPressedCount);

    const [rowsFilled, setRowsFilled] = useState(0);
    const [columnsFilled, setColumnsFilled] = useState(0);
    const [diagonalFilled, setDiagonalsFilled] = useState(0);

    const handlePressSquare = (index) => {
        const newPressedSquares = [...pressedSquares];
        newPressedSquares[index] = !newPressedSquares[index];
        setPressedSquares(newPressedSquares);
        if (pressedSquares[index]) {
            setPressedCount(pressedCount - 1);
        } else {
            setPressedCount(pressedCount + 1);
        }
    }

    const handleLongPressSquare = (index, newTask) => {
        const newTasks = [...tasks];
        newTasks[index] = newTask;
        setTasks(newTasks);
    };

    // update title in boardUUIDList
    useEffect(() => {
        // Find the index of the board in the list
        const index = boardUUIDList.findIndex(item => item[0] === uuid);

        // If board exists in the list, update its title and move it to the front
        if (index !== -1) {
            boardUUIDList[index][1] = title;
            // Move the updated board to the front of the array
            const updatedList = [
                boardUUIDList[index],
                ...boardUUIDList.slice(0, index),
                ...boardUUIDList.slice(index + 1)
            ];

            const updateBoardList = async () => {
                try {
                    await AsyncStorage.setItem(BOARD_UUID_LIST_KEY, JSON.stringify(updatedList));
                    console.log('Successfully updated and moved board in boardUUIDList');
                } catch (error) {
                    console.error('Failed to update board in boardUUIDList', error);
                }
            };

            updateBoardList();
        }
        console.log('update boardUUIDList in BingoBoard');
    }, [title]);

    // update title, tasks, or pressedSquares in board database if they change
    useEffect(() => {
        const newBoard = {
            uuid: uuid,
            title: title,
            size: size,
            tasks: tasks,
            pressedSquares: pressedSquares,
            pressedCount: pressedCount
        };

        const updateStorage = async () => {
            try {
                await AsyncStorage.setItem(JSON.stringify(uuid), JSON.stringify(newBoard));
            } catch (error) {
                console.log(error);
            }
        }

        updateStorage();
        console.log('updateStorage in BingoBoard');
    }, [title, tasks, pressedSquares]);

    // update counter for rows, columns, and diagonals filled
    // also check for blackout
    useEffect(() => {
        // Check rows
        let rowsFilledCount = 0;
        for (let row = 0; row < size; row++) {
            if (pressedSquares.slice(row * size, row * size + size).every(Boolean)) {
                rowsFilledCount++;
            }
        }
        setRowsFilled(rowsFilledCount);

        // Check columns
        let columnsFilledCount = 0;
        for (let col = 0; col < size; col++) {
            let columnFilled = true;
            for (let row = 0; row < size; row++) {
                if (!pressedSquares[row * size + col]) {
                    columnFilled = false;
                    break;
                }
            }
            if (columnFilled) {
                columnsFilledCount++;
            }
        }
        setColumnsFilled(columnsFilledCount);

        // Check diagonals
        let diagonalsFilledCount = 0;
        const leftDiagonalIndices = Array.from({ length: size }, (_, index) => index * (size + 1));
        if (leftDiagonalIndices.every(index => pressedSquares[index])) {
            diagonalsFilledCount++;
        }
        const rightDiagonalIndices = Array.from({ length: size }, (_, index) => (index + 1) * (size - 1));
        if (rightDiagonalIndices.every(index => pressedSquares[index])) {
            diagonalsFilledCount++;
        }
        setDiagonalsFilled(diagonalsFilledCount);
    }, [pressedSquares]);

    const [titleDialogVisible, setTitleDialogVisible] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState(initialTitle);

    const handleTitlePress = () => {
        setTitleDialogVisible(true);
    }

    const handleCancel = () => {
        setTitleDialogVisible(false);
    }

    const handleChange = () => {
        setTitle(titleInputValue);
        setTitleDialogVisible(false);
    }

    return (
        <View style={styles.bingoBoard}>
            <TouchableOpacity 
                activeOpacity={0.7}
                onLongPress={handleTitlePress}
            >
                <Text style={styles.bingoBoardTitle}>{title}</Text>
            </TouchableOpacity>
            {[...Array(size).keys()].map(row => (
                <BingoRow
                    key={row}
                    tasks={tasks.slice(row * size, row * size + size)}
                    pressedSquares={pressedSquares.slice(row * size, row * size + size)}
                    onPressSquare={(index) => handlePressSquare(row * size + index)}
                    onLongPressSquare={(index, newTask) => handleLongPressSquare(row * size + index, newTask)}
                />
            ))}
            <Text>{`${rowsFilled} rows filled`}</Text>
            <Text>{`${columnsFilled} columns filled`}</Text>
            <Text>{`${diagonalFilled} diagonals filled`}</Text>
            {pressedCount === size ** 2 &&
                <Text>BLACKOUT!</Text>
            }
            <Dialog.Container visible={titleDialogVisible}>
                <Dialog.Title>
                    Change Task
                </Dialog.Title>
                <Dialog.Input
                    placeholder="Type here"
                    onChangeText={(text) => setTitleInputValue(text)}
                    value={titleInputValue}
                />
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Change" onPress={handleChange} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    bingoBoard: {
        flexDirection: 'column'
    },
    bingoBoardTitle: {
        textAlign: 'center',
        marginBottom: '7.5%',
        fontSize: 28
    },
    bingoRow: {
        flexDirection: 'row',
        width: '100%'
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
