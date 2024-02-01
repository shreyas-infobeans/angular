export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:string,
    password:string
}

export interface product{
    id:string,
    url: string
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    quantity:undefined | number,
    productId:undefined | string,
}

export interface cart{
    id:string | undefined,
    url: string
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    quantity:undefined | number,
    userId:string,
    productId:undefined|string,
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
}