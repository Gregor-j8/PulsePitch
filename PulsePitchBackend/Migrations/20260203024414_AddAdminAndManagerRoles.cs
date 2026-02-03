using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminAndManagerRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6", null, "Admin", "ADMIN" },
                    { "b2c3d4e5-f6g7-48h9-i0j1-k2l3m4n5o6p7", null, "Manager", "MANAGER" }
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b2c3d4e5-f6g7-48h9-i0j1-k2l3m4n5o6p7");

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
        }
    }
}
