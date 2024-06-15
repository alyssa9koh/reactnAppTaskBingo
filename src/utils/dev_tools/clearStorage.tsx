import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ClearStorage() {
    return (
        <Button
            title={'Dev tool: Clear everything from AsyncStorage'}
            onPress={async () => {
                try {
                    await AsyncStorage.clear();
                    console.log('Dev message: Storage is cleared.');
                } catch (error) {
                    console.log(error);
                }
            }}
        />
    );
}
