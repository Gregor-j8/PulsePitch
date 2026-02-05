using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddWalkthroughPlanners : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WalkthroughPlanners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FormationId = table.Column<int>(type: "integer", nullable: false),
                    Duration = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    TimelineData = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WalkthroughPlanners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WalkthroughPlanners_Formations_FormationId",
                        column: x => x.FormationId,
                        principalTable: "Formations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bd9d51f9-2f86-48d2-8387-7c0e85d5d32f", "AQAAAAIAAYagAAAAEBSOe/EIY1lE0uhwZ8VLJy6tJZyhk6j5MVJ3bJwqGJxNjyhtpoRV7piNUMLy1xBjKA==", "99e0542a-287a-4378-9441-c57bb72b3ce7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4c5edbf4-52b2-4cdf-aa08-9d624d23e150", "AQAAAAIAAYagAAAAEAX17ce/Ms4tDkfUVdBIVkASYXtL6kBv1mNc0lEA6F+UAK57u3t3eth/1DbPDhEZ/g==", "181bd088-7b49-4915-8649-978e66b96dfb" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "57825dc7-d521-42be-81ce-a5a0d63ac81b", "AQAAAAIAAYagAAAAECYDjEEzigmbjjf0oTfM+OUMOcmJIew0EB1/LjG8fYVs6EdYrm8Y+UWqv5x2tlSf8w==", "fde72720-7dd2-4761-a781-1d1b2613df56" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f0bc6ca8-895f-4fca-95ff-e3669933d703", "AQAAAAIAAYagAAAAECOKXFSIm3ZQf/myHhzBCxN9ScAsUUABX/6LMbCwfW/drF6eSkgSyhCGaeGmM0TVzA==", "936af3e6-952e-4699-9083-2cdee08de966" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "00a7e8ec-4b87-4fa6-b60c-c37e006124e7", "AQAAAAIAAYagAAAAEDW3daSCITnZQnJCCIhE5/naSb84ucVr/2OVRMp4D/szzTlO4aOq3kaChJlSqqAB6Q==", "98b9ddbf-b72a-4791-aa1e-23efe85dcf47" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e88c9138-d8c6-47f6-aa0f-4d9fdf05c571", "AQAAAAIAAYagAAAAEGnQO3SQf2l4ddAWqrL0R/8X1HXfq2tCVUwKenjYxXWAaswkRO60CT2XpqWSg/fiKQ==", "8439352a-f64a-4e4f-a590-57723ad2ebfa" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "583cafbd-2e0c-443a-b898-d011800b5ef5", "AQAAAAIAAYagAAAAEHg8cgaOEiM93aFhwXWti8lgoUyU9f10AsGK/Va0Pf61Sh1n0qjtd/aY6cu+a0bQog==", "8025d1ca-8af7-45be-881d-41d35a3cc335" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c1a3d87d-07a6-4e6b-b6ef-b4c234b5f07f", "AQAAAAIAAYagAAAAENHLOOopZyRNruHiQEgPfFjBfzfVv8iNwS6f0t74e5R1wM7yFUbyxoUHbdMWsms7sQ==", "1ddb6295-dd97-498e-aabc-6c4647bb5164" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "409e8141-f054-40f5-8004-20b2da093018", "AQAAAAIAAYagAAAAELX3uOl0mhzhC2BxulHAGzCzTQwyQHWYquxpDefQjJdphdg098U6MDCURN6cNgoVnA==", "33ea32de-3468-424d-a585-cc9bdc003407" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "60ba465f-1d65-469b-892b-c97770002b45", "AQAAAAIAAYagAAAAEC2ccyzYGJLHSeCZHIbFodzscApGp69i9RDT0L3AmFf5rStvDc1AcB6pjljfWkxuQw==", "f81798df-635c-485b-89b3-3f1716db0c47" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8db05585-1f16-44aa-b698-9bfa1a830cc2", "AQAAAAIAAYagAAAAEL/sWI9gwkwIGLDz7nmEP0E1u+wqNVoXQiHBMnGrrIq8Re8vmZI1nc/mELneJUur6Q==", "477bc798-c892-4b40-be9f-a4a6604f5f2e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "017c338f-8078-402e-ad89-a95194df5775", "AQAAAAIAAYagAAAAEHncP0oM6tHcGrYue9ziQK3V2CU9IOG0pA4fwcY9+89A5L0G8LWSKVYAyMRM8NCEUw==", "3f730b01-bb6c-427a-85b5-24499fd9c687" });

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2026, 2, 4, 13, 44, 57, 395, DateTimeKind.Utc).AddTicks(7187));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2026, 2, 4, 13, 45, 57, 395, DateTimeKind.Utc).AddTicks(7306));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2026, 2, 4, 13, 44, 57, 395, DateTimeKind.Utc).AddTicks(7353));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2026, 2, 4, 13, 46, 57, 395, DateTimeKind.Utc).AddTicks(7354));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2026, 2, 4, 13, 44, 57, 395, DateTimeKind.Utc).AddTicks(7356));

            migrationBuilder.CreateIndex(
                name: "IX_WalkthroughPlanners_FormationId",
                table: "WalkthroughPlanners",
                column: "FormationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WalkthroughPlanners");

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
    }
}
