import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst } from '../Const/_const';
import { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';

const RoomDetail = ({room, loggedUser, addLoggedUser}) => {
  
  const navigation = useNavigation();

    return (
      <View>
       <Text>Room Detail</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    
  });

const mapStateToProps = (state) => ({
  loggedUser: state.userOwnerReducer.loggedUser
});

const mapDispatchToPtops = {
  addLoggedUser: UserActions.addLoggedUser,
}
    
  
  export default connect(mapStateToProps, mapDispatchToPtops)(RoomDetail);
    