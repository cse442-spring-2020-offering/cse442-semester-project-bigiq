import * as React from 'react';
import {
    AsyncStorage,
    KeyboardAvoidingView, Platform, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from 'react-native'


export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    postFetch = () => {
        const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"localhost") + ":8080/posts/insertPost";
        const author = AsyncStorage.getItem('screenName');
        const that = this;
        fetch(url, {
            method: "POST",
            body: JSON.stringify( {
                author: "author",
                content: that.state.content
            } ),
            headers: new Headers({'content-type': 'application/json'}),
        }).then(function(response) {
            if(response.ok){
                console.log("POSTED")
                console.log(author);
            }
        });
    };
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.containerForm}>
                    <TextInput style={styles.postInput}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Your NameTag"
                               placeholderTextColor='#ffffff'
                               onChangeText={input => this.setState({content: input})}
                               keyboardType='default'
                               multiline = {true}
                    />
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.button} onPress = {() => this.postFetch()}>
                    <Text style={styles.loginButton}>Post</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
    const styles = StyleSheet.create({
        postInput: {
            position: 'absolute',
            borderRadius: 10,
            fontSize: 16,
            flex: 1,
            backgroundColor: 'white',
            width: 400,
            height: 300,
            padding: 20
        },
        loginButton: {
            fontSize: 16,
            color: '#ffffff',
            textAlign: 'center',
        },
        containerForm : {
            flexGrow : 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        button: {
            width: 80,
            backgroundColor: '#1c313a',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 13,
        },
        exitButton: {
            width: 80,
            backgroundColor: '#1c313a',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 13,
        }
    });
