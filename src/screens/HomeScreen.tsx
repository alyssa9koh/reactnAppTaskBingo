import { Button, Text, View } from 'react-native';

import { DEFAULT_SIZE } from '../utils/defaults';

const mock_1 = {
    title: 'My Bingo Board',
    size: DEFAULT_SIZE,
    tasks: Array(DEFAULT_SIZE ** 2).fill('default task'),
    pressedSquares: Array(DEFAULT_SIZE ** 2).fill(false)
};

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Bingo Board"
                onPress={() => navigation.navigate('Board', mock_1)}
            />
        </View>
    );
}
