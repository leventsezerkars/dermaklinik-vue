-- =============================================
-- Dermaklinik Menü Sistemi Veritabanı Kurulumu
-- =============================================

-- 1. Language Tablosu
-- =============================================
CREATE TABLE [dbo].[Language] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Code] NVARCHAR(10) NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedById] UNIQUEIDENTIFIER NULL,
    [UpdatedAt] DATETIME2 NULL,
    [UpdatedById] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_Language] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [UK_Language_Code] UNIQUE ([Code])
);

-- Language verilerini ekle
INSERT INTO [dbo].[Language] ([Id], [Code], [Name], [IsActive], [IsDeleted])
VALUES 
    (NEWID(), 'tr', 'Türkçe', 1, 0),
    (NEWID(), 'en', 'English', 1, 0);

-- 2. Menu Tablosu
-- =============================================
CREATE TABLE [dbo].[Menu] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [ParentId] UNIQUEIDENTIFIER NULL,
    [SortOrder] INT NOT NULL DEFAULT 0,
    [Slug] NVARCHAR(MAX) NULL,
    [IsDeletable] BIT NOT NULL DEFAULT 1,
    [Type] INT NOT NULL,
    [Target] NVARCHAR(MAX) NULL,
    [CreatedAt] DATETIME2(7) NOT NULL DEFAULT GETUTCDATE(),
    [CreatedById] UNIQUEIDENTIFIER NULL,
    [UpdatedAt] DATETIME2(7) NULL,
    [UpdatedById] UNIQUEIDENTIFIER NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT [PK_Menu] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Menu_ParentId] FOREIGN KEY ([ParentId]) REFERENCES [dbo].[Menu] ([Id])
);

-- 3. MenuTranslation Tablosu
-- =============================================
CREATE TABLE [dbo].[MenuTranslation] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [MenuId] UNIQUEIDENTIFIER NOT NULL,
    [LanguageId] UNIQUEIDENTIFIER NOT NULL,
    [Title] NVARCHAR(MAX) NOT NULL,
    [Content] NVARCHAR(MAX) NOT NULL,
    [Slug] NVARCHAR(MAX) NOT NULL,
    [SeoTitle] NVARCHAR(MAX) NOT NULL,
    [SeoDescription] NVARCHAR(MAX) NOT NULL,
    [SeoKeywords] NVARCHAR(MAX) NOT NULL,
    [CreatedAt] DATETIME2(7) NOT NULL DEFAULT GETUTCDATE(),
    [CreatedById] UNIQUEIDENTIFIER NULL,
    [UpdatedAt] DATETIME2(7) NULL,
    [UpdatedById] UNIQUEIDENTIFIER NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT [PK_MenuTranslation] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_MenuTranslation_MenuId] FOREIGN KEY ([MenuId]) REFERENCES [dbo].[Menu] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_MenuTranslation_LanguageId] FOREIGN KEY ([LanguageId]) REFERENCES [dbo].[Language] ([Id]),
    CONSTRAINT [UK_MenuTranslation_MenuId_LanguageId] UNIQUE ([MenuId], [LanguageId])
);

-- 4. Index'ler
-- =============================================
CREATE NONCLUSTERED INDEX [IX_Menu_ParentId] ON [dbo].[Menu] ([ParentId]);
CREATE NONCLUSTERED INDEX [IX_Menu_SortOrder] ON [dbo].[Menu] ([SortOrder]);
CREATE NONCLUSTERED INDEX [IX_Menu_IsActive] ON [dbo].[Menu] ([IsActive]);
CREATE NONCLUSTERED INDEX [IX_MenuTranslation_MenuId] ON [dbo].[MenuTranslation] ([MenuId]);
CREATE NONCLUSTERED INDEX [IX_MenuTranslation_LanguageId] ON [dbo].[MenuTranslation] ([LanguageId]);

-- 5. Menü Verilerini Ekleme
-- =============================================

-- Language ID'lerini al
DECLARE @TrLanguageId UNIQUEIDENTIFIER = (SELECT Id FROM Language WHERE Code = 'tr');
DECLARE @EnLanguageId UNIQUEIDENTIFIER = (SELECT Id FROM Language WHERE Code = 'en');

-- Menu Type değerleri (enum yerine int kullanılıyor)
-- 0: Page, 1: Link, 2: Content, 3: Anchor

-- Ana menüleri ekle
DECLARE @HomeMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @GeneralDermMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @AestheticDermMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @LaserMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @AboutMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @ContactMenuId UNIQUEIDENTIFIER = NEWID();

