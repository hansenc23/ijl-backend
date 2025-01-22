ALTER TABLE `Deal` DROP FOREIGN KEY `Deal_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Deal` DROP FOREIGN KEY `Deal_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `Voyage` DROP FOREIGN KEY `Voyage_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Deal` MODIFY COLUMN `voyage_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Deal` MODIFY COLUMN `company_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Deal` MODIFY COLUMN `total_price` float NOT NULL;--> statement-breakpoint
ALTER TABLE `Voyage` MODIFY COLUMN `ship_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_ibfk_1` FOREIGN KEY (`voyage_id`) REFERENCES `Voyage`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_ibfk_1` FOREIGN KEY (`ship_id`) REFERENCES `Ships`(`id`) ON DELETE restrict ON UPDATE cascade;