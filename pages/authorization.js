// import Header from '../components/header';
// import styles from '../pages/styles/style.module.css';


// const authorization = () => {

//   const submitForm = async (e) => {
//     e.preventDefault();
//     const loginInput = document.getElementById('aut_login');
//     const passwordInput = document.getElementById('aut_password');

    
//     if (!loginInput.value || !passwordInput.value) {
//         document.getElementById('error_show').innerText = 'Заполните все поля'; 
//         return;
//     }

//     const registrationData = {
//         login: loginInput.value,
//         password: passwordInput.value,
//     };

//     fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(registrationData)
//     })
//     .then(function (response) {
//         console.log(response);
//         return response;
//     })
//     .then(function (data) {
//         console.log(data);
//         if (!data['ok']) {
//             document.getElementById('error_show').innerText = 'Неверный логин или пароль';
//         } else {
//             document.getElementById('error_show').innerText = 'Успешная авторизация!';
//             document.getElementById('error_show').style.color = "green";
//             setTimeout(function(){ window.location = "/"}, 1500);
//         }
//     });
// }

//     return (
//         <div className={styles.authorization_wrapper}>
//             <form>
//               <br/>
//               <input id = 'aut_login'className={styles.input_authorization} placeholder='Логин' />
//               <input id = 'aut_password' className={styles.input_authorization} placeholder='Пароль' />
//               <button onClick={submitForm} className={styles.authorization_button}>Войти</button>  
//               <strong id="error_show" style={{color:'#A30000'}}></strong>
//             </form>
//         </div>
//     )
// }

// export default authorization;
//-------------------------------------------------
import React, { useState } from 'react';
import styles from '../pages/styles/style.module.css';

const Authorization = () => {
  // Declare state variables for login and password
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    // Check if login and password are not empty
    if (!login || !password) {
      setError('Заполните все поля');
      return;
    }

    const registrationData = {
      login: login,
      password: password,
    };

        fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
    })
    .then(function (response) {
        return response;
    })
    .then(function (data) {
        console.log(data);
        if (!data['ok']) {
          setError('Неверный логин или пароль');
        } else {
          setError('Успешная авторизация!');
                setTimeout(() => {
                  window.location = '/';
                }, 1500);
        }
    });
  };

  return (
    <div className={styles.authorization_wrapper}>
      <form>
        <br />
        {/* Use onChange to update the login state */}
        <input
          id="aut_login"
          className={styles.input_authorization}
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {/* Use onChange to update the password state */}
        <input
          id="aut_password"
          className={styles.input_authorization}
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={submitForm} className={styles.authorization_button}>
          Войти
        </button>
        <strong id="error_show" style={{ color: '#A30000' }}>
          {error}
        </strong>
      </form>
    </div>
  );
};

export default Authorization;