-- Ana menüleri ekle
INSERT INTO [dbo].[Menu] ([Id], [ParentId], [SortOrder], [Slug], [IsDeletable], [Type], [Target], [IsActive])
VALUES 
    (@HomeMenuId, NULL, 1, NULL, 0, 0, '_self', 1),
    (@GeneralDermMenuId, NULL, 2, NULL, 0, 3, '_self', 1),
    (@AestheticDermMenuId, NULL, 3, NULL, 0, 3, '_self', 1),
    (@LaserMenuId, NULL, 4, NULL, 0, 3, '_self', 1),
    (@AboutMenuId, NULL, 5, NULL, 0, 3, '_self', 1),
    (@ContactMenuId, NULL, 6, NULL, 0, 3, '_self', 1);

-- Ana menü çevirilerini ekle
INSERT INTO [dbo].[MenuTranslation] ([MenuId], [LanguageId], [Title], [Content], [Slug], [SeoTitle], [SeoDescription], [SeoKeywords])
VALUES 
    -- Ana Sayfa
    (@HomeMenuId, @TrLanguageId, 'Ana Sayfa', 'Ana sayfa içeriği', 'ana-sayfa', 'Ana Sayfa - Dermaklinik', 'Dermaklinik ana sayfa', 'dermaklinik, ana sayfa'),
    (@HomeMenuId, @EnLanguageId, 'Home', 'Home page content', 'home', 'Home - Dermaklinik', 'Dermaklinik home page', 'dermaklinik, home'),
    
    -- Genel Dermatoloji
    (@GeneralDermMenuId, @TrLanguageId, 'Genel Dermatoloji', 'Genel dermatoloji hizmetleri', 'genel-dermatoloji', 'Genel Dermatoloji - Dermaklinik', 'Genel dermatoloji hizmetleri', 'genel dermatoloji, cilt hastalıkları'),
    (@GeneralDermMenuId, @EnLanguageId, 'General Dermatology', 'General dermatology services', 'general-dermatology', 'General Dermatology - Dermaklinik', 'General dermatology services', 'general dermatology, skin diseases'),
    
    -- Estetik Dermatoloji
    (@AestheticDermMenuId, @TrLanguageId, 'Estetik Dermatoloji', 'Estetik dermatoloji hizmetleri', 'estetik-dermatoloji', 'Estetik Dermatoloji - Dermaklinik', 'Estetik dermatoloji hizmetleri', 'estetik dermatoloji, güzellik'),
    (@AestheticDermMenuId, @EnLanguageId, 'Aesthetic Dermatology', 'Aesthetic dermatology services', 'aesthetic-dermatology', 'Aesthetic Dermatology - Dermaklinik', 'Aesthetic dermatology services', 'aesthetic dermatology, beauty'),
    
    -- Lazer Tedavileri
    (@LaserMenuId, @TrLanguageId, 'Lazer Tedavileri', 'Lazer tedavi hizmetleri', 'lazer-tedavileri', 'Lazer Tedavileri - Dermaklinik', 'Lazer tedavi hizmetleri', 'lazer tedavi, cilt bakımı'),
    (@LaserMenuId, @EnLanguageId, 'Laser Treatments', 'Laser treatment services', 'laser-treatments', 'Laser Treatments - Dermaklinik', 'Laser treatment services', 'laser treatment, skin care'),
    
    -- Hakkımızda
    (@AboutMenuId, @TrLanguageId, 'Hakkımızda', 'Hakkımızda bilgileri', 'hakkimizda', 'Hakkımızda - Dermaklinik', 'Hakkımızda bilgileri', 'hakkımızda, doktor, klinik'),
    (@AboutMenuId, @EnLanguageId, 'About', 'About us information', 'about', 'About - Dermaklinik', 'About us information', 'about, doctor, clinic'),
    
    -- İletişim
    (@ContactMenuId, @TrLanguageId, 'İletişim', 'İletişim bilgileri', 'iletisim', 'İletişim - Dermaklinik', 'İletişim bilgileri', 'iletişim, randevu, adres'),
    (@ContactMenuId, @EnLanguageId, 'Contact', 'Contact information', 'contact', 'Contact - Dermaklinik', 'Contact information', 'contact, appointment, address');

-- Genel Dermatoloji Alt Menüleri
DECLARE @AcneMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @RosaceaMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @HairLossMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @WartMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @NailDiseasesMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @SkinInfectionsMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @FungalInfectionsMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @AllergyEczemaMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @UrticariaMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @DermatitisMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @AllergicDiseasesMenuId UNIQUEIDENTIFIER = NEWID();

