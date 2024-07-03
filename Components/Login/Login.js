import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, FONTSIZE } from '../../Const/_styles';
import { UserActions } from '../../Redux/Actions/userAction';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { PagesConst, UserObjectConst, UserTypeConst } from '../../Const/_const';
import { useNavigation } from '@react-navigation/native';

const Login = ({getAllUsers, userOwner}) => {

    const [isOwner, setIsOwner] = useState(false);
    const [registerData, setRegisterData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [invalidFormInfo, setInvalidFormInfo] = useState(' ');

    const navigation = useNavigation();

    useEffect(() => {
        getAllUsers();
    }, [userOwner]); 

    
    const handleInputChange = (key, value, type) => {
        setInvalidFormInfo('');
        if (type === UserTypeConst.OWNER){
            if (key === UserObjectConst.MAIL) setRegisterData({ ...registerData, mail: value });
            if (key === UserObjectConst.PASSWORD) setRegisterData({ ...registerData, password: value });
        } else {
            key === UserObjectConst.CONTACTNUMBER && setRegisterData({ ...registerData, contactNumber: value });
            key === UserObjectConst.PASSWORD && setRegisterData({ ...registerData, password: value });
        }
    };

    useEffect(() =>{
        const chackOwner = userOwner.find(user => user.mail?.toUpperCase() === registerData.mail?.toUpperCase());
        if (chackOwner && chackOwner?.password?.toUpperCase() === registerData?.password?.toUpperCase()) {
            setIsFormValid(true);
        } else{ 
            setIsFormValid(false);
        }
        const checkUser = userOwner.find(user => user.contactNumber.slice(3) === registerData.contactNumber);
        if (checkUser && checkUser?.password?.toUpperCase() === registerData?.password?.toUpperCase()) {
            setIsFormValid(true);
        } else{ 
            setIsFormValid(false);
        }
    }),[registerData];


    const checkForm = () => {
        isFormValid ? navigation.navigate(PagesConst.HOME):
        setInvalidFormInfo('Usuario o contraseña incorrectos, por favor vuelva a intentarlo');
    }

     return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Button title="Soy Dueño" onPress={() => setIsOwner(true)}></Button>
            <View style={styles.break}></View>
            <Button title="Soy Usuario" onPress={() => setIsOwner(false)}></Button>
        </View>
        {!isOwner ? (   
            <View>  
                <Text style={styles.inputTitle}>Numero de contacto</Text>
                <TextInput
                    style={styles.input}
                    placeholder='2235968744'
                    placeholderTextColor={'rgb(102, 102, 102)'}
                    keyboardType='numeric'
                    maxlength={20}
                    value={registerData.contactNumber}
                    onChangeText={(text) => handleInputChange(UserObjectConst.CONTACTNUMBER ,text, UserTypeConst.USER)}
                />
                <Text style={styles.inputTitle}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder='12345'
                    placeholderTextColor={'rgb(102, 102, 102)'}
                    keyboardType='default'
                    maxlength={20}
                    secureTextEntry={true}
                    value={registerData.password}
                    onChangeText={(text) => handleInputChange(UserObjectConst.PASSWORD ,text, UserTypeConst.USER)}
                />
            </View>
        ) : (
        <View>
            <Text style={styles.inputTitle}>Mail</Text>
            <TextInput
                style={styles.input}
                placeholder='johnDoe@gmail.com'
                placeholderTextColor={'rgb(102, 102, 102)'}
                keyboardType='email-address'
                maxlength={20}
                value={registerData.mail}
                onChangeText={(text) => handleInputChange(UserObjectConst.MAIL, text, UserTypeConst.OWNER)}
            />
            <Text style={styles.inputTitle}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder='12345'
                placeholderTextColor={'rgb(102, 102, 102)'}
                keyboardType='default'
                maxlength={20}
                secureTextEntry={true}
                value={registerData.password}
                onChangeText={(text) => handleInputChange(UserObjectConst.PASSWORD ,text, UserTypeConst.OWNER)}
            />
        </View>
    )}
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
    buttonContainer: {
        margin: 10,
        marginBottom: 30
    },
    break: {
        height: 20,
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
    userOwner: state.userOwnerReducer.userOwners
});

const mapDispatchToPtops = {
    getAllUsers: UserActions.getAllUsers,
}

export default connect(mapStateToProps, mapDispatchToPtops)(Login);
  