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
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

    useEffect(() => {
        api.get<User[]>("/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateUser = async () => {
        try {
            const response = await api.post<{ message: string; newUser: User }>("/users", formData);
            console.log(response.data);
            alert("Usuário criado com sucesso!");

            // Atualiza a lista de usuários com o novo usuário
            setUsers((prevUsers) => [...prevUsers, response.data.newUser]);
        } catch (error) {
            console.error(error);
            alert("Erro ao criar o usuário.");
        }
    };

    return (
        <>
            <Dialog>
                <div className="p-8">
                    <h1 className="mb-4 text-2xl">Users</h1>
                    <div className="flex flex-col">
                        <DialogTrigger asChild>
                            <Button size="sm" className="flex-1 self-end">
                                NEW
                            </Button>
                        </DialogTrigger>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>email</TableHead>
                                    <TableHead>name</TableHead>
                                    <TableHead>phoneNumber</TableHead>
                                    <TableHead>address</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell className="font-medium">{user.phoneNumber}</TableCell>
                                        <TableCell className="font-medium">{user.address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create User</DialogTitle>
                        <DialogDescription>Preencha os campos abaixo para adicionar um novo usuário.</DialogDescription>
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
                        <Button type="submit" onClick={handleCreateUser}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