INSERT INTO [dbo].[Menu] ([Id], [ParentId], [SortOrder], [Slug], [IsDeletable], [Type], [Target], [IsActive])
VALUES 
    (@AcneMenuId, @GeneralDermMenuId, 1, NULL, 1, 0, '_self', 1),
    (@RosaceaMenuId, @GeneralDermMenuId, 2, NULL, 1, 0, '_self', 1),
    (@HairLossMenuId, @GeneralDermMenuId, 3, NULL, 1, 0, '_self', 1),
    (@WartMenuId, @GeneralDermMenuId, 4, NULL, 1, 0, '_self', 1),
    (@NailDiseasesMenuId, @GeneralDermMenuId, 5, NULL, 1, 0, '_self', 1),
    (@SkinInfectionsMenuId, @GeneralDermMenuId, 6, NULL, 1, 0, '_self', 1),
    (@FungalInfectionsMenuId, @GeneralDermMenuId, 7, NULL, 1, 0, '_self', 1),
    (@AllergyEczemaMenuId, @GeneralDermMenuId, 8, NULL, 1, 0, '_self', 1),
    (@UrticariaMenuId, @GeneralDermMenuId, 9, NULL, 1, 0, '_self', 1),
    (@DermatitisMenuId, @GeneralDermMenuId, 10, NULL, 1, 0, '_self', 1),
    (@AllergicDiseasesMenuId, @GeneralDermMenuId, 11, NULL, 1, 0, '_self', 1);

