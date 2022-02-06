import { useRouter } from "next/router";
import Link from "next/link";
import Head from 'next/head'

import coffeeStoresData from '../../data/coffee-stores.json'

export function getStaticProps(staticProps) {
    const params = staticProps.params;
    return {
        props: {
            coffeeStore: coffeeStoresData.find(coffeeStore => {
                return coffeeStore.id.toString() === params.id;
            })
        }
    }
}

//where to get the paths from
export function getStaticPaths() {

    const paths = coffeeStoresData.map(coffeeStore => {
        return {
            params: {
                id: coffeeStore.id.toString()
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
    const { address, name, neighbourhood } = props.coffeeStore
    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
            <p>{address}</p>
            <p>{name}</p>
            <p>{neighbourhood}</p>
        </div>
    )
}

export default CoffeeStore;