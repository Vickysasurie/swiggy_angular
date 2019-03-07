export interface Product {
    id : number;
    name: string;
        img: string;
        category: string;
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
        rating: number;
        lon: number;
        lat: number;
        zoom: number;
        address: string;
        price: number;
        quantity: number;
        available: number;
        providerId: number;
        provider: string;
        tax: number;

}

export interface Order{
     order_id?: number;    
    food_image?: String,
    category?: String,
    rating?: number,
    user_id?: number;
    provider_name?: String;    
    provider_address?:String;    
    provider_id?: number;
    lon?: number;
    lat?: number;
    zoom?: number;
    price?: number;
    quantity?: number;
    delivery_address?: String;
    mobile_number?:number;
    status?: String;
    food_name?: String;        
}