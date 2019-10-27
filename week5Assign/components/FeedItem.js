import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

export default class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onPressReadMore = () => {
        const { item: { url } } = this.props;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };
    render() {
        const { item: { title, urlToImage, content, publishedAt,source:{name} } } = this.props;
       return (
            <View style={styles.card}>
                <Text  style={styles.title}> {title}</Text>
                <Image source={{ uri: urlToImage }} style={styles.image} />
                <Text><Text style={styles.content}>Source: </Text><Text style={styles.date}>{name}</Text></Text>
                <Text><Text style={styles.content}>Content: </Text>{content}</Text>
                <Text><Text style={styles.content}>PublishedAt: </Text ><Text style={styles.date}>{publishedAt}</Text></Text>
                <TouchableOpacity style={styles.button} onPress={this.onPressReadMore}>
                    <Text style ={styles.textButton}>Read More</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#999999',
        borderWidth: 1,
        marginTop: 10,
    },
    image: {
        width: 300,
        height: 200,
    },
    button: {
        backgroundColor: '#FF9900',
        paddingHorizontal: 28,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
    textButton:{
        color:'white',
        fontSize:20,
        fontWeight:"bold",
    },
    title:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:20,
    fontWeight:"bold",
    marginBottom: 15,
    },
    content:{
        fontWeight:"bold",
    },
    date:{
        color: '#33CC33',
    }
})