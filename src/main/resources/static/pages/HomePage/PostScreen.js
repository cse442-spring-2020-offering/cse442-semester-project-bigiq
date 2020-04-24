import * as React from 'react';
import {
    KeyboardAvoidingView, Platform, StyleSheet, Text,
    TextInput, TouchableOpacity, View, Keyboard, Image, AsyncStorage
} from 'react-native'


export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            screenName: '',
            textInput: ''
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
    };
    postFetch = () => {
        const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") + ":8080/posts/insertPost";
        const that = this;

        fetch(url, {
            method: "POST",
            body: JSON.stringify( {
                author: that.state.screenName,
                content: that.state.content
            } ),
            headers: new Headers({'content-type': 'application/json'}),
        }).then(function(response) {
            if(response.ok){
                that.goBack()
            }
        });
    };

    goBack = () => {
        this.props.navigation.pop();
    };
    render() {
        return (
            <View style={{flex: 1, position:'relative' }}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => this.goBack()}>
                        <Image style={styles.topIcons}
                               source={require('../../assets/exitIcon.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => this.postFetch()}>
                        <Image style={styles.topIcons}
                               source={require('../../assets/uploadIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: '#4704a5'}}>Let's Start a Conversation</Text>
                    <TextInput style={styles.nameTagBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Write here"
                               placeholderTextColor='gray'
                               multiline = {true}
                               onChangeText={input => this.setState({content: input})}
                               keyboardType='default'
                    />
                </View>
            </View>

        );
    }
}
    const styles = StyleSheet.create({
        topContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '10%',
            borderBottomWidth: 2,
            borderBottomColor: '#e0e0e0',
        },
        topIcons: {
            width: 20, height: 20, resizeMode: 'contain'
        },
        iconContainer:{
            paddingHorizontal: 30,
            paddingTop: '10%'
        },
    });

