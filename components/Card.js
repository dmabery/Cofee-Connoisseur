import Image from 'next/image';
import Link from 'next/link';
import styles from './card.module.css';
import cls from 'classnames';


const Card = (props) => {
    return (
        <Link href={props.href}>
            <a className={styles.cardLink}>
                <div className={cls("glass", styles.container)}>
                    <h2 className={styles.cardHeader}>{props.name}</h2>
                    <Image className={styles.cardImage} src={props.imgUrl} width={260} height={160} />
                </div>
            </a>
        </Link>
    );
};

export default Card;