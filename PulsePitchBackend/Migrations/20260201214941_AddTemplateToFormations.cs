using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddTemplateToFormations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Template",
                table: "Formations",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d03bcdf8-94b2-497e-9e25-e5eb021a4ec9", "AQAAAAIAAYagAAAAEAAu0bGwpircxE+xE74HwNpavO+fHem3fnGMXvMJsLrjW6aeBrsIS0Zp2RbvAEWA4Q==", "5d7c573c-2343-464d-bdfa-11eb8c164764" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d0a8d466-b627-4826-a7fa-01c4e0fee180", "AQAAAAIAAYagAAAAEHEcFv0YKc87EuKokXi5zncAilG8VL7Ha0ew7ujoirVOWTcTKszygvHiXozb0ftNZQ==", "603606a4-daf0-4752-90e3-d18c07c7e9d8" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "18837ecc-9939-4b1d-8b6e-106d1535d3fb", "AQAAAAIAAYagAAAAEHDaPmLIM1w1OZASNY0FKoEO0nvHkwWzn/ik5m6O6IyukC38XyquTOSTJjyC8oasBQ==", "88796809-b930-42c7-97f2-867a9afc02c7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b3abf9b5-cf35-4555-b88f-eda2273da868", "AQAAAAIAAYagAAAAEGs7yjNsBUBw1mYPG1tn0QaGuiQI7NvUpdGRb6jxU+Eb9kObDUXH7a76tVRhEsMplQ==", "96d34c7f-2667-4f30-8187-4ffa17d9c7ec" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bec1e6d7-b05b-4097-bf2d-3571a1674f9d", "AQAAAAIAAYagAAAAEBvCqo1ed96SZUkcZdqGPe7PVLUTAu+ziCuehZStA7QxVwAtNZ2PdE5qnwZ0LADrFQ==", "d7cb2108-926a-4197-9e1f-aa603a45899e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8752a2f1-7954-4fd8-84f9-f7df08b254b0", "AQAAAAIAAYagAAAAEPwLXXl7/qMIpSNM3mbroV/79qdGjZAPuJen8KimtRO0OkOSISPX3fKrmhRx00aNGA==", "4636944f-7dde-4c8f-bc77-33a87b1a4c5d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "854402a4-5f75-4e31-8d65-e740edef56c6", "AQAAAAIAAYagAAAAELBeCTgB3MlkGcPtYQSwIKg4QH4oAfHHC/6fyve5L6k6okz5smcrFLAavqq/fQJg3A==", "1ae29e02-6722-44d9-8931-0132e60ab9d6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "62678883-309d-4aba-b3ab-721844f3be33", "AQAAAAIAAYagAAAAEDmKr5gVgNMzt3bpf5VMJnbBgmXK94xHW8bPbwdawWTc6jAeNVoNiJiZNnK98H7S+w==", "604bde0e-65b3-4874-b408-9a9a656a6300" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "844d697f-acb2-4824-8a9b-27abded2d80d", "AQAAAAIAAYagAAAAEB7RNH+KoIacerZPw71MFx/+RvBPvniqiIVNoOjUb4FRwa9uTrurrN8rwkhqle6cig==", "ef907249-7105-44c5-98c8-629cfe5a3c2d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ad5f72ab-3232-4c21-b023-c20b722b8c80", "AQAAAAIAAYagAAAAEHYf+T2gC8qV8K40YSxH4W8E0MJ8hHuYe6etaHDKLuwgTWr4GIbZvr7o/g8R1Fc/kg==", "3621a8b1-83e6-4342-b78c-fdac7e7aa853" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0c666118-f152-406a-8043-a03f86a55981", "AQAAAAIAAYagAAAAENCjVgwB0XPwrAbqj2kea691M+M40ZHfVRAA1KCMfzo/x/3zFttuOKUZXRvmxdEvRA==", "ae96190b-5f23-44c9-8b48-79ab7243843b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "006d6806-743a-4994-b29b-aff050e4859c", "AQAAAAIAAYagAAAAEPYjP0/ybFrmmvn/da4zPy9ozdYYNwEyrP5pAaOHA5gMm6GebN6wgMw2rEskznk1hA==", "b74b67b4-11f9-477f-b3af-d6de60a23a07" });

            migrationBuilder.UpdateData(
                table: "Formations",
                keyColumn: "Id",
                keyValue: 1,
                column: "Template",
                value: null);

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 21, 49, 39, 901, DateTimeKind.Utc).AddTicks(720));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 21, 50, 39, 901, DateTimeKind.Utc).AddTicks(964));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 21, 49, 39, 901, DateTimeKind.Utc).AddTicks(1054));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 21, 51, 39, 901, DateTimeKind.Utc).AddTicks(1055));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 21, 49, 39, 901, DateTimeKind.Utc).AddTicks(1059));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Template",
                table: "Formations");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "761c8345-e8d2-4c2c-9fce-64753568ae92", "AQAAAAIAAYagAAAAEEwX3R+Msa0Kx8Bq5uc6QMSdhnEkSQTaPWaNVIQayGEzdPzunehxDFt4zVM8es52jA==", "c10c55a2-724b-4489-9ce5-723bfab1bef0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "30e2073b-51ad-462d-b07f-b1037dd2389c", "AQAAAAIAAYagAAAAEAtYeqvMChJe9WMpQAvLyUMl825+CuHC5rXaKTKpFobMTpVqrK5pHammRdBDakwmdw==", "83ad2e13-d018-4d4d-951b-ca13a05680f2" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fbc8bcf8-ac10-49fb-9f63-3de75793f157", "AQAAAAIAAYagAAAAEM866xd2KtARR9s6pgLcCOKrN2AjTnCoXSQwLUJgyOeS4nNsqNBuJPLDiBB5TEcEkQ==", "03bd7a03-3c0a-4046-9a42-6731267a8d26" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "eb4e0804-3e8d-4716-a693-793daa8de928", "AQAAAAIAAYagAAAAENaJB5Fq5SyeqAg/1dI3v/+Lm9MN+5pHNZFHkgA+fixV116fQdyJJFIIMd0VMAQsjQ==", "bd9700bb-6dbe-476c-9640-4dbc5d69f58a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "50788504-4e64-4e4b-a54d-a2cc9793eef0", "AQAAAAIAAYagAAAAEC1mP00yVwllYX+yFz5l7Fp69vmU0FmiGj3XJ6XQZmxtTawM7wNSr4XKZ6jEmy4Q9w==", "9e62bb3e-ad71-46f2-acff-f0ff04bda34a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3f31c3ca-b003-4104-96f0-c07d2844ee0d", "AQAAAAIAAYagAAAAEASB5peZ+CW+e8PSEqPhhojI4UkZq4bI9aNmgNKA1w9Q53qqgvGtIi+0rN57L08yFA==", "59f2a3d3-129f-4b98-ad91-34ac5fb68bab" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e597f83e-2247-4118-956a-c629a2639929", "AQAAAAIAAYagAAAAECAZw78qyUaWGs+xDPgp/SdL31Fi0kST/REBUCg0dETiNOyzB36brfYQlVoi02r7Qg==", "a19ff5b5-8a8a-4c6b-8c2a-c771446734e6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7745ae1b-c848-4089-afe3-239b6a585591", "AQAAAAIAAYagAAAAEJ+Islxa0EveeOdQesz/yEtXsYYruE9uWzu5ayE612rzrHf5qD62WBAXyfMSmuGaeQ==", "34a063e9-4b34-4211-a336-d18945f48826" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4bd1b657-f4a9-4881-a0a9-f4c74713826f", "AQAAAAIAAYagAAAAEHEzD0+A5zM0j+YPosPZ8ADmDLVoHj0fW/9M3t9d3keUGEZ8Djl9v8SrRpQ/uxBqsQ==", "8876619e-3b2c-4e77-9151-87fa20d0e343" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ece37b1f-1d20-4f69-a2e5-f792833e6c1a", "AQAAAAIAAYagAAAAEHgWDmvXWpdrGWw8FBiBr3JCyshFCbhx6hly30Y5fJ7+geaB/DXMr9YDSatMIVigKw==", "3526d1cd-ebaa-4eca-bd3a-9f3235397821" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2cf61180-97a5-4e3c-bf1d-4f00b04e17b8", "AQAAAAIAAYagAAAAENIE0tcIjxdCXOXbwftpCX6gEhjKFQRVBbkPTemacvG7mj1wckxjOsOVVZ/nmKP2tA==", "90143981-1de5-4713-8be3-a26918e6af7e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "efcd7324-ad10-4d9e-b980-86b4bd9d26d5", "AQAAAAIAAYagAAAAEAd+MWuXQV30zYzQN3mPc94eQBb+/rpj4nrnS3FQTSpnqcB+x1MywGYuKqci5RvpTw==", "c85fcad8-4165-47db-b5eb-fcae47fd8a42" });

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 57, 51, 976, DateTimeKind.Utc).AddTicks(2359));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 58, 51, 976, DateTimeKind.Utc).AddTicks(2566));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 57, 51, 976, DateTimeKind.Utc).AddTicks(2634));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 59, 51, 976, DateTimeKind.Utc).AddTicks(2636));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 57, 51, 976, DateTimeKind.Utc).AddTicks(2638));
        }
    }
}
