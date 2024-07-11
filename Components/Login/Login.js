import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, FONTSIZE } from '../../Const/_styles';
import { UserActions } from '../../Redux/Actions/userAction';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { PagesConst, UserObjectConst } from '../../Const/_const';
import { useNavigation } from '@react-navigation/native';

const Login = ({getAllUsers, userOwner, addLoggedUser}) => {

    console.log('LOGIN');
    const [registerData, setRegisterData] = useState({});
    const [invalidFormInfo, setInvalidFormInfo] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        getAllUsers();
        userOwner.forEach(element => {
            console.log('all users ', element.name);
        });
        //addLoggedUser('');
    }, []); 
    
    const handleInputChange = (key, value) => {
        setInvalidFormInfo('');
        key === UserObjectConst.CONTACTNUMBER && setRegisterData({ ...registerData, contactNumber: value });
        key === UserObjectConst.PASSWORD && setRegisterData({ ...registerData, password: value });
    }; 
    
    const checkForm =() => {
        const checkUser = userOwner.find(user => user.contactNumber?.slice(3) === registerData.contactNumber);
        console.log('user founded: ', checkUser.name);
        
        if (checkUser && checkUser?.password?.toUpperCase() === registerData?.password?.toUpperCase()) {
            console.log('userToSign in loggedUser', checkUser.name);
            addLoggedUser(checkUser);
            navigation.navigate(PagesConst.SONAMOS);
        } else{ 
            setInvalidFormInfo('Usuario o contraseña incorrectos, por favor vuelva a intentarlo');
        }
    }

     return (
      <View style={styles.container}>
        <View>  
            <Text style={styles.inputTitle}>Numero de contacto</Text>
            <TextInput
                style={styles.input}
                placeholder='2235968744'
                placeholderTextColor={'rgb(102, 102, 102)'}
                keyboardType='numeric'
                maxlength={20}
                value={registerData.contactNumber}
                onChangeText={(text) => handleInputChange(UserObjectConst.CONTACTNUMBER ,text)}
            />
            <Text style={styles.inputTitle}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder='12345'
                placeholderTextColor={'rgb(102, 102, 102)'}
                keyboardType='number-pad'
                maxlength={20}
                secureTextEntry={true}
                value={registerData.password}
                onChangeText={(text) => handleInputChange(UserObjectConst.PASSWORD ,text)}
            />
        </View>
        <Text style={styles.fail}>{invalidFormInfo}</Text>
        <Button title='Entrar' onPress={checkForm}></Button>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    }, 
    inputTitle: {
        color: COLORS.textColorBlack,
        fontSize: FONTSIZE.subHeaders,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 30,
        color: COLORS.textColorBlack,
        padding: 10,
        fontSize: FONTSIZE.text,
        opacity: 1,
        borderBottomWidth: 1
    },
    fail: {
        color: COLORS.fail,
        fontWeight: 'bold'
    }
  });

const mapStateToProps = (state) => ({
    userOwner: state.userOwnerReducer.userOwners,
    loggedUser: state.userOwnerReducer.loggedUser
});

const mapDispatchToPtops = {
    getAllUsers: UserActions.getAllUsers,
    addLoggedUser: UserActions.addLoggedUser,
   // getLoggedUser: UserActions.getLoggedUser
}

export default connect(mapStateToProps, mapDispatchToPtops)(Login);
  