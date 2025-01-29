ALTER TABLE `Company` MODIFY COLUMN `name` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `Company` MODIFY COLUMN `initials` varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `Ship` MODIFY COLUMN `name` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `Ship` MODIFY COLUMN `initials` varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `Invoice` MODIFY COLUMN `invoice_number` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `Deal` ADD `created_at` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `Company` ADD CONSTRAINT `name` UNIQUE(`name`);--> statement-breakpoint
ALTER TABLE `Company` ADD CONSTRAINT `initials` UNIQUE(`initials`);--> statement-breakpoint
ALTER TABLE `Ship` ADD CONSTRAINT `name` UNIQUE(`name`);--> statement-breakpoint
ALTER TABLE `Ship` ADD CONSTRAINT `initials` UNIQUE(`initials`);--> statement-breakpoint
ALTER TABLE `Invoice` ADD CONSTRAINT `invoice_numvber` UNIQUE(`invoice_number`);