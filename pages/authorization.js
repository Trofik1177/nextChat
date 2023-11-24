import Header from '../components/header';
import styles from '../pages/styles/style.module.css';


const authorization = () => {

  const submitForm = async () => {
    const loginInput = document.getElementById('aut_login');
    const passwordInput = document.getElementById('aut_password');

    // Check if login and password fields are not empty
    if (!loginInput.value || !passwordInput.value) {
        document.getElementById('error_show').innerText = 'Заполните все поля'; // Display an error message
        return; // Exit the function if fields are empty
    }

    const registrationData = {
        login: loginInput.value,
        password: passwordInput.value,
    };

    fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
    })
    .then(function (response) {
        console.log(response);
        return response;
    })
    .then(function (data) {
        console.log(data);
        if (!data['ok']) {
            document.getElementById('error_show').innerText = 'Неверный логин или пароль';
        } else {
            document.getElementById('error_show').innerText = 'Успешная авторизация!';
            document.getElementById('error_show').style.color = "green";
            setTimeout(function(){ window.location = "/"}, 1500);
        }
    });
}

    return (
        <div>
           <div className={styles.authorization_wrapper}>
            <div>
              <br/>
              <input id = 'aut_login'className={styles.input_authorization} placeholder='Логин' />
              <input id = 'aut_password' className={styles.input_authorization} placeholder='Пароль' />
              <button onClick={submitForm} className={styles.authorization_button}>Войти</button>  
              <div><strong id="error_show" style={{color:'#A30000'}}></strong></div>

            </div>
            
            </div>
            
        </div>
    )
}

export default authorization;