import { useRouter } from "next/router";
import Link from "next/link";
import Head from 'next/head'
import { fetchCoffeeStore } from "../../lib/coffee-stores";
import styles from '../../styles/coffee-store.module.css';
import Image from 'next/image';
import cls from "classnames";

export async function getStaticProps(staticProps) {
    const params = staticProps.params;

    const coffeeStores = await fetchCoffeeStore();
    const findById = coffeeStores.find((coffeeStore) => coffeeStore.fsq_id === params.id)
    console.log(coffeeStore)
    return {
        props: {
            coffeeStore: findById ? findById : {}
        },
    }
}

//where to get the paths from
export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStore();
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.fsq_id
            }
        }
    })

    return {
        paths,
        fallback: true
    };

    
}



const CoffeeStore = (props) => {
    const router = useRouter();
    console.log(props)
    return (
        <div className={styles.layout}>
        <Head>
          <title>{props.coffeeStore.name}</title>
          <meta name="description" content={`${props.coffeeStore.name} coffee store`}></meta>
        </Head>
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{props.coffeeStore.name}</h1>
            </div>
            <Image
              src={ props.coffeeStore.imgUrl}
              width={600}
              height={360}
              className={styles.storeImg}
              alt={props.coffeeStore.name}
            ></Image>
          </div>
  
          <div className={cls("glass", styles.col2)}>
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className={styles.text}>{props.coffeeStore.location.address}</p>
            </div>
            {props.coffeeStore.location.neighborhood && (
              <div className={styles.iconWrapper}>
                <Image
                  src="/static/icons/nearMe.svg"
                  width="24"
                  height="24"
                  alt="near me icon"
                />
                <p className={styles.text}>{props.coffeeStore.location.neighborhood[0]}</p>
              </div>
            )}
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/star.svg"
                width="24"
                height="24"
                alt="star icon"
              />
              <p className={styles.text}>5</p>
            </div>
  
            <button className={styles.upvoteButton}>
              Up vote!
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default CoffeeStore;