CREATE TABLE [dbo].[Users] (
    [UserId] INT IDENTITY(1,1) NOT NULL,
    [FirstName] NVARCHAR(50) NOT NULL,
    [LastName] NVARCHAR(50) NOT NULL,
    [FullName] AS ([FirstName] + ' ' + [LastName]),
    [PhoneNo] NVARCHAR(10) NOT NULL,
    [Email] NVARCHAR(100) NOT NULL,
    [NationalId] NVARCHAR(16) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserId] ASC)
);

CREATE TABLE [dbo].[Addresses] (
    [AddressId] INT IDENTITY(1,1) NOT NULL,
    [UserId] INT NOT NULL,
    [AddressType] NVARCHAR(50) NOT NULL,
    [AddressLine1] NVARCHAR(100) NOT NULL,
    [AddressLine2] NVARCHAR(100) NULL,
    [AddressLine3] NVARCHAR(100) NULL,
    [City] NVARCHAR(50) NOT NULL,
    [State] NVARCHAR(50) NOT NULL,
    [Pincode] NVARCHAR(6) NOT NULL,
    [IsPermanent] BIT NOT NULL,
    CONSTRAINT [PK_Addresses] PRIMARY KEY CLUSTERED ([AddressId] ASC),
    CONSTRAINT [FK_Addresses_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([UserId]) ON DELETE CASCADE
);

ALTER TABLE [dbo].[Users] ADD CONSTRAINT [CK_PhoneNo_Length] CHECK (LEN([PhoneNo]) = 10);
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [CK_PhoneNo_Indian] CHECK ([PhoneNo] LIKE '+91%');
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [CK_Email_Format] CHECK ([Email] LIKE '%@%.%');
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [CK_State_Valid] CHECK ([State] IN ('Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'));
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [CK_Pincode_Length] CHECK (LEN([Pincode]) = 6);
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [CK_Pincode_Indian] CHECK ([Pincode] LIKE '[1-9][0-9]{5}');