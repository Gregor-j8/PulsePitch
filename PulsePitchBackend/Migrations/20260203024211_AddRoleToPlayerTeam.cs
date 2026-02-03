using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleToPlayerTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "PlayerTeams",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "Player");

            // Add check constraint for valid roles
            migrationBuilder.Sql(
                @"ALTER TABLE ""PlayerTeams""
                  ADD CONSTRAINT ""CK_PlayerTeams_Role""
                  CHECK (""Role"" IN ('Manager', 'Coach', 'Player'))");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2b787d37-1117-48f7-8cb5-086463a04430", "AQAAAAIAAYagAAAAEMHRYvlxhq4gBgqjbOLlmVRwXsNHTETNpTo3Yy6Uvi3S7eEK1yjqwXahepATUzq8LA==", "f3e618e9-6008-4529-a72e-0d9402d71758" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d8bcd4c1-a286-4687-9460-5d14124b1d58", "AQAAAAIAAYagAAAAEBroaSVMX14vsEnGvrWKH+N/FsyO8GxUrD3GZhf+pTq2NpEmcDVFVH9ln6C2KpycKQ==", "b87fbc12-4604-4105-b101-ec79bcb0a5c7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4acda210-6e70-4111-a2e1-a859daf32102", "AQAAAAIAAYagAAAAEAthW6AgY/Ewg9Ku2G61E9BvQ4akiHI1OeQNwa1x7BNBMmMmG8Nx2Vd/b9qFHZPvWg==", "68110b91-7f43-4dec-9dd4-ded388174d45" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7ebe52f6-1a98-4454-a928-18005b618d05", "AQAAAAIAAYagAAAAEFhRxGjivbNT3NURvVx1gMEj4SqSobSk79g6jyowkbTmZehCkx4GtbT7JVFJkwOx1w==", "ff1d3704-e388-4245-ab18-a70e4cde619d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "08afefc4-a914-48f6-874c-35f6b4e92850", "AQAAAAIAAYagAAAAEFYmq3YlWVJGjUSBT5E3hooN1BEYkUbh9ddWIDimpQ5ajKOmJWqmksfkALjwEMSGxQ==", "a487808b-99b3-4a31-b463-5a3d69853604" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a6ca52a1-5760-40d9-8266-63c0e7526bf2", "AQAAAAIAAYagAAAAECGZDZT+00ybBDtNoHs2FlBUke59437J+nmO9zZrdOCs//KYoq/4HtKZInyywqcIWQ==", "78c48a30-4b0a-437f-9527-441df84f3646" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2b357cda-b4c4-4330-b6c6-152a48c337e6", "AQAAAAIAAYagAAAAEJeYKjtEIn8IdAQwa8rPQs9thT4gSQ2MUtJcca//OH79ROlDa9i5EDT6xl+fUCIktA==", "35e27b23-aefe-4f93-9dce-4159636d3498" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6228d3c4-af3d-4d9d-82b2-fe390ee74cec", "AQAAAAIAAYagAAAAEOu3UKXVGoeVejW6FRAMAyAKs8TWnhU9BWHJkcrtU16FiVwb1dDSG8iAXpeLC4ne1A==", "0597ecc6-122b-48b7-a9a1-d69e9eb16cff" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "069577b5-6cb4-458e-94bf-ee5b23ab64ba", "AQAAAAIAAYagAAAAEMyc+sE5mU17U2KEpb/HmCG6joBRsgfdMXqi0mQv2t4PJ0aZiOHUCmxI1fDJ5Is4wg==", "d90b6062-3353-4d04-a480-28a4a27bba4b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ede025a4-10d2-4b75-aa3c-0265972de574", "AQAAAAIAAYagAAAAEIAaP++Irvcsu3j7SscIW2YAR9I/bZL+DTu3ulA0WN3pWMvpz8qHCXO0LoL/9oxHAQ==", "8a22b18d-534e-480b-9788-6e6cd538d6ed" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "51a97cec-415a-4d10-bf47-2edb3dcf322b", "AQAAAAIAAYagAAAAEFIBNq7rLpbkLM3Etj/YqXiIEJgagxe99/aL/McJVSlhpANm6sf3Af6+YplORqqwtg==", "52bfb25a-0736-404c-a6e3-d82d5e9cfd24" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "49266bb9-50e9-4596-a5e1-e4efa79a649e", "AQAAAAIAAYagAAAAENiAgBD2TGgq2kup9Ph3Fn4SJZC4qWH1hK29zjE/LwNZa0wq8ehTY2JFUjLHgNjg8Q==", "4abacb6c-9814-442c-bc83-2b18ef7281f2" });

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 42, 9, 926, DateTimeKind.Utc).AddTicks(5774));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 43, 9, 926, DateTimeKind.Utc).AddTicks(6016));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 42, 9, 926, DateTimeKind.Utc).AddTicks(6110));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 44, 9, 926, DateTimeKind.Utc).AddTicks(6112));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 42, 9, 926, DateTimeKind.Utc).AddTicks(6116));

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 1,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 2,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 4,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 5,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 6,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 7,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 8,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 9,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 10,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 11,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 12,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 14,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 16,
                column: "Role",
                value: "Player");

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 17,
                column: "Role",
                value: "Player");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop check constraint
            migrationBuilder.Sql(@"ALTER TABLE ""PlayerTeams"" DROP CONSTRAINT IF EXISTS ""CK_PlayerTeams_Role""");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "PlayerTeams");

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
    }
}
