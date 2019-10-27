import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import FeedItem from './components/FeedItem';

const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e7934039a87b4037b2400052d7eb0304q'

export default class App extends Component {

  state = {
    isLoading: false,
    listArticles: [],
    totalResults: 0,
    page: 1,
  };

  componentDidMount = async () => {

    const { page } = this.state;
    this.setState({ isLoading: true });
    this.callApi(page)
    // const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=e7934039a87b4037b2400052d7eb0304&page=${page}`);
    // const jsonResponse = await response.json();
    // this.setState({
    //   isLoading: false,
    //   listArticles: jsonResponse.articles,
    //   totalResults: response.totalResults

    // });
  };
  callApi = async (page) => {
    const { listArticles } = this.state;
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=e7934039a87b4037b2400052d7eb0304&page=${page}`);
    const jsonResponse = await response.json();
    this.setState({
      isLoading: false,
      page: page,
      listArticles: listArticles.concat(jsonResponse.articles),
      totalResults: response.totalResults

    });
  }
  onEndReached = async () => {
    const { page } = this.state;
    const newPage = page + 1;
    this.callApi(newPage);
  };
  renderItem = ({ item }) => {
    return (<FeedItem item={item} />)
  }

  render() {
    const { isLoading, listArticles } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating={isLoading} />
        </View>
      );
    }
    return (



      <FlatList style={styles.flastList}
        data={listArticles}
        renderItem={
          this.renderItem
        }
        onEndReached={this.onEndReached}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flastList: {
    marginHorizontal: 15,
  }
});
