import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst } from '../Const/_const';
import { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';

const RoomDetail = ({room, loggedUser, addLoggedUser}) => {
  
  const navigation = useNavigation();

    return (  
      <ScrollView>
        <View style= {styles.container}>
          <Text style={styles.header}>SALA TAL: </Text>
          <Text>Aquí se encontraría el detalle de la sala, se haría la reserva con el calendario</Text>
         </View>
      </ScrollView>
    );
  };
  
const styles = StyleSheet.create({
  container:{
    marginHorizontal:10
  },
  header: {
    textAlign:'center',
    fontSize: FONTSIZE.header1
  },
  subHeader: {
    fontSize: FONTSIZE.text,
    marginBottom:5
  },
});

const mapStateToProps = (state) => ({
  loggedUser: state.userOwnerReducer.loggedUser
});

const mapDispatchToPtops = {
  addLoggedUser: UserActions.addLoggedUser,
}
    
  
  export default connect(mapStateToProps, mapDispatchToPtops)(RoomDetail);
    