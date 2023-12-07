import styles from '../pages/styles/style.module.css';



const chatCard = (props) => {
    
        return (
        <div className={styles.chat_card}>
            <div className={styles.chat_inner}>
              <div className={styles.chat_photo}>
                
              </div>
              <div>
                  <span className={styles.chat_name}>
                  {props.name}
                    </span>
              <span className={styles.chat_message}>
              {props.message}
              </span> 
              </div>
            </div>
            <div>
              <div>
              {props.time}
              </div>
            </div>
        </div>
        );
      }


export default chatCard;