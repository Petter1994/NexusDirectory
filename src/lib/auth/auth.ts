import type { NextAuthOptions } from "next-auth";
const ldap = require("ldapjs")
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"




export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'LDAP',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Configuración del cliente LDAP
                const client = ldap.createClient({
                    url: process.env.LDAP_URL || 'ldap://your-ldap-server:389',
                });

                // DN base para búsqueda de usuarios (ajusta según tu estructura LDAP)
                const baseDN = process.env.LDAP_BASE_DN || 'ou=users,dc=example,dc=com';

                // Filtro para buscar al usuario (ajusta según tu esquema LDAP)
                const searchFilter = `(uid=${credentials.username})`;

                try {
                    // 1. Autenticación del administrador para realizar búsquedas
                    await new Promise((resolve, reject) => {
                        client.bind(
                            process.env.LDAP_BIND_DN ,
                            process.env.LDAP_BIND_PASSWORD ,
                            (err) => err ? reject(err) : resolve()
                        );
                    });

                    let userEntry = null;
                    // 2. Buscar al usuario
                    const userSearch = await new Promise((resolve, reject) => {
                        client.search(baseDN, {
                            scope: 'sub',
                            filter: searchFilter,
                            attributes: ['cn', 'uid', 'mail', 'givenName', 'sn']
                        }, (err, res) => {
                            if (err) return reject(err);


                            res.on('searchEntry', (entry) => {
                                userEntry = entry.object;
                            });

                            res.on('error', (err) => reject(err));
                            res.on('end', () => resolve(userEntry));
                        });
                    });

                    if (!userEntry) {
                        throw new Error('Usuario no encontrado en LDAP');
                    }

                    // 3. Verificar credenciales del usuario
                    await new Promise((resolve, reject) => {
                        client.bind(userEntry.dn, credentials.password, (err) => {
                            if (err) reject(new Error('Credenciales inválidas'));
                            else resolve();
                        });
                    });

                    // 4. Mapear datos LDAP a objeto de usuario para NextAuth
                    return {
                        id: userEntry.uid,
                        name: userEntry.cn || userEntry.givenName + ' ' + userEntry.sn,
                        email: userEntry.mail,
                        // Puedes añadir más campos según necesites
                    };
                } catch (error) {
                    console.error('Error en autenticación LDAP:', error);
                    return null;
                } finally {
                    client.unbind();
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        }
    }
};
