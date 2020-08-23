import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';

import { getList, removeData } from '../../actions'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = (props) => {

    useEffect(() => {
        props.getList()
    }, [])


    const renderItem = ({ item }) => {
        const source = item.image.uri ? item.image : { uri: item.image }
        return (

            <View style={{
                height: 100, margin: 10,
                flexDirection: 'row',
                backgroundColor: 'white',
                justifyContent: 'space-between'
            }}>
                <View
                style={{
                    height: 100, 
                    flexDirection: 'row',
                    backgroundColor: 'white',
                }}>
                    <Image
                        defaultSource={require('../../img/dummy.png')}
                        source={source}
                        style={{ height: 100, width: 100 }}
                        resizeMode='contain'
                    />
                    <View style={{ padding: 10 }}>
                        <Text style={styles.text}>Name: {item.name}</Text>
                        <Text style={styles.text}>Status: {item.status}</Text>
                        <Text style={styles.text}>Species: {item.species}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={() => {
                        Alert.alert(
                            "Uyarı",
                            "Silmek istediğinizden emin misiniz?",
                            [
                              {
                                text: "İptal",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              { text: "Evet", onPress: () => {
                                props.removeData({ id: item._id })
                              }}
                            ],
                            { cancelable: false }
                          );
                    }}
                    style={{ justifyContent: 'center', margin: 10,}}>
                    <Image
                        source={require('../../img/remove.png')}
                        style={{ height: 20, width: 20 }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {props.loadingCharacter ?
                <ActivityIndicator size='large' /> :

                <FlatList
                    style={{ flex: 1 }}
                    data={props.characters}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{
                                alignItems: 'center',
                                marginTop: 20,
                                height: 300,
                                justifyContent: 'center'
                            }}>
                                <Text style={{ fontSize: 10, marginBottom: 30 }}>Herhangi bir data bulunamadı.</Text>
                            </View>

                        )
                    }}
                    initialNumToRender={2}

                />}
        </View>
    );
}

const styles = {
    text: { padding: 3 }
}




const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
};

export default connect(mapStateToProps, { getList, removeData })(Home);