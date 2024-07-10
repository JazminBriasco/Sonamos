import axios from "axios";

const URL = 'https://react-native-rock-default-rtdb.firebaseio.com';

export function addUserHTTP(usersData) {
    return axios.post( URL + '/users.json', usersData );
}

export async function getUserHTTP() {
    const response =await axios.get( URL + '/users.json' );
    const users = [];
    for ( const key in response.data ) {
        const userObject = {
            id: key,
            name: response.data[key].name,
            contactNumber: response.data[key].contactNumber,
            mail: response.data[key].mail,
            password: response.data[key].password,
            rooms:response.data[key].rooms,
        }
        users.push(userObject);
    }
    return users;
}

export async function modifyUserHTTP( user ) {
    const urlPut = URL + '/users/' + user.id + '.json';
    try {
        const res = await axios.put(urlPut, user); 
        return (res);
    } catch (error) {
        throw error; 
  }
}

export async function getAllRoomsHTTP( ) {
    //Get todas las salas
}

export async function setAllRoomsHTTP( ) {
    //Al crear sala se agrega a otro endpoint a demás del owner
}