-- Genel Dermatoloji Alt Menü Çevirileri
INSERT INTO [dbo].[MenuTranslation] ([MenuId], [LanguageId], [Title], [Content], [Slug], [SeoTitle], [SeoDescription], [SeoKeywords])
VALUES 
    -- Akne Sivilce Tedavisi
    (@AcneMenuId, @TrLanguageId, 'Akne Sivilce Tedavisi', 'Akne ve sivilce tedavi hizmetleri', 'akne-sivilce-tedavisi', 'Akne Sivilce Tedavisi - Dermaklinik', 'Akne ve sivilce tedavi hizmetleri', 'akne, sivilce, tedavi'),
    (@AcneMenuId, @EnLanguageId, 'Acne Treatment', 'Acne and pimple treatment services', 'acne-treatment', 'Acne Treatment - Dermaklinik', 'Acne and pimple treatment services', 'acne, pimple, treatment'),
    
    -- Rosacea Gül Hastalığı Tedavisi
    (@RosaceaMenuId, @TrLanguageId, 'Rosacea Gül Hastalığı Tedavisi', 'Rosacea gül hastalığı tedavi hizmetleri', 'rosacea-gul-hastaligi-tedavisi', 'Rosacea Gül Hastalığı Tedavisi - Dermaklinik', 'Rosacea gül hastalığı tedavi hizmetleri', 'rosacea, gül hastalığı, tedavi'),
    (@RosaceaMenuId, @EnLanguageId, 'Rosacea Treatment', 'Rosacea treatment services', 'rosacea-treatment', 'Rosacea Treatment - Dermaklinik', 'Rosacea treatment services', 'rosacea, treatment'),
    
    -- Saç Dökülmesi ve Saç Tedavileri
    (@HairLossMenuId, @TrLanguageId, 'Saç Dökülmesi ve Saç Tedavileri', 'Saç dökülmesi ve saç tedavi hizmetleri', 'sac-dokulmesi-ve-sac-tedavileri', 'Saç Dökülmesi ve Saç Tedavileri - Dermaklinik', 'Saç dökülmesi ve saç tedavi hizmetleri', 'saç dökülmesi, saç tedavisi'),
    (@HairLossMenuId, @EnLanguageId, 'Hair Loss and Hair Treatments', 'Hair loss and hair treatment services', 'hair-loss-and-hair-treatments', 'Hair Loss and Hair Treatments - Dermaklinik', 'Hair loss and hair treatment services', 'hair loss, hair treatment'),
    
    -- Siğil Ben Tedavisi
    (@WartMenuId, @TrLanguageId, 'Siğil Ben Tedavisi', 'Siğil ve ben tedavi hizmetleri', 'sigil-ben-tedavisi', 'Siğil Ben Tedavisi - Dermaklinik', 'Siğil ve ben tedavi hizmetleri', 'siğil, ben, tedavi'),
    (@WartMenuId, @EnLanguageId, 'Wart and Mole Treatment', 'Wart and mole treatment services', 'wart-and-mole-treatment', 'Wart and Mole Treatment - Dermaklinik', 'Wart and mole treatment services', 'wart, mole, treatment'),
    
    -- Tırnak Hastalıkları ve Tedavisi
    (@NailDiseasesMenuId, @TrLanguageId, 'Tırnak Hastalıkları ve Tedavisi', 'Tırnak hastalıkları tedavi hizmetleri', 'tirnak-hastaliklari-ve-tedavisi', 'Tırnak Hastalıkları ve Tedavisi - Dermaklinik', 'Tırnak hastalıkları tedavi hizmetleri', 'tırnak hastalıkları, tırnak tedavisi'),
    (@NailDiseasesMenuId, @EnLanguageId, 'Nail Diseases and Treatment', 'Nail diseases treatment services', 'nail-diseases-and-treatment', 'Nail Diseases and Treatment - Dermaklinik', 'Nail diseases treatment services', 'nail diseases, nail treatment'),
    
    -- Deri Enfeksiyonları
    (@SkinInfectionsMenuId, @TrLanguageId, 'Deri Enfeksiyonları', 'Deri enfeksiyonları tedavi hizmetleri', 'deri-enfeksiyonlari', 'Deri Enfeksiyonları - Dermaklinik', 'Deri enfeksiyonları tedavi hizmetleri', 'deri enfeksiyonları, cilt enfeksiyonu'),
    (@SkinInfectionsMenuId, @EnLanguageId, 'Skin Infections', 'Skin infections treatment services', 'skin-infections', 'Skin Infections - Dermaklinik', 'Skin infections treatment services', 'skin infections'),
    
    -- Mantar Enfeksiyonları
    (@FungalInfectionsMenuId, @TrLanguageId, 'Mantar Enfeksiyonları', 'Mantar enfeksiyonları tedavi hizmetleri', 'mantar-enfeksiyonlari', 'Mantar Enfeksiyonları - Dermaklinik', 'Mantar enfeksiyonları tedavi hizmetleri', 'mantar enfeksiyonları, fungal'),
    (@FungalInfectionsMenuId, @EnLanguageId, 'Fungal Infections', 'Fungal infections treatment services', 'fungal-infections', 'Fungal Infections - Dermaklinik', 'Fungal infections treatment services', 'fungal infections'),
    
    -- Alerji ve Egzama Türleri
    (@AllergyEczemaMenuId, @TrLanguageId, 'Alerji ve Egzama Türleri', 'Alerji ve egzama tedavi hizmetleri', 'alerji-ve-egzama-turleri', 'Alerji ve Egzama Türleri - Dermaklinik', 'Alerji ve egzama tedavi hizmetleri', 'alerji, egzama, cilt hastalıkları'),
    (@AllergyEczemaMenuId, @EnLanguageId, 'Allergy and Eczema Types', 'Allergy and eczema treatment services', 'allergy-and-eczema-types', 'Allergy and Eczema Types - Dermaklinik', 'Allergy and eczema treatment services', 'allergy, eczema, skin diseases'),
    
    -- Ürtiker Kurdeşen
    (@UrticariaMenuId, @TrLanguageId, 'Ürtiker Kurdeşen', 'Ürtiker kurdeşen tedavi hizmetleri', 'urtiker-kurdesen', 'Ürtiker Kurdeşen - Dermaklinik', 'Ürtiker kurdeşen tedavi hizmetleri', 'ürtiker, kurdeşen, alerji'),
    (@UrticariaMenuId, @EnLanguageId, 'Urticaria', 'Urticaria treatment services', 'urticaria', 'Urticaria - Dermaklinik', 'Urticaria treatment services', 'urticaria, hives'),
    
    -- Dermatit
    (@DermatitisMenuId, @TrLanguageId, 'Dermatit', 'Dermatit tedavi hizmetleri', 'dermatit', 'Dermatit - Dermaklinik', 'Dermatit tedavi hizmetleri', 'dermatit, cilt iltihabı'),
    (@DermatitisMenuId, @EnLanguageId, 'Dermatitis', 'Dermatitis treatment services', 'dermatitis', 'Dermatitis - Dermaklinik', 'Dermatitis treatment services', 'dermatitis, skin inflammation'),
    
    -- Alerjik Hastalıklar
    (@AllergicDiseasesMenuId, @TrLanguageId, 'Alerjik Hastalıklar', 'Alerjik hastalıklar tedavi hizmetleri', 'alerjik-hastaliklar', 'Alerjik Hastalıklar - Dermaklinik', 'Alerjik hastalıklar tedavi hizmetleri', 'alerjik hastalıklar, alerji'),
    (@AllergicDiseasesMenuId, @EnLanguageId, 'Allergic Diseases', 'Allergic diseases treatment services', 'allergic-diseases', 'Allergic Diseases - Dermaklinik', 'Allergic diseases treatment services', 'allergic diseases, allergy');

