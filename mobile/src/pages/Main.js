import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

function Main({ navigation }) {
    const [currentRegion, SetCurrentRegion] = useState(null)

    useEffect(() => {
        async function loadInitialPosition() {
           const { granted } = await requestPermissionsAsync()

           if (granted) {
               const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true,
               })

               const { latitude, longitude } = coords

               SetCurrentRegion({
                   latitude,
                   longitude,
                   latitudeDelta: 0.02,
                   longitudeDelta: 0.02,
                })
            }
        }

        loadInitialPosition()
    }, [])

    if(!currentRegion) {
        return null
    }

    return (
        <>
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude: -30.1348066, longitude: -51.3575036}}>
                <Image style={styles.avatar} 
                    source={{ uri: 'https://avatars3.githubusercontent.com/u/56520069?s=400&v=4' }} />
                
                <Callout onPress={ () => {
                    // navegação
                    navigation.navigate('Profile', { github_username: 'kiszewski' })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Leonardo Kiszewski</Text>
                        <Text style={styles.devBio}>teste de bio sajidasjdadsiadsdasdasdasdasdasd</Text>
                        <Text style={styles.devTechs}>React JS, NodeJS, ReactNative</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>

        <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                />
            <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF"/>
            </TouchableOpacity>
        </View>
        </>
        )
}

const styles = StyleSheet.create({
    map: {
        flex: 1 
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main