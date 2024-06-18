import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

import { MIN_SIZE, MAX_SIZE, DEFAULT_SIZE } from '../../utils/defaults';

export default function SizeSelectSlider({ sizeInput, handleSizeChange }) {
    return (
        <View style={styles.sizeSelect}>
            <Text style={styles.text}>{`${sizeInput}x${sizeInput} board`}</Text>
            <Slider
                style={styles.sizeSlider}
                minimumValue={MIN_SIZE}
                maximumValue={MAX_SIZE}
                step={1}
                value={sizeInput}
                minimumTrackTintColor="black"
                maximumTrackTintColor="black"
                onValueChange={handleSizeChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17.5
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
