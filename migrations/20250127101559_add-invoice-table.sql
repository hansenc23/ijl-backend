CREATE TABLE `Invoice` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deal_id` int NOT NULL,
	`type` enum('DOWN_PAYMENT','FINAL_PAYMENT') NOT NULL,
	`invoice_number` text NOT NULL,
	`amount` float NOT NULL,
	`is_paid` boolean NOT NULL DEFAULT false,
	`created_at` datetime NOT NULL,
	CONSTRAINT `Invoice_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_ibfk_1` FOREIGN KEY (`deal_id`) REFERENCES `Deal`(`id`) ON DELETE restrict ON UPDATE cascade;