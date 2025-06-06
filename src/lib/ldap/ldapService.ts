import { Client, SearchOptions, SearchEntry } from 'ldapjs';

type LdapConfig = {
    url: string;
    bindDN: string;
    bindCredentials: string;
    searchBase: string;
};

export class LdapService {
    private client: Client;
    private config: LdapConfig;

    constructor(config: LdapConfig) {
        this.config = config;
        this.client = new Client({ url: config.url });
    }

    async connect() {
        await new Promise((resolve, reject) => {
            this.client.bind(this.config.bindDN, this.config.bindCredentials, (err) => {
                if (err) reject(new Error('LDAP bind failed: ' + err.message));
                else resolve(true);
            });
        });
    }

    async disconnect() {
        this.client.unbind();
    }

    async searchUsers(filter: string = '(objectClass=person)'): Promise<SearchEntry[]> {
        return new Promise((resolve, reject) => {
            const users: SearchEntry[] = [];

            const options: SearchOptions = {
                scope: 'sub',
                filter: filter,
                attributes: ['cn', 'uid', 'mail', 'givenName', 'sn'] // Atributos a recuperar
            };

            this.client.search(this.config.searchBase, options, (err, res) => {
                if (err) {
                    reject(new Error('LDAP search failed: ' + err.message));
                    return;
                }

                res.on('searchEntry', (entry) => {
                    users.push(entry);
                });

                res.on('error', (err) => {
                    reject(err);
                });

                res.on('end', () => {
                    resolve(users);
                });
            });
        });
    }
}