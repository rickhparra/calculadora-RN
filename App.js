import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

export default function App() {
    const [displayValue, setDisplayValue] = useState('0');
    const [clearDisplay, setClearDisplay] = useState(false);
    const [operation, setOperation] = useState(null);
    const [values, setValues] = useState([0, 0]);
    const [current, setCurrent] = useState(0);
    const [historic, setHistoric] = useState(' ');

    function addDigit(digit) {
      const boolClearDisplay = displayValue === '0' || clearDisplay;

      if (digit === '.' && !boolClearDisplay && displayValue.includes('.')) return;

      const currentValue = boolClearDisplay ? '' : displayValue;
      const newDisplayValue = currentValue + digit;
      
      setDisplayValue(newDisplayValue);
      setClearDisplay(false);

      if (digit !== '.') {
        const newValue = parseFloat(newDisplayValue);
        const newValues = [...values];

        newValues[current] = newValue;

        setValues(newValues);
        setHistoric(historic + digit);
      }
    }

    function addOperation(op) {
        if (current === 0) {
            setCurrent(1);
            setOperation(op);
            setClearDisplay(true);
            setHistoric(historic + op);
        }
        else {
            const equals = op === '=';
            const newValues = [...values];

            try {
                newValues[0] = eval(`${newValues[0]} ${operation} ${newValues[1]}`);                         
            }
            catch (e) {
                newValues[0] = values[0];                
            }

            newValues[1] = 0;

            if (equals) {
                setHistoric(' ');
            }
            else {
                setHistoric(historic + op);
            }

            setDisplayValue(newValues[0]);
            setOperation(equals ? null : op);
            setCurrent(equals ? 0 : 1);            
            setValues(newValues);      
            setClearDisplay(true);      
        }
    }

    function clearMemory() {
        setDisplayValue('0');
        setClearDisplay(false);
        setOperation(null);
        setValues([0, 0]);
        setCurrent(0);
        setHistoric(' ');
    }

    return (
        <View style={styles.container}>
            <Display value={displayValue} historic={historic} />
            <View style={styles.buttons}>
                <Button label='AC' button3x onClick={clearMemory} /> 
                <Button label='/' operation onClick={addOperation} /> 
                <Button label='7' onClick={addDigit} /> 
                <Button label='8' onClick={addDigit} /> 
                <Button label='9' onClick={addDigit} /> 
                <Button label='*' operation onClick={addOperation} /> 
                <Button label='4' onClick={addDigit} /> 
                <Button label='5' onClick={addDigit} /> 
                <Button label='6' onClick={addDigit} /> 
                <Button label='-' operation onClick={addOperation} /> 
                <Button label='1' onClick={addDigit} /> 
                <Button label='2' onClick={addDigit} /> 
                <Button label='3' onClick={addDigit} /> 
                <Button label='+' operation onClick={addOperation} /> 
                <Button label='0' button2x onClick={addDigit} /> 
                <Button label='.' onClick={addDigit} /> 
                <Button label='=' operation onClick={addOperation} /> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});