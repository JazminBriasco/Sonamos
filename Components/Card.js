import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TypeCard } from "../Const/_const";

const Card = ({type, item}) => {
    console.log('tem', item)
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
                <Text>{item.gallery}</Text>
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
    
});
export default Card;