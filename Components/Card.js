import { Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TypeCard } from "../Const/_const";

const Card = ({type, item}) => {
    if(type === TypeCard.CARDMYROOM){
    return (
        <View style={styles.containerCard}>
            <View style={styles.containerHeader}>
                <Text>{item?.name?.toUpperCase()}<MaterialCommunityIcons name="square-edit-outline" size={18} color="#000" /></Text>
                <Text>${item.price} </Text>
            </View>
                <View style={styles.bodyCard}>
                <Text>{item.adress} </Text>
                <Text>{item.description} </Text>
                <Text>{item.availability}</Text>
                
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
        height: 50,
      },
});
export default Card;