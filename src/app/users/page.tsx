'use client'
import { useState, useEffect } from 'react';

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/ldap/users');
                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>LDAP Users</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <strong>{user.attributes.cn}</strong> ({user.attributes.uid})
                        <br />
                        Email: {user.attributes.mail}
                    </li>
                ))}
            </ul>
        </div>
    );
}