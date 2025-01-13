CREATE TABLE `Company` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`initials` text NOT NULL,
	CONSTRAINT `Company_id` PRIMARY KEY(`id`)
);
