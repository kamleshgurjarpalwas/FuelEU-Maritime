/*
  Warnings:

  - Added the required column `distance_km` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel_consumption_t` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel_type` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_emissions_t` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vessel_type` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "distance_km" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fuel_consumption_t" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fuel_type" TEXT NOT NULL,
ADD COLUMN     "total_emissions_t" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vessel_type" TEXT NOT NULL;