-- Estetik Dermatoloji Alt Menüleri
DECLARE @BotoxMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @FillerMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @RegeneraActivaMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @PrpMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @MesotherapyMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @SpotTreatmentMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @AcneScarMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @ScarTreatmentMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @LiquidFaceLiftMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @MedicalSkinCareMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @ThreadLiftingMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @CapillaryTreatmentMenuId UNIQUEIDENTIFIER = NEWID();

INSERT INTO [dbo].[Menu] ([Id], [ParentId], [SortOrder], [Slug], [IsDeletable], [Type], [Target], [IsActive])
VALUES 
    (@BotoxMenuId, @AestheticDermMenuId, 1, NULL, 1, 0, '_self', 1),
    (@FillerMenuId, @AestheticDermMenuId, 2, NULL, 1, 0, '_self', 1),
    (@RegeneraActivaMenuId, @AestheticDermMenuId, 3, NULL, 1, 0, '_self', 1),
    (@PrpMenuId, @AestheticDermMenuId, 4, NULL, 1, 0, '_self', 1),
    (@MesotherapyMenuId, @AestheticDermMenuId, 5, NULL, 1, 0, '_self', 1),
    (@SpotTreatmentMenuId, @AestheticDermMenuId, 6, NULL, 1, 0, '_self', 1),
    (@AcneScarMenuId, @AestheticDermMenuId, 7, NULL, 1, 0, '_self', 1),
    (@ScarTreatmentMenuId, @AestheticDermMenuId, 8, NULL, 1, 0, '_self', 1),
    (@LiquidFaceLiftMenuId, @AestheticDermMenuId, 9, NULL, 1, 0, '_self', 1),
    (@MedicalSkinCareMenuId, @AestheticDermMenuId, 10, NULL, 1, 0, '_self', 1),
    (@ThreadLiftingMenuId, @AestheticDermMenuId, 11, NULL, 1, 0, '_self', 1),
    (@CapillaryTreatmentMenuId, @AestheticDermMenuId, 12, NULL, 1, 0, '_self', 1);

