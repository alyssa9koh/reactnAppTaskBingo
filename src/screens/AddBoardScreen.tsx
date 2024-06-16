import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { DEFAULT_SIZE, BOARD_UUID_LIST_KEY, DEFAULT_TITLE, SELECTED_COLOR } from '../utils/defaults';

import CustomLayout from '../components/AddBoard/CustomLayout/CustomLayout';
import RandomizedLayout from '../components/AddBoard/RandomizedLayout/RandomizedLayout';
import RandomizedTasks from '../components/AddBoard/RandomizedTasks/RandomizedTasks';

import ClearStorage from '../utils/dev_tools/clearStorage';

export default function AddBoardScreen({ navigation }) {
    const [titleInput, setTitleInput] = useState(DEFAULT_TITLE);
    const [sizeInput, setSizeInput] = useState(DEFAULT_SIZE);

    function handleTitleChange(value) {
        setTitleInput(value);
    }

    function handleSizeChange(value) {
        setSizeInput(value);
    }

    const [selectedTab, setSelectedTab] = useState(1);
    const tabs = ['Custom Layout', 'Randomized Layout', 'Randomized Tasks'];

    function handleTabSelect(index) {
        setSelectedTab(index);
    }

    async function handleCreateBoard() {
        const newUUID = uuid.v4();

        const newBoard = {
            uuid: uuid.v4(),
            title: titleInput,
            size: sizeInput,
            tasks: Array(sizeInput ** 2).fill('default task'),
            pressedSquares: Array(sizeInput ** 2).fill(false),
            pressedCount: 0
        };

        const storedBoardList = await AsyncStorage.getItem(BOARD_UUID_LIST_KEY);
        let updatedBoardList;
        if (storedBoardList) {
            updatedBoardList = [[newBoard.uuid, titleInput], ...JSON.parse(storedBoardList)];
        } else {
            updatedBoardList = [[newBoard.uuid, titleInput]];
        }

        console.log(JSON.stringify(updatedBoardList));

        try {
            await AsyncStorage.setItem(BOARD_UUID_LIST_KEY, JSON.stringify(updatedBoardList));
            await AsyncStorage.setItem(JSON.stringify(newBoard.uuid), JSON.stringify(newBoard));
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <View style={styles.addBoardScreen}>
            <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Enter board name"
                value={titleInput}
                onChangeText={handleTitleChange}
            />
            <View style={styles.tabsContainer}>
                {tabs.map((tabName, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {handleTabSelect(index)}}
                        style={[
                            styles.tab,
                            selectedTab === index && styles.selectedTab
                        ]}
                    >
                        <Text style={[
                            styles.tabText,
                            selectedTab === index && styles.selectedTabText
                        ]}>{tabName}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {
                selectedTab === 0 ? <CustomLayout sizeInput={sizeInput} handleSizeChange={handleSizeChange}/> :
                selectedTab === 1 ? <RandomizedLayout/> :
                <RandomizedTasks sizeInput={sizeInput} handleSizeChange={handleSizeChange}/>
            }
            <Button 
                title={'Create Board'} 
                onPress={handleCreateBoard}
            />
            <ClearStorage/>
        </View>
    )
}

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    text: {
        fontSize: 17.5
    },
    addBoardScreen: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '20%'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: '75%',
        textAlign: 'center',
        backgroundColor: 'white'
    },
    tabsContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    tab: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        marginRight: 5,
        width: '30%',
        justifyContent: 'center'
    },
    selectedTab: {
        backgroundColor: SELECTED_COLOR
    },
    tabText: {
        textAlign: 'center'
    },
    selectedTabText: {
        color: 'white'
    }
});
