import React from 'react';
import { Text, View } from 'react-native';

import Styles from './styles';

export default function Display(props) {
    return(
        <View style={Styles.display}>
            <Text style={Styles.displayHistoric} numberOfLines={1}>
                {props.historic}
            </Text>
            <Text style={Styles.displayValue} numberOfLines={1}>
                {props.value}
            </Text>
        </View>
    );
}