import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst, TypeCard } from '../Const/_const';
import { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';
import Card from '../Components/Card';
import { useNavigation } from '@react-navigation/native';

const Rooms = ({ userOwner, loggedUser}) => {
  console.log('ROOMS');
  const [rooms, setRooms] = useState([]);
  const [itemOwner, setItemOwner] = useState('DUEÑO');
  const navigation = useNavigation();

  useEffect(() => {
    //getAllUsers();
    if (loggedUser === undefined) navigation.navigate(PagesConst.LOGIN);
    const roomArray = userOwner.map(user => user.rooms).flat();
    setRooms(roomArray);
  }, [userOwner]);

    return (

        <View style= {styles.container}>
          <View style={styles.order}>
            <Text style={styles.header}>Salas disponibles:</Text>
            <Button title={'AZ↑↓'} color={COLORS.red}></Button>
          </View>
          <View style={styles.filterContainer}>
            <Text style={styles.subHeader}>Buscar por zona</Text>
            <Text style={styles.subHeader}>Buscar por fecha</Text>
          </View>
          <FlatList
            data={rooms}
            renderItem={({ item }) => (
              <Card type={TypeCard.CARDALLROOMS} item={item} itemOwner = {itemOwner}></Card>

            )} 
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          />
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      marginHorizontal:10
    },
    order: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    header: {
      textAlign:'center',
      fontSize: FONTSIZE.header1
    },
    subHeader: {
      fontSize: FONTSIZE.text,
      marginBottom:5
    },
    filterContainer: {
      padding:5,
      marginHorizontal:6,
      marginVertical:20,
      borderWidth: 1,
      borderRadius: 5
    },
    rooms: {
      padding:5,
      marginVertical: 5,
      borderWidth: 1,
      borderRadius: 5
    },
    pressedRoom: {
      backgroundColor: COLORS.pressed,
    }
    
  });

const mapStateToProps = (state) => ({
  userOwner: state.userOwnerReducer.userOwners,
  loggedUser: state.userOwnerReducer.loggedUser


});

const mapDispatchToPtops = {
 
}
    
  
  export default connect(mapStateToProps, mapDispatchToPtops)(Rooms);
    