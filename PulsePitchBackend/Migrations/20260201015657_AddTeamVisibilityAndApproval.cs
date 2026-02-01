using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddTeamVisibilityAndApproval : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Teams",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RequiresApproval",
                table: "Teams",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestedAt",
                table: "PlayerTeams",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RespondedAt",
                table: "PlayerTeams",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "PlayerTeams",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "11314fae-75b4-4ff9-a7b8-a8e30db3ee99", "bob@williams.com", "AQAAAAIAAYagAAAAEJZkdb+JN+UDqRFpJRjmBFzzN20cIiy6wQFL3RZyoVgsfRBkmbmmcuvfu9hWaSQf/g==", "7e43c9fd-8913-457e-aff6-01f08c20e490" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6b63f3ba-5e6b-4e85-8021-894deb22f2d2", "jane@smith.com", "AQAAAAIAAYagAAAAELCeHxQUAgmYV51o2+AZYz36zvdSgKw+Rr7mT0Q+i955k0PFJKrG39VL7/8dW3jjZA==", "e0207b01-1d4c-4178-9cd6-f36317ae8f9b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e0ee0275-bd95-4df8-ad11-d8ddac2add85", "alice@johnson.com", "AQAAAAIAAYagAAAAEPY4VWc6Xft8hQlLQvIZf3Y+tzEQ9H78YkcOzmhdNvshlaKaNijK2Ji+8uWFnuZ4ig==", "0e27bc78-46d6-40bd-8199-f72c1062440d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b37446b0-fe37-4a26-b400-9d496929a53e", "Eve@Davis.com", "AQAAAAIAAYagAAAAEILpfQFBBuObfVP/GHYArAUIM49RfO069YfOHtD91mVSyBEcA+LDDh1NKj0ozBD4hw==", "ffe25428-890b-4aa3-839a-98584e473185" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e0f96984-173a-4c58-9bfc-2ce608fef9ea", "john@doe.com", "AQAAAAIAAYagAAAAEIQ4Hb84MNiJX6K+Pv5DRoaBF6l/XykjG9P+APG7LPsQdxh0LBQWcgblUUCPUJOSew==", "2587e05c-d075-47bc-af05-244633e9b6c0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3805d1a8-6902-4a96-9993-72d6fd05b02f", "admin@strator.com", "AQAAAAIAAYagAAAAEMfv15xMzPx0DpLeP4ItEdylHOfob3hxYoaECqwHjN/b7lp7KhPDJId3OSXwH5w9zA==", "418bfd8f-06a1-4673-9dd6-0958868885b4" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "231fa195-8e2a-4c68-abbb-c5838bd6ce40", "david@brown.com", "AQAAAAIAAYagAAAAEJO6qvf/OC2vzeFKrZV45JMEINXO3J+LjxNlii3HJX4l7V7ZaGvPZctXpkTbnBdYGA==", "738b24d5-55cf-4bb1-805d-145277c33f5d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6264756f-e16d-4dfc-9441-d5dc73fc0036", "olivia@taylor.com", "AQAAAAIAAYagAAAAEJpi6SnvPfsusFuM6UA52sumkgzpH+DVuST2gON31iICWQ2/LHB5a5s2Uh6/MNCccg==", "2fbcf049-65cb-4d7a-b13d-5959196cb746" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f86e96f0-49fe-4e92-b3ba-237512dd1bf6", "james@wilson.com", "AQAAAAIAAYagAAAAEAoSzmXP2obY+i4RKkefTUFp/VwQ4RVkxIvb9C/ZK9W1Scw3Rcouj58NTmbyLVAraA==", "9e1f9928-dcd8-466b-8e88-d667d51de3f6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2e6cd818-3ad1-4c5c-91bd-0f28dc09604e", "sophia@moore.com", "AQAAAAIAAYagAAAAEBz13NiAJB6DOXJEsKmg67kbtxzyzqGFQpFmN2dIYQeOUnBk0mvQzxw5ZhUpdaKCiA==", "a662e6c5-47e2-4761-9b14-362a265eca23" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7f5e70e7-ada5-4882-9e7f-778a95539d22", "william@anderson.com", "AQAAAAIAAYagAAAAEOnQhhzbuHds2MsH2oT+hu3CuVAqmpQ++FxhfMnxMv958dP+eTlnOXqFRjD/ks15Rg==", "1a8f6b2d-a45b-4724-abdd-9b1dc1d16b96" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9f4283bc-38c9-4333-99ae-6a27d84ff680", "mia@thomas.com", "AQAAAAIAAYagAAAAEJtPkDdxbIBm/Z5gO8Ed6GB/isMfltfR8W+JTvvIN8M2JyYZEHIhFMHguluMJa6/7g==", "bebd033b-ed37-4266-9047-bf652a2a4d90" });

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

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "PlayerTeams",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "RequestedAt", "RespondedAt", "Status" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "IsPublic", "RequiresApproval" },
                values: new object[] { false, false });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "RequiresApproval",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "RequestedAt",
                table: "PlayerTeams");

            migrationBuilder.DropColumn(
                name: "RespondedAt",
                table: "PlayerTeams");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "PlayerTeams");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cceab545-a4f7-4f31-8b78-c6ea2fa072e6", "bob@williams.comx", "AQAAAAIAAYagAAAAEMx8kI4erY8kODbI7lCmKZmHdZR6aYaEM8fzFbR9uNgqUvop+7lKSSpPKh6NhUuSPA==", "ee2425d4-f548-484f-a700-b8d0481a42ad" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ae1a6312-9a9e-4bd1-9c53-11c9943281e6", "jane@smith.comx", "AQAAAAIAAYagAAAAEKY7qiS45HvHirJonRdPSIkenhN3NqhxBnyx5Ayxco+g2jHoOfc1MDhw84i1i6oPAg==", "1ca2fa93-c4fc-47b2-a812-670d914722e1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "94a29486-fba6-4fe7-b5bc-4b49c8976152", "alice@johnson.comx", "AQAAAAIAAYagAAAAEJqX+colBbeUDbHsX6CP1V09vB3u+Jnb1tuo+Q5e+hplfs9NBf4ms4ARMocRzvxLmQ==", "3dbe54d3-d995-4c10-a00e-e6e7dc43aadf" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "aad06858-404a-4549-a66c-70fb7424ad3f", "Eve@Davis.comx", "AQAAAAIAAYagAAAAEGuu5KTkef6IMNolsREoBF5XNdAJ1esJ3LzZRi0ogjrmk3c6MEZaZ8sElgV2DfmK+w==", "5cbde0ec-8ef4-4161-8c6b-840851568704" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1d7ef48f-5871-4294-9611-b2d8b888539e", "john@doe.comx", "AQAAAAIAAYagAAAAEH44t1LnPfv3Pbf7a4Wv7o7nNrsEAeF4we2c7f52p+R40juINkzuNOG7McDKZcMrBg==", "8848d01c-630e-44f8-b38f-b6a741d582f1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9bc64793-0279-45ed-b029-16683809972c", "admina@strator.comx", "AQAAAAIAAYagAAAAEObraD+tHu7GKiJ4b6f32SbARkmCdF1GiS0SdmYVh72n+3YdVtxFjNh6EkExz7ZojA==", "83c84709-5690-4e37-96c0-93c65438c08c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "05269dc4-ed5a-4f1d-8102-d80b5567a633", "david@brown.comx", "AQAAAAIAAYagAAAAEDhzlXWvRW93q+X74qQNfkG3r+ZHIfaBLYepsMqnU82axGb58WDZkH3Mk+6HnzCfbQ==", "2e98093a-2e1b-4227-9ba5-e1845e9a8b42" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c6a9f715-7582-4c56-a171-57e588d7674c", "olivia@taylor.comx", "AQAAAAIAAYagAAAAEKT1SfsqM8csjfm7uGlQCBrdtKXr6H6hQzJJPzLOrS30uTZx/Tzu4p81E7ttbGCnKg==", "7bd642fc-cafd-4b02-a90e-9523185bcf5e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dcea1a82-562c-49d8-8cee-897d6c4f2664", "james@wilson.comx", "AQAAAAIAAYagAAAAEF8tzSAKAYbAK0WdvBAK7OBTbGHBIUI5Hu3ajSeWEM8sRkSrDsTWC3kspvBd2/3qLg==", "7151ccb0-b94b-420d-a4ee-fadc90944745" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bde41eed-dfb6-4911-8487-580e34c8481a", "sophia@moore.comx", "AQAAAAIAAYagAAAAEBClTyRS53ywVLJTIQ4X7iMOvEk3FyRnDVDUIJLi4+ijfImpAGtgwDf8ptvNHIxjqQ==", "f6e1484b-b978-42af-ada0-0c33e1ab5144" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d77c1918-8e6b-4dae-b9ed-a510241ee9b1", "william@anderson.comx", "AQAAAAIAAYagAAAAEHQGQ/gnAP8eF3hmzYODk4WF6bI14oYXx/q1FQKX1zzbb+dj2GWMP3BmY+1VV9M4ew==", "04a9ac98-d22a-42f6-bb12-90d93be974b7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                columns: new[] { "ConcurrencyStamp", "Email", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3d0bda85-a1af-4f4d-9f4a-63b15961b523", "mia@thomas.comx", "AQAAAAIAAYagAAAAEPsjIANe+tyy816Q8K+YqUA0zINOigztfWNiYWECDFchPLL7Ih49ikcZVTz+s3heIQ==", "fc25ee1e-94d6-4a4a-ba99-3419c13e77d1" });

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1,
                column: "SentAt",
                value: new DateTime(2025, 11, 18, 4, 15, 50, 645, DateTimeKind.Utc).AddTicks(4413));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2,
                column: "SentAt",
                value: new DateTime(2025, 11, 18, 4, 16, 50, 645, DateTimeKind.Utc).AddTicks(4503));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3,
                column: "SentAt",
                value: new DateTime(2025, 11, 18, 4, 15, 50, 645, DateTimeKind.Utc).AddTicks(4545));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 4,
                column: "SentAt",
                value: new DateTime(2025, 11, 18, 4, 17, 50, 645, DateTimeKind.Utc).AddTicks(4546));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 5,
                column: "SentAt",
                value: new DateTime(2025, 11, 18, 4, 15, 50, 645, DateTimeKind.Utc).AddTicks(4547));
        }
    }
}
