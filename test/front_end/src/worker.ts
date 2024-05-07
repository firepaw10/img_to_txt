/* eslint-disable no-restricted-globals */
interface CustomerProps {
    name: string;
    address: string;
    email: string;
}
class Customer {
    name: string;
    address: string;
    email: string;
    constructor (props: CustomerProps) {
        this.name = props.name;
        this.address = props.address;
        this.email = props.email;
    }
}

interface ProductsProps {
    name: string;
    price: number;

}

interface OrderProps {
    customer: Customer;
    products: Product[];
    discount: number;
}
class Product {
    weight: number;
    constructor(weight:number) {
        this.weight = weight; // in lbs
    }
}
class Cologne extends Product {
    name : string;
    price: number;
    constructor(props:ProductsProps) {
        super(3);
        this.name = props.name;
        this.price = props.price;
    }
}
class Order {
    customer: Customer;
    products: Product[];
    constructor(props: OrderProps) {
        this.customer = props.customer;
        this.products = props.products;
    }

    sendFulfillmentInfo() {
        console.log(`${JSON.stringify(this.customer)} is receiving ${JSON.stringify(this.products)}`);
    }

}

self.onmessage = async (message) => {
    sleep(5000)
    var will = new Customer({"name": "Will S.", "address": "R Section, Roh Po", "email": "sayavath@gmail.com"});
    var oneMillionCologne = new Cologne({'name':'One Milliong Cologne', 'price': 99});
    var newPurchase = new Order({'customer': will, 'products': [oneMillionCologne], 'discount':0.15});
    newPurchase.sendFulfillmentInfo();
    self.postMessage("Done!");
}

const sleep = (milliseconds: number) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

const execPyScript = async () => {
    const response = await fetch("http://example.com/movies.json");
    const movies = await response.json();
    return movies;
}

export {}