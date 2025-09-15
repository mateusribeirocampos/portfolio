-- CreateTable
CREATE TABLE "public"."contacts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" INET,
    "userAgent" VARCHAR(500),
    "status" VARCHAR(20) NOT NULL DEFAULT 'unread',

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."resume_downloads" (
    "id" TEXT NOT NULL,
    "ipAddress" INET NOT NULL,
    "userAgent" VARCHAR(500),
    "language" VARCHAR(5) NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resume_downloads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."page_views" (
    "id" TEXT NOT NULL,
    "page" VARCHAR(255) NOT NULL,
    "ipAddress" INET NOT NULL,
    "referrer" VARCHAR(500),
    "userAgent" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin_users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(20) NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contacts_createdAt_idx" ON "public"."contacts"("createdAt");

-- CreateIndex
CREATE INDEX "contacts_status_idx" ON "public"."contacts"("status");

-- CreateIndex
CREATE INDEX "resume_downloads_createdAt_idx" ON "public"."resume_downloads"("createdAt");

-- CreateIndex
CREATE INDEX "page_views_page_createdAt_idx" ON "public"."page_views"("page", "createdAt");

-- CreateIndex
CREATE INDEX "page_views_createdAt_idx" ON "public"."page_views"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "public"."admin_users"("email");
