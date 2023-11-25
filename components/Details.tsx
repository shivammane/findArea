import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {postalData} from '../interface/postalData';

const Details = ({data}: {data: postalData}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name : {data.Name}</Text>
            <Text style={styles.text}>District: {data.District}</Text>
            <Text style={styles.text}>Division : {data.Division}</Text>
            <Text style={styles.text}>Region : {data.Region}</Text>
            <Text style={styles.text}>State : {data.State}</Text>
            <Text style={styles.text}>Country: {data.Country}</Text>
            <Text style={styles.text}>Pincode : {data.Pincode}</Text>
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: 'purple',
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
});
