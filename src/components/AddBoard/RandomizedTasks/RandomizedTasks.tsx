import React from "react";
import { View, Text } from "react-native";

import SizeSelectSlider from "../../SizeSelectSlider/SizeSelectSlider";

import { AddBoardStyles } from "../AddBoardStyles";

export default function RandomizedTasks({ sizeInput, handleSizeChange }) {
    return (
        <View style={AddBoardStyles.addBoardForm}>
            <SizeSelectSlider sizeInput={sizeInput} handleSizeChange={handleSizeChange}/>
            <Text>I am RandomizedTasks</Text>
        </View>
    );
}