-- Estetik Dermatoloji Alt Menü Çevirileri
INSERT INTO [dbo].[MenuTranslation] ([MenuId], [LanguageId], [Title], [Content], [Slug], [SeoTitle], [SeoDescription], [SeoKeywords])
VALUES 
    -- Botoks Uygulaması
    (@BotoxMenuId, @TrLanguageId, 'Botoks Uygulaması', 'Botoks uygulama hizmetleri', 'botoks-uygulamasi', 'Botoks Uygulaması - Dermaklinik', 'Botoks uygulama hizmetleri', 'botoks, uygulama'),
    (@BotoxMenuId, @EnLanguageId, 'Botox Application', 'Botox application services', 'botox-application', 'Botox Application - Dermaklinik', 'Botox application services', 'botox, application'),
    
    -- Dolgu Uygulaması
    (@FillerMenuId, @TrLanguageId, 'Dolgu Uygulaması', 'Dolgu uygulama hizmetleri', 'dolgu-uygulamasi', 'Dolgu Uygulaması - Dermaklinik', 'Dolgu uygulama hizmetleri', 'dolgu, uygulama'),
    (@FillerMenuId, @EnLanguageId, 'Filler Application', 'Filler application services', 'filler-application', 'Filler Application - Dermaklinik', 'Filler application services', 'filler, application'),
    
    -- Regenera Activa Kök Hücre Tedavisi
    (@RegeneraActivaMenuId, @TrLanguageId, 'Regenera Activa Kök Hücre Tedavisi', 'Regenera Activa kök hücre tedavi hizmetleri', 'regenera-activa-kok-hucre-tedavisi', 'Regenera Activa Kök Hücre Tedavisi - Dermaklinik', 'Regenera Activa kök hücre tedavi hizmetleri', 'regenera activa, kök hücre'),
    (@RegeneraActivaMenuId, @EnLanguageId, 'Regenera Activa Stem Cell Treatment', 'Regenera Activa stem cell treatment services', 'regenera-activa-stem-cell-treatment', 'Regenera Activa Stem Cell Treatment - Dermaklinik', 'Regenera Activa stem cell treatment services', 'regenera activa, stem cell'),
    
    -- PRP Platelet Rich Plasma Tedavisi
    (@PrpMenuId, @TrLanguageId, 'PRP Platelet Rich Plasma Tedavisi', 'PRP platelet zengin plazma tedavi hizmetleri', 'prp-platelet-rich-plasma-tedavisi', 'PRP Platelet Rich Plasma Tedavisi - Dermaklinik', 'PRP platelet zengin plazma tedavi hizmetleri', 'prp, platelet, plazma'),
    (@PrpMenuId, @EnLanguageId, 'PRP Platelet Rich Plasma Treatment', 'PRP platelet rich plasma treatment services', 'prp-platelet-rich-plasma-treatment', 'PRP Platelet Rich Plasma Treatment - Dermaklinik', 'PRP platelet rich plasma treatment services', 'prp, platelet, plasma'),
    
    -- Mezoterapi Uygulaması
    (@MesotherapyMenuId, @TrLanguageId, 'Mezoterapi Uygulaması', 'Mezoterapi uygulama hizmetleri', 'mezoterapi-uygulamasi', 'Mezoterapi Uygulaması - Dermaklinik', 'Mezoterapi uygulama hizmetleri', 'mezoterapi, uygulama'),
    (@MesotherapyMenuId, @EnLanguageId, 'Mesotherapy Application', 'Mesotherapy application services', 'mesotherapy-application', 'Mesotherapy Application - Dermaklinik', 'Mesotherapy application services', 'mesotherapy, application'),
    
    -- Leke Tedavisi
    (@SpotTreatmentMenuId, @TrLanguageId, 'Leke Tedavisi', 'Leke tedavi hizmetleri', 'leke-tedavisi', 'Leke Tedavisi - Dermaklinik', 'Leke tedavi hizmetleri', 'leke, tedavi'),
    (@SpotTreatmentMenuId, @EnLanguageId, 'Spot Treatment', 'Spot treatment services', 'spot-treatment', 'Spot Treatment - Dermaklinik', 'Spot treatment services', 'spot, treatment'),
    
    -- Akne İz Tedavisi
    (@AcneScarMenuId, @TrLanguageId, 'Akne İz Tedavisi', 'Akne iz tedavi hizmetleri', 'akne-iz-tedavisi', 'Akne İz Tedavisi - Dermaklinik', 'Akne iz tedavi hizmetleri', 'akne iz, tedavi'),
    (@AcneScarMenuId, @EnLanguageId, 'Acne Scar Treatment', 'Acne scar treatment services', 'acne-scar-treatment', 'Acne Scar Treatment - Dermaklinik', 'Acne scar treatment services', 'acne scar, treatment'),
    
    -- Yara İz Tedavisi
    (@ScarTreatmentMenuId, @TrLanguageId, 'Yara İz Tedavisi', 'Yara iz tedavi hizmetleri', 'yara-iz-tedavisi', 'Yara İz Tedavisi - Dermaklinik', 'Yara iz tedavi hizmetleri', 'yara iz, tedavi'),
    (@ScarTreatmentMenuId, @EnLanguageId, 'Scar Treatment', 'Scar treatment services', 'scar-treatment', 'Scar Treatment - Dermaklinik', 'Scar treatment services', 'scar, treatment'),
    
    -- Sıvı Yüz Germe
    (@LiquidFaceLiftMenuId, @TrLanguageId, 'Sıvı Yüz Germe', 'Sıvı yüz germe hizmetleri', 'sivi-yuz-germe', 'Sıvı Yüz Germe - Dermaklinik', 'Sıvı yüz germe hizmetleri', 'sıvı yüz germe'),
    (@LiquidFaceLiftMenuId, @EnLanguageId, 'Liquid Face Lift', 'Liquid face lift services', 'liquid-face-lift', 'Liquid Face Lift - Dermaklinik', 'Liquid face lift services', 'liquid face lift'),
    
    -- Medikal Cilt Bakımı Aquapeel
    (@MedicalSkinCareMenuId, @TrLanguageId, 'Medikal Cilt Bakımı Aquapeel', 'Medikal cilt bakımı Aquapeel hizmetleri', 'medikal-cilt-bakimi-aquapeel', 'Medikal Cilt Bakımı Aquapeel - Dermaklinik', 'Medikal cilt bakımı Aquapeel hizmetleri', 'medikal cilt bakımı, aquapeel'),
    (@MedicalSkinCareMenuId, @EnLanguageId, 'Medical Skin Care Aquapeel', 'Medical skin care Aquapeel services', 'medical-skin-care-aquapeel', 'Medical Skin Care Aquapeel - Dermaklinik', 'Medical skin care Aquapeel services', 'medical skin care, aquapeel'),
    
    -- İple Yüz Askılama
    (@ThreadLiftingMenuId, @TrLanguageId, 'İple Yüz Askılama', 'İple yüz askılama hizmetleri', 'iple-yuz-askilama', 'İple Yüz Askılama - Dermaklinik', 'İple yüz askılama hizmetleri', 'iple yüz askılama'),
    (@ThreadLiftingMenuId, @EnLanguageId, 'Thread Lifting', 'Thread lifting services', 'thread-lifting', 'Thread Lifting - Dermaklinik', 'Thread lifting services', 'thread lifting'),
    
    -- Kılcal Damar Tedavisi
    (@CapillaryTreatmentMenuId, @TrLanguageId, 'Kılcal Damar Tedavisi', 'Kılcal damar tedavi hizmetleri', 'kilcal-damar-tedavisi', 'Kılcal Damar Tedavisi - Dermaklinik', 'Kılcal damar tedavi hizmetleri', 'kılcal damar, tedavi'),
    (@CapillaryTreatmentMenuId, @EnLanguageId, 'Capillary Treatment', 'Capillary treatment services', 'capillary-treatment', 'Capillary Treatment - Dermaklinik', 'Capillary treatment services', 'capillary, treatment');

