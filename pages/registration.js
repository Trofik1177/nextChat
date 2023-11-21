
import Header from '../components/header';
import styles from '../pages/styles/style.module.css';

const registration = () => {

    const submitForm = async () => {
        
    const registrationData = {
        first_name: document.getElementById('reg_firstname').value ,
        second_name: document.getElementById('reg_lastname').value,
        login: document.getElementById('reg_login').value,
        email: document.getElementById('reg_mail').value,
        password: document.getElementById('reg_password').value,
        phone: document.getElementById('reg_phone').value
      };
      
      fetch('https://ya-praktikum.tech/api/v2/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)

      })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        if (data.hasOwnProperty('reason')){
          document.getElementById('error_show').innerText = data['reason']; // Выводим приичну ошибки ответа сервера в div для уведомления пользователю
        }else{
          document.getElementById('error_show').innerText = 'Успешная регистрация!'; // Добавление текста
          document.getElementById('error_show').style.color = "green"; // Красим блок в зелёный
          window.location = "/" // Принудительная переадресация страницы после успешной регистрации 
        }
      })
    }

    const btn = () => {
        const pencil = document.getElementById('reg_firstname').value;
        console.log(pencil);

    }
    return (
        <div>
            {/* <Header title = "Регистрация"/> */}
            <div >
              <p className={styles.registration_title}>Регистрация</p>
              <p className={styles.registration_description}><br></br>Создайте учётную запись <br></br> пользователя</p>
             </div>
            <div className={styles.registration_wrapper}>
            <div>
              <div><strong id="error_show" style={{color:'#A30000'}}></strong></div>
              <br/>
              <input id='reg_firstname' className={styles.input_registration} placeholder='Имя' />
              <input id='reg_lastname' className={styles.input_registration} placeholder='Фамилия' />
              <input id='reg_mail' className={styles.input_registration} placeholder='Эл. почта' />
              <input id='reg_login' className={styles.input_registration} placeholder='Логин' />
              <input id='reg_phone' className={styles.input_registration} placeholder='Телефон' />
              <input id='reg_password' className={styles.input_registration} placeholder='Пароль' />
              <button onClick={submitForm} className={styles.registration_button}>Зарегистрироваться</button>  
              <button className={styles.registration_button}>Войти</button>             
            </div>
            </div>
        </div>

    )
}

export default registration;