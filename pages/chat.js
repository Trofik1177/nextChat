import Header from '../components/header';
import ChatCard from '../components/ChatCard';
import styles from '../pages/styles/style.module.css';



const chat = () => {
    
        return (
        <div className={styles.chat_wrapper}>
              <style jsx global>{`
                  body {
                  margin: 0;
                  }
              `}</style>


          <div className={styles.sidebar}>

        <div className={styles.presets_wrapper}>
        <span className={styles.btnMenu}>Профиль</span> 
        <br />
        <span className={styles.search_wrapper}><input className={styles.search} placeholder='Поиск'/></span>
        </div>

            <ChatCard name = 'Lena' message = 'PPO' time = '14:59'/>
            <ChatCard name= 'Maksik' message = 'TTR' time = '12:22'/>
            <ChatCard name = 'love' message = 'PPR' time = '20:02'/>
          </div>

          <div className={styles.chat_main}>
                  <span className={styles.chat_main_message}>Выберите чат чтобы отправить сообщение</span>
          </div>

        </div>
        );
      }


export default chat;