import { Client } from 'ldapts';


const client = new Client({
    url: 'ldap://HNSWDC2.transtur.net:389',
    timeout: 0,
    connectTimeout: 0,
    tlsOptions: {
        minVersion: 'TLSv1.2',
    },
    strictDN: true,
});