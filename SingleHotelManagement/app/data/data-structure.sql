-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hoteldb
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  `password` varchar(40) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  `avatar` varchar(200) COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `gmail` varchar(50) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `joined_date` datetime DEFAULT NULL,
  `role` enum('GUEST','RECEPTIONIST','ADMIN') COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'admin','827ccb0eea8a706c4c34a16891f84e7b','https://res.cloudinary.com/dqpo9h5s2/image/upload/v1711860995/rooms/avatar_vuwmxd.jpg','abc@gmail.com',1,'2024-04-14 22:10:08','ADMIN',8),(2,'receptionist','827ccb0eea8a706c4c34a16891f84e7b','https://res.cloudinary.com/dqpo9h5s2/image/upload/v1711860995/rooms/avatar_vuwmxd.jpg','abc@gmail.com',1,'2024-04-16 15:52:20','RECEPTIONIST',13);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `user_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (8);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `checkin` datetime DEFAULT NULL,
  `checkout` datetime DEFAULT NULL,
  `status` enum('REQUESTED','CONFIRMED','CHECKED_IN','CHECKED_OUT','CANCELED') COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `note` text COLLATE utf8mb4_vi_0900_as_cs,
  `receptionist_id` int DEFAULT NULL,
  `booker_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receptionist_id` (`receptionist_id`),
  KEY `booker_id` (`booker_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`receptionist_id`) REFERENCES `receptionist` (`user_id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`booker_id`) REFERENCES `guest` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (3,'2024-04-07 20:33:00','2024-04-08 20:33:00','2024-04-07 20:33:00','2024-04-08 20:33:00','CANCELED',NULL,2,3),(4,'2024-04-07 23:51:00','2024-04-08 23:51:00',NULL,NULL,'CHECKED_OUT',NULL,2,3),(5,'2024-04-10 21:59:00','2024-04-11 21:59:00',NULL,NULL,'CHECKED_OUT',NULL,2,3),(6,'2024-04-12 17:21:00','2024-04-13 17:21:00',NULL,NULL,'CHECKED_OUT',NULL,2,3),(7,'2024-04-12 18:46:00','2024-04-13 18:46:00',NULL,NULL,'CHECKED_OUT',NULL,2,3),(8,'2024-04-15 07:37:00','2024-04-16 07:37:00',NULL,'2024-04-15 08:51:47','CHECKED_OUT',NULL,2,3),(9,'2024-04-15 07:38:00','2024-04-16 07:38:00',NULL,'2024-04-15 08:51:55','CHECKED_OUT',NULL,2,3),(10,'2024-04-15 15:24:00','2024-04-16 15:24:00',NULL,NULL,'CANCELED',NULL,2,3),(11,'2024-04-15 16:35:00','2024-04-16 16:35:00',NULL,NULL,'CANCELED',NULL,2,3),(12,'2024-04-15 16:36:00','2024-04-16 16:36:00',NULL,NULL,'CANCELED',NULL,2,3),(13,'2024-04-15 16:39:00','2024-04-16 16:39:00',NULL,NULL,'CANCELED',NULL,2,3),(14,'2024-04-15 16:40:00','2024-04-16 16:40:00',NULL,NULL,'CANCELED',NULL,2,3),(15,'2024-04-15 16:54:00','2024-04-16 16:54:00','2024-04-15 17:15:57','2024-04-15 17:16:29','CHECKED_OUT',NULL,2,3),(16,'2024-04-16 07:37:00','2024-04-17 07:37:00',NULL,NULL,'CANCELED',NULL,2,3),(22,'2024-04-17 18:17:00','2024-04-18 18:17:00',NULL,'2024-04-17 23:19:36','CHECKED_OUT',NULL,2,1),(23,'2024-04-17 23:19:00','2024-04-18 23:19:00',NULL,'2024-04-17 23:20:02','CHECKED_OUT',NULL,2,3),(24,'2024-04-17 23:26:00','2024-04-18 23:26:00',NULL,'2024-04-17 23:26:24','CHECKED_OUT',NULL,2,3),(25,'2024-04-18 08:40:00','2024-04-19 08:40:00',NULL,NULL,'CANCELED',NULL,2,3),(26,'2024-04-18 09:30:00','2024-04-19 09:30:00','2024-04-18 09:31:12','2024-04-18 10:04:46','CHECKED_OUT',NULL,2,3),(27,'2024-04-18 10:05:00','2024-04-19 10:05:00','2024-04-18 10:05:12','2024-04-18 11:39:12','CHECKED_OUT',NULL,2,1),(28,'2024-04-18 11:49:00','2024-04-19 11:49:00',NULL,NULL,'CANCELED',NULL,2,3),(29,'2024-04-18 11:54:00','2024-04-19 11:54:00','2024-04-18 11:55:24','2024-04-19 22:06:15','CHECKED_OUT',NULL,2,3),(30,'2024-04-18 11:54:00','2024-04-19 11:54:00','2024-04-18 11:54:58','2024-04-18 11:58:41','CHECKED_OUT',NULL,2,2),(34,'2024-04-19 22:07:00','2024-04-20 22:07:00','2024-04-20 13:30:54','2024-04-20 13:33:40','CHECKED_OUT',NULL,NULL,17),(35,'2024-04-20 12:32:00','2024-04-21 12:32:00',NULL,NULL,'CANCELED',NULL,2,2);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_detail`
--

DROP TABLE IF EXISTS `booking_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_detail` (
  `booking_id` int NOT NULL,
  `room_id` int NOT NULL,
  `num_normal_guest` int DEFAULT NULL,
  `num_foreigner_guest` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`booking_id`,`room_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `booking_detail_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`),
  CONSTRAINT `booking_detail_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_detail`
--

LOCK TABLES `booking_detail` WRITE;
/*!40000 ALTER TABLE `booking_detail` DISABLE KEYS */;
INSERT INTO `booking_detail` VALUES (3,5,0,1,'2024-04-08 20:33:00',670000),(4,3,1,1,'2024-03-08 20:33:00',660000),(4,4,1,2,'2024-02-08 20:33:00',720000),(5,3,0,1,'2024-04-08 20:33:00',550000),(6,5,0,1,'2024-04-12 17:21:11',0),(7,1,1,0,'2024-04-12 19:04:47',400000),(8,3,0,1,'2024-04-15 07:26:09',550000),(9,2,0,1,'2024-04-15 07:26:09',400000),(10,3,0,1,'2024-04-15 15:24:01',550000),(10,5,1,0,'2024-04-15 15:24:01',700000),(11,4,0,1,'2024-04-15 15:35:20',720000),(12,3,0,1,'2024-04-15 15:35:20',550000),(13,5,0,1,'2024-04-15 16:39:00',910000),(14,4,0,1,'2024-04-15 16:40:21',720000),(15,3,1,0,'2024-04-15 16:59:56',500000),(15,5,0,1,'2024-04-15 16:41:52',910000),(16,4,0,1,'2024-04-16 07:25:41',720000),(22,3,1,0,'2024-04-17 20:08:56',500000),(22,4,0,1,'2024-04-17 18:16:13',720000),(23,4,0,1,'2024-04-17 23:18:04',720000),(24,4,0,1,'2024-04-17 23:23:58',720000),(25,4,0,1,'2024-04-18 08:40:13',720000),(26,3,0,1,'2024-04-18 09:30:09',550000),(27,5,0,1,'2024-04-18 10:04:13',910000),(28,5,0,1,'2024-04-18 10:10:28',910000),(29,4,0,1,'2024-04-18 10:10:28',720000),(30,3,0,1,'2024-04-18 10:10:28',550000),(34,1,1,1,'2024-04-19 22:02:43',400000),(34,2,1,1,'2024-04-19 22:02:43',400000),(34,4,1,1,'2024-04-19 22:02:43',720000),(35,5,0,1,'2024-04-20 12:32:30',910000);
/*!40000 ALTER TABLE `booking_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floor`
--

DROP TABLE IF EXISTS `floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `floor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floor`
--

LOCK TABLES `floor` WRITE;
/*!40000 ALTER TABLE `floor` DISABLE KEYS */;
INSERT INTO `floor` VALUES (1,'Tầng 1'),(2,'Tầng 2'),(3,'Tầng 3'),(4,'Tầng 4'),(5,'Tầng 5');
/*!40000 ALTER TABLE `floor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `user_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `guest_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES (1),(2),(3),(14),(15),(17);
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `amount` decimal(10,0) NOT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL,
  `payment_method` enum('CASH','VNPAY') COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `booking_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'2024-04-08 20:33:00',5000000,1,'2024-01-08 20:33:00','CASH',3),(2,'2024-04-08 20:33:00',1000000,1,'2024-01-08 20:33:00','CASH',5),(3,'2024-04-15 08:42:37',1560000,1,'2024-01-15 08:42:41','CASH',4),(4,'2024-04-15 08:42:37',910000,1,'2024-02-15 08:43:50','CASH',6),(5,'2024-04-15 08:42:37',400000,1,'2024-02-15 08:44:59','CASH',7),(6,'2024-04-15 08:42:37',550000,1,'2024-02-15 08:45:55','CASH',8),(7,'2024-04-15 08:51:42',400000,1,'2024-03-15 08:51:55','CASH',9),(8,'2024-04-15 16:59:56',1410000,1,'2024-03-15 17:16:29','CASH',15),(9,'2024-04-17 23:07:56',1220000,1,'2024-03-17 23:08:00','VNPAY',22),(10,'2024-04-17 23:18:04',720000,1,'2024-04-17 23:20:02','VNPAY',23),(11,'2024-04-17 23:23:58',720000,1,'2024-04-17 23:26:24','VNPAY',24),(12,'2024-04-18 08:40:13',720000,1,'2024-04-18 08:40:27','VNPAY',25),(13,'2024-04-18 10:03:23',550000,1,'2024-04-18 10:03:53','VNPAY',26),(14,'2024-04-18 10:04:13',910000,1,'2024-04-18 10:05:18','VNPAY',27),(15,'2024-04-18 10:10:28',550000,1,'2024-04-18 11:58:41','CASH',30),(18,'2024-04-19 22:02:43',720000,1,'2024-04-19 22:06:15','CASH',29),(19,'2024-04-20 13:16:53',1520000,1,'2024-04-20 13:30:59','CASH',34);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `content` text COLLATE utf8mb4_vi_0900_as_cs,
  `read` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,2,'2024-04-20 12:32:30','Emm Nguyenf vừa đặt phòng trực tiếp',0),(2,13,'2024-04-20 12:44:13','Đơn đặt phòng có mã 35 vừa bị huỷ',0),(3,17,'2024-04-20 13:33:39','Emm Nguyenf vừa thanh toán thanh công đơn đặt phòng mã 34',0);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receptionist`
--

DROP TABLE IF EXISTS `receptionist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receptionist` (
  `user_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `receptionist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receptionist`
--

LOCK TABLES `receptionist` WRITE;
/*!40000 ALTER TABLE `receptionist` DISABLE KEYS */;
INSERT INTO `receptionist` VALUES (2),(13);
/*!40000 ALTER TABLE `receptionist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  `floor_id` int NOT NULL,
  `status` enum('AVAILABLE','RESERVED','OCCUPIED') COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `tier_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `floor_id` (`floor_id`),
  KEY `tier_id` (`tier_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`floor_id`) REFERENCES `floor` (`id`),
  CONSTRAINT `room_ibfk_2` FOREIGN KEY (`tier_id`) REFERENCES `tier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'P202',1,'AVAILABLE',NULL,5),(2,'P201',1,'AVAILABLE',NULL,5),(3,'P302',2,'AVAILABLE',NULL,6),(4,'P402',3,'AVAILABLE',NULL,7),(5,'P502',4,'AVAILABLE',NULL,8),(6,'P203',1,'RESERVED',NULL,8);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tier`
--

DROP TABLE IF EXISTS `tier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  `base_price` decimal(10,0) DEFAULT NULL,
  `max_guest` int DEFAULT NULL,
  `normal_guest_count` int DEFAULT NULL,
  `extra_guest_surcharge` float DEFAULT NULL,
  `foreign_guest_surcharge` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tier`
--

LOCK TABLES `tier` WRITE;
/*!40000 ALTER TABLE `tier` DISABLE KEYS */;
INSERT INTO `tier` VALUES (5,'Phòng 2 giường',400000,3,0,0,1),(6,'Phòng 3 giường',500000,3,1,0.2,1.1),(7,'Phòng 4 giường',600000,4,2,0.25,1.2),(8,'Phòng 5 giường',700000,5,3,0.3,1.3);
/*!40000 ALTER TABLE `tier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(11) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  `first_name` varchar(20) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  `last_name` varchar(40) COLLATE utf8mb4_vi_0900_as_cs NOT NULL,
  `address` text COLLATE utf8mb4_vi_0900_as_cs,
  `city` varchar(100) COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `district` varchar(100) COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `birthdate` varchar(10) COLLATE utf8mb4_vi_0900_as_cs DEFAULT NULL,
  `foreigner` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'0373506462','Emm','Nguyenf','','Tỉnh Bình Phước','Huyện Đồng Phú','2024-04-06',1),(2,'0373506463','Emm','Nguyenf','','Tỉnh Bình Phước','Huyện Đồng Phú','2024-04-06',1),(3,'0373506465','Anh67','Doe','','','','',1),(8,'0384958374','Anh','Nguyen',NULL,NULL,NULL,NULL,0),(10,'0384958373','Duc','Tran',NULL,NULL,NULL,NULL,0),(13,'0384958371','Duc','Tran',NULL,NULL,NULL,NULL,0),(14,'0325625394','Anh67','Anh','','','','',0),(15,'0373506493','Nguyễn','Nguyenf','','','','',0),(17,'0373506422','Emm','Nguyenf','','','','',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 14:51:40
