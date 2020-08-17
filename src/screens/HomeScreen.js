import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, FlatList, Image } from 'react-native';

import { connect } from 'react-redux'
import { fetchMovies, addToWishList, removeFromWishlist } from '../redux/actions'
import { BASE_URL } from '../utilities';


const _HomeScreen = (props) => {

    const { movieReducer, fetchMovies, addToWishList, removeFromWishlist } = props;

    const { movies, wishlist } = movieReducer;

    const [currentMovie, setCurrentMovie] = useState(undefined);


    useEffect(() => {
        fetchMovies()
    }, []);

    useEffect(() => {

        if(movies.length > 0){
            setCurrentMovie(movies[0])
        }

    }, [movies])
 


    const didTapCurrentMovie = (movie) => {
        setCurrentMovie(movie)
    }

    const onTapAddToWishlist = (movie) => {

        addToWishList(movie)
    }

    const onTapRemoveFromWishlist = (movie) => {
        removeFromWishlist(movie)

    }


    const isExist = (movie) => {
        
        if(wishlist.filter(item => item._id === movie._id).length > 0){
            return true
        }

        return false
    }



    return <View style={styles.container}>

        {/* poster and info         */}
        <View style={styles.posterView}>
            {/* movie poster display */}
            <View style={{ display: 'flex', flex: 9}}>

                {currentMovie !== undefined && (

                    <ImageBackground 
                        resizeMode="stretch"
                        style={styles.poster}
                        imageStyle ={{
                            borderBottomLeftRadius: Dimensions.get('screen').width / 3,
                            marginBottom: 30
                        }}
                        source={{
                            uri: `${BASE_URL}/s3_images/${currentMovie.thumbnail}`
                        }}
                    >
                        
                    </ImageBackground>

                )}


            </View>
            {/* movie plot and button */}
            {currentMovie !== undefined && 
            <View style={{ display: 'flex', flex: 3, alignItems: 'flex-end'}}>
                <TouchableOpacity  style={{ 
                    position: 'absolute',
                    top: -30,
                    backgroundColor: '#D92F24',
                    width: 200,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    borderBottomLeftRadius: 25,
                    borderTopLeftRadius: 25

                }}
                >
                    <Text style={{ fontSize: 22, fontWeight: '400', color: '#FFF' }} > Watch Now ▶</Text>
                </TouchableOpacity>

                {/* movie plot info */}
                <View style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
            <Text style={{ textAlign: 'left', color: '#1d1d1d', fontSize: 20, fontWeight: '600', margin: 10 }}> {currentMovie.title}</Text>
            <Text style={{ color: '#1d1d1d', fontSize: 13 }}> {currentMovie.plot}</Text>
                </View>

            </View>
            }


        </View>

        {/* slider with movie card */}
        <View style={styles.listView}>

            <Text style={{ fontSize: 30, fontWeight: '600', color: 'gray', marginLeft: 20,
        marginBottom: 20 }}>
                Top Movies
            </Text>

            <FlatList
                horizontal = {true}
                showsHorizontalScrollIndicator={false}
                data={movies}
                renderItem={({ item }) => (
                     <View style={styles.movieCard}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between'}}
                            onPress={() => didTapCurrentMovie(item)}
                        >
                                <Image resizeMode="stretch" style={{ 
                                    display: 'flex', width: Dimensions.get('screen').width / 2.5 - 10, 
                                    height: '80%',  
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20                                   
                                    }} 

                                    source={{
                                        uri: `${BASE_URL}/s3_images/${item.thumbnail}`
                                    }}
                                    
                                    />

                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', padding: 20}}> { item.title} </Text>
                        {isExist(item) ? 
                        <TouchableOpacity style={{                     
                            backgroundColor: '#208103',
                            width: '100%',
                            height: 44,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'

                            }} 
                            onPress={() => onTapRemoveFromWishlist(item)}
                            >

                            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }} > Remove from Wishlist</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{                     
                            backgroundColor: '#D92F24',
                            width: '100%',
                            height: 44,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'

                            }} 
                            onPress={() => onTapAddToWishlist(item)}
                            >

                            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }} > Add to Wishlist</Text>
                        </TouchableOpacity>
                        }

                    </View>

                )}

            
                keyExtractor={(item) => item.id}
            />


        </View>


    </View>
}


const mapStateToProps = (state) => ({
    movieReducer: state.movieReducer
})

const HomeScreen = connect(mapStateToProps, { fetchMovies, addToWishList, removeFromWishlist })(_HomeScreen)

export default HomeScreen;

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E5E5E5'
    },
    posterView: {
        display: 'flex',
        width: Dimensions.get('screen').width,
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    listView: {
         width: Dimensions.get('screen').width,
        flex: 5,
        padding: 10

    },
    poster: {
        display: 'flex',
        width: Dimensions.get('screen').width,
        height: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    },
    movieCard: {
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('screen').width / 2.5 - 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
        height: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10
    }


});