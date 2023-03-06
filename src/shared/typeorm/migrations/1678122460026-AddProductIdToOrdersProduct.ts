import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductIdToOrdersProduct1678122460026 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orders_products', new TableColumn({
            name: 'product_id',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('orders_products', 
            new TableForeignKey({
                name: 'OrdersProductsProducts',
                columnNames:['product_id'],
                referencedTableName : 'products',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_products', 
        'OrdersProductsProducts');
        await queryRunner.dropColumn('orders_products', 'product_id');
    }

}
