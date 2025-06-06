export const ldapConfig = {
    url: 'ldap://your-ldap-server.com:389', // Usa ldaps:// para conexión segura
    bindDN: 'cn=admin,dc=yourdomain,dc=com',
    bindCredentials: 'your_admin_password',
    searchBase: 'ou=users,dc=yourdomain,dc=com'
};