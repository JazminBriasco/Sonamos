import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst } from '../Const/_const';
import { useEffect, useState } from 'react';
import Rooms from '../Screens/Rooms';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';

const Home = ({getLoggedUser, loggedUser}) => {
    const navigation = useNavigation();
    const [userLog, setUserLog] = useState(loggedUser);

    //console.log('loggedUser: ', loggedUser);
    return (
      <ScrollView>
      <View style={styles.container}>
        {(loggedUser !== undefined && loggedUser !== null) ?
          (<Rooms ></Rooms>)
          :
          (<View>
          <Text style={styles.header}>¡Bienvenido a SONAMOS!</Text>
          <Text style={styles.text}>Si tu objetivo es alquilar tus salas a los músicos de Mar del Plata registrate </Text>
          <Button title={ 'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.OWNERREGISTER)}></Button>
          
          <Text style={styles.text}>Si tu objetivo es buscar lugar donde ensayar de Mar del Plata registrate </Text>
          <Button title={ 'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.USERREGISTER)}></Button>

          <Text style={styles.text}>Si ya tenes cuenta logeate </Text>
          <Button title={ 'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.LOGIN)}></Button>
        </View>)
      }
    </View>
    </ScrollView> );
};
  
  const styles = StyleSheet.create({
    container: {
        display:'flex',
        backgroundColor: COLORS.bbkgColor1,
        padding: 10
    },
    header: {
        fontSize: FONTSIZE.header1,
        textAlign:'center',
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        fontSize: FONTSIZE.text,
        marginTop: 50,
    }
  });

  
const mapStateToProps = (state) => (
  {
    loggedUser: state.userOwnerReducer.loggedUser
  });
  
  const mapDispatchToPtops = {
    getLoggedUser: UserActions.getLoggedUser,
  }
  

export default connect(mapStateToProps, mapDispatchToPtops)(Home);
  