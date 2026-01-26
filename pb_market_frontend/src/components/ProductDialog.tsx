import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import type { Product } from "@/types/Product";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";

interface ProductDialogProps {
    product: Product | null;
    isEditing?: boolean;
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: Partial<Omit<Product, "ID">>) => void;
}



export function ProductDialog({ product, isEditing = false, isOpen, setOpen, onSubmit }: ProductDialogProps) {
    const [formData, setFormData] = useState<Partial<Omit<Product, "ID">>>({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
    });
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
            });
        } else {
            setFormData({
                name: "",
                description: "",
                price: 0,
                quantity: 0,
            });
        }
    }, [product, isOpen]);

    function handleSubmit() {
        onSubmit(formData);
    }


     return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar" : "Cadastrar"} Produto
          </DialogTitle>
          <DialogDescription>
            Formulário de {isEditing ? "edição" : "cadastro"} de produto
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-name">Nome</Label>
          <Input
            id="product-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Label htmlFor="product-description">Descrição</Label>
          <Input
            id="product-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Label htmlFor="product-price">Preço</Label>
          <Input
            id="product-price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />

          <Label htmlFor="product-quantity">Quantidade</Label>
          <Input
            id="product-quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {isEditing ? "Salvar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

}