-- Lazer Tedavileri Alt Menüleri
DECLARE @VeloceBBMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @FractionalCO2MenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @SecretGoldenNeedleMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @AquaPeelMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @PicoSecondMenuId UNIQUEIDENTIFIER = NEWID();
DECLARE @HifuMenuId UNIQUEIDENTIFIER = NEWID();

INSERT INTO [dbo].[Menu] ([Id], [ParentId], [SortOrder], [Slug], [IsDeletable], [Type], [Target], [IsActive])
VALUES 
    (@VeloceBBMenuId, @LaserMenuId, 1, NULL, 1, 0, '_self', 1),
    (@FractionalCO2MenuId, @LaserMenuId, 2, NULL, 1, 0, '_self', 1),
    (@SecretGoldenNeedleMenuId, @LaserMenuId, 3, NULL, 1, 0, '_self', 1),
    (@AquaPeelMenuId, @LaserMenuId, 4, NULL, 1, 0, '_self', 1),
    (@PicoSecondMenuId, @LaserMenuId, 5, NULL, 1, 0, '_self', 1),
    (@HifuMenuId, @LaserMenuId, 6, NULL, 1, 0, '_self', 1);

-- Lazer Tedavileri Alt Menü Çevirileri
INSERT INTO [dbo].[MenuTranslation] ([MenuId], [LanguageId], [Title], [Content], [Slug], [SeoTitle], [SeoDescription], [SeoKeywords])
VALUES 
    -- Veloce BB Light
    (@VeloceBBMenuId, @TrLanguageId, 'Veloce BB Light', 'Veloce BB Light lazer tedavi hizmetleri', 'veloce-bb-light', 'Veloce BB Light - Dermaklinik', 'Veloce BB Light lazer tedavi hizmetleri', 'veloce bb light, lazer'),
    (@VeloceBBMenuId, @EnLanguageId, 'Veloce BB Light', 'Veloce BB Light laser treatment services', 'veloce-bb-light', 'Veloce BB Light - Dermaklinik', 'Veloce BB Light laser treatment services', 'veloce bb light, laser'),
    
    -- Fraksiyonel Karbondioksit CO2 Lazer
    (@FractionalCO2MenuId, @TrLanguageId, 'Fraksiyonel Karbondioksit CO2 Lazer', 'Fraksiyonel CO2 lazer tedavi hizmetleri', 'fraksiyonel-karbondioksit-co2-lazer', 'Fraksiyonel CO2 Lazer - Dermaklinik', 'Fraksiyonel CO2 lazer tedavi hizmetleri', 'fraksiyonel co2, lazer'),
    (@FractionalCO2MenuId, @EnLanguageId, 'Fractional CO2 Laser', 'Fractional CO2 laser treatment services', 'fractional-co2-laser', 'Fractional CO2 Laser - Dermaklinik', 'Fractional CO2 laser treatment services', 'fractional co2, laser'),
    
    -- Secret Altın İğne Fraksiyonel Radyofrekans
    (@SecretGoldenNeedleMenuId, @TrLanguageId, 'Secret Altın İğne Fraksiyonel Radyofrekans', 'Secret altın iğne fraksiyonel radyofrekans hizmetleri', 'secret-altin-igne-fraksiyonel-radyofrekans', 'Secret Altın İğne Fraksiyonel Radyofrekans - Dermaklinik', 'Secret altın iğne fraksiyonel radyofrekans hizmetleri', 'secret altın iğne, radyofrekans'),
    (@SecretGoldenNeedleMenuId, @EnLanguageId, 'Secret Golden Needle Fractional Radiofrequency', 'Secret golden needle fractional radiofrequency services', 'secret-golden-needle-fractional-radiofrequency', 'Secret Golden Needle Fractional Radiofrequency - Dermaklinik', 'Secret golden needle fractional radiofrequency services', 'secret golden needle, radiofrequency'),
    
    -- Aqua Peel Medikal Cilt Bakımı
    (@AquaPeelMenuId, @TrLanguageId, 'Aqua Peel Medikal Cilt Bakımı', 'Aqua Peel medikal cilt bakım hizmetleri', 'aqua-peel-medikal-cilt-bakimi', 'Aqua Peel Medikal Cilt Bakımı - Dermaklinik', 'Aqua Peel medikal cilt bakım hizmetleri', 'aqua peel, medikal cilt bakımı'),
    (@AquaPeelMenuId, @EnLanguageId, 'Aqua Peel Medical Skin Care', 'Aqua Peel medical skin care services', 'aqua-peel-medical-skin-care', 'Aqua Peel Medical Skin Care - Dermaklinik', 'Aqua Peel medical skin care services', 'aqua peel, medical skin care'),
    
    -- Piko Saniye Lazer
    (@PicoSecondMenuId, @TrLanguageId, 'Piko Saniye Lazer', 'Piko saniye lazer tedavi hizmetleri', 'piko-saniye-lazer', 'Piko Saniye Lazer - Dermaklinik', 'Piko saniye lazer tedavi hizmetleri', 'piko saniye, lazer'),
    (@PicoSecondMenuId, @EnLanguageId, 'Pico Second Laser', 'Pico second laser treatment services', 'pico-second-laser', 'Pico Second Laser - Dermaklinik', 'Pico second laser treatment services', 'pico second, laser'),
    
    -- HIFU Ameliyatsız Yüz Germe
    (@HifuMenuId, @TrLanguageId, 'HIFU Ameliyatsız Yüz Germe', 'HIFU ameliyatsız yüz germe hizmetleri', 'hifu-ameliyatsiz-yuz-germe', 'HIFU Ameliyatsız Yüz Germe - Dermaklinik', 'HIFU ameliyatsız yüz germe hizmetleri', 'hifu, ameliyatsız yüz germe'),
    (@HifuMenuId, @EnLanguageId, 'HIFU Non-Surgical Face Lift', 'HIFU non-surgical face lift services', 'hifu-non-surgical-face-lift', 'HIFU Non-Surgical Face Lift - Dermaklinik', 'HIFU non-surgical face lift services', 'hifu, non-surgical face lift');

