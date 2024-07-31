CREATE TABLE `switches` (
	`id` integer PRIMARY KEY NOT NULL,
	`cabinet` text,
	`hostname` text,
	`location` text,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `vlans` (
	`id` integer PRIMARY KEY NOT NULL,
	`vlan_id` integer,
	`network_range` text
);
--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `vlans_vlan_id_unique` ON `vlans` (`vlan_id`);