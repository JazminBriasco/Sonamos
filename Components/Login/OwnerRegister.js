import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../../Redux/Actions/userAction';
import { COLORS, FONTSIZE } from '../../Const/_styles';
import { UserObjectConst } from '../../Const/_const';
import { User } from '../../Class/User';

const OwnerRegister = ({addUser, getAllUsers, userOwner}) => {

    const initialValues = new User('','','','','');

    const [registerData, setRegisterData] = useState(initialValues);
    const [validForm, setValidForm] = useState(false);
    const [userAlreadyExist, setUserAlreadyExist] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, [userOwner]); 

    const resetValues = () =>{
        setRegisterData(initialValues);
        setValidForm(false);
        setUserAlreadyExist(false);
    }

    const validateForm = () => {
        setValidForm(
            registerData.name?.length >= 2 && registerData.name?.length <= 40 &&
            registerData.contactNumber?.length >= 8 && registerData.contactNumber?.length <=20 && 
            registerData.mail?.length >= 5 && registerData?.mail.length <= 50 && registerData.mail?.includes('@') &&
            registerData.password?.length >= 2 && registerData.password?.length <= 30 && 
            !userAlreadyExist
        );
    }

    const handleInputChange = (key, value) => {
        key === UserObjectConst.NAME && setRegisterData({ ...registerData, name: value });
        key === UserObjectConst.CONTACTNUMBER && setRegisterData({ ...registerData, contactNumber: value });
        if(key === UserObjectConst.MAIL){
        userOwner.find(user => user.mail.toUpperCase() === value.toUpperCase()) === undefined ? setUserAlreadyExist(false) : setUserAlreadyExist(true);
            setRegisterData({ ...registerData, mail: value });
        }
        key === UserObjectConst.PASSWORD && setRegisterData({ ...registerData, password: value });

        validateForm();
    };
  

    const handleUserSubmit = () => {
        const newUser = new User('', registerData?.name, '+54'+registerData.contactNumber, registerData.password, registerData.mail, true, null);
        addUser(newUser);
        resetValues();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Nombre y Apellido</Text>
            <TextInput
                style={styles.input}
                placeholder='John Doe'
                placeholderTextColor={'rgb(102, 102, 102)'}
                keyboardType='default'
                maxlength={20}
                value={registerData.name}
                onChangeText={(text) => handleInputChange(UserObjectConst.NAME ,text)}
            />

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

            <Text style={styles.inputTitle}>Mail</Text>
            <TextInput
                style={[styles.input, userAlreadyExist ? styles.duplicateMail : styles.text]}
                placeholder='johnDoe@gmail.com'
                placeholderTextColor={'rgb(102, 102, 102)'}
                keyboardType='email-address'
                maxlength={20}
                value={registerData.mail}
                onChangeText={(text) => handleInputChange(UserObjectConst.MAIL ,text)}
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
                onChangeText={(text) => handleInputChange(UserObjectConst.PASSWORD ,text)}
            />

            {userAlreadyExist ? <Text style={styles.duplicateMail }>El mail ingresado ya existe, logeate logi</Text> : ''}
            <Button onPress={handleUserSubmit} title='Send' disabled= {!validForm}></Button>
        </View>
    );
  };
  
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 10,
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
    duplicateMail: {
        color: COLORS.fail,
        fontWeight: 'bold'
    },
    text: {
       color: COLORS.textColorBlack,
        fontWeight: 'normal'
    },
});

const mapStateToProps = (state) => ({
    userOwner: state.userOwnerReducer.userOwners
});

const mapDispatchToPtops = {
    addUser: UserActions.addUser,
    getAllUsers: UserActions.getAllUsers,
}

export default connect(mapStateToProps, mapDispatchToPtops)(OwnerRegister);