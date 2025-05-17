-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 07:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `d_queen`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryID` int(11) NOT NULL,
  `categoryName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryID`, `categoryName`) VALUES
(1, 'Blizzard of the Month'),
(2, 'Special Blizzard'),
(3, 'Classic Blizzard'),
(4, 'Royal Blizzard'),
(5, 'Frappe');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT NULL,
  `categoryID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `name`, `code`, `image`, `is_available`, `categoryID`) VALUES
(1, 'Coffee Cheesecake', 'CC', 'res/blizzardsMonth/coffeeCheesecake.png', 1, 1),
(2, 'Toffee Almond Latte', 'TAL', 'res/blizzardsMonth/toffeeAlmondLatte.png', 1, 1),
(3, 'Mocha Mudpie', 'MM', 'res/blizzardsMonth/mochaMudpie.png', 1, 1),
(4, 'Chocolate Almond', 'CA', 'res/specialBlizzards/chocoAlmond.png', 1, 2),
(5, 'Double Dutch', 'DD', 'res/specialBlizzards/doubleDutch.jpg', 1, 2),
(6, 'Brownee Temptation', 'TAFTC', 'res/specialBlizzards/brownieTemptation.png', 1, 2),
(7, 'Chocolate Extreme', 'CE', 'res/specialBlizzards/chocoExtreme.png', 1, 2),
(8, 'Chocolate Kitkat', 'CK', 'res/specialBlizzards/chocoKitkat.jpg', 1, 2),
(9, 'Mango Cheesecake', 'MCC', 'res/specialBlizzards/mangoCheesecake.jpg', 1, 2),
(10, 'Rocky Road', 'RR', 'res/specialBlizzards/rockyRoad.jpg', 1, 2),
(11, 'Oreo', 'OCB', 'res/classicBlizzard/oreoBlizzard.jpg', 1, 3),
(12, 'Chocolate Chip', 'CCCB', 'res/classicBlizzard/chocoChip.jpg', 1, 3),
(13, 'Royal Oreo', 'RORB', 'res/royalBlizzard/royalOreo.jpg', 1, 4),
(14, 'Royal New York', 'RNYRB', 'res/royalBlizzard/royalNewYork.jpg', 1, 4),
(15, 'Royal Ultimate Choco Brownie', 'RUCB', 'res/royalBlizzard/royalUltimate.jpg', 1, 4),
(16, 'Oreo', 'OF', 'res/frappe/oreo.png', 1, 5),
(17, 'Cheesecake', 'CCF', 'res/frappe/cheesecake.png', 1, 5),
(18, 'Cappuccino', 'CF', 'res/frappe/cappucino.png', 1, 5),
(19, 'Double Cocoa Fudge', 'DCFF', 'res/frappe/doubleCocoa.png', 1, 5),
(20, 'Mocha', 'MF', 'res/frappe/mocha.png', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `sizeID` int(11) NOT NULL,
  `productID` int(11) DEFAULT NULL,
  `sizeCode` varchar(10) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_sizes`
--

INSERT INTO `product_sizes` (`sizeID`, `productID`, `sizeCode`, `price`) VALUES
(1, 1, 'MD', 159.00),
(2, 1, 'LG', 199.00),
(3, 2, 'MD', 159.00),
(4, 2, 'LG', 199.00),
(5, 3, 'MD', 159.00),
(6, 3, 'LG', 199.00),
(7, 4, 'MD', 139.00),
(8, 4, 'LG', 169.00),
(9, 5, 'MD', 139.00),
(10, 5, 'LG', 169.00),
(11, 6, 'MD', 139.00),
(12, 6, 'LG', 169.00),
(13, 7, 'MD', 139.00),
(14, 7, 'LG', 169.00),
(15, 8, 'MD', 139.00),
(16, 8, 'LG', 169.00),
(17, 9, 'MD', 139.00),
(18, 9, 'LG', 169.00),
(19, 10, 'MD', 139.00),
(20, 10, 'LG', 169.00),
(21, 11, 'MD', 119.00),
(22, 11, 'LG', 149.00),
(23, 12, 'MD', 119.00),
(24, 12, 'LG', 149.00),
(25, 13, 'MD', 159.00),
(26, 13, 'LG', 199.00),
(27, 14, 'MD', 159.00),
(28, 14, 'LG', 199.00),
(29, 15, 'MD', 159.00),
(30, 15, 'LG', 199.00),
(31, 16, '12oz', 179.00),
(32, 16, '160z', 199.00),
(33, 17, '12oz', 179.00),
(34, 17, '160z', 199.00),
(35, 18, '12oz', 179.00),
(36, 18, '160z', 199.00),
(37, 19, '12oz', 179.00),
(38, 19, '160z', 199.00),
(39, 20, '12oz', 179.00),
(40, 20, '160z', 199.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`sizeID`),
  ADD KEY `productID` (`productID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `sizeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`);

--
-- Constraints for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
