using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCoachIdFromTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoachId",
                table: "Teams");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d7a7491f-436d-4954-9f27-7cee17493839", "AQAAAAIAAYagAAAAEM7o/o7u9AH+3SVdOChtNqV/BHeGIN4ZFckz2urvy/0f3R1HDXHwdZCvgxWVCNXcpw==", "62f1cc30-ad1f-4419-9c0c-81a1d800c7c0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4ca50e2c-7f89-4a64-ba5f-ff17d9506d25", "AQAAAAIAAYagAAAAEHhR+9JwXz21IKc//UT8oZJE/rCd/2LQ935IJHkOGQkPz7QHnVIHNPVUw7BHcHwZ6w==", "2450c32b-46b0-4221-aa39-32f6475e291d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "117390d5-247a-4e83-8b1c-729467d0aac9", "AQAAAAIAAYagAAAAEJHOliyB7H1CNO/D0A0UXzr+FqJKHJ4B1KKU6ngqBKALFoDRsBuWDm/tWnU4LC1lEA==", "741e4879-f24f-4ea6-abdd-f755e25d8d9d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ba3dea3e-9625-4fea-bdc3-a59c923fa9f8", "AQAAAAIAAYagAAAAEK5B9wG9c1rXwPjRdbS7rTYoyVSuWOxU9qbRIYJG1FeYhhkAldZ16zJg2t1dDJ/aBQ==", "2aea9d80-a26b-41d2-b6bc-3c4a07686036" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4989b497-2668-43c4-ac47-37efa66b7785", "AQAAAAIAAYagAAAAECFlNAMh4Z7pt1lBpz4onPeEdTxf+4epQkmu6aGDQEdU5x3/XwfrVEFdYecu5Ny8qw==", "7f77f413-b728-44bc-84e3-8777601495d6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "06c01fd2-3a4b-4601-b83a-6dc44aec5d62", "AQAAAAIAAYagAAAAEBUmDkLBRflcOiJF2HG64oTnOhY6cmWgoN0x7pFY01oz+r8Wn48ghH6fo3W3jOmEuA==", "dece4ae8-9c27-47d4-a7ad-98da10163a9b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5f7081bb-aa8a-4eda-8b44-a0f45e73cdc6", "AQAAAAIAAYagAAAAEKzZjQRTxc4MUYv/Mr5ei9arePHKe7BU925OTkgOwln2CQteG0Z/w7D5dmAeI35UAQ==", "9058d53b-e574-4ba2-89bc-896a8b488d9b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e5541623-c76a-428d-894b-7029457cec62", "AQAAAAIAAYagAAAAEOTrXfdtCVnv7CB3TorTCLdgGHFQ4LBsnKG9wD+QwMCGAdGSWBz7rKch7ZwQsNbnMg==", "bc6f7dda-6070-4c1a-a45e-b9994279e41b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9c2f3e38-c463-4d30-9611-71d088a48464", "AQAAAAIAAYagAAAAEBCO1q+MiBE6Z4/KQlX7Ll4b9Snae9H5o7e6l2fxeBZ2DYoZbM7XXN2NnvOUBt+v+Q==", "26d4f3b9-1b15-47b9-9d51-76e9f05b691d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "df80d428-03ae-42b4-8a5a-6991811f44df", "AQAAAAIAAYagAAAAEM54n/9BlYqdLJMyMeEHMMExYnaADOJflhCmXZUeoJRKZJXDrnLJw0VboATsDvs/ew==", "8f32d667-b914-46cc-a4f2-9542931d8467" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6de166e7-dbda-46e1-b871-1fab1c48891b", "AQAAAAIAAYagAAAAEMIXw/sDoW1bgPLX1NS4DMWTLtGz2DOtbPi1tf78dl9MWe9PZbvwWTALIYutYsmABQ==", "59212cd1-82e2-4a08-bb28-0c0e608dbf89" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d17c587e-3b5f-47b1-9dcb-85196d4b7162", "AQAAAAIAAYagAAAAEPmVc2sMQV0DsS1Jni4r1dcU7HRwFs2k7JVtHMjjZu0w7bbhz3+EfnohHdsGzzEcaA==", "44d4b945-cf6e-4f38-850e-8f08396f85e4" });

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 3, 2, 14, 981, DateTimeKind.Utc).AddTicks(2506));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 3, 3, 14, 981, DateTimeKind.Utc).AddTicks(2721));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 3, 2, 14, 981, DateTimeKind.Utc).AddTicks(2814));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 3, 4, 14, 981, DateTimeKind.Utc).AddTicks(2816));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 3, 2, 14, 981, DateTimeKind.Utc).AddTicks(2820));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoachId",
                table: "Teams",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "856596e3-00c9-414e-8c4e-199018fe078c", "AQAAAAIAAYagAAAAEEGJ3COfbFESk/f4W3zAMQkNPP0UnO8OHy1ypKcFOfC2+z3JGF6jwWU107fRpphMBg==", "a8fdda19-33ef-4dbf-b1e6-03cdd0394d22" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d8494097-d90a-4b63-8930-2614e57aa0ba", "AQAAAAIAAYagAAAAEFbmbFyopnsC6ayzqsrSsGMl6xzTspCXiBI8TSRvxv03irQ4rgs5KSz7nbIzIRk7cw==", "64e8b615-c615-496d-8f2c-7b06284d4b8f" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ff36fc9a-5946-4a9c-8569-0c997958145b", "AQAAAAIAAYagAAAAEJbiDFMn032ndDI9CE7/g82Tw9YNkw5X4Ld8N0AkPuEvpgdap+9pXaqg7OswlVU6yw==", "4572c98a-73a3-467a-9a96-c2efec19be7a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6de924d2-b5d3-4456-a265-ff972cec9e1e", "AQAAAAIAAYagAAAAEP/rcmtM5H/sFJHNDJwt6sjGCHbN/mYha5g4haQ7Hv1hf8tTDqdFUCmbZtyeHZsMbg==", "8867856d-8f8c-4576-afae-74414b4fb0f9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "232a2bb7-0a03-4820-8972-20522417ae39", "AQAAAAIAAYagAAAAEC/0FikyjqDsuwijLdyJEL2QTm20jI1DBCYy2lAU3xxP5xcVHWeQE6eXAqnHseG7OA==", "cb4d1d83-b450-46ca-9379-c0a60350845e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "325cca25-f209-47b8-8e6e-a7899dc6bd91", "AQAAAAIAAYagAAAAEGdpu6xISq9U+k6i40YtkpKQwUDc7HNIu3vvklsfD55Iy1mgJx0gHOfxqtdPExQh/w==", "5445f68e-a107-4b54-b2ef-385bb3cd4d56" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fbc228ae-2548-43f9-a407-7307bbb9dba9", "AQAAAAIAAYagAAAAEMHsTGeUOUoeaZw/E23qvLuaZYjxmmv3gr97yE7vYiz2RJSqvydSVnJybzZ0R0vMog==", "a904394b-3848-4094-91e9-3000b80966e9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3a0c7131-e0e8-473b-b0c2-58826bac6f68", "AQAAAAIAAYagAAAAEHg7EzJh702p17J1Ho/IjSWH02nZsdgnxQxPy9hQa86C++NyqtQAqqdUFeCesrHQHw==", "0a5c5099-f4ca-4307-b305-4e82d7afc6ef" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bee700ba-c85f-45b6-a177-115c77eab647", "AQAAAAIAAYagAAAAECG7DUAQaTQZa3Ap+N44pakdoh+mtu7Fj7Wkh0ekkYxxXrBsdG7XS2XenB875DuijQ==", "dee3cf9a-1fc4-4f39-972d-2666cabb7952" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "608b7001-7502-4bd8-85da-c553c173b820", "AQAAAAIAAYagAAAAEEVAPAiceLqN7ENZyhxaVym9kEClfnEKRi+q1GdJmGOZzxactbTuaA1r9I0j0Ec9jA==", "c747e4cc-09d8-429f-ae88-bd5cc411920a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c57a6c4c-7a04-4aa7-a76f-8e8d31f8a223", "AQAAAAIAAYagAAAAEIcKh5bLMqTmZA5vs+TQHYx8XQoOxxmQXkO1AWDq3b3TQCLaClHjH/5b+mFwkxDUaw==", "c924bdd2-3f00-4bb7-a7c8-1857f4fd9568" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c8ef1118-a20c-4833-9698-7668b81b8edc", "AQAAAAIAAYagAAAAEGL0EvOY5iJ/uCoPEJzBf+m2yqX4AeOWpcmrOPvv/lRs27RmjwtxyyJERutrBG/0DQ==", "77bd8ec0-3682-4ce4-bd2f-432f39c61321" });

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 44, 38, 861, DateTimeKind.Utc).AddTicks(4579));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 45, 38, 861, DateTimeKind.Utc).AddTicks(4705));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 44, 38, 861, DateTimeKind.Utc).AddTicks(4763));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 46, 38, 861, DateTimeKind.Utc).AddTicks(4764));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 44, 38, 861, DateTimeKind.Utc).AddTicks(4766));

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 1,
                column: "CoachId",
                value: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 2,
                column: "CoachId",
                value: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 3,
                column: "CoachId",
                value: "a7d21fac-3b21-454a-a747-075f072d0cf3");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 4,
                column: "CoachId",
                value: "a7d21fac-3b21-454a-a747-075f072d0cf3");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 5,
                column: "CoachId",
                value: "a7d21fac-3b21-454a-a747-075f072d0cf3");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 6,
                column: "CoachId",
                value: "a7d21fac-3b21-454a-a747-075f072d0cf3");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 7,
                column: "CoachId",
                value: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 8,
                column: "CoachId",
                value: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 9,
                column: "CoachId",
                value: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f");

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 10,
                column: "CoachId",
                value: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a");
        }
    }
}
