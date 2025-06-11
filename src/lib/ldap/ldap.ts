import { Client } from 'ldapts';

export default async function LdapConnect  (){
    const serverUrl = process.env.LDAP_IP;
    const bindDN = process.env.BIND_DN;
    const bindPassword = process.env.BIND_CREDENTIALS;

    const client = new Client({
        url: serverUrl
    });


    try {
        await client.bind(bindDN, bindPassword);
        if(client){
            return client;
        }
    } catch (error) {
        console.error('Failed to bind:', error);
        return null;
    }
}