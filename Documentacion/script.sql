ticket_userticket_userCREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `note` varchar(10000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_11BA68CA76ED395` (`user_id`),
  CONSTRAINT `FK_11BA68CA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

CREATE TABLE `user_ticket` (
  `user_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`ticket_id`),
  KEY `IDX_F2F2B69EA76ED395` (`user_id`),
  KEY `IDX_F2F2B69E700047D2` (`ticket_id`),
  CONSTRAINT `FK_F2F2B69E700047D2` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_F2F2B69EA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(10000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date_created` datetime NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

CREATE TABLE `ticket_user` (
  `ticket_id` int NOT NULL,
  `user_id` int NOT NULL,
  KEY `IDX_BF48C371700047D2` (`ticket_id`),
  KEY `IDX_BF48C371A76ED395` (`user_id`),
  CONSTRAINT `FK_BF48C371700047D2` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_BF48C371A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

CREATE TABLE `ticket_notes` (
  `ticket_id` int NOT NULL,
  `notes_id` int NOT NULL,
  PRIMARY KEY (`ticket_id`,`notes_id`),
  KEY `IDX_292BC507700047D2` (`ticket_id`),
  KEY `IDX_292BC507FC56F556` (`notes_id`),
  CONSTRAINT `FK_292BC507700047D2` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_292BC507FC56F556` FOREIGN KEY (`notes_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(10000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dateend` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `hours` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_97A0ADA3A76ED395` (`user_id`),
  CONSTRAINT `FK_97A0ADA3A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

CREATE TABLE `notes_ticket` (
  `notes_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  PRIMARY KEY (`notes_id`,`ticket_id`),
  KEY `IDX_41ECF9A3FC56F556` (`notes_id`),
  KEY `IDX_41ECF9A3700047D2` (`ticket_id`),
  CONSTRAINT `FK_41ECF9A3700047D2` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_41ECF9A3FC56F556` FOREIGN KEY (`notes_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;


INSERT INTO `user` (`id`, `name`, `lastname`, `username`, `password`, `date_created`, `status`) VALUES
(25, 'Randy Manuel', 'Vasquez Salcedo', 'Manuelv0321', '$2b$12$ca7dt/1q1r7mk1gu/bMy6eN1uOu4tv5VpYwtWZj2xtc2wi2xTEj1G', '2022-04-06 11:53:55', 'Active');
