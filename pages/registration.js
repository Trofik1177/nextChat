import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../pages/styles/style.module.css';
import Link from 'next/link';

const Registration = () => {
  // Состояния для хранения данных формы, ошибок и объекта для работы с маршрутизацией
  const [registrationData, setRegistrationData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const router = useRouter();

  // Обработчик изменения полей формы
  const onChangeField = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    // Обновление состояний данными из формы и очистка сообщений об ошибках для данного поля
    setRegistrationData({ ...registrationData, [fieldName]: fieldValue });
    setErrorMessages({ ...errorMessages, [fieldName]: '' });
  };

  // Функция валидации полей формы
  const validateField = (fieldName, value) => {
    if (!value || value.trim() === '') {
      return 'Это поле обязательно для заполнения';
    }

    switch (fieldName) {
      case 'reg_mail':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value) ? '' : 'Некорректный адрес эл. почты';
      case 'reg_phone':
        const phoneRegex = /^\+?[0-9]{1,3}[- ]?([0-9]{2,3}[- ]?){2}[0-9]{2,4}$/;
        return phoneRegex.test(value) ? '' : 'Некорректный номер телефона';
      case 'reg_password':
        const passwordRegex = /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)[a-zA-Zа-яА-ЯёЁ\d]{8,}$/;
        return passwordRegex.test(value) ? '' : 'Пароль не соответствует требованиям';
      default:
        return '';
    }
  };

  // Функция отправки формы
  const submitForm = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const updatedErrorMessages = {};

    // Валидация всех полей формы
    Object.entries(registrationData).forEach(([fieldName, value]) => {
      const errorMessage = validateField(fieldName, value);
      if (errorMessage) {
        hasErrors = true;
        updatedErrorMessages[fieldName] = errorMessage;
      }
    });

    // Обновление сообщений об ошибках
    setErrorMessages(updatedErrorMessages);

    if (hasErrors) {
      return;
    }

    // Подготовка данных для отправки на сервер
    const requestData = {
      first_name: registrationData.reg_firstname,
      second_name: registrationData.reg_lastname,
      login: registrationData.reg_login,
      email: registrationData.reg_mail,
      password: registrationData.reg_password,
      phone: registrationData.reg_phone,
    };

    // Отправка данных на сервер
    fetch('https://ya-praktikum.tech/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Обработка ответа сервера
        if (data.hasOwnProperty('reason')) {
          // Проверка наличия ошибки по логину
          if (data.reason.toLowerCase().includes('login')) {
            document.getElementById('error_show').innerText = 'Логин уже существует';
          } else {
            document.getElementById('error_show').innerText = data.reason;
          }
        } else {
          // Успешная регистрация
          document.getElementById('error_show').innerText = 'Успешная регистрация!';
          document.getElementById('error_show').style.color = 'green';

          // Переход на главную страницу
          router.push('/');
        }
      });
  };

  // Визуализация компонента
  return (
    <div className={styles.registration_wrapper} onChange={onChangeField}>
      <form>
        <span className={styles.registration_title}>Регистрация</span>

        <p className={styles.registration_description}>
          <br></br>Создайте учётную запись <br></br> пользователя
        </p>

        <strong id="error_show" style={{ color: '#A30000' }}></strong>
        <br />
        <input name='reg_firstname' className={styles.input_registration} placeholder='Имя' />
        <div style={{ color: '#A30000' }}>{errorMessages.reg_firstname}</div>

        <input name='reg_lastname' className={styles.input_registration} placeholder='Фамилия' />
        <div style={{ color: '#A30000' }}>{errorMessages.reg_lastname}</div>

        <input name='reg_mail' id='reg_mail' className={styles.input_registration} placeholder='Эл. почта' />
        <div style={{ color: '#A30000' }}>{errorMessages.reg_mail}</div>

        <input name='reg_login' className={styles.input_registration} placeholder='Логин' />
        <div style={{ color: '#A30000' }}>{errorMessages.reg_login}</div>

        <input name='reg_phone' className={styles.input_registration} placeholder='Телефон' />
        <div style={{ color: '#A30000' }}>{errorMessages.reg_phone}</div>

        <input name='reg_password' id='reg_password' type='password' className={styles.input_registration} placeholder='Пароль' />
        <div style={{ color: '#A30000' }}>{errorMessages.reg_password}</div>

        <button onClick={submitForm} className={styles.registration_button}>
          Зарегистрироваться
        </button>
        <Link className={styles.authorization_button} href='/authorization'>
          Войти
        </Link>
      </form>
    </div>
  );
};

export default Registration;



