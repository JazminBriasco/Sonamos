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