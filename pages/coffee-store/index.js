import { useRouter } from "next/router"
import Link from "next/link"

import coffeeStoresData from '../data/coffee-stores.json'

export function getStaticProps () {

}

const CoffeeStore = () => {
    const route = useRouter();

    return (
        <div>
            Coffee Store Page
            <Link href="/"><a>Back to home</a></Link>
        </div>
    )
}

export default CoffeeStore;