/*
  Warnings:

  - Added the required column `hours` to the `AppointmentDate` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `day` on the `AppointmentDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `month` on the `AppointmentDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `year` on the `AppointmentDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AppointmentDate" ADD COLUMN     "hours" INTEGER NOT NULL,
DROP COLUMN "day",
ADD COLUMN     "day" INTEGER NOT NULL,
DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;
