import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_SIZE } from '../utils/defaults';

const mock_1 = {
    title: 'My Bingo Board',
    size: DEFAULT_SIZE,
    tasks: Array(DEFAULT_SIZE ** 2).fill('default task'),
    pressedSquares: Array(DEFAULT_SIZE ** 2).fill(false)
};

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <TouchableOpacity 
                style={styles.homeItem}
                onPress={() => navigation.navigate('Board', mock_1)}
            >
                <Text style={styles.homeItemText}>{mock_1.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.homeItem}
                onPress={() => navigation.navigate('Board', mock_1)}
            >
                <Text style={styles.homeItemText}>{mock_1.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    homeItem: {
        backgroundColor: 'gray',
        padding: 10,
        marginBottom: 3
    },
    homeItemText: {
        fontSize: 20
    }
}); 
