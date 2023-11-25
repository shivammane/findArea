import {TextInput as TI} from 'react-native';
import React, {useRef} from 'react';
import {TextInput} from 'react-native-paper';

const Input = (prop: {
    setInput: (arg: string) => void;
    input: string;
    setSearch: (arg: boolean) => void;
    setData: (arg: []) => void;
}) => {
    const inp = useRef<TI | null>(null);
    const checkLength = (val: string) => {
        prop.setData([]);
        const value = val;
        const length = value.length;

        if (length < 6) {
            prop.setInput(value);
            prop.setSearch(false);
        }
        if (length === 6) {
            inp.current?.blur();
            prop.setInput(value);
            prop.setSearch(true);
        }
    };
    return (
        <TextInput
            keyboardType={'number-pad'}
            ref={inp}
            label={'pincode'}
            placeholder="e.g. 431606"
            mode="flat"
            onChangeText={checkLength}
            value={prop.input}
        />
    );
};

export default Input;
