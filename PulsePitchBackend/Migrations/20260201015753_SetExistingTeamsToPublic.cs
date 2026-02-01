using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class SetExistingTeamsToPublic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "11314fae-75b4-4ff9-a7b8-a8e30db3ee99", "AQAAAAIAAYagAAAAEJZkdb+JN+UDqRFpJRjmBFzzN20cIiy6wQFL3RZyoVgsfRBkmbmmcuvfu9hWaSQf/g==", "7e43c9fd-8913-457e-aff6-01f08c20e490" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6b63f3ba-5e6b-4e85-8021-894deb22f2d2", "AQAAAAIAAYagAAAAELCeHxQUAgmYV51o2+AZYz36zvdSgKw+Rr7mT0Q+i955k0PFJKrG39VL7/8dW3jjZA==", "e0207b01-1d4c-4178-9cd6-f36317ae8f9b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e0ee0275-bd95-4df8-ad11-d8ddac2add85", "AQAAAAIAAYagAAAAEPY4VWc6Xft8hQlLQvIZf3Y+tzEQ9H78YkcOzmhdNvshlaKaNijK2Ji+8uWFnuZ4ig==", "0e27bc78-46d6-40bd-8199-f72c1062440d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b37446b0-fe37-4a26-b400-9d496929a53e", "AQAAAAIAAYagAAAAEILpfQFBBuObfVP/GHYArAUIM49RfO069YfOHtD91mVSyBEcA+LDDh1NKj0ozBD4hw==", "ffe25428-890b-4aa3-839a-98584e473185" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e0f96984-173a-4c58-9bfc-2ce608fef9ea", "AQAAAAIAAYagAAAAEIQ4Hb84MNiJX6K+Pv5DRoaBF6l/XykjG9P+APG7LPsQdxh0LBQWcgblUUCPUJOSew==", "2587e05c-d075-47bc-af05-244633e9b6c0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3805d1a8-6902-4a96-9993-72d6fd05b02f", "AQAAAAIAAYagAAAAEMfv15xMzPx0DpLeP4ItEdylHOfob3hxYoaECqwHjN/b7lp7KhPDJId3OSXwH5w9zA==", "418bfd8f-06a1-4673-9dd6-0958868885b4" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "231fa195-8e2a-4c68-abbb-c5838bd6ce40", "AQAAAAIAAYagAAAAEJO6qvf/OC2vzeFKrZV45JMEINXO3J+LjxNlii3HJX4l7V7ZaGvPZctXpkTbnBdYGA==", "738b24d5-55cf-4bb1-805d-145277c33f5d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6264756f-e16d-4dfc-9441-d5dc73fc0036", "AQAAAAIAAYagAAAAEJpi6SnvPfsusFuM6UA52sumkgzpH+DVuST2gON31iICWQ2/LHB5a5s2Uh6/MNCccg==", "2fbcf049-65cb-4d7a-b13d-5959196cb746" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f86e96f0-49fe-4e92-b3ba-237512dd1bf6", "AQAAAAIAAYagAAAAEAoSzmXP2obY+i4RKkefTUFp/VwQ4RVkxIvb9C/ZK9W1Scw3Rcouj58NTmbyLVAraA==", "9e1f9928-dcd8-466b-8e88-d667d51de3f6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2e6cd818-3ad1-4c5c-91bd-0f28dc09604e", "AQAAAAIAAYagAAAAEBz13NiAJB6DOXJEsKmg67kbtxzyzqGFQpFmN2dIYQeOUnBk0mvQzxw5ZhUpdaKCiA==", "a662e6c5-47e2-4761-9b14-362a265eca23" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7f5e70e7-ada5-4882-9e7f-778a95539d22", "AQAAAAIAAYagAAAAEOnQhhzbuHds2MsH2oT+hu3CuVAqmpQ++FxhfMnxMv958dP+eTlnOXqFRjD/ks15Rg==", "1a8f6b2d-a45b-4724-abdd-9b1dc1d16b96" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9f4283bc-38c9-4333-99ae-6a27d84ff680", "AQAAAAIAAYagAAAAEJtPkDdxbIBm/Z5gO8Ed6GB/isMfltfR8W+JTvvIN8M2JyYZEHIhFMHguluMJa6/7g==", "bebd033b-ed37-4266-9047-bf652a2a4d90" });

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 56, 56, 4, DateTimeKind.Utc).AddTicks(3580));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 57, 56, 4, DateTimeKind.Utc).AddTicks(3739));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 56, 56, 4, DateTimeKind.Utc).AddTicks(3811));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 58, 56, 4, DateTimeKind.Utc).AddTicks(3813));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2026, 2, 1, 1, 56, 56, 4, DateTimeKind.Utc).AddTicks(3816));
        }
    }
}
