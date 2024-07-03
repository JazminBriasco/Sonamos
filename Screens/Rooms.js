import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst } from '../Const/_const';
import { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';

const Rooms = ({ loggedUser, addLoggedUser}) => {
  
  const navigation = useNavigation();

  const exit = () => {
    addLoggedUser({});
    navigation.replace(PagesConst.HOME)
  }

    return (
      <View style={{display:'flex'}}>
        <View style={styles.buttonSmall}>
          <Button title="Salir" onPress={exit}>
          </Button>
        </View>
        <Text >¡Bienvenido al Rooms!</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    buttonSmall: {
      width: 55,
      height: 40,
      position: 'absolute',
      marginHorizontal:'82%',
    }
  });

const mapStateToProps = (state) => ({
  loggedUser: state.userOwnerReducer.loggedUser
});

const mapDispatchToPtops = {
  addLoggedUser: UserActions.addLoggedUser,
}
    
  
  export default connect(mapStateToProps, mapDispatchToPtops)(Rooms);
    