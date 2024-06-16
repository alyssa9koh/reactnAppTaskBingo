import React from "react";
import { View, Text } from "react-native";

import { AddBoardStyles } from "../AddBoardStyles";

export default function RandomizedLayout() {
    return (
        <View style={AddBoardStyles.addBoardForm}>
            <Text>I am RandomizedLayout</Text>
        </View>
    );
}
