-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2024 at 04:45 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_corso`
--

-- --------------------------------------------------------

--
-- Table structure for table `persone`
--

CREATE TABLE `persone` (
  `id_persona` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(30) NOT NULL,
  `email` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `persone`
--

INSERT INTO `persone` (`id_persona`, `nome`, `cognome`, `email`) VALUES
(42, 'Mario', 'Rossi', 'Mariorossi23@gmail.com'),
(46, 'Luigi', 'Rossi', 'Luigirossi05@gmail.com'),
(51, 'Luca', 'Verdi', 'Lucaverdi@gmail.com'),
(52, 'Mario', 'Verdi', 'Marioverdi05@gmail.com'),
(53, 'Marco', 'rossi', 'Marcorossi09@gmail.com'),
(54, 'Andrea', 'Rossi', 'Andrearossi02@gmail.com'),
(55, 'Flavio', 'Verdi', 'Flavioverdi21@gmail.com'),
(57, 'Mario', 'Gialli', 'mariogialli99@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `persone`
--
ALTER TABLE `persone`
  ADD PRIMARY KEY (`id_persona`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `persone`
--
ALTER TABLE `persone`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
