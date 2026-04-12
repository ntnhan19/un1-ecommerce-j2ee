CREATE DATABASE  IF NOT EXISTS `un1_ecommerce_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `un1_ecommerce_dev`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: un1_ecommerce_dev
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`),
  CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `cart_items_chk_1` CHECK ((`quantity` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (4,1,6,11,'Đen','M');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_64t7ox312pqal3p7fg9o503c2` (`user_id`),
  CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (6,1),(1,2),(2,3),(3,4),(4,5),(5,6);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('TOP','BOTTOM','DRESS','OUTERWEAR') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'','Áo Thun',NULL),(2,'','Áo Khoác',NULL),(3,'','Quần Jeans',NULL),(4,'','Pyjama',NULL),(5,'','Quần Tây',NULL),(6,'','Quần Nỉ',NULL),(7,'','Đồ Bầu',NULL),(8,'','Quần Leggings',NULL),(9,'','Áo Sơ Mi',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection_images`
--

DROP TABLE IF EXISTS `collection_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection_images` (
  `collection_id` bigint NOT NULL,
  `image_url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `FKjdlbyxp4i46lm2rwwxo29gubn` (`collection_id`),
  CONSTRAINT `FKjdlbyxp4i46lm2rwwxo29gubn` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_images`
--

LOCK TABLES `collection_images` WRITE;
/*!40000 ALTER TABLE `collection_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collections` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_active` bit(1) DEFAULT NULL,
  `cover_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collections`
--

LOCK TABLES `collections` WRITE;
/*!40000 ALTER TABLE `collections` DISABLE KEYS */;
/*!40000 ALTER TABLE `collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` decimal(38,2) NOT NULL,
  `quantity` int NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `order_items_chk_1` CHECK ((`price` >= 0)),
  CONSTRAINT `order_items_chk_2` CHECK ((`quantity` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,500000.00,2,1,14),(2,500000.00,1,2,14);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','SHIPPING','DELIVERED','CANCELED') NOT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `user_id` bigint NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2026-04-12 22:30:02.300607','PENDING',1000000.00,1,'69a Chu Văn An, 26, Bình Thạnh, Thành phố Hồ Chí Minh','0845065676'),(2,'2026-04-12 22:34:53.504067','PENDING',500000.00,1,'69, 26, Bình Thạnh, Thành phố Hồ Chí Minh','0845065676');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_collection_images`
--

DROP TABLE IF EXISTS `product_collection_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_collection_images` (
  `collection_id` bigint NOT NULL,
  `image_url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `FK3njxvnuw9k6jxrr7d6yod1in8` (`collection_id`),
  CONSTRAINT `FK3njxvnuw9k6jxrr7d6yod1in8` FOREIGN KEY (`collection_id`) REFERENCES `product_collections` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_collection_images`
--

LOCK TABLES `product_collection_images` WRITE;
/*!40000 ALTER TABLE `product_collection_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_collection_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_collections`
--

DROP TABLE IF EXISTS `product_collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_collections` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_active` bit(1) DEFAULT NULL,
  `cover_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_collections`
--

LOCK TABLES `product_collections` WRITE;
/*!40000 ALTER TABLE `product_collections` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_colors`
--

DROP TABLE IF EXISTS `product_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_colors` (
  `product_id` bigint NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `hex` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  KEY `FKqhu7cqni31911lmvx4fqmiw65` (`product_id`),
  CONSTRAINT `FKqhu7cqni31911lmvx4fqmiw65` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_colors`
--

LOCK TABLES `product_colors` WRITE;
/*!40000 ALTER TABLE `product_colors` DISABLE KEYS */;
INSERT INTO `product_colors` VALUES (3,'Hồng',NULL,NULL),(3,'Trắng',NULL,NULL),(3,'Be',NULL,NULL),(3,'Đen',NULL,NULL),(3,'Xám nhẹ',NULL,NULL),(3,'Đỏ',NULL,NULL),(4,'Hồng',NULL,NULL),(4,'Đen',NULL,NULL),(4,'Vàng',NULL,NULL),(4,'Be',NULL,NULL),(5,'Xám đậm',NULL,NULL),(5,'Đen',NULL,NULL),(5,'Olive',NULL,NULL),(6,'Trắng',NULL,NULL),(6,'Đen',NULL,NULL),(6,'Xám',NULL,NULL),(6,'Navy',NULL,NULL),(7,'Be',NULL,NULL),(7,'Navy',NULL,NULL),(8,'Trắng',NULL,NULL),(8,'Đen',NULL,NULL),(9,'Xanh lá',NULL,NULL),(9,'Trắng',NULL,NULL),(9,'Xám',NULL,NULL),(9,'Đen',NULL,NULL),(9,'Hồng',NULL,NULL),(9,'Xanh dương',NULL,NULL),(10,'Trắng',NULL,NULL),(11,'Trắng',NULL,NULL),(11,'Đen',NULL,NULL),(11,'Hồng',NULL,NULL),(11,'Xám',NULL,NULL),(11,'Vàng',NULL,NULL),(11,'Xanh lá',NULL,NULL),(11,'Xanh dương',NULL,NULL),(11,'Navy',NULL,NULL),(12,'Đen',NULL,NULL),(12,'Xám',NULL,NULL),(13,'Xanh dương',NULL,NULL),(14,'Trắng',NULL,NULL),(14,'Xanh dương',NULL,NULL);
/*!40000 ALTER TABLE `product_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image_urls`
--

DROP TABLE IF EXISTS `product_image_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image_urls` (
  `product_id` bigint NOT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci,
  KEY `FK8cnn3ywnlxdlahpdoj6riblst` (`product_id`),
  CONSTRAINT `FK8cnn3ywnlxdlahpdoj6riblst` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image_urls`
--

LOCK TABLES `product_image_urls` WRITE;
/*!40000 ALTER TABLE `product_image_urls` DISABLE KEYS */;
INSERT INTO `product_image_urls` VALUES (13,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464152/item/goods_09_464152_3x4.jpg?width=200'),(13,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464152/sub/goods_464152_sub14_3x4.jpg?width=200'),(13,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/464152/sub/vngoods_464152_sub17_3x4.jpg?width=200'),(13,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/464152/sub/vngoods_464152_sub18_3x4.jpg?width=200'),(12,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/469836/sub/goods_469836_sub14_3x4.jpg?width=200'),(12,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/469836/item/vngoods_09_469836_3x4.jpg?width=200'),(12,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/469836/sub/vngoods_469836_sub24_3x4.jpg?width=200'),(11,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483576/sub/goods_483576_sub14_3x4.jpg?width=200'),(11,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483576/item/vngoods_00_483576_3x4.jpg?width=200'),(11,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483576/sub/vngoods_483576_sub3_3x4.jpg?width=200'),(11,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483576/sub/goods_483576_sub11_3x4.jpg?width=200'),(14,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483755/sub/goods_483755_sub14_3x4.jpg?width=400'),(14,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483755/item/vngoods_01_483755_3x4.jpg?width=400'),(14,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483755/sub/vngoods_483755_sub3_3x4.jpg?width=400'),(10,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/486048/sub/goods_486048_sub14_3x4.jpg'),(10,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/486048/item/vngoods_01_486048_3x4.jpg'),(10,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/486048/item/vngoods_01_486048_3x4.jpg');
/*!40000 ALTER TABLE `product_image_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `product_id` bigint NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  KEY `FKqnq71xsohugpqwf3c9gxmsuy` (`product_id`),
  CONSTRAINT `FKqnq71xsohugpqwf3c9gxmsuy` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (3,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483281/sub/goods_483281_sub11_3x4.jpg?width=400'),(3,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483281/sub/vngoods_483281_sub4_3x4.jpg?width=400'),(3,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483281/item/vngoods_12_483281_3x4.jpg?width=400'),(3,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483281/sub/vngoods_483281_sub12_3x4.jpg?width=400'),(4,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/481602/item/vngoods_41_481602_3x4.jpg?width=400'),(4,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/481602/sub/vngoods_481602_sub3_3x4.jpg?width=400'),(4,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/481602/sub/vngoods_481602_sub4_3x4.jpg?width=400'),(4,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/481602/sub/goods_481602_sub14_3x4.jpg?width=400'),(5,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484033/item/vngoods_08_484033_3x4.jpg?width=400'),(5,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/484033/sub/goods_484033_sub14_3x4.jpg?width=400'),(6,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484508/item/vngoods_00_484508_3x4.jpg?width=400'),(6,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/484508/sub/goods_484508_sub1_3x4.jpg?width=400'),(6,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/484508/sub/goods_484508_sub2_3x4.jpg?width=400'),(6,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484508/sub/vngoods_484508_sub3_3x4.jpg?width=400'),(7,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484023/item/vngoods_31_484023_3x4.jpg?width=400'),(7,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484023/sub/vngoods_484023_sub3_3x4.jpg?width=400'),(7,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/484023/sub/goods_484023_sub11_3x4.jpg?width=400'),(7,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/484023/sub/goods_484023_sub12_3x4.jpg?width=400'),(8,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/482291/item/goods_09_482291_3x4.jpg?width=400'),(8,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/482291/sub/goods_482291_sub3_3x4.jpg'),(8,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/482291/sub/goods_482291_sub14_3x4.jpg?width=400'),(9,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/485671/item/vngoods_54_485671_3x4.jpg?width=400'),(9,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/485671/sub/vngoods_485671_sub3_3x4.jpg?width=400'),(9,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/485671/sub/vngoods_485671_sub4_3x4.jpg?width=400'),(9,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/485671/sub/goods_485671_sub11_3x4.jpg?width=400'),(9,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/485671/sub/vngoods_485671_sub12_3x4.jpg?width=400'),(10,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/486048/item/vngoods_01_486048_3x4.jpg?width=400'),(10,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/486048/sub/vngoods_486048_sub3_3x4.jpg?width=400'),(10,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/486048/sub/goods_486048_sub14_3x4.jpg?width=400'),(11,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483576/item/vngoods_00_483576_3x4.jpg?width=400'),(11,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483576/sub/vngoods_483576_sub3_3x4.jpg?width=400'),(11,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483576/sub/vngoods_483576_sub4_3x4.jpg?width=400'),(11,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483576/sub/goods_483576_sub11_3x4.jpg?width=400'),(11,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483576/sub/goods_483576_sub12_3x4.jpg?width=400'),(11,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483576/sub/goods_483576_sub14_3x4.jpg?width=400'),(12,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/469836/item/vngoods_09_469836_3x4.jpg?width=400'),(12,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/469836/sub/goods_469836_sub14_3x4.jpg?width=400'),(12,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/469836/sub/vngoods_469836_sub24_3x4.jpg?width=400'),(12,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/469836/sub/vngoods_469836_sub25_3x4.jpg?width=400'),(13,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464153/item/goods_68_464153_3x4.jpg?width=400'),(13,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/464153/sub/vngoods_464153_sub17_3x4.jpg?width=400'),(14,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483755/item/vngoods_01_483755_3x4.jpg?width=400'),(14,'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483755/sub/vngoods_483755_sub3_3x4.jpg?width=400'),(14,'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483755/sub/goods_483755_sub14_3x4.jpg?width=400');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sizes`
--

DROP TABLE IF EXISTS `product_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sizes` (
  `product_id` bigint NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  KEY `FK4isa0j51hpdn7cx04m831jic4` (`product_id`),
  CONSTRAINT `FK4isa0j51hpdn7cx04m831jic4` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sizes`
--

LOCK TABLES `product_sizes` WRITE;
/*!40000 ALTER TABLE `product_sizes` DISABLE KEYS */;
INSERT INTO `product_sizes` VALUES (3,'S'),(3,'M'),(3,'L'),(3,'XL'),(4,'S'),(4,'M'),(4,'L'),(4,'XL'),(5,'58'),(5,'61'),(5,'64'),(5,'67'),(5,'70'),(6,'S'),(6,'M'),(6,'L'),(6,'XL'),(7,'S'),(7,'M'),(7,'L'),(7,'XL'),(8,'S'),(8,'M'),(8,'L'),(9,'XS'),(9,'S'),(9,'M'),(9,'L'),(9,'XL'),(10,'S'),(10,'M'),(10,'L'),(10,'XL'),(11,'XS'),(11,'S'),(11,'M'),(11,'L'),(11,'XL'),(11,'XXL'),(12,'XS'),(12,'S'),(12,'M'),(12,'L'),(12,'XL'),(12,'XXL'),(13,'S'),(13,'M'),(13,'L'),(13,'XL'),(14,'S'),(14,'M'),(14,'L'),(14,'XL');
/*!40000 ALTER TABLE `product_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variants` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `color_hex` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body_length` double DEFAULT NULL,
  `chest_width` double DEFAULT NULL,
  `hip_width` double DEFAULT NULL,
  `shoulder_width` double DEFAULT NULL,
  `sleeve_length` double DEFAULT NULL,
  `waist_width` double DEFAULT NULL,
  `size` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL,
  `product_id` bigint NOT NULL,
  `inseam` double DEFAULT NULL,
  `thigh_width` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKosqitn4s405cynmhb87lkvuau` (`product_id`),
  CONSTRAINT `FKosqitn4s405cynmhb87lkvuau` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (9,'#ccd9f5','LIGHT BLUE',56,49,NULL,39.5,NULL,NULL,'S',13,14,NULL,NULL),(10,'#faf4f4','OFF WHITE',56,49,NULL,39.5,NULL,NULL,'S',7,14,NULL,NULL),(11,'#ccd9f5','LIGHT BLUE',58,51,NULL,40.5,NULL,NULL,'M',13,14,NULL,NULL),(12,'#faf4f4','OFF WHITE',58,51,NULL,39.5,NULL,NULL,'M',13,14,NULL,NULL),(13,'#ccd9f5','LIGHT BLUE',60,53.5,NULL,41.5,NULL,NULL,'L',12,14,NULL,NULL),(14,'#faf4f4','OFF WHITE',60,53.5,NULL,41.5,NULL,NULL,'L',12,14,NULL,NULL),(15,'#ccd9f5','LIGHT BLUE',62,56.5,NULL,43,NULL,NULL,'XL',12,14,NULL,NULL),(16,'#faf4f4','OFF WHITE',62,56.5,NULL,43,NULL,NULL,'XL',12,14,NULL,NULL),(17,'#111111','Đen',70,NULL,78,NULL,NULL,72,'S',10,13,14.5,25),(18,'#111111','Đen',70,NULL,82,NULL,NULL,76,'M',10,13,15,26.5),(19,'#111111','Đen',70,NULL,86.5,NULL,NULL,80,'L',10,13,16,27.5),(20,'#111111','Đen',70,NULL,92.5,NULL,NULL,86,'XL',10,13,16.5,29.5),(21,'#111111','Đen',NULL,NULL,61,NULL,NULL,54,'XS',10,12,64,NULL),(22,'#4e4b4b','Xám Đậm',NULL,NULL,61,NULL,NULL,54,'XS',10,12,64,NULL),(23,'#111111','Đen',NULL,NULL,65,NULL,NULL,58,'S',10,12,66,NULL),(24,'#4e4b4b','Xám Đậm',NULL,NULL,65,NULL,NULL,58,'S',10,12,66,NULL),(25,'#111111','Đen',NULL,NULL,69,NULL,NULL,62,'M',10,12,66,NULL),(26,'#4e4b4b','Xám Đậm',NULL,NULL,69,NULL,NULL,62,'M',10,12,66,NULL),(27,'#111111','Đen',NULL,NULL,75,NULL,NULL,68,'L',10,12,66,NULL),(28,'#4e4b4b','Xám Đậm',NULL,NULL,75,NULL,NULL,68,'L',10,12,66,NULL),(29,'#111111','Đen',NULL,NULL,81,NULL,NULL,74,'XL',10,12,66,NULL),(30,'#4e4b4b','Xám Đậm',NULL,NULL,81,NULL,NULL,74,'XL',10,12,66,NULL),(31,'#111111','Đen',NULL,NULL,87,NULL,NULL,80,'XXL',10,12,66,NULL),(32,'#4e4b4b','Xám Đậm',NULL,NULL,87,NULL,NULL,80,'XXL',10,12,66,NULL),(33,'#F5F5F5','Trắng',54.5,NULL,NULL,37,33.5,42.5,'S',10,11,NULL,NULL),(34,'#9CA3AF','Xám',54.5,NULL,NULL,37,33.5,42.5,'S',10,11,NULL,NULL),(35,'#111111','Đen',54.5,NULL,NULL,37,33.5,42.5,'S',10,11,NULL,NULL),(36,'#F5F5F5','Trắng',56.5,NULL,NULL,38,34.5,45,'M',10,11,NULL,NULL),(37,'#9CA3AF','Xám',56.5,NULL,NULL,38,34.5,45,'M',10,11,NULL,NULL),(38,'#111111','Đen',56.5,NULL,NULL,38,34.5,45,'M',10,11,NULL,NULL),(39,'#F5F5F5','Trắng',58.5,NULL,NULL,39,36,58.5,'L',10,11,NULL,NULL),(40,'#9CA3AF','Xám',58.5,NULL,NULL,39,36,58.5,'L',10,11,NULL,NULL),(41,'#111111','Đen',58.5,NULL,NULL,39,36,58.5,'L',10,11,NULL,NULL),(42,'#f2f0ef','OFF WHITE',59,NULL,NULL,42,76,50,'S',10,10,NULL,NULL),(43,'#f2f0ef','OFF WHITE',61,NULL,NULL,43,78,52,'M',10,10,NULL,NULL),(44,'#f2f0ef','OFF WHITE',63,NULL,NULL,44,79.5,54,'L',10,10,NULL,NULL),(45,'#f2f0ef','OFF WHITE',65,NULL,NULL,45.5,80.5,57,'XL',10,10,NULL,NULL);
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(19,2) NOT NULL,
  `stock` int NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `name_unsigned` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featured` bit(1) NOT NULL,
  `colors` text COLLATE utf8mb4_unicode_ci,
  `sizes` text COLLATE utf8mb4_unicode_ci,
  `gender` enum('MALE','FEMALE','UNISEX') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_type` enum('TOP','BOTTOM','DRESS','OUTERWEAR') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`),
  CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_chk_1` CHECK ((`price` >= 0)),
  CONSTRAINT `products_chk_2` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'Chi Tiết\r\n\r\n- Cổ cao giúp che chắn tốt bên trong.\r\n- Áo có mũ trùm đầu kiểu dáng tinh tế, vừa vặn.\r\n- UPF50+ / JIS L 1925 : 2019\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng ôm\r\n- Túi: Có túi\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\nMã sản phẩm: 483281\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\n\r\nChất liệu / Cách chăm sóc\r\n\r\nVải\r\n[00 WHITE] Thân: 72% Polyeste, 28% Elastan/ Vải Túi: 100% Polyeste [Other Colors] Thân: 74% Nylon, 26% Elastan/ Vải Túi: 100% Polyeste\r\n\r\nHướng dẫn giặt\r\nGiặt máy nước lạnh, giặt nhẹ, Không giặt khô, Không sấy khô\r\n\r\n\r\n\r\n\r\nGiao Hàng / Đổi / Trả Hàng\r\n\r\nGiao Hàng\r\n\r\nPhí giao hàng: Phí giao hàng đến địa chỉ nhận hàng là 50.000 đồng cho đơn hàng dưới 500.000 đồng và miễn phí cho đơn hàng từ 500.000 đồng trở lên; Giao hàng đến cửa hàng UNIQLO được miễn phí vận chuyển, không giới hạn đơn hàng tối thiểu.\r\nThời gian giao hàng: Thời gian ước tính sẽ hiển thị tại trang thanh toán sau khi chọn phương thức giao hàng mong muốn.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết thêm chi tiết.\r\n\r\nĐổi / Trả Hàng\r\n\r\nTrả hàng: Đối với đơn hàng thanh toán qua phương thức Thanh toán trực tuyến, vui lòng đăng ký trực tuyến và trả lại kho; bên cạnh đó, với hình thức COD hoặc Thanh toán tại cửa hàng (Tiền mặt, Mã QR), quý khách sẽ nhận thêm email từ Trung tâm Chăm sóc Khách hàng để cung cấp thông tin tài khoản hỗ trợ cho việc hoàn tiền.\r\nĐổi hàng: Quý khách có thể đổi hàng tại bất kỳ cửa hàng UNIQLO trên toàn quốc. Cửa hàng trực tuyến UNIQLO không hỗ trợ đổi hàng.\r\nHạn chót đổi trả: Trong vòng 30 ngày kể từ ngày giao sản phẩm.\r\nPhí vận chuyển trả hàng: Quý khách chịu phí vận chuyển trả hàng trừ khi đơn hàng nhận được không chính xác.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết đầy đủ Điều kiện và Lưu ý về việc Đổi và Hoàn trả.\r\n\r\n\r\nSản xuất\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất sau 24FW.\r\n\r\nSản xuất: Vietnam\r\n\r\nThương hiệu của chúng tôi liên tục nỗ lực cải thiện việc xác minh chuỗi cung ứng, cả nội bộ và với các bên thứ ba, nhằm đảm bảo hiểu rõ nguồn gốc nguyên vật liệu thô và địa điểm sản xuất sợi, vải, may, đan và lắp ráp. Việc xác minh này giúp chúng tôi nâng cao chất lượng quần áo và duy trì các tiêu chuẩn sản xuất an toàn và có trách nhiệm. Chúng tôi cũng tiếp tục cung cấp thông tin này để khách hàng có thể đưa ra quyết định sáng suốt về trang phục cho khách hàng.\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất vào mùa Thu/Đông 2024.','AIRism Áo Khoác Chống Tia UV Siêu Co Giãn Kéo Khóa',600000.00,100,2,'2026-03-28 17:26:51.690716','2026-03-28 17:26:51.690716','airism áo khoác chống tia uv siêu co giãn kéo khóa',_binary '\0',NULL,NULL,NULL,NULL),(4,'Chi Tiết\r\n\r\n- Versatile design for casual styling.\r\n- Reversible design can be worn two ways.\r\n\r\nChi tiết về chức năng\r\n- Dáng: Dáng thoải mái\r\n- Túi: Có túi(Túi trong)\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\nMã sản phẩm: 481602\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\n\r\nChất liệu / Cách chăm sóc\r\n\r\nVải\r\nMặt Trước: 100% Nylon/ Mặt Trong: 100% Polyeste/ Vải Túi: 100% Polyeste\r\n\r\nHướng dẫn giặt\r\nGiặt tay nước lạnh, Không giặt khô, Không sấy khô\r\n\r\n\r\n\r\n\r\nGiao Hàng / Đổi / Trả Hàng\r\n\r\nGiao Hàng\r\n\r\nPhí giao hàng: Phí giao hàng đến địa chỉ nhận hàng là 50.000 đồng cho đơn hàng dưới 500.000 đồng và miễn phí cho đơn hàng từ 500.000 đồng trở lên; Giao hàng đến cửa hàng UNIQLO được miễn phí vận chuyển, không giới hạn đơn hàng tối thiểu.\r\nThời gian giao hàng: Thời gian ước tính sẽ hiển thị tại trang thanh toán sau khi chọn phương thức giao hàng mong muốn.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết thêm chi tiết.\r\n\r\nĐổi / Trả Hàng\r\n\r\nTrả hàng: Đối với đơn hàng thanh toán qua phương thức Thanh toán trực tuyến, vui lòng đăng ký trực tuyến và trả lại kho; bên cạnh đó, với hình thức COD hoặc Thanh toán tại cửa hàng (Tiền mặt, Mã QR), quý khách sẽ nhận thêm email từ Trung tâm Chăm sóc Khách hàng để cung cấp thông tin tài khoản hỗ trợ cho việc hoàn tiền.\r\nĐổi hàng: Quý khách có thể đổi hàng tại bất kỳ cửa hàng UNIQLO trên toàn quốc. Cửa hàng trực tuyến UNIQLO không hỗ trợ đổi hàng.\r\nHạn chót đổi trả: Trong vòng 30 ngày kể từ ngày giao sản phẩm.\r\nPhí vận chuyển trả hàng: Quý khách chịu phí vận chuyển trả hàng trừ khi đơn hàng nhận được không chính xác.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết đầy đủ Điều kiện và Lưu ý về việc Đổi và Hoàn trả.\r\n\r\n\r\nSản xuất\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất sau 24FW.\r\n\r\nSản xuất: Vietnam\r\n\r\nThương hiệu của chúng tôi liên tục nỗ lực cải thiện việc xác minh chuỗi cung ứng, cả nội bộ và với các bên thứ ba, nhằm đảm bảo hiểu rõ nguồn gốc nguyên vật liệu thô và địa điểm sản xuất sợi, vải, may, đan và lắp ráp. Việc xác minh này giúp chúng tôi nâng cao chất lượng quần áo và duy trì các tiêu chuẩn sản xuất an toàn và có trách nhiệm. Chúng tôi cũng tiếp tục cung cấp thông tin này để khách hàng có thể đưa ra quyết định sáng suốt về trang phục cho khách hàng.\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất vào mùa Thu/Đông 2024.','Áo Khoác Hai Mặt',800000.00,100,2,'2026-03-28 17:28:08.556853','2026-03-28 17:28:08.556853','áo khoác hai mặt',_binary '\0',NULL,NULL,NULL,NULL),(5,'Chi Tiết\r\n\r\n\r\n\r\nChi tiết về chức năng\r\n- Dáng: Dáng suông\r\n- Phom dáng: Ống suông\r\n- Túi: Có túi\r\n- Cạp quần: Lưng tương đối cao\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\nMã sản phẩm: 484033\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\n\r\nChất liệu / Cách chăm sóc\r\n\r\nVải\r\nThân: 100% Polyeste/ Vải Túi: 80% Polyeste, 20% Bông\r\n\r\nHướng dẫn giặt\r\nGiặt máy nước lạnh, giặt nhẹ, Giặt khô, Không sấy khô\r\n\r\n\r\n\r\n\r\nGiao Hàng / Đổi / Trả Hàng\r\n\r\nGiao Hàng\r\n\r\nPhí giao hàng: Phí giao hàng đến địa chỉ nhận hàng là 50.000 đồng cho đơn hàng dưới 500.000 đồng và miễn phí cho đơn hàng từ 500.000 đồng trở lên; Giao hàng đến cửa hàng UNIQLO được miễn phí vận chuyển, không giới hạn đơn hàng tối thiểu.\r\nThời gian giao hàng: Thời gian ước tính sẽ hiển thị tại trang thanh toán sau khi chọn phương thức giao hàng mong muốn.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết thêm chi tiết.\r\n\r\nĐổi / Trả Hàng\r\n\r\nTrả hàng: Đối với đơn hàng thanh toán qua phương thức Thanh toán trực tuyến, vui lòng đăng ký trực tuyến và trả lại kho; bên cạnh đó, với hình thức COD hoặc Thanh toán tại cửa hàng (Tiền mặt, Mã QR), quý khách sẽ nhận thêm email từ Trung tâm Chăm sóc Khách hàng để cung cấp thông tin tài khoản hỗ trợ cho việc hoàn tiền.\r\nĐổi hàng: Quý khách có thể đổi hàng tại bất kỳ cửa hàng UNIQLO trên toàn quốc. Cửa hàng trực tuyến UNIQLO không hỗ trợ đổi hàng.\r\nHạn chót đổi trả: Trong vòng 30 ngày kể từ ngày giao sản phẩm.\r\nPhí vận chuyển trả hàng: Quý khách chịu phí vận chuyển trả hàng trừ khi đơn hàng nhận được không chính xác.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết đầy đủ Điều kiện và Lưu ý về việc Đổi và Hoàn trả.\r\n\r\n\r\nSản xuất\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất sau 24FW.\r\n\r\nSản xuất: China\r\n\r\nThương hiệu của chúng tôi liên tục nỗ lực cải thiện việc xác minh chuỗi cung ứng, cả nội bộ và với các bên thứ ba, nhằm đảm bảo hiểu rõ nguồn gốc nguyên vật liệu thô và địa điểm sản xuất sợi, vải, may, đan và lắp ráp. Việc xác minh này giúp chúng tôi nâng cao chất lượng quần áo và duy trì các tiêu chuẩn sản xuất an toàn và có trách nhiệm. Chúng tôi cũng tiếp tục cung cấp thông tin này để khách hàng có thể đưa ra quyết định sáng suốt về trang phục cho khách hàng.\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất vào mùa Thu/Đông 2024.','Quần Dài Cạp Cao Ống Suông',980000.00,100,2,'2026-03-28 17:29:17.358520','2026-03-28 17:29:17.358520','quần dài cạp cao ống suông',_binary '\0',NULL,NULL,NULL,NULL),(6,'Chi Tiết\r\n\r\n- Simple, versatile striped pattern with thin lines.\r\n- The fabric creates a sleek silhouette.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng rộng thoải mái\r\n- Túi: Không túi\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n- Quần áo sử dụng vật liệu tái chế là một phần trong nỗ lực của chúng tôi nhằm hỗ trợ giảm thiểu chất thải và sử dụng vật liệu mới. Tỷ lệ vật liệu tái chế khác nhau tùy theo từng sản phẩm. Vui lòng kiểm tra \'Vật liệu\' trên tag giá hoặc nhãn chăm sóc để biết chi tiết.\r\n\r\nMã sản phẩm: 484508\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\n\r\nChất liệu / Cách chăm sóc\r\n\r\nVải\r\n53% Bông, 47% Polyeste ( 30% Sử Dụng Sợi Polyeste Tái Chế )\r\n\r\nHướng dẫn giặt\r\nGiặt máy nước lạnh, Giặt khô, Không sấy khô\r\n\r\n\r\n\r\n\r\nGiao Hàng / Đổi / Trả Hàng\r\n\r\nGiao Hàng\r\n\r\nPhí giao hàng: Phí giao hàng đến địa chỉ nhận hàng là 50.000 đồng cho đơn hàng dưới 500.000 đồng và miễn phí cho đơn hàng từ 500.000 đồng trở lên; Giao hàng đến cửa hàng UNIQLO được miễn phí vận chuyển, không giới hạn đơn hàng tối thiểu.\r\nThời gian giao hàng: Thời gian ước tính sẽ hiển thị tại trang thanh toán sau khi chọn phương thức giao hàng mong muốn.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết thêm chi tiết.\r\n\r\nĐổi / Trả Hàng\r\n\r\nTrả hàng: Đối với đơn hàng thanh toán qua phương thức Thanh toán trực tuyến, vui lòng đăng ký trực tuyến và trả lại kho; bên cạnh đó, với hình thức COD hoặc Thanh toán tại cửa hàng (Tiền mặt, Mã QR), quý khách sẽ nhận thêm email từ Trung tâm Chăm sóc Khách hàng để cung cấp thông tin tài khoản hỗ trợ cho việc hoàn tiền.\r\nĐổi hàng: Quý khách có thể đổi hàng tại bất kỳ cửa hàng UNIQLO trên toàn quốc. Cửa hàng trực tuyến UNIQLO không hỗ trợ đổi hàng.\r\nHạn chót đổi trả: Trong vòng 30 ngày kể từ ngày giao sản phẩm.\r\nPhí vận chuyển trả hàng: Quý khách chịu phí vận chuyển trả hàng trừ khi đơn hàng nhận được không chính xác.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết đầy đủ Điều kiện và Lưu ý về việc Đổi và Hoàn trả.\r\n\r\n\r\nSản xuất\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất sau 24FW.\r\n\r\nSản xuất: Vietnam\r\n\r\nThương hiệu của chúng tôi liên tục nỗ lực cải thiện việc xác minh chuỗi cung ứng, cả nội bộ và với các bên thứ ba, nhằm đảm bảo hiểu rõ nguồn gốc nguyên vật liệu thô và địa điểm sản xuất sợi, vải, may, đan và lắp ráp. Việc xác minh này giúp chúng tôi nâng cao chất lượng quần áo và duy trì các tiêu chuẩn sản xuất an toàn và có trách nhiệm. Chúng tôi cũng tiếp tục cung cấp thông tin này để khách hàng có thể đưa ra quyết định sáng suốt về trang phục cho khách hàng.\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất vào mùa Thu/Đông 2024.','AIRism Cotton Áo Thun Dáng Rộng | Kẻ Sọc',391000.00,100,1,'2026-03-28 17:31:03.377189','2026-03-28 17:31:03.377189','airism cotton áo thun dáng rộng | kẻ sọc',_binary '\0',NULL,NULL,NULL,NULL),(7,'Chi Tiết\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng suông\r\n- Túi: Không túi\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\nMã sản phẩm: 484023\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\n\r\nChất liệu / Cách chăm sóc\r\n\r\nVải\r\n60% Bông, 40% Modal\r\n\r\nHướng dẫn giặt\r\nGiặt máy nước lạnh, giặt nhẹ, Giặt khô, Không sấy khô\r\n\r\n\r\n\r\n\r\nGiao Hàng / Đổi / Trả Hàng\r\n\r\nGiao Hàng\r\n\r\nPhí giao hàng: Phí giao hàng đến địa chỉ nhận hàng là 50.000 đồng cho đơn hàng dưới 500.000 đồng và miễn phí cho đơn hàng từ 500.000 đồng trở lên; Giao hàng đến cửa hàng UNIQLO được miễn phí vận chuyển, không giới hạn đơn hàng tối thiểu.\r\nThời gian giao hàng: Thời gian ước tính sẽ hiển thị tại trang thanh toán sau khi chọn phương thức giao hàng mong muốn.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết thêm chi tiết.\r\n\r\nĐổi / Trả Hàng\r\n\r\nTrả hàng: Đối với đơn hàng thanh toán qua phương thức Thanh toán trực tuyến, vui lòng đăng ký trực tuyến và trả lại kho; bên cạnh đó, với hình thức COD hoặc Thanh toán tại cửa hàng (Tiền mặt, Mã QR), quý khách sẽ nhận thêm email từ Trung tâm Chăm sóc Khách hàng để cung cấp thông tin tài khoản hỗ trợ cho việc hoàn tiền.\r\nĐổi hàng: Quý khách có thể đổi hàng tại bất kỳ cửa hàng UNIQLO trên toàn quốc. Cửa hàng trực tuyến UNIQLO không hỗ trợ đổi hàng.\r\nHạn chót đổi trả: Trong vòng 30 ngày kể từ ngày giao sản phẩm.\r\nPhí vận chuyển trả hàng: Quý khách chịu phí vận chuyển trả hàng trừ khi đơn hàng nhận được không chính xác.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết đầy đủ Điều kiện và Lưu ý về việc Đổi và Hoàn trả.\r\n\r\n\r\nSản xuất\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất sau 24FW.\r\n\r\nSản xuất: Vietnam\r\n\r\nThương hiệu của chúng tôi liên tục nỗ lực cải thiện việc xác minh chuỗi cung ứng, cả nội bộ và với các bên thứ ba, nhằm đảm bảo hiểu rõ nguồn gốc nguyên vật liệu thô và địa điểm sản xuất sợi, vải, may, đan và lắp ráp. Việc xác minh này giúp chúng tôi nâng cao chất lượng quần áo và duy trì các tiêu chuẩn sản xuất an toàn và có trách nhiệm. Chúng tôi cũng tiếp tục cung cấp thông tin này để khách hàng có thể đưa ra quyết định sáng suốt về trang phục cho khách hàng.\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất vào mùa Thu/Đông 2024.','Áo Len Polo',489000.00,100,2,'2026-03-28 17:48:26.221892','2026-03-28 17:48:26.221892','áo len polo',_binary '\0',NULL,NULL,NULL,NULL),(8,'Chi Tiết\r\n\r\n- Voluminous mini skirt.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu (Chỉ 01 OFF WHITE xuyên thấu nhẹ )\r\n- Vải lót: Có vải lót\r\n- Túi: Không túi\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\nMã sản phẩm: 482291\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\n\r\nChất liệu / Cách chăm sóc\r\n\r\nVải\r\nShell: 99% Bông, 1% Elastan/ Lớp Lót: 100% Polyeste\r\n\r\nHướng dẫn giặt\r\nGiặt máy nước lạnh, giặt nhẹ, Giặt khô, Không sấy khô\r\n\r\n\r\n\r\n\r\nGiao Hàng / Đổi / Trả Hàng\r\n\r\nGiao Hàng\r\n\r\nPhí giao hàng: Phí giao hàng đến địa chỉ nhận hàng là 50.000 đồng cho đơn hàng dưới 500.000 đồng và miễn phí cho đơn hàng từ 500.000 đồng trở lên; Giao hàng đến cửa hàng UNIQLO được miễn phí vận chuyển, không giới hạn đơn hàng tối thiểu.\r\nThời gian giao hàng: Thời gian ước tính sẽ hiển thị tại trang thanh toán sau khi chọn phương thức giao hàng mong muốn.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết thêm chi tiết.\r\n\r\nĐổi / Trả Hàng\r\n\r\nTrả hàng: Đối với đơn hàng thanh toán qua phương thức Thanh toán trực tuyến, vui lòng đăng ký trực tuyến và trả lại kho; bên cạnh đó, với hình thức COD hoặc Thanh toán tại cửa hàng (Tiền mặt, Mã QR), quý khách sẽ nhận thêm email từ Trung tâm Chăm sóc Khách hàng để cung cấp thông tin tài khoản hỗ trợ cho việc hoàn tiền.\r\nĐổi hàng: Quý khách có thể đổi hàng tại bất kỳ cửa hàng UNIQLO trên toàn quốc. Cửa hàng trực tuyến UNIQLO không hỗ trợ đổi hàng.\r\nHạn chót đổi trả: Trong vòng 30 ngày kể từ ngày giao sản phẩm.\r\nPhí vận chuyển trả hàng: Quý khách chịu phí vận chuyển trả hàng trừ khi đơn hàng nhận được không chính xác.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết đầy đủ Điều kiện và Lưu ý về việc Đổi và Hoàn trả.\r\n\r\n\r\nSản xuất\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất sau 24FW.\r\n\r\nSản xuất: Vietnam\r\n\r\nThương hiệu của chúng tôi liên tục nỗ lực cải thiện việc xác minh chuỗi cung ứng, cả nội bộ và với các bên thứ ba, nhằm đảm bảo hiểu rõ nguồn gốc nguyên vật liệu thô và địa điểm sản xuất sợi, vải, may, đan và lắp ráp. Việc xác minh này giúp chúng tôi nâng cao chất lượng quần áo và duy trì các tiêu chuẩn sản xuất an toàn và có trách nhiệm. Chúng tôi cũng tiếp tục cung cấp thông tin này để khách hàng có thể đưa ra quyết định sáng suốt về trang phục cho khách hàng.\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất vào mùa Thu/Đông 2024.','Chân Váy Mini Vải Seersucker Dáng Phồng',588000.00,100,2,'2026-03-28 17:49:46.509178','2026-03-28 17:49:46.509178','chân váy mini vải seersucker dáng phồng',_binary '\0',NULL,NULL,NULL,NULL),(9,'Chi Tiết\r\n\r\n- Relaxed silhouette with raglan sleeves, perfect for everyday wear.\r\n- UPF50+ / JIS L 1925 : 2019\r\n\r\nChi tiết về chức năng\r\n- Dáng: Dáng rộng thoải mái\r\n- Túi: Có túi\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n- Quần áo sử dụng vật liệu tái chế là một phần trong nỗ lực của chúng tôi nhằm hỗ trợ giảm thiểu chất thải và sử dụng vật liệu mới. Tỷ lệ vật liệu tái chế khác nhau tùy theo từng sản phẩm. Vui lòng kiểm tra \'Vật liệu\' trên tag giá hoặc nhãn chăm sóc để biết chi tiết.\r\n\r\nMã sản phẩm: 485671\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\n\r\nChất liệu / Cách chăm sóc\r\n\r\nVải\r\nThân: 100% Polyeste ( 50% Sử Dụng Sợi Polyeste Tái Chế )/ Vải Túi: 100% Polyeste\r\n\r\nHướng dẫn giặt\r\nGiặt máy nước lạnh, giặt nhẹ, Không giặt khô, Không sấy khô\r\n\r\n\r\n\r\n\r\nGiao Hàng / Đổi / Trả Hàng\r\n\r\nGiao Hàng\r\n\r\nPhí giao hàng: Phí giao hàng đến địa chỉ nhận hàng là 50.000 đồng cho đơn hàng dưới 500.000 đồng và miễn phí cho đơn hàng từ 500.000 đồng trở lên; Giao hàng đến cửa hàng UNIQLO được miễn phí vận chuyển, không giới hạn đơn hàng tối thiểu.\r\nThời gian giao hàng: Thời gian ước tính sẽ hiển thị tại trang thanh toán sau khi chọn phương thức giao hàng mong muốn.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết thêm chi tiết.\r\n\r\nĐổi / Trả Hàng\r\n\r\nTrả hàng: Đối với đơn hàng thanh toán qua phương thức Thanh toán trực tuyến, vui lòng đăng ký trực tuyến và trả lại kho; bên cạnh đó, với hình thức COD hoặc Thanh toán tại cửa hàng (Tiền mặt, Mã QR), quý khách sẽ nhận thêm email từ Trung tâm Chăm sóc Khách hàng để cung cấp thông tin tài khoản hỗ trợ cho việc hoàn tiền.\r\nĐổi hàng: Quý khách có thể đổi hàng tại bất kỳ cửa hàng UNIQLO trên toàn quốc. Cửa hàng trực tuyến UNIQLO không hỗ trợ đổi hàng.\r\nHạn chót đổi trả: Trong vòng 30 ngày kể từ ngày giao sản phẩm.\r\nPhí vận chuyển trả hàng: Quý khách chịu phí vận chuyển trả hàng trừ khi đơn hàng nhận được không chính xác.\r\nTruy cập \r\nKiểm tra tại đây\r\n để biết đầy đủ Điều kiện và Lưu ý về việc Đổi và Hoàn trả.\r\n\r\n\r\nSản xuất\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất sau 24FW.\r\n\r\nSản xuất: Vietnam\r\n\r\nThương hiệu của chúng tôi liên tục nỗ lực cải thiện việc xác minh chuỗi cung ứng, cả nội bộ và với các bên thứ ba, nhằm đảm bảo hiểu rõ nguồn gốc nguyên vật liệu thô và địa điểm sản xuất sợi, vải, may, đan và lắp ráp. Việc xác minh này giúp chúng tôi nâng cao chất lượng quần áo và duy trì các tiêu chuẩn sản xuất an toàn và có trách nhiệm. Chúng tôi cũng tiếp tục cung cấp thông tin này để khách hàng có thể đưa ra quyết định sáng suốt về trang phục cho khách hàng.\r\n\r\n*Thông tin về địa điểm sản xuất vật liệu áp dụng cho các sản phẩm được sản xuất vào mùa Thu/Đông 2024.','Áo Parka Chống Tia UV Bỏ Túi | NANO Design',784000.00,100,2,'2026-03-28 17:51:39.303195','2026-03-28 17:51:39.303195','áo parka chống tia uv bỏ túi | nano design',_binary '\0',NULL,NULL,NULL,NULL),(10,'- Hip length is great for layering or wearing on its own.\n- Vibrant striped pattern.\n- Dáng: Dáng thoải mái\n- Túi: Có túi','Áo Khoác Vải Pha Linen| Kẻ Sọc',784000.00,40,2,'2026-03-28 17:53:09.081159','2026-03-28 17:53:09.081159','áo khoác vải pha linen| kẻ sọc',_binary '','[{\"name\":\"OFF WHITE\",\"hex\":\"#f2f0ef\"}]','[\"S\",\"M\",\"L\",\"XL\"]','FEMALE','OUTERWEAR'),(11,'- Kiểu dáng casual, phù hợp khi mặc riêng hoặc kết hợp với trang phục nhiều lớp.','Áo Thun Slub Jersey | Cổ V',293000.00,90,1,'2026-03-28 17:55:22.942960','2026-03-28 17:55:22.942960','áo thun slub jersey | cổ v',_binary '\0','[{\"name\":\"Trắng\",\"hex\":\"#F5F5F5\"},{\"name\":\"Xám\",\"hex\":\"#9CA3AF\"},{\"name\":\"Đen\",\"hex\":\"#111111\"}]','[\"S\",\"M\",\"L\"]','FEMALE','TOP'),(12,'- Giữ ấm từ vùng bụng đến tận mắt cá chân.\n\n- Quần áo sử dụng vật liệu tái chế là một phần trong nỗ lực của chúng tôi nhằm hỗ trợ giảm thiểu chất thải và sử dụng vật liệu mới. Tỷ lệ vật liệu tái chế khác nhau tùy theo từng sản phẩm. Vui lòng kiểm tra \'Vật liệu\' trên tag giá hoặc nhãn chăm sóc để biết chi tiết.','HEATTECH Quần Leggings Giữ Nhiệt',293000.00,120,8,'2026-03-28 17:56:33.198993','2026-03-28 17:56:33.198993','heattech quần leggings giữ nhiệt',_binary '\0','[{\"name\":\"Đen\",\"hex\":\"#111111\"},{\"name\":\"Xám Đậm\",\"hex\":\"#4e4b4b\"}]','[\"XS\",\"S\",\"M\",\"L\",\"XL\",\"XXL\"]','FEMALE','BOTTOM'),(13,'- Độ xuyên thấu: Không xuyên thấu\n- Dáng: Dáng ôm sát\n- Phom dáng: Ống ôm dần\n- Túi: Có túi\n- Desain pinggang: Lưng cao','Quần Leggings Bầu Siêu Co Giãn',784000.00,40,7,'2026-03-28 17:57:41.528055','2026-03-28 17:57:41.528055','quần leggings bầu siêu co giãn',_binary '\0','[{\"name\":\"Đen\",\"hex\":\"#111111\"}]','[\"S\",\"M\",\"L\",\"XL\"]','FEMALE','BOTTOM'),(14,'- Instantly cool and comfortable.\n- Độ xuyên thấu: Không xuyên thấu (Chỉ 00 WHITE xuyên thấu/Chỉ 60 LIGHT BLUE xuyên thấu nhẹ )\n- Dáng: Dáng suông\n- Phom dáng: Ống suông\n- Túi: Có túi\n- Quần áo sử dụng vật liệu tái chế là một phần trong nỗ lực của chúng tôi nhằm hỗ trợ giảm thiểu chất thải và sử dụng vật liệu mới. Tỷ lệ vật liệu tái chế khác nhau tùy theo từng sản phẩm. Vui lòng kiểm tra \'Vật liệu\' trên tag giá hoặc nhãn chăm sóc để biết chi tiết.','AIRism Cotton Bộ Pyjama | Họa Tiết',500000.00,91,2,'2026-03-28 17:58:50.366321','2026-03-28 17:58:50.366321','airism cotton bộ pyjama | họa tiết',_binary '','[{\"name\":\"LIGHT BLUE\",\"hex\":\"#ccd9f5\"},{\"name\":\"OFF WHITE\",\"hex\":\"#faf4f4\"}]','[\"S\",\"M\",\"L\",\"XL\"]','FEMALE','TOP');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'ROLE_ADMIN'),(1,'ROLE_USER'),(4,'USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_addresses`
--

DROP TABLE IF EXISTS `shipping_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `detail_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_default` bit(1) NOT NULL,
  `label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `ward` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6bp1apvusb3gj4170h4pesd3h` (`user_id`),
  CONSTRAINT `FK6bp1apvusb3gj4170h4pesd3h` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_addresses`
--

LOCK TABLES `shipping_addresses` WRITE;
/*!40000 ALTER TABLE `shipping_addresses` DISABLE KEYS */;
INSERT INTO `shipping_addresses` VALUES (1,'2026-04-12 02:27:13.582903','69a Chu Văn An','Bình Thạnh','Nguyễn Trần Ngọc Hân',_binary '','Nhà riêng','0845065676','Thành phố Hồ Chí Minh','2026-04-12 02:27:13.583902','26',1);
/*!40000 ALTER TABLE `shipping_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(4,1),(5,1),(6,1),(6,2),(3,4);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `auth_provider` varchar(20) DEFAULT NULL,
  `password_login_enabled` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-03-23 12:42:29.964781','ngochanpt2018@gmail.com','Nguyễn Hân','$2a$10$lkILs7sizO61jQ4uBGQ7D.D7uXsWLMe4awhg67wwVBv4eFdwPsU6e','0845065676','GOOGLE',NULL),(2,'2026-03-23 22:46:50.009634','ntnhanpt2023@gmail.com','Nguyễn Trần Ngọc Hân','$2a$10$m1j3VV5sDXBKdbFgv2DFdO9bEd9KYoTvE/XLEGu65sFAaeCTkAXwy',NULL,NULL,NULL),(3,'2026-03-23 22:55:08.614759','test2@test.com','Test User','$2a$10$AUluk0AGEi38.M0pslBUGu2YQ2AtAm/GUtmSncI9mpjDvnHS1zLOm',NULL,NULL,NULL),(4,'2026-03-24 16:36:09.948340','testuser@gmail.com','Test User','$2a$10$qxakqbWW59UqVCMeP/PaueXrhW/v6BomfVfrdMawFcwjR6VNurlCO',NULL,NULL,NULL),(5,'2026-03-26 23:05:00.332745','dinhthiminhthu0510@gmail.com','Đinh Thị Minh Thư','$2a$10$q.TWd1NjuEIcXDD4CW8d7u3s556pdNVJUaOXEqlJ2P46OwXIxSV2G',NULL,NULL,NULL),(6,'2026-03-28 01:45:34.925731','admin@ecommerce.com','Systems Administrator','$2a$10$m1dYuMRS.PwdBrvcpSxJQudOUpwaX0JBvHGC1dK5zJqyoQUkxY.3y',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-12 23:37:43
