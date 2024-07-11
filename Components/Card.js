import { Alert, Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TypeCard } from "../Const/_const";
import { UserActions } from "../Redux/Actions/userAction";
import { connect } from "react-redux";

const Card = ({type, item, getLoggedUser, itemOwner}) => {
    console.log('Card');

    const editRoom = () => {
        console.log('EDIT');
    }

    const reserveRoom = () => {
        console.log('RESERVE');
    }

    const handleIconPress = () => {
        Alert.alert(
            'Modificar', 
            '¿Desea modificar o eliminar la sala?', 
            [{text: 'SI', style: 'destructive', onPress: editRoom}, {text: 'NO', style: 'cancel'}]
        );
    }

    const handleReservePress = () => {
        Alert.alert(
            '¿Reservar?', 
            '', 
            [{text: '¡SI!', style: 'destructive', onPress: reserveRoom}, {text: 'NO', style: 'cancel'}]
        );
    }
    
    if(type === TypeCard.CARDMYROOM){
        return (
            <View style={styles.containerCard}>
                <View>
                <View style={styles.containerHeader}>
                    <Text>{item?.name?.toUpperCase()}<MaterialCommunityIcons name="square-edit-outline" size={18} color="#000" onPress={handleIconPress}/></Text>
                    <Text>${item.price} </Text>
                </View>
                    <View style={styles.bodyCard}>
                    <Text>{item.adress} </Text>
                    <Text>{item.description} </Text>
                    <Text>Disponible del {item.availability[0]} al {item.availability[1]}</Text>
                    
                    <View style={styles.imageContainer}>
                        {item.gallery ? item.gallery.map((uri, index) => (
                            <Image key={index} source={{ uri }} style={styles.image} />
                        )) : ''}
                    </View>
                    </View>
                </View>
            </View>
        )
    }
    if(type === TypeCard.CARDALLROOMS){
        return (
            <View style={styles.containerCard}>
                <View style={styles.containerHeader}>
                        <Text>{item.name.toUpperCase()}, {itemOwner}</Text>
                        <Text>${item.price} <MaterialCommunityIcons name="hand-front-left" size={18} color="#000" onPress={handleReservePress}/></Text>
                    </View>
                    <View style={styles.bodyCard}>
                        <Text>{item.adress} </Text>
                        <Text>{item.description} </Text>
                        <Text>Disponible del {item.availability[0]} al {item.availability[1]}</Text>
                        <View style={styles.imageContainer}>
                            {item.gallery ? item.gallery.map((uri, index) => (
                                <Image key={index} source={{ uri }} style={styles.image} />
                            )) : ''}
                        </View>
                    </View>
            </View>
        )}
}


const styles = StyleSheet.create({
    containerCard: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#f8f9fa'
    },
    bodyCard: {
        padding: 6
    },
    containerHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f1f2',
        color:'black',
        justifyContent : 'space-between',
        padding: 6,
        borderRadius: 5,
    },
    imageContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems:'center',
        width:50
    },
    image: {
        marginTop: 5,
        width: 80,
        borderRadius: 5,
        borderWidth:2,
        borderBlockColor: 'black',
        height: 50,
      },
    disabledContainer: {
        backgroundColor: '#e2e2e2',
        borderRadius: 5,
    },
    disabledHeader: {
        color: '#6c757d'
    }
});

const mapStateToProps = (state) => ({

  });
  
  const mapDispatchToProps = {

  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Card);