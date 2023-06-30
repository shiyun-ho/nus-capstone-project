-- -----------------------------------------------------
-- Creating Schema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ecommerce`;

CREATE SCHEMA `ecommerce`;
USE `ecommerce` ;

-- -----------------------------------------------------
-- Table `ecommerce`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  `url` VARCHAR(255) DEFAULT NULL,
  `category_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

drop table product_category;

-- -----------------------------------------------------
-- Table `ecommerce`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`products` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT(20) DEFAULT NULL,
  `sku` VARCHAR(255) DEFAULT NULL,
  `product_type` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `unit_price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `product_url` VARCHAR(255) DEFAULT NULL,
  `brand` VARCHAR(255) DEFAULT NULL,
  `current_category` VARCHAR(255) DEFAULT NULL,
  `category_name` VARCHAR(255) DEFAULT NULL,
  `category_id` BIGINT(20) DEFAULT NULL,
  PRIMARY KEY (`id`), -- Change the primary key to `id`
  KEY `fk_product_id` (`product_id`), -- Add an index on the `product_id` column
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `ecommerce`.`product_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`product_details` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT(20) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `description` MEDIUMTEXT DEFAULT NULL,
  `rating_value` DECIMAL(13,2) DEFAULT NULL,
  `rating_count` BIGINT(20) DEFAULT NULL,
  `review_count` BIGINT(20) DEFAULT NULL,
  `best_rating` DECIMAL(13,2) DEFAULT NULL,
  `worst_rating` DECIMAL(13,2) DEFAULT NULL,
  `ingredients` MEDIUMTEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_id` (`product_id`),  
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;



-- -----------------------------------------------------
-- Table `ecommerce`.`product_reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`product_reviews` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT(20) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `reviews` MEDIUMTEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_id` (`product_id`),  
  CONSTRAINT `fk_product_id_reviews` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `ecommerce`.`product_details`: Wrong foreign key referenced
-- -----------------------------------------------------
ALTER TABLE `ecommerce`.`product_details`
DROP FOREIGN KEY `fk_product_id`;

SELECT pd.`product_id`
FROM `ecommerce`.`product_details` pd
LEFT JOIN `ecommerce`.`products` p ON pd.`product_id` = p.`id`
WHERE p.`id` IS NULL;

UPDATE `ecommerce`.`product_details`
SET `product_id` = NULL;

UPDATE `ecommerce`.`product_details`
JOIN `ecommerce`.`products` ON `product_details`.`id` = `products`.`id`
SET `product_details`.`product_id` = `products`.`id`;

ALTER TABLE `ecommerce`.`product_details`
ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`)
REFERENCES `products` (`id`);

-- -----------------------------------------------------
-- Table `ecommerce`.`product_reviews`: Wrong foreign key referenced
-- -----------------------------------------------------
ALTER TABLE `ecommerce`.`product_reviews`
DROP FOREIGN KEY `fk_product_id_reviews`;

UPDATE `ecommerce`.`product_reviews`
LEFT JOIN `ecommerce`.`products` ON `product_reviews`.`product_id` = `products`.`id`
SET `product_reviews`.`product_id` = NULL
WHERE `products`.`id` IS NULL;

UPDATE `ecommerce`.`product_reviews`
JOIN `ecommerce`.`products` ON `product_reviews`.`id` = `products`.`id`
SET `product_reviews`.`product_id` = `products`.`id`;

ALTER TABLE `ecommerce`.`product_reviews`
ADD CONSTRAINT `fk_product_id_reviews` FOREIGN KEY (`product_id`)
REFERENCES `products` (`id`);

/* ProductId is not updated correctly as there are multiple reviews. changes are made*/
UPDATE `ecommerce`.`product_reviews`
JOIN `ecommerce`.`products` ON `product_reviews`.`name` = `products`.`name`
SET `product_reviews`.`product_id` = `products`.`id`;

