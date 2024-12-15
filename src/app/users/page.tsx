'use client'

import { api } from "@/lib/api";
import { useEffect, useState } from "react";


interface User {
    id: number
    name: string
    email: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        api.get<User[]>('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            {
                users.map(user => (
                    <p key={user.id}>{user.name}</p>
                ))
            }
        </div>
    )
}