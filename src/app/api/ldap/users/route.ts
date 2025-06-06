import {NextApiRequest, NextApiResponse} from 'next';
import {LdapService} from '@/lib/ldap/ldapService';
import {ldapConfig} from '@/config/ldapConfig';


export async function GET(res: NextApiResponse) {
    const ldapService = new LdapService(ldapConfig);

    try {
        await ldapService.connect();
        const users = await ldapService.searchUsers();
        await ldapService.disconnect();

        console.log('LDAP',users);

        // Formatear los resultados
        const formattedUsers = users.map((entry) => ({
            dn: entry.objectName,
            attributes: entry.pojo.attributes.reduce((acc: any, attr) => {
                acc[attr.type] = attr.values.length === 1 ? attr.values[0] : attr.values;
                return acc;
            }, {})
        }));

        return res.status(200).json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "success",
                result: {users: formattedUsers},
            },
        )
    } catch (e) {
        await ldapService.disconnect();
        return res.status(500).json({
            status_name: "error",
            status_code: 500,
            status_message: "Error fetching LDAP users",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Error fetching LDAP users",
        });
    }
}