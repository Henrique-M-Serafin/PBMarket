import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/services/productService";
import type { Product } from "@/types/Product";
import { useEffect, useState } from "react";

export function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await getProducts()
            setProducts(response.data)
    }

    loadProducts()
    }, []);


    return (
        <main className="flex flex-wrap justify-center gap-2">
            {products.map(product => (
            <Card key={product.ID} className="m-4 p-4 flex flex-col max-w-sm w-full">
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="line-clamp-3">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    
                </CardContent>    
            </Card>
            ))}
        </main>
    )
}
