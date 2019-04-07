/*
SQLyog - Free MySQL GUI v5.02
Host - 5.1.69-community : Database - productmanagement
*********************************************************************
Server version : 5.1.69-community
*/


create database if not exists `productmanagement`;

USE `productmanagement`;

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `product` */

insert into `product` values 
(2,'biscuit',16,1),
(7,'gg',10,5);
