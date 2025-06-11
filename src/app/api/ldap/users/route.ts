import {NextResponse} from 'next/server';
import LdapConnect from '@/lib/ldap/ldap'


export async function GET() {

    try {
        const client = await LdapConnect();

        const {searchEntries, searchReferences} = await client.search(process.env.SEARCH_BASE, {
            scope: 'sub',
            filter: '(objectClass=user)',
            attributes: ['cn', 'mail', 'name', 'sAMAccountName', 'lastLogonTimestamp', 'password'],
            sizeLimit: 5
        });
        console.log('searchEntries', searchEntries);
        console.log('searchReferences', searchReferences);
        await client.unbind();

    } catch (error) {
        console.error('Failed to bind:', error);
    }
}
