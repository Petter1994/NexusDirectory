import { NextApiRequest, NextApiResponse } from 'next';
import { LdapService } from '@/lib/ldap/ldapService';
import { ldapConfig } from '@/config/ldapConfig';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const ldapService = new LdapService(ldapConfig);

    try {
        await ldapService.connect();
        const users = await ldapService.searchUsers();
        await ldapService.disconnect();

        // Formatear los resultados
        const formattedUsers = users.map((entry) => ({
            dn: entry.objectName,
            attributes: entry.pojo.attributes.reduce((acc: any, attr) => {
                acc[attr.type] = attr.values.length === 1 ? attr.values[0] : attr.values;
                return acc;
            }, {})
        }));

        return res.status(200).json({ users: formattedUsers });
    } catch (error) {
        await ldapService.disconnect();
        return res.status(500).json({
            message: 'Error fetching LDAP users',
            error: error.message
        });
    }
}