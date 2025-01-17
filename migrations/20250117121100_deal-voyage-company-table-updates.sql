CREATE TABLE `Deal` (
	`id` int AUTO_INCREMENT NOT NULL,
	`voyage_id` int,
	`company_id` int,
	`total_price` float,
	`is_paid` boolean NOT NULL DEFAULT false,
	`quantity` int NOT NULL,
	`goods_description` text,
	`rate_per_tonne` float NOT NULL,
	`unit_weight` float NOT NULL,
	CONSTRAINT `Deal_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `Voyage` DROP FOREIGN KEY `Voyage_ship_id_Ships_id_fk`;
--> statement-breakpoint
ALTER TABLE `Company` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_ibfk_1` FOREIGN KEY (`voyage_id`) REFERENCES `Voyage`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_ibfk_1` FOREIGN KEY (`ship_id`) REFERENCES `Ships`(`id`) ON DELETE set null ON UPDATE cascade;