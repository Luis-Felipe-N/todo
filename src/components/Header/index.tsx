import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <h1>to.<span>do</span></h1>
        </header>
    )
}