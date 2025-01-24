RENAME TABLE `Ships` TO `Ship`;--> statement-breakpoint
ALTER TABLE `Voyage` DROP FOREIGN KEY `Voyage_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Ship` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `Ship` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_ibfk_1` FOREIGN KEY (`ship_id`) REFERENCES `Ship`(`id`) ON DELETE restrict ON UPDATE cascade;