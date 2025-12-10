/*
  Warnings:

  - You are about to alter the column `roomPrice` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalPrice` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `basePrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomSlug` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceFee` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tourismTax` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "basePrice" INTEGER NOT NULL,
ADD COLUMN     "customerAddress" TEXT,
ADD COLUMN     "customerCity" TEXT,
ADD COLUMN     "customerPostalCode" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "roomSlug" TEXT NOT NULL,
ADD COLUMN     "serviceFee" INTEGER NOT NULL,
ADD COLUMN     "tourismTax" INTEGER NOT NULL,
ADD COLUMN     "xenditInvoiceUrl" TEXT,
ALTER COLUMN "roomPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "Booking_customerEmail_idx" ON "Booking"("customerEmail");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_checkInDate_idx" ON "Booking"("checkInDate");

-- CreateIndex
CREATE INDEX "Booking_createdAt_idx" ON "Booking"("createdAt");
