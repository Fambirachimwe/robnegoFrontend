
// get reservations 
import axios from 'axios';
import Swal from 'sweetalert2';


export const getReservations = () => {
    // get all 
    const response = fetch("https://robnego-production.up.railway.app/reservation/").then((response) => response.json())
    return response

}

export const getReservationById = async (id) => {
    const response = await fetch(`https://robnego-production.up.railway.app/reservation/${id}`)

    const res = response.json()
    // console.log(res)
    return res.data
}

export const login = (email, password) => {
    const url = "https://robnego-production.up.railway.app/login"
    return axios.post(url, { email: email, password: password })

    // .then(data => {

    //     console.log(data);
    //     if (data.data.token) {
    //         localStorage.setItem('token', data.data.token);
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Auth successfull',
    //             // text: 'Something went wrong!',
    //             // footer: '<a href="">Why do I have this issue?</a>'
    //         })
    //     } else {
    // Swal.fire({
    //     icon: 'Error',
    //     title: 'Auth failed',
    //     text: 'username or password is incorrect',
    //     // footer: '<a href="">Why do I have this issue?</a>'
    // })
    //     }

    // })
}

export const register = (username, email, phoneNumber, password) => {
    const url = "https://robnego-production.up.railway.app/register"
    axios.post(url, { username, email, phoneNumber, password }).then(data => {
        console.log(data.data)
    })
}


export const logout = () => {
    localStorage.removeItem('token');
}
// get orders

// get feedback

// get suggestions