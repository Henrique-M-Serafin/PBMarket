import { ProductDialog } from "@/components/ProductDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createProduct, deleteProduct, getProductByName, getProducts, updateProduct } from "@/services/productService";
import type { Product } from "@/types/Product";
import { PlusIcon} from "lucide-react"; 
import { useEffect, useState } from "react";

export function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


    useEffect(() => {
        async function loadProducts() {
            const response = await getProducts()
            setProducts(response.data)
    }

    loadProducts()
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (searchTerm.trim() === "") {
            const response = await getProducts();
            setProducts(response.data);
            } else {
            const response = await getProductByName(searchTerm);
            setProducts(response.data);
            }
        };

        fetchProducts();
    }, [searchTerm]);

    async function HandleDeleteProduct(id: string) {
        if (!id) return;

        const confirmed = confirm("Tem certeza que deseja excluir este produto?");
        if (!confirmed) return;

        await deleteProduct(id);
        alert("Produto excluído com sucesso!");
        const response = await getProducts();
        setProducts(response.data);
    }

    async function handleCreateOrUpdateProduct(data: Partial<Omit<Product, "ID">>) {
        try {
            if (isEditing && selectedProduct) {
            await updateProduct(selectedProduct.ID, data);
            } else {
            await createProduct(data);
            }

            // Atualiza a lista após salvar
            const response = await getProducts();
            setProducts(response.data);

            // Fecha o dialog
            setOpen(false);
            setSelectedProduct(null);
            setIsEditing(false);

        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Erro ao salvar produto");
        }
        }


    return (
        <>
        <ProductDialog
            product={selectedProduct}
            isEditing={isEditing}
            isOpen={isOpen}
            setOpen={setOpen}
            onSubmit={handleCreateOrUpdateProduct}
            />
        <main className="flex flex-col justify-center gap-2">
            <div className="flex flex-col gap-2 justify-center items-center">
                <div className="flex gap-2 justify-between w-full   ">
                <h1 className="font-bold text-lg">Lista de produtos cadastrados</h1>
                <Button className=""
                    onClick={() => {
                        setSelectedProduct(null)
                        setIsEditing(false)
                        setOpen(true)
                    }}
                ><p>Cadastrar produto</p><PlusIcon></PlusIcon></Button>
                </div>
                <Field className="">
                    <FieldLabel id="search-input">Buscar produtos</FieldLabel>
                    <Input value={searchTerm} onChange={(e) => {
                        setSearchTerm(e.target.value)}} id="search-input" className="" placeholder="Digite o nome de um produto..."></Input>
                    <FieldDescription>Utilize o campo acima para buscar produtos pelo nome.</FieldDescription>
                </Field>
            </div>
            <div className="flex flex-wrap justify-evenly items-center">
                {products.map(product => (
                <Card key={product.ID} className="m-4 p-4 flex flex-col max-w-sm w-full bg-primary-foreground">
                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription className="line-clamp-3">{product.description}</CardDescription>
                    </CardHeader>
                        
                    <CardContent>
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold">Quantidade: </p>{product.quantity}
                            <p className="font-semibold">Preço: </p>R$ {product.price.toFixed(2)}
                        </div>
                        

                    </CardContent>   
                    <CardFooter className="flex gap-2">
                        <Button onClick={() => {
                            setSelectedProduct(product);
                            setIsEditing(true);
                            setOpen(true);
                        }} className="flex-1" variant="ghost">Editar</Button>
                        <Button onClick={() => {HandleDeleteProduct(product.ID)}} className="flex-1" variant="destructive">Excluir</Button>    
                    </CardFooter> 
                </Card>
                ))}
            </div>
        </main>
         </>
    )
}