-- 6. Test Sorguları
-- =============================================

-- Tüm menüleri getir
-- SELECT m.*, mt.Title, mt.Content, mt.Slug, mt.SeoTitle, mt.SeoDescription, mt.SeoKeywords, l.Code AS LanguageCode 
-- FROM Menu m
-- INNER JOIN MenuTranslation mt ON m.Id = mt.MenuId
-- INNER JOIN Language l ON mt.LanguageId = l.Id
-- WHERE m.IsDeleted = 0 AND mt.IsDeleted = 0 AND l.IsDeleted = 0
-- ORDER BY m.SortOrder;

-- Belirli bir dildeki menüleri getir
-- SELECT m.*, mt.Title, mt.Content, mt.Slug, mt.SeoTitle, mt.SeoDescription, mt.SeoKeywords, l.Code AS LanguageCode 
-- FROM Menu m
-- INNER JOIN MenuTranslation mt ON m.Id = mt.MenuId
-- INNER JOIN Language l ON mt.LanguageId = l.Id
-- WHERE m.IsDeleted = 0 AND mt.IsDeleted = 0 AND l.IsDeleted = 0 AND l.Code = 'tr'
-- ORDER BY m.SortOrder;

PRINT 'Menü sistemi veritabanı kurulumu tamamlandı!';
PRINT 'Toplam ' + CAST((SELECT COUNT(*) FROM Menu) AS NVARCHAR(10)) + ' menü öğesi eklendi.';
PRINT 'Toplam ' + CAST((SELECT COUNT(*) FROM MenuTranslation) AS NVARCHAR(10)) + ' menü çevirisi eklendi.';
