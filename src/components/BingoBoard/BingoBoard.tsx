import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

function BingoSquare() {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableOpacity
            style={styles.bingoSquare}
            activeOpacity={0.7} 
            onPress={() => {
                setPressed(!pressed);
            }}
        >
            <Text 
                style={[styles.bingoSquareText, pressed && styles.bingoSquareTextPressed]}
            >
                I am bingo square
            </Text>
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
