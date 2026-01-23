export interface Product {
    ID: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}
