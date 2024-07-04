import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst } from '../Const/_const';
import { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';
import RoomDetail from './RoomDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Rooms = ({ loggedUser, addLoggedUser}) => {
  
  const navigation = useNavigation();

  console.log('ROOMS');

  const exit = () => {
    addLoggedUser(undefined);
    AsyncStorage.removeItem('userLogged');
    navigation.navigate(PagesConst.HOME)
  }

    return (
      <ScrollView>
      <View style= {styles.container}>
        <View style={styles.order}>
          <Text style={styles.header}>Salas disponibles</Text>
          <Button title={'AZ↑↓'} color={COLORS.red}></Button>
          <Button title={'X'} color={COLORS.red} onPress={exit} ></Button>
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.subHeader}>Buscar por zona</Text>
          <Text style={styles.subHeader}>Buscar por fecha</Text>
        </View>
        <View style={styles.roomContainer}>



          <Pressable style={({ pressed }) => [styles.rooms, pressed && styles.pressedRoom]} onPress={() => navigation.navigate(PagesConst.ROOMDETAIL)}>
            <View style={styles.order}>
              <Text style={styles.subHeader}>Santiago del Estero 1234</Text>
              <Text>$8000</Text>
            </View>
            <Text>Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas,Cuenta.</Text>
          </Pressable>          
          <Pressable style={({ pressed }) => [styles.rooms, pressed && styles.pressedRoom]}>
            <View style={styles.order}>
              <Text style={styles.subHeader}>Santiago del Estero 1234</Text>
              <Text>$8000</Text>
            </View>
            <Text>Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas,Cuenta.</Text>
          </Pressable>       
          <Pressable style={({ pressed }) => [styles.rooms, pressed && styles.pressedRoom]}>
            <View style={styles.order}>
              <Text style={styles.subHeader}>Santiago del Estero 1234</Text>
              <Text>$8000</Text>
            </View>
            <Text>Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas,Cuenta.</Text>
          </Pressable>       
          <Pressable style={({ pressed }) => [styles.rooms, pressed && styles.pressedRoom]}>
            <View style={styles.order}>
              <Text style={styles.subHeader}>Santiago del Estero 1234</Text>
              <Text>$8000</Text>
            </View>
            <Text>Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas,Cuenta.</Text>
          </Pressable>       
          <Pressable style={({ pressed }) => [styles.rooms, pressed && styles.pressedRoom]}>
            <View style={styles.order}>
              <Text style={styles.subHeader}>Santiago del Estero 1234</Text>
              <Text>$8000</Text>
            </View>
            <Text>Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas, Cuenta con muchas cositas,Cuenta.</Text>
          </Pressable>       

          

        </View>
      </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container:{
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
      marginVertical:20,
      borderWidth: 1,
      borderRadius: 5
    },
    roomContainer: {
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
  loggedUser: state.userOwnerReducer.loggedUser
});

const mapDispatchToPtops = {
  addLoggedUser: UserActions.addLoggedUser,
}
    
  
  export default connect(mapStateToProps, mapDispatchToPtops)(Rooms);
    