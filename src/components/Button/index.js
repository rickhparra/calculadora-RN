import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import Styles from './styles';

export default function Button(props) {
    const stylesButton = [Styles.button];

    if (props.button2x) stylesButton.push(Styles.button2x);
    if (props.button3x) stylesButton.push(Styles.button3x);
    if (props.operation) stylesButton.push(Styles.operationButton);

    return(
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={stylesButton}>
                {props.label}
            </Text>
        </TouchableHighlight>
    );
}