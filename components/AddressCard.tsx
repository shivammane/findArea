import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {postalData} from '../interface/postalData';
import {ActivityIndicator, Text} from 'react-native-paper';
import Input from './Input';
import Details from './Details';

const AddressCard = () => {
    const [data, setdata] = useState<postalData[]>([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [flag, setflag] = useState(false);
    const [refreshing, setrefreshing] = useState(false);

    const onRefresh = () => {
        setrefreshing(true);
        setIsLoading(true);
        fetch(`https://api.postalpincode.in/pincode/${input}`)
            .then(responce => responce.json())
            .then(info => {
                if (info[0].Status === 'Success') {
                    setdata(info[0].PostOffice);
                    setrefreshing(false);
                } else {
                    setflag(true);
                }
                setIsLoading(false);
            })
            .catch(() => {});
    };
    useEffect(() => {
        setflag(false);
        if (search) {
            setIsLoading(true);
            fetch(`https://api.postalpincode.in/pincode/${input}`)
                .then(responce => responce.json())
                .then(info => {
                    if (info[0].Status === 'Success') {
                        setdata(info[0].PostOffice);
                        setrefreshing(false);
                    } else {
                        setflag(true);
                    }
                    setIsLoading(false);
                })
                .catch(() => {});
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    if (flag === true) {
        return (
            <>
                <Input
                    setInput={setInput}
                    input={input}
                    setData={setdata}
                    setSearch={setSearch}
                />
                <Text style={styles.text}>Not found</Text>
            </>
        );
    }

    return (
        <>
            <Input
                setInput={setInput}
                setData={setdata}
                input={input}
                setSearch={setSearch}
            />

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {isLoading ? (
                    <View style={[styles.center]}>
                        <ActivityIndicator animating={true} size={'large'} />
                    </View>
                ) : (
                    data.map((info, key) => {
                        return (
                            <View key={key} style={styles.center}>
                                <Details data={info} />
                            </View>
                        );
                    })
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    text: {textAlign: 'center', color: 'white'},
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddressCard;
