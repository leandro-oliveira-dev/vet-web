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

interface User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState({
        id: 0, // Adicionado para edição
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
    });
    const [isEditing, setIsEditing] = useState(false); // Indica se é edição ou criação

    useEffect(() => {
        api.get<User[]>("/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateOrUpdateUser = async () => {
        try {
            if (isEditing) {
                // Atualizar usuário existente
                const response = await api.put<{ message: string; updatedUser: User }>(
                    `/users/${formData.id}`,
                    formData
                );
                alert("Usuário atualizado com sucesso!");
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === response.data.updatedUser.id ? response.data.updatedUser : user
                    )
                );
            } else {
                // Criar novo usuário
                const response = await api.post<{ message: string; newUser: User }>("/users", formData);
                alert("Usuário criado com sucesso!");
                setUsers((prevUsers) => [...prevUsers, response.data.newUser]);
            }

            setFormData({ id: 0, name: "", email: "", phoneNumber: "", address: "" });
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar o usuário.");
        }
    };

    const handleEditClick = (user: User) => {
        setFormData(user);
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
                                    setFormData({ id: 0, name: "", email: "", phoneNumber: "", address: "" });
                                    setIsEditing(false);
                                }}
                            >
                                NEW
                            </Button>
                        </DialogTrigger>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>PhoneNumber</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell className="font-medium">{user.phoneNumber}</TableCell>
                                        <TableCell className="font-medium">{user.address}</TableCell>
                                        <TableCell className="font-medium">
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleEditClick(user)}
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
                            Preencha os campos abaixo para {isEditing ? "editar" : "criar"} o usuário.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
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
                                PhoneNumber
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreateOrUpdateUser}>
                            {isEditing ? "Update" : "Save"} Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
