-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2021 at 09:58 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `isa_blog_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL,
  `content` text DEFAULT NULL,
  `posted_date` datetime(6) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `content`, `posted_date`, `username`) VALUES
(4, 'my first comment', '2021-06-14 13:02:27.000000', 'test'),
(5, 'my second comment', '2021-06-14 13:02:35.000000', 'test'),
(6, 'qwerty', '2021-06-14 13:15:47.000000', 'test'),
(9, 'wooo', '2021-06-14 13:18:04.000000', 'test1'),
(10, 'Another comment by me..', '2021-06-14 13:18:53.000000', 'test1'),
(12, 'does it work?', '2021-06-14 13:21:31.000000', 'test1'),
(13, 'yes it does..', '2021-06-14 13:22:00.000000', 'test'),
(17, 'IT FINALLY WORKS!!!', '2021-06-14 13:34:51.000000', 'test2'),
(18, 'Really nice pic!', '2021-06-14 13:36:38.000000', 'test2'),
(19, 'IT WORKS NOW!', '2021-06-14 14:53:42.000000', 'test1'),
(24, 'and i mean it!', '2021-06-14 18:18:23.000000', 'test'),
(25, 'qwertyuy', '2021-06-15 15:36:49.000000', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(26);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` bigint(20) NOT NULL,
  `content` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `likes` int(11) NOT NULL,
  `posted_date` datetime(6) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `liked_post_user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `content`, `image_url`, `likes`, `posted_date`, `title`, `username`, `user_id`, `liked_post_user_id`) VALUES
(3, 'Morbi eleifend neque nisi, ut laoreet erat viverra in. Vivamus molestie orci in dolor mollis pretium. Vivamus consectetur dui id arcu aliquet condimentum. Phasellus lectus mauris, imperdiet sit amet mauris sit amet, egestas posuere felis. Nullam pharetra mi eu congue iaculis. Morbi tempus efficitur metus, vitae congue leo iaculis non. Nunc sollicitudin eleifend tempor. Quisque semper sem eros, eu semper lacus aliquam interdum. ', 'https://d3b4yo2b5lbfy.cloudfront.net/wp-content/uploads/wallpapers/af6953a10506-800x600.jpg', 4, '2021-06-14 13:01:26.000000', 'First Blog title', 'test', 1, 15),
(11, 'Cras pulvinar volutpat risus et iaculis. Phasellus vulputate velit ut ipsum hendrerit imperdiet. Nunc tristique tortor ut sagittis facilisis. Aliquam ornare euismod risus ac dictum. Ut tempor, tellus ut dapibus mattis, mi tortor molestie tortor, ut efficitur turpis turpis quis ex. Pellentesque in luctus dui. Integer sit amet dolor viverra, volutpat massa eu, sodales risus. Sed eget nulla vitae risus pretium lacinia dapibus sit amet dolor. Aliquam mattis tincidunt mauris, sed mollis mauris rutrum vel. Mauris nisi elit, pharetra at ligula sed, ultricies rhoncus nisi. Fusce lectus urna, mattis at lectus ut, mollis rutrum mauris. Phasellus iaculis eget enim ac dignissim. Vestibulum convallis mi ante, eget congue tellus pulvinar et. ', 'https://d3b4yo2b5lbfy.cloudfront.net/wp-content/uploads/wallpapers/d86f4b1d7f02-800x600.jpg', 1, '2021-06-14 13:21:11.000000', 'This is my first blog', 'test1', 7, 1),
(14, 'Cras pulvinar volutpat risus et iaculis. Phasellus vulputate velit ut ipsum hendrerit imperdiet. Nunc tristique tortor ut sagittis facilisis. Aliquam ornare euismod risus ac dictum. Ut tempor, tellus ut dapibus mattis, mi tortor molestie tortor, ut efficitur turpis turpis quis ex. Pellentesque in luctus dui. Integer sit amet dolor viverra, volutpat massa eu, sodales risus. Sed eget nulla vitae risus pretium lacinia dapibus sit amet dolor. Aliquam mattis tincidunt mauris, sed mollis mauris rutrum vel. Mauris nisi elit, pharetra at ligula sed, ultricies rhoncus nisi. Fusce lectus urna, mattis at lectus ut, mollis rutrum mauris. Phasellus iaculis eget enim ac dignissim. Vestibulum convallis mi ante, eget congue tellus pulvinar et. ', 'https://d3b4yo2b5lbfy.cloudfront.net/wp-content/uploads/wallpapers/421dc2014-06-04_KiteCity2-800x600.jpg', 3, '2021-06-14 13:29:00.000000', 'This is mysecond blog', 'test1', 7, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post_comment_list`
--

