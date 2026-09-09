import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LabelsModule } from './modules/labels/labels.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReturnsModule } from './modules/returns/returns.module';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
    LabelsModule,
    InventoryModule,
    PaymentsModule,
    ReturnsModule,
  ],
})
export class AppModule {}
