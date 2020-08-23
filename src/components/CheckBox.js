import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const CheckBox = (props) => {
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={props.onPress}
                style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1.5,
                    borderColor: 'gray',
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2
                }}
    
            >
                {props.status && <View
                    style={{
                        width: 15,
                        height: 15,
                        backgroundColor: '#4495cb',
                        borderRadius: 3
                    }}
                />}
            </TouchableOpacity>
    
            <Text style={{ color: 'gray'}}>{props.text}</Text>
    
        </View>
    );
}

export {CheckBox};
