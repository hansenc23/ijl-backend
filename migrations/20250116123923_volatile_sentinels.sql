CREATE TABLE `Voyage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`voyage_number` text NOT NULL,
	`from_location` text NOT NULL,
	`to_location` text NOT NULL,
	`ship_id` int,
	CONSTRAINT `Voyage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `Ships` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_ship_id_Ships_id_fk` FOREIGN KEY (`ship_id`) REFERENCES `Ships`(`id`) ON DELETE no action ON UPDATE no action;