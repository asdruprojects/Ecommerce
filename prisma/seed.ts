import { PrismaClient } from '../generated/prisma';
import { encrypt } from '../src/utils/hash.util';

const prisma = new PrismaClient();

async function main() {
  // Crear permisos
    const permisos = [
        { name: 'Crear producto', key: 'create_product' },
        { name: 'Editar producto', key: 'update_product' },
        { name: 'Eliminar producto', key: 'delete_product' },
        { name: 'Ver todos los productos', key: 'get_all_products' },
        { name: 'Ver todos los pedidos', key: 'get_all_orders' },
        { name: 'Administrar usuarios', key: 'manage_users' },
        { name: 'Crear pedido', key: 'create_order' },
        { name: 'Ver pedidos propios', key: 'get_own_orders' },
    ];
    // Crear o actualizar permisos en la base de datos
    for (const permiso of permisos) {
        await prisma.permission.upsert({
            where: { key: permiso.key },
            update: { name: permiso.name },
            create: permiso,
        });
    }
    // Definir permisos de administrador
    const adminPermisosKeys = permisos
        .filter(p => p.key !== 'create_order' && p.key !== 'get_own_orders')
        .map(p => p.key);
    // Crear roles y asignar permisos
    const rolesData = [
        { name: 'admin', permisosKeys: adminPermisosKeys },
        { name: 'customer', permisosKeys: ['create_order', 'get_own_orders'] },
    ];
    for (const roleData of rolesData) {
        const role = await prisma.role.upsert({
            where: { name: roleData.name },
            update: {},
            create: { name: roleData.name },
        });
        for (const key of roleData.permisosKeys) {
            const permiso = await prisma.permission.findUnique({ where: { key } });
            if (permiso) {
                await prisma.rolePermission.upsert({
                    where: { roleId_permissionId: { roleId: role.id, permissionId: permiso.id, } },
                    update: {},
                    create: { roleId: role.id,permissionId: permiso.id, }
                });
            }
        }
    }
    // 3. Crear usuario administrador por defecto
    const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
    if (!adminRole) throw new Error('Rol admin no encontrado');
    const adminEmail = 'admin@ecommerce.com';
    const adminPassword = 'Admin123*';
    const hashedPassword = await encrypt(adminPassword);
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: { email: adminEmail, name: 'Administrador', password: hashedPassword, roleId: adminRole.id, }
    });
    console.log('Usuario administrador creado o actualizado');
}
main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
