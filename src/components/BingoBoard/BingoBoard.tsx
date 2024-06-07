import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

function BingoSquare() {
    const [pressed, setPressed] = useState(false);

    return (
        <View style={styles.bingoSquare}>
            <TouchableOpacity
                style={styles.bingoSquareTouchable}
                activeOpacity={0.7} 
                onPress={() => {
                    setPressed(!pressed);
                    console.log("Square pressed");
                }}
            >
                <Text style={[styles.bingoSquareText, pressed && styles.bingoSquareTextPressed]}>I am bingo square</Text>
            </TouchableOpacity>
        </View>
    )
}

function BingoRow() {
    return (
        <View style={styles.bingoRow}>
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
        aspectRatio: '1/1',
        marginLeft: 1
    },
    bingoSquareTouchable: {
        backgroundColor: 'gray',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bingoSquareText: {
        color: 'white'
    },
    bingoSquareTextPressed: {
        opacity: 0.2
    }
});
