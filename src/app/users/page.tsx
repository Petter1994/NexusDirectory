'use client'
import { useEffect, useState } from 'react';


export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/ldap/users')
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error('Error:', err));
    }, []);



    return (
        <div>
            {/*<h1>Usuarios LDAP</h1>*/}
            {/*<ul>*/}
            {/*    {users.map((user, index) => (*/}
            {/*        <li key={index}>*/}
            {/*            {user.cn} - {user.mail}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
}