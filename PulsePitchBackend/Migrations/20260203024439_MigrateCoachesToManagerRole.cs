using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class MigrateCoachesToManagerRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Update existing PlayerTeam records where user is the coach
            migrationBuilder.Sql(@"
                UPDATE ""PlayerTeams"" pt
                SET ""Role"" = 'Manager'
                FROM ""Teams"" t
                INNER JOIN ""UserProfiles"" up ON up.""IdentityUserId"" = t.""CoachId""
                WHERE pt.""TeamId"" = t.""Id"" AND pt.""PlayerId"" = up.""Id"";
            ");

            // Insert PlayerTeam records for coaches not already in the table
            migrationBuilder.Sql(@"
                INSERT INTO ""PlayerTeams"" (""PlayerId"", ""TeamId"", ""Role"", ""Status"")
                SELECT up.""Id"", t.""Id"", 'Manager', NULL
                FROM ""Teams"" t
                INNER JOIN ""UserProfiles"" up ON up.""IdentityUserId"" = t.""CoachId""
                WHERE NOT EXISTS (
                    SELECT 1 FROM ""PlayerTeams"" pt
                    WHERE pt.""TeamId"" = t.""Id"" AND pt.""PlayerId"" = up.""Id""
                );
            ");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "196a8961-44ce-4b48-ae67-43dc5cd40264", "AQAAAAIAAYagAAAAECrNG7j8N47M32CFmf5kZikkKvDelXaRshqHFD5t9InpJLvgrWVCWiHRQhILv9A/8w==", "5e243045-677c-4dcd-b9b2-9c0d10db4fde" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5f3b8c16-3965-4ada-b2fc-af8c97f9d7c8", "AQAAAAIAAYagAAAAEI1NcTsRXfONWbWU50whThUU4fs6MJ/UGoqAbT3WI9A2D+H4xi5doI1vBdaQS3RYgg==", "36be6807-beb1-4ef8-b9bb-4c806ed34eeb" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cc0afa21-5162-4cfa-92ff-1f3f338a351c", "AQAAAAIAAYagAAAAEEuSN4qL41QaICHnFqPSflk1WpqkQ99/p6HsLvcfA/NCI9nZ5xzHhh+mVxgs07CDbQ==", "ce821300-5373-4a98-a188-b87f233d147a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "495021e7-6a35-451f-9c32-211ae80580ca", "AQAAAAIAAYagAAAAEJs4MINBc3jgVcJIZsnQO4agAzfUmj7SUgMLmBW6yzXmhmsxsth78fhxJdq+QO1yUQ==", "6e487a9c-113f-404a-baf5-34b8cb8549c5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e1c71868-5212-4a63-90d3-0577ffe22bd2", "AQAAAAIAAYagAAAAEGH0lY/a3snYIuT0kowQktaZAyKnvBkC0FX+Aos4lGQQeNJMCowW78yXo7GPWVJ5RQ==", "b67025f9-d1a7-4b6b-a71b-94f4d612b82b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "10b98028-9e99-435b-822c-23e6e1941b6d", "AQAAAAIAAYagAAAAEM6qHz6DaN0lxI3lgST665VU4BeTu/6Zzfq326cK929BoPJHKfTLwruxRd7jApqc/Q==", "cc855040-7bbe-4e7b-9e54-dcde2ee05716" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "739de139-4a31-47f1-ba35-04173e2f97b1", "AQAAAAIAAYagAAAAEAxA9L32DnZ+jFeGpTdr6Gv7nuEGPIgqPOYnEOnj8UeErqFuxmolCzsDy1QinqBOQg==", "24d4ad2b-592e-4860-acb1-011b9d49a45e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "40743dd2-21c4-4766-91ef-edcfe3f52f19", "AQAAAAIAAYagAAAAELwXrsSt7ky+4363H1VsWl5IYzEtpDRbjwi3M1M4mHBbVt9BIHngmTAQvZ/dcVTMBA==", "ac29f2c5-83bd-4756-acc0-3dac1733bdcb" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1d96dd1c-1622-4027-a604-36e0045d02aa", "AQAAAAIAAYagAAAAEBgYESrivP1D//f+GW+LbZop0tSDYqVW5nu2PHfaDxtt19PFHpDZsQu5lufwDU8cAA==", "ebc600ee-fd28-4a9a-b430-05d4d3a7e209" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "88cf8e41-e568-4958-8b9a-22ae4fe27f49", "AQAAAAIAAYagAAAAEJVtw4H87GJiOloyH8T9h0u73O4wAEX86YnG4kZFvr+fbYBWo9aKJdeNTV3V5aACbQ==", "c4135b60-533d-49bc-aef9-493338b26ef9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "74e5c875-de2c-4a3b-9d04-1d8f63eb2053", "AQAAAAIAAYagAAAAEKDYnarNpKdmatidm38e48xhxWWko1MAvI2is6pT3CcG9HKCF+2cg7FsMJcqoKoxxQ==", "63157d4d-af7f-435f-8455-3e21850c6b46" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "62a88f69-6512-4e81-b4cf-655a735665e1", "AQAAAAIAAYagAAAAEADL1FQ2ZLBEFBfOqY+tNdFSQ71Kxr1+XF/gmnIGRnXDJakf7N5drA94Clz2b17sWA==", "23d0f9c7-ab4d-4b13-950a-8830a1bdcc10" });

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 44, 14, 89, DateTimeKind.Utc).AddTicks(4847));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 45, 14, 89, DateTimeKind.Utc).AddTicks(4971));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 44, 14, 89, DateTimeKind.Utc).AddTicks(5032));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 46, 14, 89, DateTimeKind.Utc).AddTicks(5033));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2026, 2, 3, 2, 44, 14, 89, DateTimeKind.Utc).AddTicks(5035));
        }
    }
}
