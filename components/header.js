import styles from '../pages/styles/style.module.css';
import Link from "next/link";


function Header(props) {
    return(
        <div className={styles.main}>
            <Link href="/">
                Главная
            </Link>

            <Link href="/chat">
                Чат
            </Link>
            <Link href="/authorization">
                Авторизация
            </Link>

            <Link href="/profile">
                Профиль
            </Link>

            <Link href="/registration">
                Регистрация
            </Link>
            <div>
                <h1>{props.title}</h1>
            </div>
            </div>
    );
  }

export default Header;