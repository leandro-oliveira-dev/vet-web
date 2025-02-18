'use client';

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



interface Pet {

    id: number;
    name: string;
    breed: string;
    age: number;
    clientId: number;

}

export default function PetsPage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [formData, setFormData] = useState({
        id: 0, // Adicionado para edição
        name: "",
        breed: "",
        age: 0,
        clientId: 0,

    });

    const [isEditing, setIsEditing] = useState(false); // Indica se é edição ou criação

    useEffect(() => {
        api.get<Pet[]>("/pets")
            .then((response) => setPets(response.data))
            .catch((error) => console.log(error));

    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleCreateOrUpdatePet = async () => {
        try {
            if (isEditing) {
                // Atualizar pet existente
                const response = await api.put<{ message: string; updatedPet: Pet }>(
                    `/pets/${formData.id}`,
                    formData
                );

                alert("Pet atualizado com sucesso!");

                setPets((prevPets) =>
                    prevPets.map((pet) =>
                        pet.id === response.data.updatedPet.id ? response.data.updatedPet : pet
                    )
                );

            } else {
                // Criar novo pet
                const response = await api.post<{ message: string; newPet: Pet }>("/pets", formData);
                alert("Pet criado com sucesso!");
                setPets((prevPets) => [...prevPets, response.data.newPet]);
            }

            setFormData({ id: 0, name: "", breed: "", age: 0, clientId: 0 });
            setIsEditing(false);

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar o pet.");
        }
    };

    const handleEditClick = (pet: Pet) => {
        setFormData(pet);
        setIsEditing(true);
    };

    return (
        <>
            <Dialog>
                <div className="p-8">
                    <h1 className="mb-4 text-2xl">Users</h1>
                    <div className="flex flex-col">
                        <DialogTrigger asChild>
                            <Button
                                size="sm"
                                className="flex-1 self-end"
                                onClick={() => {
                                    setFormData({ id: 0, name: "", breed: "", age: 0, clientId: 0 });
                                    setIsEditing(false);
                                }}
                            >
                                NEW
                            </Button>
                        </DialogTrigger>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Breed</TableHead>
                                    <TableHead>Age</TableHead>
                                    <TableHead>ClientId</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pets.map((pet) => (
                                    <TableRow key={pet.id}>
                                        <TableCell className="font-medium">{pet.age}</TableCell>
                                        <TableCell className="font-medium">{pet.name}</TableCell>
                                        <TableCell className="font-medium">{pet.breed}</TableCell>
                                        <TableCell className="font-medium">{pet.clientId}</TableCell>
                                        <TableCell className="font-medium">
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleEditClick(pet)}
                                                >
                                                    EDIT
                                                </Button>
                                            </DialogTrigger>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit User" : "Create User"}</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para {isEditing ? "editar" : "criar"} o pet.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                AGE
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phoneNumber" className="text-right">
                                Breed
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.breed}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Cliente
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.clientId}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreateOrUpdatePet}>
                            {isEditing ? "Update" : "Save"} Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )

}