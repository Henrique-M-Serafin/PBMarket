import { DeleteDialog } from "@/components/DeleteDialog";
import { ProductDialog } from "@/components/ProductDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createProduct, deleteProduct, getProductByName, getProducts, updateProduct } from "@/services/productService";
import type { Product } from "@/types/Product";
import { Grid3X3, Pencil, PlusIcon, Rows3, Trash2} from "lucide-react"; 
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [layoutView, setLayoutView] = useState<"grid" | "list">("grid");

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

    function openDeleteDialog(id: string) {
        setProductToDelete(id);
        setDialogOpen(true);
    }

    function switchLayoutView() {
        setLayoutView(prevView => prevView === "grid" ? "list" : "grid");
    }

    async function handleConfirmDelete() {
        if (!productToDelete) return;

        await deleteProduct(productToDelete);
        toast.success("Produto excluído com sucesso!");

        const response = await getProducts();
        setProducts(response.data);

        setDialogOpen(false);
        setProductToDelete(null);
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
            toast.success("Produto salvo com sucesso!");

        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            toast.error("Erro ao salvar produto");
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

        <DeleteDialog 
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={handleConfirmDelete}
        />
        <main className="flex flex-col bg-secondary justify-center gap-2">
            <div className="flex flex-col gap-2 justify-center items-center">
                <div className="flex gap-2 justify-between w-full   ">
                <h1 className="font-bold text-lg">Lista de produtos cadastrados</h1>
                <div className="flex gap-2">
                    <Button onClick={switchLayoutView}> {layoutView === "grid" ? <Grid3X3></Grid3X3> : <Rows3></Rows3>}</Button>
                    <Button className=""
                        onClick={() => {
                            setSelectedProduct(null)
                            setIsEditing(false)
                            setOpen(true)
                        }}
                    ><p>Cadastrar produto</p><PlusIcon></PlusIcon></Button>
                </div>
                </div>
                <Field className="">
                    <FieldLabel id="search-input">Buscar produtos</FieldLabel>
                    <Input value={searchTerm} onChange={(e) => {
                        setSearchTerm(e.target.value)}} id="search-input" className="" placeholder="Digite o nome de um produto..."></Input>
                    <FieldDescription>Utilize o campo acima para buscar produtos pelo nome.</FieldDescription>
                </Field>
            </div>
            <div className={`flex ${layoutView === "grid" ? "flex-wrap justify-between items-center" : "flex-col items-center"} `}>
                {products.map(product => (
                <Card key={product.ID} className={`${layoutView === "grid" ? "m-2 p-4 flex flex-col max-w-sm w-full bg-primary-foreground" : "m-1 p-4 flex flex-col w-full bg-primary-foreground"}`}>
                    <CardHeader className={`${layoutView === "grid" ? "flex flex-col gap-2" : "flex gap-2 justify-between"} `}>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription className="line-clamp-3">{product.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between gap-1">
                            <p className="font-semibold">Quantidade:  {product.quantity}</p>
                            <p className="font-semibold">Preço: {product.price.toFixed(2)} R$</p> 
                        </div>
                        

                    </CardContent>   
                    <CardFooter className={`flex ${layoutView === "grid" ? "flex" : "flex-row justify-center"} gap-2`}>
                        <Button onClick={() => {
                            setSelectedProduct(product);
                            setIsEditing(true);
                            setOpen(true);
                        }} className={`${layoutView === "grid" ? "flex-1" : "w-md "}`}><Pencil/>Editar</Button>
                        <Button onClick={() => {openDeleteDialog(product.ID)}} className={`${layoutView === "grid" ? "flex-1" : "w-md "}`}variant="destructive"><Trash2/>Excluir</Button>    
                    </CardFooter> 
                </Card>
                ))}
            </div>
        </main>
         </>
    )
}
