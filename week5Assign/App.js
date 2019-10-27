import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import FeedItem from './components/FeedItem';

const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e7934039a87b4037b2400052d7eb0304q'

export default class App extends Component {

  state = {
    isRefreshing: false,
    isLoading: false,
    listArticles: [],
    totalResults: 0,
    page: 1,
    isLoadMore: false,
  };

  componentDidMount = async () => {

    const { page } = this.state;
    this.setState({ isLoading: true });
    this.callApi(page)
   
  };
  callApi = async (page) => {
    const { listArticles } = this.state;
    const { totalResults } = this.state;
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=e7934039a87b4037b2400052d7eb0304&page=${page}`);
      await setTimeout(()=> {},1500);
      const jsonResponse = await response.json();
    this.setState({
      isLoading: false,
      isRefreshing: false,
      page: page,
      listArticles: listArticles.concat(jsonResponse.articles),
      totalResults: jsonResponse.totalResults

    });
  }
  onEndReached = async () => {
    const { page } = this.state;
    const newPage = page + 1;
    this.callApi(newPage);
  };
  onRefresh= async() =>{
    const newPage =1;
    await this.setState({ isRefreshing: true, listArticles:[], page: newPage});
    setTimeout(()=> {
      this.callApi(newPage);
    },1800);
  };
  renderItem = ({ item }) => {
    return (<FeedItem item={item} />)
  };

  renderFooter =() =>{
    const {isRefreshing} =this.state;
    if(!isRefreshing){
     return <ActivityIndicator size="large" animating={true} />
    }
    
  };

  render() {
    const { isLoading, listArticles, isRefreshing } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating={isLoading} />
        </View>
      );
    }
    return (

<View>
        <View style={styles.head}>
          <Text style={styles.headText}>Articles Count: {this.state.totalResults}</Text>
          </View>
      <FlatList style={styles.flastList}
        data={listArticles}
        renderItem={
          this.renderItem
        }
        onEndReached={this.onEndReached}
        ListFooterComponent={this.renderFooter()}
        onRefresh={this.onRefresh}
        refreshing={isRefreshing}
      />
</View>
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
  },
  head:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
  },
  headText:{
    color:'green',
    fontSize:20,
    fontWeight:'bold',
  }
});
