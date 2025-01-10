CREATE TABLE IF NOT EXISTS "activities" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"Title" varchar(255),
	"ImageID" varchar(12),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activityLogs" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"EntityType" varchar(50),
	"EntityID" varchar(12),
	"UserID" varchar(12),
	"UserType" varchar(50),
	"ActionType" varchar(50),
	"Description" text,
	"OldValue" text,
	"NewValue" text,
	"UserAgent" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"EventID" varchar(12),
	"EventScheduleID" varchar(12),
	"EventPackageID" varchar(12),
	"GuestID" varchar(12),
	"PaymentID" varchar(12),
	"Status" varchar(20),
	"BookingDate" date,
	"TotalGuests" integer,
	"ReviewStatus" varchar(15),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collection" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"BookingID" varchar(12),
	"EventScheduleID" varchar(12),
	"TotalAmount" numeric,
	"AmountPaid" numeric,
	"Balance" numeric,
	"Status" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coordinatorPerAgency" (
	"CoordinatorID" varchar(12),
	"AgencyID" varchar(12),
	"Status" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coordinators" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"TelegramID" varchar(12),
	"FullName" varchar(255),
	"ShortDescription" varchar(255),
	"Role" varchar(50),
	"Status" varchar(50),
	"ImageID" varchar(12),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "disbursement" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"OrganizerID" varchar(12),
	"AgencyID" varchar(12),
	"Amount" numeric,
	"PayoutAccountID" varchar(12),
	"Status" varchar(50),
	"ServiceCharge" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventPackageActivities" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"EventPackageID" varchar(12),
	"ActivityID" varchar(12),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventPackageDiscount" (
	"EventPackageID" varchar(12),
	"DiscountName" varchar(255),
	"DiscountType" varchar(50),
	"DiscountValue" numeric,
	"Validity" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventPackagePaymentConfig" (
	"EventPackageID" varchar(12),
	"Downpayment" numeric,
	"AllowFullPayment" boolean,
	"GuestType" varchar(50),
	"Description" varchar(255),
	"AdminFeeValue" numeric,
	"PaymentFeeValue" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventPackages" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"EventID" varchar(12),
	"Title" varchar(255),
	"Duration" numeric,
	"Desc1ID" varchar(12),
	"Desc2ID" varchar(12),
	"Desc3ID" varchar(12),
	"Desc4ID" varchar(12),
	"Desc5ID" varchar(12),
	"Price" numeric,
	"Status" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventScheduleAssignments" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"CoordinatorID" varchar(12),
	"EventScheduleID" varchar(12),
	"LongDescID" varchar(12),
	"BookingID" varchar(12),
	"TransportationID" varchar(12),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventScheduleCoordinators" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"TelegramID" varchar(50),
	"CoordinatorID" varchar(12),
	"EventScheduleID" varchar(12),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventSchedules" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"EventID" varchar(12),
	"ImageID" varchar(12),
	"DateFrom" date,
	"DateTo" date,
	"MaxJoiners" integer,
	"Status" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"ID" serial PRIMARY KEY NOT NULL,
	"Title" text NOT NULL,
	"ShortDescription" text NOT NULL,
	"LocationId" text NOT NULL,
	"LongDescription" text NOT NULL,
	"AgencyId" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	"Longitude" text NOT NULL,
	"Latitude" text NOT NULL,
	"Distance" text NOT NULL,
	"Visibility" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FAQHeader" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"EventID" varchar(12),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FAQLine" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"FaqID" varchar(12),
	"Question" varchar(255),
	"Answer" text,
	"OrderNum" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guestReview" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"EventID" varchar(12),
	"EventScheduleID" varchar(12),
	"EventPackageID" varchar(12),
	"BookingID" varchar(12),
	"Rate" integer,
	"LongDescID" varchar(12),
	"GuestID" varchar(12),
	"ReviewFor" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guests" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"TelegramID" varchar(12),
	"Name" varchar(255),
	"Age" integer,
	"Gender" varchar(50),
	"LastActivity" date,
	"ReferredBy" varchar(255),
	"ReferralCode" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"EventID" varchar(12),
	"OrganizerID" varchar(12),
	"Author" varchar(255),
	"Extension" varchar(50),
	"Size" numeric,
	"BlobID" varchar(12),
	"Type" varchar(50),
	"Url" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "longtext" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"Text" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"BookingID" varchar(12),
	"Amount" numeric,
	"Description" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payoutAccount" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"BankName" varchar(255),
	"AgencyID" varchar(12),
	"AccountNumber" varchar(50),
	"AccountName" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payout" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"AgencyID" varchar(12),
	"AccountNumber" varchar(50),
	"AccountName" varchar(255),
	"Status" varchar(20),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "referralBonus" (
	"OReferred" integer,
	"OReferrer" integer,
	"TReffered" integer,
	"TRefferer" integer,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "referralLogs" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"ReferrerID" varchar(12),
	"ReferredID" varchar(12),
	"Type" varchar(20),
	"BookingID" varchar(12),
	"Status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tourAgency" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"Name" varchar(255),
	"LongDescID" varchar(12),
	"ImageID" varchar(12),
	"OrganizerID" varchar(12),
	"VerificationStatus" varchar(20),
	"ReferralCode" varchar(20),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tourOrganizer" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"FullName" varchar(255),
	"Email" varchar(255),
	"TelegramID" varchar(50),
	"ProfileImageID" varchar(12),
	"PhoneNumber" varchar(50),
	"AgencyID" varchar(12),
	"Accreditation" integer,
	"VerificationmageID" varchar(12),
	"IsOwner" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactionLogs" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"GatewayFee" numeric,
	"ServiceFee" numeric,
	"GrossAmount" numeric,
	"NetAmount" numeric,
	"Source" varchar(50),
	"Destination" varchar(255),
	"OrganizerID" varchar(12),
	"MovementType" varchar(50),
	"TransactionType" varchar(50),
	"TransactionID" varchar(12),
	"Type" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transportationPerAgency" (
	"TransportationID" varchar(255),
	"AgencyID" varchar(255),
	"Status" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transportation" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"ImageID" varchar(12),
	"TelegramID" varchar(50),
	"FullName" varchar(255),
	"PlateNumber" varchar(50),
	"MaxSeat" integer,
	"Model" varchar(100),
	"Color" varchar(50),
	"Location" varchar(255),
	"Status" varchar(20),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travelCoinsEarningRates" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"SpendingRate" numeric,
	"CoinsPerRate" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travelCoinsMembershipTiers" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"Name" varchar(50),
	"MinCoins" integer,
	"MaxCoins" integer,
	"MinEvents" integer,
	"MaxEvents" integer,
	"BonusRate" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travelCoinsOrganizerEarnings" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"CoinsPerParticipant" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travelCoinsOrganizerRedemption" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"UsersPerCoin" integer,
	"NewEventCost" integer,
	"FreeEventLimit" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travelCoinsPerUser" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"UserID" varchar(12),
	"TotalAvailable" integer,
	"TotalAmount" integer,
	"TotalUsed" integer,
	"ExpiryDate" date,
	"Tier" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travelCoinsRedemptionRates" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"DiscountRate" numeric,
	"MinimumRedemption" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travelCoinsReferralRewards" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"UserType" varchar(50),
	"ReferrerCoins" integer,
	"RefereeCoins" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travelCoinsTransactions" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"UserID" varchar(12),
	"TransactionType" varchar(50),
	"TransactionID" varchar(12),
	"EntryType" varchar(10),
	"Amount" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "voucherConversion" (
	"ID" varchar(12) PRIMARY KEY NOT NULL,
	"CoinsPerBatch" integer,
	"VoucherValue" numeric,
	"VouchersPerBatch" integer
);
--> statement-breakpoint
DROP TABLE "users";