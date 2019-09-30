CREATE TABLE `BUYER` (
  `Buyer_id` int(11) NOT NULL AUTO_INCREMENT,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Password` varchar(45) NOT NULL,
  `Image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Buyer_id`),
  UNIQUE KEY `buyer_id_UNIQUE` (`Buyer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ITEMS` (
  `Item_id` int(11) NOT NULL AUTO_INCREMENT,
  `Owner_id` int(11) NOT NULL,
  `Item_name` varchar(60) NOT NULL,
  `Item_des` varchar(100) DEFAULT NULL,
  `Item_image` varchar(100) DEFAULT NULL,
  `Item_price` int(11) DEFAULT NULL,
  `Section` varchar(45) DEFAULT NULL,
  `Res_name` varchar(50) NOT NULL,
  PRIMARY KEY (`Item_id`),
  UNIQUE KEY `Item_id_UNIQUE` (`Item_id`),
  KEY `FK_OWNER_idx` (`Res_name`),
  KEY `FK_RES_idx` (`Owner_id`,`Res_name`),
  CONSTRAINT `FK` FOREIGN KEY (`Owner_id`, `Res_name`) REFERENCES `owner` (`Owner_id`, `Res_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `OWNER` (
  `Owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) NOT NULL,
  `Res_name` varchar(50) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Res_address` varchar(100) DEFAULT NULL,
  `Res_zip` varchar(45) DEFAULT NULL,
  `Res_image` varchar(100) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Cuisine` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Owner_id`,`Res_name`),
  UNIQUE KEY `OWNER_id_UNIQUE` (`Owner_id`),
  UNIQUE KEY `Res_name_UNIQUE` (`Res_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ORDER` (
  `Order_id` int(11) NOT NULL,
  `Buyer_id` int(11) NOT NULL,
  `Item_id` int(11) NOT NULL,
  `Owner_id` int(11) NOT NULL,
  `Res_name` varchar(50) NOT NULL,
  `Order_status` varchar(45) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`Order_id`),
  UNIQUE KEY `Order_id_UNIQUE` (`Order_id`),
  KEY `FK_ORDER_BUYER_idx` (`Buyer_id`),
  KEY `FK_ORDER_ITEM_idx` (`Item_id`),
  KEY `FK_ORDER_OWNER_idx` (`Owner_id`,`Res_name`),
  CONSTRAINT `FK_ORDER_BUYER` FOREIGN KEY (`Buyer_id`) REFERENCES `buyer` (`Buyer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ORDER_ITEM` FOREIGN KEY (`Item_id`) REFERENCES `items` (`Item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ORDER_OWNER` FOREIGN KEY (`Owner_id`, `Res_name`) REFERENCES `owner` (`Owner_id`, `Res_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