CREATE TABLE `post_comment_list` (
  `post_id` bigint(20) NOT NULL,
  `comment_list_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_comment_list`
--

INSERT INTO `post_comment_list` (`post_id`, `comment_list_id`) VALUES
(3, 4),
(3, 5),
(3, 6),
(3, 9),
(3, 10),
(3, 19),
(11, 12),
(11, 13),
(11, 17),
(14, 18),
(14, 24),
(14, 25);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `name`) VALUES
(1, 'USER'),
(2, 'ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `bio` text DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `bio`, `created_date`, `email`, `image_url`, `name`, `password`, `username`) VALUES
(1, 'Test Bio', '2021-06-14 12:57:59.000000', 'test@test.com', 'https://content.invisioncic.com/a311129/monthly_2021_04/small.pHMNFETCNUXSX.png.3c70b1262833ff29f0da6ce31149104f.png', 'Test', '$2a$10$zz8gV/Gi59zGvveQH7b9TuXi6YcI3/IBwquu7YRD6CUC523zSNW3m', 'test'),
(7, 'This is my new bio..', '2021-06-14 13:17:01.000000', 'test1@email.com', 'https://content.invisioncic.com/a311129/monthly_2021_04/small.pNJYAOJ050U1O.png.db72f0b4d2834d85aaff6055cc1b1e9d.png', 'Test1', '$2a$10$gYSr6XErDb2V1q37xU0zkOMKmVa9TuJRRgOCIs3MXS8Wi6bGeT3vO', 'test1'),
(15, 'My bio !!!', '2021-06-14 13:30:43.000000', 'test2@test2.com', 'https://content.invisioncic.com/a311129/monthly_2021_04/small.pFS18I2O97848.png.5cd2624b3919369fc2f3e809188df49c.png', 'Test2', '$2a$10$cE1wWFcha/Y.Jf9/Jf9rZ.W9iyC8jRr0Y7cxsCM.AkZerD8UO6KT6', 'test2');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `user_role_id` bigint(20) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_role_id`, `role_id`, `user_id`) VALUES
(2, 1, NULL),
(8, 1, NULL),
(16, 1, NULL),
(21, 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK72mt33dhhs48hf9gcqrq4fxte` (`user_id`),
  ADD KEY `FKncw8vl3j94dnhhidu9ecq93id` (`liked_post_user_id`);

--
-- Indexes for table `post_comment_list`
--
ALTER TABLE `post_comment_list`
  ADD UNIQUE KEY `UK_pl3uijispndoyut886jyk4csl` (`comment_list_id`),
  ADD KEY `FKr4ysm7jrt2f6torg4nx7ljny4` (`post_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`user_role_id`),
  ADD KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`),
  ADD KEY `FK859n2jvi8ivhui0rl0esws6o` (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK72mt33dhhs48hf9gcqrq4fxte` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKncw8vl3j94dnhhidu9ecq93id` FOREIGN KEY (`liked_post_user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `post_comment_list`
--
ALTER TABLE `post_comment_list`
  ADD CONSTRAINT `FKbtle4p40d3oqwyny88k028w7q` FOREIGN KEY (`comment_list_id`) REFERENCES `comment` (`id`),
  ADD CONSTRAINT `FKr4ysm7jrt2f6torg4nx7ljny4` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
