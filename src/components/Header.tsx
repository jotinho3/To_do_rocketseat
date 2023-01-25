import styles from "../styles/Header.module.css"
import rocketLogo from "../assets/rocket.svg"

export function Header() {
    return (
        <div className={styles.header}>
            <img src={rocketLogo}/>
            <strong>to</strong><strong>do</strong>
            
        

    </div>
    )
    
}