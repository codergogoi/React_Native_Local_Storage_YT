import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { connect } from 'react-redux'
import { fetchMovies, addToWishList, removeFromWishlist } from '../redux/actions'
import { BASE_URL } from '../utilities';



const _WishlistScreen = (props) => {

    const { movieReducer } = props
    const { wishlist} = movieReducer;
 
    return <View style={styles.container}>
        
        <Text style={{ fontSize: 30, fontWeight: '600', color: 'gray', marginLeft: 20,
        marginBottom: 20 }}>
                Watch Later
            </Text>
        <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={wishlist}
            renderItem={({item}) => (
                <View style={styles.movieCard}>
                    <Image resizeMode="stretch" 
                    style={{ display: 'flex', flex: 5, height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                    source={{
                        uri: `${BASE_URL}/s3_images/${item.thumbnail}`
                    }}
                    />
                    <Text style={{ flex: 5, padding: 10, fontSize: 14 }}> {item.title} </Text>
                    <TouchableOpacity style={{ flex: 2, height: '100%', backgroundColor: '#D92F24', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                        <Text style={{ fontSize: 40 , color: '#FFF'}}> ▶</Text>
                    </TouchableOpacity>
                </View>
            )}
            keyExtractor={(item) => item._id}
        />
  
    </View>
}


const mapStateToProps = (state) => ({
    movieReducer: state.movieReducer
})

const WishlistScreen = connect(mapStateToProps, { fetchMovies, addToWishList, removeFromWishlist })(_WishlistScreen)

export default WishlistScreen;

const styles = StyleSheet.create({

    container: {
        paddingTop: 50,
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E5E5E5'
    }, 
    movieCard: {
    width: Dimensions.get('screen').width - 10,
    height: 100,
    backgroundColor: '#FFF',
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    }
});