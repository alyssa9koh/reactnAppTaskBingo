import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

export default function AddBoardScreen({ navigation }) {
    return (
        <View style={styles.addBoardScreen}>
            <Slider
                style={styles.addBoardStyle}
                minimumValue={3}
                maximumValue={6}
                minimumTrackTintColor="black"
                maximumTrackTintColor="black"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    addBoardScreen: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '20%'
    },
    addBoardStyle: {
        width: '80%'
    }
});
