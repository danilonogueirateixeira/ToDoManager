import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { currentFirebaseUser } from '../services/FirebaseApi';

export default class App extends Component {

    static novigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={StyleSheet.container}>
                <ActivityIndicator style={styles.loading} />
            </View>
        );
    }

    async componentDidMount() {
        let resetNavigation = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'pageLogin' })]
        });

        try {
            const user = await currentFirebaseUser();
            if (user) {
                resetNavigation = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'pageTasksList' })]
                });
            }
            this.props.navigation.dispatch(resetNavigation);
        } catch (error) {
            this.props.navigation.dispatch(resetNavigation);    
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        padding: 50,
        width: 50,
        height: 50
    }
});