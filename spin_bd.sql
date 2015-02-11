-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 11-02-2015 a las 16:30:30
-- Versión del servidor: 5.5.38-0ubuntu0.14.04.1
-- Versión de PHP: 5.5.9-1ubuntu4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `spin_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `text` varchar(10000) NOT NULL,
  `date` date NOT NULL,
  `category` varchar(100) NOT NULL,
  `privacy` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `blog`
--

INSERT INTO `blog` (`id`, `title`, `text`, `date`, `category`, `privacy`) VALUES
(6, '123', '<img src="http://dev.spinattic.com/images/posts/CajonDelAzul.jpg" /><p>bar qwe dqw dqw dqw dqw</p>', '2014-12-10', '5', 'Public'),
(7, 'test embed video', '<p>qwe</p>\r\n', '2015-02-06', '1', 'Public'),
(8, '123', '<p>rr</p>\r\n', '2015-02-06', '6', 'Private');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blog_comments`
--

CREATE TABLE IF NOT EXISTS `blog_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `idpost` int(11) NOT NULL,
  `comment` varchar(5000) NOT NULL,
  `date` datetime NOT NULL,
  `guest_name` varchar(1000) NOT NULL,
  `guest_email` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(2, 'Universities'),
(3, 'Events'),
(4, 'Real Estate'),
(5, 'Hotels'),
(6, 'Resorts'),
(7, 'Restaurants'),
(8, 'Museums'),
(9, 'Destinations'),
(10, 'Vehicles'),
(11, 'Parks'),
(12, 'Nature'),
(13, 'Miscellaneous'),
(14, 'Theaters');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories_blog`
--

CREATE TABLE IF NOT EXISTS `categories_blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  `mailing_group` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `categories_blog`
--

INSERT INTO `categories_blog` (`id`, `category`, `mailing_group`) VALUES
(1, 'News', 2),
(2, 'Spinattic Improvements', 1),
(3, 'Industry Articles', 2),
(4, 'Portfolio Reviews and Interviews', 2),
(5, 'Tutorials', 2),
(6, 'Guest Posts', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `idtour` int(11) NOT NULL,
  `comments` varchar(5000) NOT NULL,
  `date` datetime NOT NULL,
  `reply_to` int(11) NOT NULL,
  `orig_comment` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=195 ;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `iduser`, `idtour`, `comments`, `date`, `reply_to`, `orig_comment`) VALUES
(27, 56, 37, 'test', '2014-11-02 23:35:12', 0, 0),
(18, 40, 48, 'Having fun with filters! lol', '2014-10-24 16:56:08', 0, 0),
(23, 96, 48, 'testing 123', '2014-11-01 19:57:03', 0, 0),
(24, 96, 48, '123 tsest', '2014-11-01 20:04:22', 0, 0),
(25, 96, 48, 'trest', '2014-11-01 20:08:08', 0, 0),
(26, 56, 48, 'test', '2014-11-02 23:34:21', 0, 0),
(137, 1, 50, 'RockandRule SwingBand: 123', '2014-11-17 13:29:20', 90, 90),
(11, 56, 38, 'quÃ© banda! =)', '2015-01-22 10:56:39', 0, 0),
(28, 96, 35, 'test''ts', '2014-11-03 17:20:34', 0, 0),
(29, 56, 18, 'comentario comentario comentario comentario comentario comentario comentario comentario comentario comentario comentario comentario comentario', '2014-11-05 16:05:55', 0, 0),
(30, 56, 18, 'a ver comentario comentario comentario comentario', '2014-11-05 16:06:48', 0, 0),
(31, 41, 18, 'mi propio comment', '2014-11-07 15:35:06', 0, 0),
(100, 96, 50, 'eqweqw', '2014-11-14 18:18:44', 0, 0),
(98, 96, 50, ',.ii,k,lkk,', '2014-11-14 18:15:01', 92, 92),
(97, 96, 50, 'RockandRule SwingBand: hjrt6htr', '2014-11-14 18:14:49', 92, 92),
(59, 96, 19, '12312321', '2014-11-14 17:15:46', 40, 40),
(40, 96, 19, 'comentario', '2014-11-11 16:15:04', 0, 0),
(41, 56, 19, 'comment =)', '2014-11-11 17:09:41', 39, 40),
(42, 103, 19, 'pruebapruebapruebapruebapruebapruebapruebapruebapruebapruebaprueba', '2014-11-11 17:33:48', 41, 40),
(44, 96, 19, 'copmenta 1', '2014-11-11 18:23:52', 43, 40),
(50, 96, 19, '987654', '2014-11-14 16:59:53', 40, 40),
(51, 96, 19, '159185981891', '2014-11-14 17:03:21', 40, 40),
(52, 96, 19, 'rgggewgwewegweg', '2014-11-14 17:06:07', 40, 40),
(56, 96, 19, '12312312312312', '2014-11-14 17:11:39', 40, 40),
(58, 96, 19, 'bbbbbbbbbbbbbbbbbbbbbbbbbb', '2014-11-14 17:14:06', 40, 40),
(96, 96, 50, 'RockandRule SwingBand: dqdqw', '2014-11-14 18:14:03', 95, 95),
(62, 96, 19, 'dwdwd', '2014-11-14 17:22:22', 40, 40),
(57, 96, 19, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2014-11-14 17:13:03', 40, 40),
(49, 96, 19, '123456', '2014-11-14 16:58:41', 40, 40),
(48, 96, 19, 'test<br />', '2014-11-12 18:40:45', 0, 0),
(61, 96, 19, '', '2014-11-14 17:22:19', 40, 40),
(63, 96, 19, 'bbrtb', '2014-11-14 17:26:39', 40, 40),
(64, 96, 19, 'ht4rhbrt', '2014-11-14 17:26:45', 40, 40),
(65, 96, 19, 'htrhtrh', '2014-11-14 17:26:49', 40, 40),
(66, 96, 19, 'fwefwef', '2014-11-14 17:27:12', 48, 48),
(67, 96, 19, 'fwefewfwe', '2014-11-14 17:27:16', 48, 48),
(68, 96, 19, 'erdfc423f', '2014-11-14 17:32:06', 67, 67),
(69, 96, 19, '232222222222', '2014-11-14 17:32:38', 67, 67),
(99, 96, 50, 'dakmdkas', '2014-11-14 18:16:51', 0, 0),
(95, 96, 50, 'dqwedqw', '2014-11-14 18:13:07', 0, 0),
(93, 96, 50, '22222', '2014-11-14 18:02:10', 92, 92),
(92, 96, 50, '111', '2014-11-14 18:02:06', 0, 0),
(91, 96, 50, 'ssssssjoih ionjo', '2014-11-14 18:27:18', 90, 90),
(90, 96, 50, '1132', '2014-11-14 17:59:33', 0, 0),
(101, 1, 50, 'RockandRule SwingBand: qweqweq', '2014-11-14 18:19:40', 92, 92),
(102, 1, 50, 'RockandRule SwingBand: swqsqwsqws', '2014-11-14 18:21:21', 99, 99),
(103, 1, 50, 'qqqq', '2014-11-14 18:21:40', 0, 0),
(104, 1, 50, '123', '2014-11-14 18:22:09', 0, 0),
(105, 96, 50, 'kiujyhtgfred', '2014-11-14 18:22:45', 0, 0),
(106, 96, 50, 'Spinattic: edwqewqeqwe', '2014-11-14 18:24:52', 103, 103),
(107, 96, 50, 'RockandRule SwingBand: fewfwefwefwe  2d232', '2014-11-14 18:28:16', 92, 92),
(108, 1, 50, 'RockandRule SwingBand: respuesta', '2014-11-14 18:51:42', 90, 90),
(109, 1, 19, 'RockandRule SwingBand: fdewfew', '2014-11-14 18:53:27', 40, 40),
(110, 1, 19, 'RockandRule SwingBand: dqwdqdwq', '2014-11-14 18:55:08', 40, 40),
(111, 1, 19, 'RockandRule SwingBand: dddddddd', '2014-11-14 18:56:08', 40, 40),
(112, 1, 48, 'RockandRule SwingBand: test', '2014-11-14 18:56:54', 23, 23),
(113, 1, 48, 'testRockandRule SwingBand: ', '2014-11-14 18:57:48', 23, 23),
(114, 1, 48, 'RockandRule SwingBand: test', '2014-11-14 18:58:59', 23, 23),
(115, 1, 48, 'RockandRule SwingBand: test', '2014-11-14 19:00:52', 23, 23),
(116, 40, 48, 'I got an email notification if you are curious.', '2014-11-14 19:26:43', 0, 0),
(117, 1, 50, 'test', '2014-11-14 20:40:41', 0, 0),
(118, 1, 50, 'Spinattic: reply', '2014-11-14 20:40:51', 117, 117),
(119, 1, 50, 'comment', '2014-11-14 20:42:06', 0, 0),
(120, 1, 50, 'Spinattic: res', '2014-11-14 20:42:40', 117, 117),
(121, 1, 50, 'Spinattic: tete', '2014-11-14 20:44:14', 117, 117),
(122, 1, 50, 'Spinattic: dwdwd', '2014-11-14 20:47:26', 117, 117),
(123, 1, 50, 'Spinattic: dwdwdwdwd', '2014-11-14 20:47:29', 117, 117),
(124, 56, 19, 'RockandRule SwingBand: spammer', '2014-11-14 20:49:38', 40, 40),
(125, 56, 19, 'RockandRule SwingBand: spammer 2', '2014-11-14 20:50:17', 48, 48),
(126, 1, 50, 'Spinattic: 1', '2014-11-14 21:00:28', 90, 90),
(127, 1, 50, '2Spinattic: ', '2014-11-14 21:00:31', 90, 90),
(128, 1, 50, '1', '2014-11-14 21:02:12', 0, 0),
(129, 1, 50, 'post', '2014-11-14 21:24:33', 0, 0),
(130, 1, 50, 'RockandRule SwingBand: ', '2014-11-14 21:25:20', 103, 103),
(131, 96, 50, 'Spinattic: ', '2014-11-14 21:29:42', 90, 90),
(132, 96, 50, 'Spinattic: ', '2014-11-14 21:30:12', 90, 90),
(133, 96, 50, 'Spinattic: ', '2014-11-14 21:35:37', 103, 103),
(134, 96, 50, 'Spinattic: ', '2014-11-14 21:36:13', 103, 103),
(135, 96, 50, 'Spinattic: ', '2014-11-14 21:36:28', 117, 117),
(136, 56, 50, 'RockandRule SwingBand: Puto el que lee!!! Puto el que lee!!!', '2014-11-14 22:07:22', 117, 117),
(138, 1, 50, 'ss', '2014-11-17 13:31:46', 0, 0),
(139, 1, 50, 'ss', '2014-11-17 13:33:41', 0, 0),
(140, 1, 50, 'k', '2014-11-17 13:34:25', 0, 0),
(141, 1, 50, 'ee12e12', '2014-11-17 13:40:27', 0, 0),
(142, 1, 50, '123', '2014-11-17 13:42:33', 0, 0),
(143, 1, 50, '123', '2014-11-17 13:43:33', 0, 0),
(144, 96, 34, 'test', '2014-11-17 20:47:25', 0, 0),
(145, 1, 34, 'test', '2014-11-17 20:49:45', 0, 0),
(146, 1, 85, 'dd', '2014-11-19 13:25:20', 0, 0),
(147, 1, 85, 'sss', '2014-11-19 13:29:06', 0, 0),
(182, 96, 119, '&lt;a href=&quot;&quot;&gt;a&lt;/a&gt;&lt;br /&gt;&lt;a href=&quot;&quot;&gt;b&lt;/a&gt;', '2015-01-19 18:20:06', 0, 0),
(183, 96, 119, '&lt;a href=&quot;&quot;&gt;a&lt;/a&gt;&lt;br /&gt;&lt;a href=&quot;&quot;&gt;b&lt;/a&gt;', '2015-01-19 18:23:18', 0, 0),
(180, 96, 119, '&lt;a href=&quot;&quot;&gt;a&lt;/a&gt;&lt;br /&gt;&lt;a href=&quot;&quot;&gt;b&lt;/a&gt;', '2015-01-19 18:14:19', 175, 175),
(179, 96, 119, '', '2015-01-19 18:14:07', 175, 175),
(178, 96, 119, '', '2015-01-19 18:13:39', 0, 0),
(177, 96, 119, '&lt;a href=&quot;&quot;&gt;a&lt;/a&gt;&lt;br /&gt;&lt;a href=&quot;&quot;&gt;b&lt;/a&gt;', '2015-01-19 18:12:08', 0, 0),
(176, 96, 119, 'RockandRule SwingBand: &lt;a href=&quot;&quot;&gt;a&lt;/a&gt;&lt;br /&gt;&lt;a href=&quot;&quot;&gt;b&lt;/a&gt;', '2015-01-19 18:09:57', 175, 175),
(175, 96, 119, '&lt;a href=&quot;&quot;&gt;a&lt;/a&gt;&lt;br /&gt;&lt;a href=&quot;&quot;&gt;b&lt;/a&gt;', '2015-01-19 18:09:42', 0, 0),
(184, 96, 119, '&lt;a href=&quot;&quot;&gt;a&lt;/a&gt;&lt;br /&gt;&lt;a href=&quot;&quot;&gt;b&lt;/a&gt;', '2015-01-19 18:24:53', 0, 0),
(185, 96, 119, '&lt;a href=&quot;&quot;&gt;a&lt;/a&gt;&lt;br /&gt;&lt;a href=&quot;&quot;&gt;b&lt;/a&gt;', '2015-01-19 18:25:13', 182, 182),
(186, 96, 119, '', '2015-01-19 18:28:58', 182, 182),
(187, 103, 18, 'prueba', '2015-01-28 23:48:55', 0, 0),
(188, 103, 18, 'Otro comentario', '2015-01-29 00:51:17', 0, 0),
(189, 103, 19, 'Un comentario para recategorizar el tour', '2015-01-29 01:03:20', 0, 0),
(190, 103, 19, 'Otro comentario', '2015-01-29 01:04:24', 0, 0),
(191, 103, 19, 'Jorge Rubiolo: Prueba', '2015-01-29 01:05:43', 190, 190),
(192, 103, 118, 'Comentario', '2015-02-03 00:59:46', 0, 0),
(193, 103, 118, 'Otro comentario', '2015-02-03 01:01:19', 0, 0),
(194, 96, 118, 'comentario&lt;br /&gt;uno mas', '2015-02-03 17:07:47', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `follows`
--

CREATE TABLE IF NOT EXISTS `follows` (
  `id_follower` int(11) NOT NULL,
  `id_following` int(11) NOT NULL,
  `date` datetime NOT NULL,
  UNIQUE KEY `id_follower` (`id_follower`,`id_following`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `follows`
--

INSERT INTO `follows` (`id_follower`, `id_following`, `date`) VALUES
(39, 41, '2014-09-05 07:34:33'),
(39, 42, '2014-09-06 19:59:13'),
(43, 39, '2014-09-09 10:48:53'),
(43, 40, '2014-09-09 10:49:01'),
(26, 39, '2014-09-09 10:58:13'),
(40, 42, '2014-11-11 17:15:52'),
(40, 47, '2014-09-11 08:34:39'),
(40, 43, '2014-11-11 17:15:53'),
(42, 40, '2014-09-11 18:48:51'),
(52, 40, '2014-09-13 07:24:17'),
(52, 42, '2014-09-13 07:24:28'),
(47, 40, '2014-09-13 09:05:26'),
(40, 52, '2014-09-13 09:20:58'),
(56, 40, '2014-09-18 20:22:18'),
(56, 26, '2014-09-18 20:22:26'),
(56, 57, '2014-09-18 20:22:34'),
(56, 41, '2014-11-21 02:16:14'),
(1, 40, '2014-09-29 11:37:17'),
(1, 96, '2014-11-10 16:42:06'),
(39, 96, '2014-10-01 08:11:25'),
(40, 96, '2014-10-01 08:11:25'),
(42, 96, '2014-10-01 08:11:25'),
(43, 96, '2014-10-01 08:11:25'),
(47, 96, '2014-10-01 08:11:25'),
(48, 96, '2014-10-01 08:11:25'),
(49, 96, '2014-10-01 08:11:25'),
(50, 96, '2014-10-01 08:11:25'),
(51, 96, '2014-10-01 08:11:25'),
(96, 56, '2014-11-21 02:09:52'),
(54, 96, '2014-10-01 08:11:25'),
(55, 96, '2014-10-01 08:11:25'),
(56, 96, '2014-10-30 22:39:40'),
(57, 96, '2014-10-01 08:11:25'),
(69, 96, '2014-10-09 14:56:49'),
(72, 96, '2014-10-01 08:11:25'),
(56, 52, '2014-10-30 22:40:26'),
(41, 56, '2014-10-16 14:36:57'),
(56, 55, '2014-11-21 02:16:18'),
(56, 69, '2014-11-21 02:16:11'),
(103, 69, '2014-11-28 04:17:28'),
(111, 56, '2014-12-26 20:25:43'),
(96, 49, '2014-01-01 00:00:00'),
(96, 48, '2014-01-01 00:00:00'),
(96, 50, '2014-01-01 00:00:00'),
(41, 96, '2014-10-16 14:43:16'),
(103, 54, '2014-11-27 23:48:00'),
(69, 56, '2014-10-24 20:22:28'),
(56, 47, '2014-10-30 22:40:26'),
(96, 54, '2014-11-01 20:10:37'),
(103, 96, '2014-11-27 02:04:46'),
(40, 56, '2014-11-11 17:15:57'),
(103, 1, '2014-11-27 00:28:05'),
(56, 1, '2014-11-25 19:25:04'),
(96, 1, '2014-12-04 14:41:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotspots`
--

CREATE TABLE IF NOT EXISTS `hotspots` (
  `scene_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `style` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `ath` varchar(20) NOT NULL,
  `atv` varchar(20) NOT NULL,
  `extra_linkedscene` varchar(1000) NOT NULL,
  `extra_infotitle` varchar(1000) NOT NULL,
  `extra_infotext` varchar(1000) NOT NULL,
  `extra_photourl` varchar(1000) NOT NULL,
  `extra_tooltip` varchar(1000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hotspots`
--

INSERT INTO `hotspots` (`scene_id`, `name`, `style`, `type`, `ath`, `atv`, `extra_linkedscene`, `extra_infotitle`, `extra_infotext`, `extra_photourl`, `extra_tooltip`) VALUES
(41, 'info_1', 'info_hotspot', 'info', '-1', '-24', '', 'uno "dos" tres ''cuatro'' cinco', 'text1 "text2" text3 ''text4'' text5', '', ''),
(75, 'link_2', 'arrow_hotspot', 'link', '-108.16550097014', '19.349457331632', 'scene_76', '', '', '', ''),
(76, 'link_1', 'arrow_hotspot', 'link', '-31.180631918254', '4.9581895536038', 'scene_75', '', '', '', ''),
(75, 'info_1', 'info_hotspot', 'info', '-136.53212173966', '19.837047107449', '', 'ghgh', 'ghghghgh', '', ''),
(119, 'info_2', 'info_hotspot', 'info', '5.2337819696892', '4.7365900106484', '', 'Title', 'Type your text here...', '', ''),
(119, 'link_1', 'arrow_hotspot', 'link', '-20.653785176789', '4.6139761639312', 'scene_120', '', '', '', ''),
(119, 'media_3', 'photo_hotspot', 'media', '-7.422686108925', '-17.181007977754', '', '', '', 'screen 2014-11-02 a las 20.41.25.jpg', ''),
(124, 'info_1', 'info_hotspot', 'info', '-19.739388936883', '-14.235599725543', '', '', '', '', ''),
(124, 'media_2', 'photo_hotspot', 'media', '-2', '-2', '', '', '', 'thumb100x50.jpg', ''),
(124, 'link_3', 'arrow_hotspot', 'link', '-12', '-7', 'scene_135', '', '', '', ''),
(183, 'info_1', 'info_hotspot', 'info', '-1', '-9', '', 'bxdfx', 'Type your text here...', '', ''),
(183, 'info_2', 'info_hotspot', 'info', '-9', '-24', '', 'Title', 'Type your text here...', '', ''),
(151, 'link_1', 'arrow_hotspot', 'link', '128.20210380076', '13.591701074367', '', '', '', '', ''),
(42, 'link_1', 'arrow_hotspot', 'link', '-34', '-14', 'scene_41', '', '', '', ''),
(21, 'info_6', 'info_hotspot', 'info', '-25', '-3', '', 'hola ''123'' d"s"a', 'hola ''123'' d"s"a', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotspots_draft`
--

CREATE TABLE IF NOT EXISTS `hotspots_draft` (
  `scene_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `style` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `ath` varchar(20) NOT NULL,
  `atv` varchar(20) NOT NULL,
  `extra_linkedscene` varchar(1000) NOT NULL,
  `extra_infotitle` varchar(1000) NOT NULL,
  `extra_infotext` varchar(1000) NOT NULL,
  `extra_photourl` varchar(1000) NOT NULL,
  `extra_tooltip` varchar(1000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hotspots_draft`
--

INSERT INTO `hotspots_draft` (`scene_id`, `name`, `style`, `type`, `ath`, `atv`, `extra_linkedscene`, `extra_infotitle`, `extra_infotext`, `extra_photourl`, `extra_tooltip`) VALUES
(42, 'link_1', 'arrow_hotspot', 'link', '-34', '-14', 'scene_41', '', '', '', ''),
(34, 'link_1', 'arrow_hotspot', 'link', '-22', '-21', '', '', '', '', ''),
(75, 'info_1', 'info_hotspot', 'info', '-136.53212173966', '19.837047107449', '', 'ghgh', 'ghghghgh', '', ''),
(37, 'link_1', 'arrow_hotspot', 'link', '-35', '-7', '', '', '', '', ''),
(35, 'link_1', 'arrow_hotspot', 'link', '-2.911239422091', '6.3372920417292', '', '', '', '', ''),
(76, 'link_1', 'arrow_hotspot', 'link', '-31.180631918254', '4.9581895536038', 'scene_75', '', '', '', ''),
(75, 'link_2', 'arrow_hotspot', 'link', '-108.16550097014', '19.349457331632', 'scene_76', '', '', '', ''),
(95, 'link_1', 'arrow_hotspot', 'link', '62.073631008533', '-2.4425122601122', 'scene_94', '', '', '', ''),
(95, 'info_2', 'info_hotspot', 'info', '-22.570576200536', '-16.285810365431', '', 'sarasa', 'fmnklwenfwe', '', ''),
(151, 'link_1', 'arrow_hotspot', 'link', '128.20210380076', '13.591701074367', '', '', '', '', ''),
(119, 'link_1', 'arrow_hotspot', 'link', '-20.653785176789', '4.6139761639312', 'scene_120', '', '', '', ''),
(119, 'media_3', 'photo_hotspot', 'media', '-7.422686108925', '-17.181007977754', '', '', '', 'screen 2014-11-02 a las 20.41.25.jpg', ''),
(183, 'info_2', 'info_hotspot', 'info', '-9', '-24', '', 'Title', 'Type your text here...', '', ''),
(127, 'info_1', 'info_hotspot', 'info', '-39', '-9', '', '', '', '', ''),
(124, 'link_3', 'arrow_hotspot', 'link', '-12', '-7', 'scene_135', '', '', '', ''),
(124, 'media_2', 'photo_hotspot', 'media', '-2', '-2', '', '', '', 'thumb100x50.jpg', ''),
(124, 'info_1', 'info_hotspot', 'info', '-19.739388936883', '-14.235599725543', '', '', '', '', ''),
(183, 'info_1', 'info_hotspot', 'info', '-1', '-9', '', 'bxdfx', 'Type your text here...', '', ''),
(119, 'info_2', 'info_hotspot', 'info', '5.2337819696892', '4.7365900106484', '', 'Title', 'Type your text here...', '', ''),
(221, 'link_1', 'arrow_hotspot', 'link', '-28', '-12', '', '', '', '', ''),
(221, 'info_2', 'info_hotspot', 'info', '-27', '-22', '', 'Title', 'Type your text here...', '', ''),
(221, 'link_3', 'arrow_hotspot', 'link', '-16', '-17', '', '', '', '', ''),
(221, 'link_4', 'arrow_hotspot', 'link', '-7', '-24', '', '', '', '', ''),
(221, 'link_6', 'arrow_hotspot', 'link', '-5', '-8', '', '', '', '', ''),
(221, 'link_5', 'arrow_hotspot', 'link', '-33', '-21', '', '', '', '', ''),
(221, 'info_7', 'info_hotspot', 'info', '-12', '-24', '', 'Title', 'Type your text here...', '', ''),
(221, 'info_8', 'info_hotspot', 'info', '-36', '-5', '', 'Title', 'Type your text here...', '', ''),
(35, 'info_2', 'info_hotspot', 'info', '175.00242761277', '25.759202554829', '', 'Title', 'Type your text here...', '', ''),
(41, 'info_1', 'info_hotspot', 'info', '-1', '-24', '', 'uno "dos" tres ''cuatro'' cinco', 'text1 "text2" text3 ''text4'' text5', '', ''),
(21, 'info_6', 'info_hotspot', 'info', '-25', '-3', '', 'hola ''123'' d"s"a', 'hola ''123'' d"s"a', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
  `iduser` int(11) NOT NULL,
  `idtour` int(11) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`iduser`, `idtour`, `ip`, `date`) VALUES
(69, 8, ' 190.2.100.45', '2014-10-10 14:56:54'),
(69, 15, ' 190.2.100.45', '2014-10-10 14:57:00'),
(103, 50, ' 201.253.4.41', '2015-02-02 23:00:18'),
(103, 39, ' 201.253.4.41', '2015-02-02 22:56:57'),
(103, 15, ' 201.253.4.41', '2015-02-02 22:54:05'),
(103, 19, ' 190.138.196.214', '2015-01-29 01:24:40'),
(96, 81, ' 200.3.95.35', '2014-12-10 15:41:12'),
(56, 48, ' 190.2.100.45', '2014-10-24 17:04:40'),
(41, 35, ' 190.192.44.51', '2014-11-18 20:23:58'),
(41, 34, ' 190.192.44.51', '2014-11-18 20:33:26'),
(41, 40, ' 190.192.44.51', '2014-11-18 20:34:29'),
(41, 41, ' 190.192.44.51', '2014-11-18 20:35:43'),
(41, 77, ' 190.192.44.51', '2014-11-18 20:35:59'),
(41, 85, ' 190.192.44.51', '2014-11-18 20:41:40'),
(56, 85, ' 190.2.100.45', '2014-11-18 20:52:15'),
(56, 97, ' 190.2.100.45', '2014-11-18 20:52:21'),
(56, 8, ' 190.2.100.45', '2014-11-18 20:52:35'),
(56, 93, ' 190.2.100.45', '2014-11-18 20:52:41'),
(56, 90, ' 190.2.100.45', '2014-11-18 20:52:44'),
(56, 91, ' 190.2.100.45', '2014-11-18 20:52:48'),
(56, 92, ' 190.2.100.45', '2014-11-18 20:52:50'),
(56, 39, ' 190.2.100.45', '2014-11-18 20:53:24'),
(41, 88, ' 190.192.44.51', '2014-11-18 21:04:48'),
(41, 91, ' 190.192.44.51', '2014-11-18 21:11:50'),
(41, 50, ' 190.192.44.51', '2014-11-19 15:05:07'),
(41, 119, ' 190.192.44.51', '2014-11-26 17:14:40'),
(96, 15, ' 181.164.124.215', '2014-12-10 01:27:02'),
(96, 88, ' 200.3.95.35', '2014-12-03 18:41:46'),
(96, 114, ' 200.3.95.35', '2014-12-03 18:31:52'),
(96, 107, ' 200.3.95.35', '2014-12-03 15:17:19'),
(96, 109, ' 200.3.95.35', '2014-12-03 14:49:15'),
(96, 118, ' 200.3.95.35', '2014-12-03 14:48:52'),
(96, 113, ' 200.3.95.35', '2014-12-03 14:46:29'),
(96, 117, ' 200.3.95.35', '2014-12-03 14:27:25'),
(41, 109, ' 190.192.44.51', '2014-11-26 19:18:52'),
(96, 119, ' 200.3.95.35', '2014-12-03 13:10:17'),
(96, 111, ' 200.3.95.35', '2014-11-27 17:45:52'),
(96, 37, ' 190.192.50.87', '2014-11-26 20:36:45'),
(96, 19, ' 190.192.50.87', '2014-11-26 20:36:33'),
(103, 48, ' 201.253.4.41', '2015-02-02 23:03:51'),
(103, 91, ' 201.253.4.41', '2015-02-02 23:06:59'),
(103, 77, ' 201.253.4.41', '2015-02-02 23:13:11'),
(103, 37, ' 201.253.4.41', '2015-02-02 23:17:57'),
(103, 88, ' 201.253.4.41', '2015-02-02 23:20:45'),
(103, 40, ' 201.253.4.41', '2015-02-02 23:23:56'),
(103, 93, ' 201.253.4.41', '2015-02-02 23:26:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes_priority_steps`
--

CREATE TABLE IF NOT EXISTS `likes_priority_steps` (
  `amount` int(11) DEFAULT NULL,
  `factor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `likes_priority_steps`
--

INSERT INTO `likes_priority_steps` (`amount`, `factor`) VALUES
(10, 1),
(25, 1),
(50, 1),
(100, 1),
(200, 1),
(500, 1),
(1000, 1),
(1500, 1),
(2000, 1),
(1000, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `text` varchar(5000) NOT NULL,
  `date` datetime NOT NULL,
  `leido` int(1) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL,
  `checked` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=281 ;

--
-- Volcado de datos para la tabla `notifications`
--

INSERT INTO `notifications` (`id`, `source_id`, `target_id`, `text`, `date`, `leido`, `type`, `checked`) VALUES
(1, 96, 1, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(2, 96, 54, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(3, 96, 55, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(4, 96, 56, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 1, 4, 0),
(5, 96, 57, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(6, 96, 51, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(7, 96, 52, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(8, 96, 47, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(9, 96, 43, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(10, 96, 40, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 1, 4, 0),
(11, 96, 41, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 1, 4, 0),
(12, 96, 42, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(13, 96, 39, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(14, 96, 69, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(15, 96, 72, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 0, 4, 0),
(16, 96, 96, 'has news for you: <strong><a href="blog-single-post.php?id=1">test</a></strong>', '2014-12-01 14:38:59', 1, 4, 0),
(21, 96, 1, 'likes your tour: <strong><a href="tour.php?id=117">Untitled 117</a></strong>', '2014-12-03 14:27:26', 0, 2, 0),
(19, 96, 69, 'is now following you', '2014-12-01 18:57:21', 0, 1, 0),
(20, 96, 1, 'likes your tour: <strong><a href="tour.php?id=119">123-123</a></strong>', '2014-12-03 13:10:17', 0, 2, 0),
(22, 96, 1, 'likes your tour: <strong><a href="tour.php?id=113">Untitled 113</a></strong>', '2014-12-03 14:46:29', 0, 2, 0),
(23, 96, 1, 'likes your tour: <strong><a href="tour.php?id=118">Untitled 118</a></strong>', '2014-12-03 14:48:53', 0, 2, 0),
(24, 96, 1, 'likes your tour: <strong><a href="tour.php?id=109">Untitled 109</a></strong>', '2014-12-03 14:49:15', 0, 2, 0),
(25, 96, 1, 'likes your tour: <strong><a href="tour.php?id=107">Untitled 107</a></strong>', '2014-12-03 15:17:20', 0, 2, 0),
(29, 96, 1, 'is now following you', '2014-12-04 14:41:44', 0, 1, 0),
(27, 96, 1, 'likes your tour: <strong><a href="tour.php?id=114">Untitled 114</a></strong>', '2014-12-03 18:31:52', 0, 2, 0),
(28, 96, 1, 'likes your tour: <strong><a href="tour.php?id=88">Untitled 88</a></strong>', '2014-12-03 18:41:46', 0, 2, 0),
(30, 96, 39, 'is now following you', '2014-12-04 14:44:39', 0, 1, 0),
(31, 96, 42, 'is now following you', '2014-12-04 14:44:40', 0, 1, 0),
(32, 96, 1, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(33, 96, 54, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(34, 96, 55, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(35, 96, 56, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 1, 6, 0),
(36, 96, 57, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(37, 96, 51, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(38, 96, 47, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(39, 96, 43, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(40, 96, 40, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(41, 96, 41, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 1, 6, 0),
(42, 96, 42, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(43, 96, 39, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(44, 96, 69, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(45, 96, 72, 'published a new virtual tour: <strong><a href="tour.php?id=84">Untitled 84</a></strong>', '2014-12-04 18:16:55', 0, 6, 0),
(78, 96, 54, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(47, 96, 1, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(48, 96, 54, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(49, 96, 55, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(50, 96, 56, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 1, 6, 0),
(51, 96, 57, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(52, 96, 51, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(53, 96, 47, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(54, 96, 43, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(55, 96, 40, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(56, 96, 41, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 1, 6, 0),
(57, 96, 42, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(58, 96, 39, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(59, 96, 69, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(60, 96, 72, 'published a new virtual tour: <strong><a href="tour.php?id=82">Untitled 82</a></strong>', '2014-12-04 18:17:33', 0, 6, 0),
(62, 96, 1, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(63, 96, 54, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(64, 96, 55, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(65, 96, 56, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 1, 6, 0),
(66, 96, 57, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(67, 96, 51, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(68, 96, 47, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(69, 96, 43, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(70, 96, 40, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(71, 96, 41, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 1, 6, 0),
(72, 96, 42, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(73, 96, 39, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(74, 96, 69, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(75, 96, 72, 'published a new virtual tour: <strong><a href="tour.php?id=81">Untitled 81</a></strong>', '2014-12-04 18:17:41', 0, 6, 0),
(79, 96, 55, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(77, 96, 1, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(80, 96, 56, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 1, 4, 0),
(81, 96, 57, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(82, 96, 51, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(83, 96, 52, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(84, 96, 47, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(85, 96, 43, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(86, 96, 40, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(87, 96, 41, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 1, 4, 0),
(88, 96, 42, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(89, 96, 39, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(90, 96, 69, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(91, 96, 72, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 0, 4, 0),
(92, 96, 96, 'has news for you: <strong><a href="blog-single-post.php?id=2">123</a></strong>', '2014-12-10 14:22:51', 1, 4, 1),
(94, 96, 1, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(95, 96, 54, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(96, 96, 55, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(98, 96, 57, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(99, 96, 51, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(100, 96, 52, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(101, 96, 47, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(102, 96, 43, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(103, 96, 40, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(104, 96, 41, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 1, 4, 0),
(105, 96, 42, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(106, 96, 39, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(107, 96, 69, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(108, 96, 72, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 0, 4, 0),
(109, 96, 96, 'has news for you: <strong><a href="blog-single-post.php?id=3">dddd</a></strong>', '2014-12-10 14:23:20', 1, 4, 1),
(111, 96, 1, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(112, 96, 54, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(113, 96, 55, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(114, 96, 56, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 1, 4, 1),
(115, 96, 57, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(116, 96, 51, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(117, 96, 52, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(118, 96, 47, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(119, 96, 43, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(120, 96, 40, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(121, 96, 41, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 1, 4, 0),
(122, 96, 42, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(123, 96, 39, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(124, 96, 69, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(125, 96, 72, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 0, 4, 0),
(126, 96, 96, 'has news for you: <strong><a href="blog-single-post.php?id=4">123</a></strong>', '2014-12-10 14:34:40', 1, 4, 1),
(128, 96, 1, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(129, 96, 54, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(130, 96, 55, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(131, 96, 56, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 1, 4, 0),
(132, 96, 57, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(133, 96, 51, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(134, 96, 52, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(135, 96, 47, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(136, 96, 43, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(137, 96, 40, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(138, 96, 41, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 1, 4, 0),
(139, 96, 42, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(140, 96, 39, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(141, 96, 69, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(142, 96, 72, 'has news for you: <strong><a href="blog-single-post.php?id=5">123</a></strong>', '2014-12-10 14:35:21', 0, 4, 0),
(145, 96, 1, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(146, 96, 54, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(147, 96, 55, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(148, 96, 56, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 1, 4, 1),
(149, 96, 57, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(150, 96, 51, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(151, 96, 52, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(152, 96, 47, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(153, 96, 43, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(154, 96, 40, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(155, 96, 41, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 1, 4, 0),
(156, 96, 42, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(157, 96, 39, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(158, 96, 69, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(159, 96, 72, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 0, 4, 0),
(160, 96, 96, 'has news for you: <strong><a href="blog-single-post.php?id=6">123</a></strong>', '2014-12-10 15:10:48', 1, 4, 0),
(165, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2014-12-17 13:17:48', 0, 3, 0),
(164, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2014-12-17 13:17:29', 0, 5, 0),
(163, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2014-12-17 13:14:05', 0, 5, 0),
(162, 56, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2014-12-12 13:59:24', 0, 3, 0),
(166, 96, 1, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(167, 96, 54, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(168, 96, 55, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(169, 96, 56, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 1, 6, 0),
(170, 96, 57, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(171, 96, 51, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(172, 96, 47, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(173, 96, 43, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(174, 96, 40, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(175, 96, 41, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 1, 6, 0),
(176, 96, 42, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(177, 96, 39, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(178, 96, 69, 'published a new virtual tour: <strong><a href="tour.php?id=123">Untitled 123</a></strong>', '2014-12-23 14:57:30', 0, 6, 0),
(200, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:04:24', 0, 3, 0),
(180, 96, 1, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(181, 96, 54, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(182, 96, 55, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(183, 96, 56, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 1, 4, 0),
(184, 96, 57, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(185, 96, 51, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(186, 96, 52, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(187, 96, 47, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(188, 96, 43, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(189, 96, 40, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(190, 96, 41, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 1, 4, 0),
(191, 96, 42, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(192, 96, 39, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(193, 96, 69, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(194, 96, 96, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 1, 4, 0),
(199, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:04:11', 0, 3, 0),
(196, 96, 110, 'has news for you: <strong><a href="blog-single-post.php?id=7">test</a></strong>', '2014-12-23 17:29:06', 0, 4, 0),
(198, 111, 56, 'is now following you', '2014-12-26 20:25:44', 1, 1, 0),
(201, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:10:22', 0, 3, 0),
(202, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:13:10', 0, 3, 0),
(203, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:13:24', 0, 3, 0),
(204, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:14:02', 0, 3, 0),
(205, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:26:28', 0, 3, 0),
(206, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:27:46', 0, 3, 0),
(207, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:29:57', 0, 3, 0),
(208, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:32:35', 0, 3, 0),
(209, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:33:50', 0, 3, 0),
(210, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:42:11', 0, 3, 0),
(211, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:51:36', 0, 3, 0),
(212, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 17:54:22', 0, 3, 0),
(213, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:09:42', 0, 3, 0),
(214, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:09:58', 0, 5, 0),
(215, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:12:09', 0, 3, 0),
(216, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:13:31', 0, 3, 0),
(217, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:13:52', 0, 5, 0),
(218, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:14:20', 0, 5, 0),
(219, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:19:56', 0, 3, 0),
(220, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:20:06', 0, 3, 0),
(221, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:23:19', 0, 3, 0),
(222, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:25:07', 0, 3, 0),
(223, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:25:48', 0, 5, 0),
(224, 96, 1, 'commented your tour: <strong><a href="tour.php?id=119#comments">123-123</a></strong>', '2015-01-19 18:28:54', 0, 5, 0),
(225, 103, 41, 'commented your tour: <strong><a href="tour.php?id=18#comments">Untitled 18</a></strong>', '2015-01-28 23:48:56', 1, 3, 0),
(226, 103, 41, 'commented your tour: <strong><a href="tour.php?id=18#comments">Untitled 18</a></strong>', '2015-01-29 00:51:17', 1, 3, 0),
(227, 103, 56, 'commented your tour: <strong><a href="tour.php?id=19#comments">Untitled 19</a></strong>', '2015-01-29 01:03:21', 1, 3, 0),
(228, 103, 56, 'commented your tour: <strong><a href="tour.php?id=19#comments">Untitled 19</a></strong>', '2015-01-29 01:04:25', 1, 3, 0),
(229, 103, 56, 'commented your tour: <strong><a href="tour.php?id=19#comments">Untitled 19</a></strong>', '2015-01-29 01:05:44', 1, 5, 0),
(230, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:24:41', 1, 2, 0),
(231, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:25:04', 1, 2, 0),
(232, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:25:19', 1, 2, 0),
(233, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:27:46', 1, 2, 0),
(234, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:30:18', 1, 2, 0),
(235, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:31:56', 1, 2, 0),
(236, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:35:21', 1, 2, 0),
(237, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:36:43', 1, 2, 0),
(238, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:38:13', 1, 2, 0),
(239, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:40:35', 1, 2, 0),
(240, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:44:40', 1, 2, 0),
(241, 103, 56, 'likes your tour: <strong><a href="tour.php?id=19">Untitled 19</a></strong>', '2015-01-29 01:44:54', 1, 2, 0),
(242, 56, 1, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(243, 56, 54, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(244, 56, 55, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(245, 56, 56, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 1, 4, 0),
(246, 56, 57, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(247, 56, 51, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(248, 56, 52, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(249, 56, 47, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(250, 56, 43, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(251, 56, 40, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(252, 56, 41, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 1, 4, 0),
(253, 56, 42, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(254, 56, 39, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(255, 56, 69, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(256, 56, 96, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 1, 4, 0),
(257, 56, 103, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 1, 4, 1),
(258, 56, 110, 'has news for you: <strong><a href="blog-single-post.php?id=7">test embed video</a></strong>', '2015-02-02 02:03:38', 0, 4, 0),
(259, 103, 1, 'likes your tour: <strong><a href="tour.php?id=93">Untitled 93</a></strong>', '2015-02-02 23:26:14', 0, 2, 0),
(260, 103, 69, 'likes your tour: <strong><a href="tour.php?id=8">Untitled 8</a></strong>', '2015-02-03 00:05:26', 0, 2, 0),
(261, 103, 1, 'commented your tour: <strong><a href="tour.php?id=118#comments">Untitled 118</a></strong>', '2015-02-03 00:59:47', 0, 3, 0),
(262, 103, 1, 'commented your tour: <strong><a href="tour.php?id=118#comments">Untitled 118</a></strong>', '2015-02-03 01:01:19', 0, 3, 0),
(263, 96, 1, 'commented your tour: <strong><a href="tour.php?id=118#comments">Untitled 118</a></strong>', '2015-02-03 17:07:47', 0, 3, 0),
(264, 96, 1, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(265, 96, 54, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(266, 96, 55, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(267, 96, 56, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 1, 4, 0),
(268, 96, 57, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(269, 96, 51, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(270, 96, 52, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(271, 96, 47, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(272, 96, 43, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(273, 96, 40, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(274, 96, 41, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(275, 96, 42, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(276, 96, 39, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(277, 96, 69, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(278, 96, 96, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 1, 4, 0),
(279, 96, 103, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0),
(280, 96, 110, 'has news for you: <strong><a href="blog-single-post.php?id=8">123</a></strong>', '2015-02-06 16:24:04', 0, 4, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `panos`
--

CREATE TABLE IF NOT EXISTS `panos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=158 ;

--
-- Volcado de datos para la tabla `panos`
--

INSERT INTO `panos` (`id`, `state`, `user`, `date`, `name`) VALUES
(24, 1, 41, '2014-10-14 13:37:33', 'panoramica.jpg'),
(15, 1, 96, '2014-10-09 20:54:20', 'front0.jpg'),
(16, 1, 69, '2014-10-09 21:01:24', 'puerto2.jpg'),
(17, 1, 69, '2014-10-09 21:01:35', 'costa3.jpg'),
(18, 1, 69, '2014-10-09 21:01:48', 'costa2.jpg'),
(19, 1, 96, '2014-10-09 21:13:06', 'front0.jpg'),
(20, 1, 96, '2014-10-10 15:25:38', 'Copia (2) de thumb200x100.jpg'),
(21, 1, 41, '2014-10-10 21:45:55', 'back.jpg'),
(35, 1, 96, '2014-10-15 17:10:28', 'puerto2.jpg'),
(23, 1, 41, '2014-10-14 13:36:26', 'panoramica.jpg'),
(25, 1, 41, '2014-10-14 14:35:15', 'panoramica.jpg'),
(36, 1, 96, '2014-10-15 17:11:50', 'Restaurant.jpg'),
(27, 1, 56, '2014-10-14 15:27:37', 'costa3.jpg'),
(28, 1, 56, '2014-10-14 15:30:45', 'costa2.jpg'),
(29, 1, 56, '2014-10-14 15:37:38', '12_baja.jpg'),
(30, 1, 96, '2014-10-14 20:15:19', 'front0.jpg'),
(51, 1, 96, '2014-10-21 14:45:38', 'bar.jpg'),
(52, 1, 96, '2014-10-21 14:45:45', 'foyer.jpg'),
(53, 1, 96, '2014-10-21 14:45:45', 'puerto2.jpg'),
(37, 1, 96, '2014-10-16 16:37:34', 'Copia (2) de thumb200x100.jpg'),
(38, 1, 96, '2014-10-16 16:40:39', 'Copia (2) de thumb200x100.jpg'),
(39, 1, 96, '2014-10-16 16:43:38', 'Copia de thumb200x100.jpg'),
(40, 1, 96, '2014-10-16 16:45:45', 'Copia (2) de thumb200x100.jpg'),
(41, 1, 96, '2014-10-16 16:46:02', 'Copia (2) de thumb200x100.jpg'),
(42, 1, 96, '2014-10-16 17:21:55', 'Copia (2) de thumb200x100.jpg'),
(43, 1, 56, '2014-10-16 18:53:04', '12_baja.jpg'),
(44, 1, 96, '2014-10-17 14:53:42', 'foyer.jpg'),
(45, 1, 96, '2014-10-17 14:58:03', 'Copia (2) de thumb200x100.jpg'),
(46, 1, 96, '2014-10-17 15:18:54', 'Copia (2) de thumb200x100.jpg'),
(47, 1, 96, '2014-10-17 15:21:14', 'Copia (2) de thumb200x100.jpg'),
(48, 1, 96, '2014-10-17 15:23:30', 'Copia (2) de thumb200x100.jpg'),
(49, 1, 40, '2014-10-19 19:17:24', 'yaddo_gardens_01 Panorama - patchwork.jpg'),
(50, 1, 56, '2014-10-19 22:10:25', '12_baja.jpg'),
(54, 1, 96, '2014-10-21 14:47:27', 'Copia (2) de thumb200x100.jpg'),
(55, 1, 96, '2014-10-21 14:47:32', 'bar.jpg'),
(56, 1, 96, '2014-10-21 14:47:32', 'foyer.jpg'),
(57, 1, 96, '2014-10-21 14:48:07', 'puerto2.jpg'),
(58, 1, 96, '2014-10-21 14:51:46', 'Copia (2) de thumb200x100.jpg'),
(59, 1, 96, '2014-10-21 14:51:46', 'Copia de thumb200x100.jpg'),
(60, 1, 96, '2014-10-21 14:51:50', 'big.jpg'),
(62, 1, 96, '2014-10-21 14:52:09', 'index.jpg'),
(63, 1, 96, '2014-10-21 14:52:09', 'Restaurant.jpg'),
(64, 1, 96, '2014-10-21 14:52:09', 'foyer.jpg'),
(65, 1, 96, '2014-10-21 14:52:09', 'puerto2.jpg'),
(80, 1, 96, '2014-11-05 15:08:10', 'b''ar.jpg'),
(83, 1, 41, '2014-11-11 15:31:29', 'panoramica.jpg'),
(82, 1, 41, '2014-11-11 15:28:15', 'panoramica.jpg'),
(74, 1, 40, '2014-10-24 16:53:26', 'ricoh theta test_sharpened.jpg'),
(85, 1, 40, '2014-11-11 15:47:25', '_01_party_boat_deck.jpg'),
(81, 1, 103, '2014-11-05 16:56:06', 'Copia de thumb200x100.jpg'),
(72, 1, 96, '2014-10-21 16:43:19', 'Restaurant.jpg'),
(88, 1, 96, '2014-11-12 16:25:00', 'Copia (2) de thumb200x100.jpg'),
(86, 1, 41, '2014-11-11 15:51:37', 'panoramica.jpg'),
(89, 1, 96, '2014-11-12 16:25:00', 'Copia de thumb200x100.jpg'),
(78, 1, 96, '2014-11-03 17:09:39', 'b''ar.jpg'),
(87, 1, 56, '2014-11-11 21:53:23', '12_baja.jpg'),
(84, 1, 40, '2014-11-11 15:47:18', '_02_partyboat_cabin_10_11_9_fused Panorama.jpg'),
(90, 1, 96, '2014-11-12 16:25:14', 'index.jpg'),
(91, 1, 96, '2014-11-12 16:25:18', 'foyer.jpg'),
(92, 1, 96, '2014-11-12 16:25:26', 'Restaurant.jpg'),
(93, 1, 96, '2014-11-12 16:25:45', 'puerto2.jpg'),
(94, 1, 96, '2014-11-12 16:26:50', 'Copia de thumb200x100.jpg'),
(95, 1, 96, '2014-11-12 16:26:50', 'Copia (2) de thumb200x100.jpg'),
(96, 1, 96, '2014-11-12 16:26:57', 'index.jpg'),
(97, 1, 96, '2014-11-12 16:26:58', 'Restaurant.jpg'),
(98, 1, 96, '2014-11-12 16:27:24', 'puerto2.jpg'),
(99, 1, 96, '2014-11-12 16:27:33', 'foyer.jpg'),
(100, 0, 96, '2014-11-12 16:57:45', 'Copia de thumb200x100.jpg'),
(101, 0, 96, '2014-11-12 16:57:45', 'Copia (2) de thumb200x100.jpg'),
(102, 1, 96, '2014-11-12 17:10:46', 'Copia de thumb200x100.jpg'),
(103, 1, 96, '2014-11-12 17:10:46', 'Copia (2) de thumb200x100.jpg'),
(104, 1, 96, '2014-11-12 17:10:51', 'b''ig.jpg'),
(105, 1, 96, '2014-11-12 17:11:10', 'index.jpg'),
(106, 1, 96, '2014-11-12 17:11:31', 'foyer.jpg'),
(107, 1, 96, '2014-11-12 17:14:50', 'Copia (2) de thumb200x100.jpg'),
(108, 1, 96, '2014-11-12 17:14:51', 'Copia de thumb200x100.jpg'),
(109, 1, 96, '2014-11-12 17:14:55', 'b''ig.jpg'),
(110, 1, 96, '2014-11-12 17:15:13', 'Restaurant.jpg'),
(111, 1, 96, '2014-11-12 17:15:13', 'index.jpg'),
(112, 1, 96, '2014-11-12 17:15:36', 'foyer.jpg'),
(113, 1, 96, '2014-11-12 17:15:44', 'puerto2.jpg'),
(114, 1, 56, '2014-11-13 13:27:57', 'panoramica.jpg'),
(115, 1, 56, '2014-11-13 13:41:32', 'panoramica.jpg'),
(116, 1, 56, '2014-11-13 13:51:00', 'panoramica.jpg'),
(117, 1, 56, '2014-11-13 18:54:49', '12_baja.jpg'),
(118, 1, 56, '2014-11-13 18:57:55', '12_baja.jpg'),
(119, 1, 1, '2014-11-17 18:19:08', 'Restaurant.jpg'),
(120, 1, 56, '2014-11-17 22:04:59', '12_baja.jpg'),
(121, 1, 41, '2014-11-18 18:18:45', 'panoramica.jpg'),
(122, 1, 41, '2014-11-18 18:19:57', 'panoramica.jpg'),
(123, 1, 41, '2014-11-18 18:26:06', 'panoramica.jpg'),
(124, 1, 41, '2014-11-18 18:28:21', 'panoramica.jpg'),
(125, 1, 41, '2014-11-18 18:30:40', 'panoramica.jpg'),
(126, 1, 41, '2014-11-18 18:35:32', 'panoramica.jpg'),
(127, 0, 96, '2014-12-09 18:17:05', 'big.jpeg'),
(128, 0, 96, '2014-12-09 18:19:23', 'big.jpeg'),
(129, 1, 96, '2014-12-09 18:20:18', 'bar.jpg'),
(148, 1, 96, '2015-01-14 21:14:07', 'pano1.jpg'),
(147, 1, 96, '2015-01-14 21:13:53', 'bar.jpg'),
(133, 1, 96, '2014-12-10 01:37:04', '1.png'),
(146, 1, 96, '2015-01-14 20:48:56', 'pano2.jpg'),
(145, 1, 96, '2015-01-14 20:48:02', 'pano3.jpg'),
(144, 1, 96, '2015-01-14 20:47:40', 'pano1.jpg'),
(149, 1, 96, '2015-01-14 21:14:48', 'pano2.jpg'),
(150, 1, 96, '2015-01-14 21:14:48', 'pano3.jpg'),
(151, 1, 96, '2015-01-19 16:43:38', 'bar.jpg'),
(152, 1, 96, '2015-01-19 16:45:10', 'bar.jpg'),
(153, 1, 96, '2015-01-19 16:46:25', 'bar.jpg'),
(154, 1, 96, '2015-01-19 16:49:01', 'bar.jpg'),
(155, 1, 96, '2015-01-19 16:52:35', 'bar.jpg'),
(156, 1, 96, '2015-01-19 16:54:38', 'bar.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `panosxtour`
--

CREATE TABLE IF NOT EXISTS `panosxtour` (
  `ord` int(11) NOT NULL,
  `idpano` int(11) NOT NULL,
  `idtour` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `id` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `vlookat` varchar(5) NOT NULL DEFAULT '000',
  `hlookat` varchar(5) NOT NULL DEFAULT '000',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `panosxtour`
--

INSERT INTO `panosxtour` (`ord`, `idpano`, `idtour`, `name`, `id`, `state`, `vlookat`, `hlookat`) VALUES
(0, 15, 9, 'front0', 21, 0, '000', '000'),
(1, 15, 15, 'front0', 33, 1, '000', '000'),
(2, 20, 15, 'Copia (2) de thumb200x100', 34, 0, '000', '000'),
(0, 19, 15, 'front0', 32, 1, '000', '000'),
(0, 17, 8, 'costa3', 23, 0, '000', '000'),
(2, 18, 8, 'costa2', 24, 0, '000', '000'),
(1, 16, 8, 'puerto2', 22, 0, '000', '000'),
(0, 21, 16, 'back', 35, 0, '000', '000'),
(0, 23, 18, 'panoramica', 37, 0, '000', '000'),
(3, 116, 19, 'panoramica', 183, 0, '000', '000'),
(6, 27, 19, 'costa3', 147, 1, '000', '000'),
(0, 36, 25, 'Restaurant', 58, 0, '000', '000'),
(1, 42, 36, 'Copia (2) de thumb200x100', 74, 0, '000', '000'),
(0, 41, 36, 'Copia (2) de thumb200x100', 73, 1, '000', '000'),
(1, 28, 37, 'costa2', 78, 1, '000', '000'),
(2, 27, 37, 'costa3', 79, 1, '000', '000'),
(0, 43, 37, '12_baja', 75, 0, '28.83', '-105.'),
(0, 44, 38, 'foyer', 80, 0, '000', '000'),
(0, 45, 39, 'Copia (2) de thumb200x100', 81, 0, '000', '000'),
(0, 49, 48, 'yaddo_gardens_01 Panorama - patchwork', 92, 0, '000', '000'),
(4, 29, 19, '12_baja', 145, 1, '000', '000'),
(5, 28, 19, 'costa2', 146, 1, '000', '000'),
(8, 28, 19, 'costa2', 42, 0, '000', '000'),
(1, 43, 19, '12_baja', 144, 1, '000', '000'),
(1, 74, 48, 'ricoh theta test_sharpened', 118, 0, '000', '000'),
(1, 43, 54, '12_baja', 120, 1, '000', '000'),
(0, 119, 87, 'Restaurant', 203, 0, '000', '000'),
(0, 112, 50, 'foyer', 202, 1, '000', '000'),
(0, 50, 54, '12_baja ', 119, 1, '000', '000'),
(0, 46, 41, 'Copia (2) de thumb200x100', 84, 0, '000', '000'),
(0, 45, 40, 'Copia (2) de thumb200x100', 82, 1, '000', '000'),
(0, 41, 35, 'Copia (2) de thumb200x100', 71, 1, '000', '000'),
(1, 40, 35, 'Copia (2) de thumb200x100', 72, 1, '000', '000'),
(0, 41, 34, 'Copia (2) de thumb200x100', 70, 1, '000', '000'),
(1, 85, 77, '_01_party_boat_deck', 152, 0, '000', '000'),
(2, 50, 19, '12_baja', 143, 1, '000', '000'),
(0, 84, 77, '_02_partyboat_cabin_10_11_9_fused Panorama', 151, 0, '000', '000'),
(0, 27, 19, 'Nombre largo Nombre largo Nombre largo Nombre largo ', 41, 0, '000', '000'),
(7, 29, 19, '12_baja', 43, 0, '000', '000'),
(0, 119, 88, 'Restaurant', 204, 1, '000', '000'),
(0, 119, 89, 'Restaurant', 205, 1, '000', '000'),
(0, 119, 90, 'Restaurant', 206, 1, '000', '000'),
(0, 119, 91, 'Restaurant', 207, 1, '000', '000'),
(0, 119, 92, 'Restaurant', 208, 1, '000', '000'),
(0, 119, 93, 'Restaurant', 209, 1, '000', '000'),
(0, 119, 94, 'Restaurant', 210, 1, '000', '000'),
(0, 119, 97, 'Restaurant', 213, 1, '000', '000'),
(6, 113, 85, 'puerto2', 180, 0, '000', '000'),
(5, 112, 85, 'foyer', 179, 0, '000', '000'),
(3, 111, 85, 'index', 178, 0, '000', '000'),
(4, 110, 85, 'Restaurant', 177, 0, '000', '000'),
(2, 109, 85, 'b''ig', 176, 0, '000', '000'),
(1, 108, 85, 'Copia de thumb200x100', 175, 0, '000', '000'),
(0, 107, 85, 'Copia (2) de thumb200x100', 174, 0, '000', '000'),
(0, 119, 106, 'Restaurant', 222, 1, '000', '000'),
(0, 119, 107, 'Restaurant', 223, 1, '000', '000'),
(0, 119, 108, 'Restaurant', 224, 1, '000', '000'),
(0, 119, 109, 'Restaurant', 225, 1, '000', '000'),
(0, 119, 110, 'Restaurant', 226, 1, '000', '000'),
(0, 119, 111, 'Restaurant', 227, 1, '000', '000'),
(0, 119, 112, 'Restaurant', 228, 1, '000', '000'),
(0, 119, 113, 'Restaurant', 229, 1, '000', '000'),
(0, 119, 114, 'Restaurant', 230, 1, '000', '000'),
(0, 119, 115, 'Restaurant', 231, 1, '000', '000'),
(0, 119, 116, 'Restaurant', 232, 1, '000', '000'),
(0, 119, 117, 'Restaurant', 233, 1, '000', '000'),
(0, 119, 118, 'Restaurant', 234, 1, '000', '000'),
(0, 119, 119, 'Restaurant', 235, 1, '000', '000'),
(0, 116, 54, 'panoramica', 184, 1, '000', '000'),
(1, 115, 54, 'panoramica', 185, 1, '000', '000'),
(0, 118, 54, '12_baja', 201, 1, '000', '000'),
(0, 115, 54, 'panoramica', 200, 1, '000', '000'),
(0, 81, 154, 'Copia de thumb200x100', 294, 1, '000', '000'),
(0, 120, 95, '12_baja', 211, 0, '000', '000'),
(1, 102, 84, 'Copia de thumb200x100', 169, 0, '000', '000'),
(0, 103, 84, 'Copia (2) de thumb200x100', 170, 0, '000', '000'),
(2, 104, 84, 'b''ig', 171, 0, '000', '000'),
(3, 105, 84, 'index', 172, 0, '000', '000'),
(4, 106, 84, 'foyer', 173, 0, '000', '000'),
(5, 98, 82, 'puerto2', 165, 0, '000', '000'),
(0, 95, 82, 'Copia (2) de thumb200x100', 162, 0, '000', '000'),
(4, 99, 82, 'foyer', 166, 0, '000', '000'),
(2, 97, 82, 'Restaurant', 164, 0, '000', '000'),
(3, 96, 82, 'index', 163, 0, '000', '000'),
(1, 94, 82, 'Copia de thumb200x100', 161, 0, '000', '000'),
(0, 88, 81, 'Copia (2) de thumb200x100', 155, 0, '000', '000'),
(1, 89, 81, 'Copia de thumb200x100', 156, 0, '000', '000'),
(2, 90, 81, 'index', 157, 0, '000', '000'),
(4, 91, 81, 'foyer', 158, 0, '000', '000'),
(3, 92, 81, 'Restaurant', 159, 0, '000', '000'),
(5, 93, 81, 'puerto2', 160, 0, '000', '000'),
(1, 44, 40, 'foyer', 83, 1, '000', '000'),
(1, 81, 128, 'Copia de thumb200x100', 290, 1, '000', '000'),
(4, 81, 149, 'Copia de thumb200x100', 277, 1, '000', '000'),
(0, 81, 155, 'Copia de thumb200x100', 295, 1, '000', '000'),
(3, 81, 149, 'Copia de thumb200x100', 282, 1, '000', '000'),
(2, 81, 149, 'Copia de thumb200x100', 283, 1, '000', '000'),
(1, 81, 149, 'Copia de thumb200x100', 284, 1, '000', '000'),
(0, 81, 149, 'Copia de thumb200x100', 285, 1, '000', '000'),
(0, 81, 153, 'Copia de thumb200x100', 293, 1, '000', '000'),
(0, 81, 128, 'Copia de thumb200x100', 291, 1, '000', '000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `panosxtour_draft`
--

CREATE TABLE IF NOT EXISTS `panosxtour_draft` (
  `ord` int(11) NOT NULL,
  `idpano` int(11) NOT NULL,
  `idtour` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` int(11) NOT NULL,
  `vlookat` varchar(5) NOT NULL DEFAULT '000',
  `hlookat` varchar(5) NOT NULL DEFAULT '000',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=296 ;

--
-- Volcado de datos para la tabla `panosxtour_draft`
--

INSERT INTO `panosxtour_draft` (`ord`, `idpano`, `idtour`, `name`, `id`, `state`, `vlookat`, `hlookat`) VALUES
(0, 19, 10, 'front0', 25, 0, '000', '000'),
(0, 19, 11, 'front0', 26, 1, '000', '000'),
(0, 17, 8, 'costa3', 23, 0, '000', '000'),
(2, 18, 8, 'costa2', 24, 0, '000', '000'),
(0, 15, 9, 'front0', 21, 0, '000', '000'),
(1, 16, 8, 'puerto2', 22, 0, '000', '000'),
(0, 15, 11, 'front0', 27, 1, '000', '000'),
(0, 19, 12, 'front0', 28, 1, '000', '000'),
(0, 15, 12, 'front0', 29, 1, '000', '000'),
(0, 19, 13, 'front0', 30, 1, '000', '000'),
(0, 19, 14, 'front0', 31, 1, '000', '000'),
(0, 19, 15, 'front0', 32, 1, '000', '000'),
(1, 15, 15, 'front0', 33, 1, '000', '000'),
(2, 20, 15, 'Copia (2) de thumb200x100', 34, 0, '000', '000'),
(0, 21, 16, 'back', 35, 0, '000', '000'),
(7, 29, 19, '12_baja', 43, 0, '000', '000'),
(0, 23, 18, 'panoramica', 37, 0, '000', '000'),
(1, 24, 16, 'panoramica con tÃ­tulo muy largo para que se pueda reproducir el bug', 38, 0, '000', '000'),
(1, 25, 16, 'panoramica', 39, 0, '000', '000'),
(0, 27, 19, 'Nombre largo Nombre largo Nombre largo Nombre largo ', 41, 0, '000', '000'),
(8, 28, 19, 'costa2', 42, 0, '000', '000'),
(0, 30, 20, 'front0', 44, 0, '000', '000'),
(0, 30, 21, 'front0', 45, 1, '000', '000'),
(1, 20, 21, 'Copia (2) de thumb200x100', 46, 1, '000', '000'),
(1, 43, 19, '12_baja', 144, 1, '000', '000'),
(0, 24, 72, 'panoramica', 142, 1, '000', '000'),
(2, 50, 19, '12_baja', 143, 1, '000', '000'),
(0, 28, 22, 'costa2', 51, 1, '000', '000'),
(1, 27, 22, 'costa3', 52, 1, '000', '000'),
(4, 29, 19, '12_baja', 145, 1, '000', '000'),
(5, 28, 19, 'costa2', 146, 1, '000', '000'),
(0, 28, 23, 'costa2', 55, 1, '000', '000'),
(0, 27, 23, 'costa3', 56, 1, '000', '000'),
(0, 35, 24, 'puerto2', 57, 0, '000', '000'),
(0, 36, 25, 'Restaurant', 58, 0, '000', '000'),
(0, 37, 26, 'Copia (2) de thumb200x100', 59, 0, '000', '000'),
(0, 38, 27, 'Copia (2) de thumb200x100', 60, 0, '000', '000'),
(0, 37, 28, 'Copia (2) de thumb200x100', 61, 1, '000', '000'),
(1, 38, 28, 'Copia (2) de thumb200x100', 62, 1, '000', '000'),
(0, 39, 29, 'Copia de thumb200x100', 63, 0, '000', '000'),
(0, 40, 30, 'Copia (2) de thumb200x100', 64, 0, '000', '000'),
(0, 41, 31, 'Copia (2) de thumb200x100', 65, 0, '000', '000'),
(0, 41, 32, 'Copia (2) de thumb200x100', 66, 1, '000', '000'),
(1, 40, 32, 'Copia (2) de thumb200x100', 67, 1, '000', '000'),
(0, 41, 33, 'Copia (2) de thumb200x100', 68, 1, '000', '000'),
(0, 40, 33, 'Copia (2) de thumb200x100', 69, 1, '000', '000'),
(0, 41, 34, 'Copia (2) de thumb200x100', 70, 1, '000', '000'),
(0, 41, 35, 'Copia (2) de thumb200x100', 71, 1, '000', '000'),
(1, 40, 35, 'Copia (2) de thumb200x100', 72, 1, '000', '000'),
(0, 41, 36, 'Copia (2) de thumb200x100', 73, 1, '000', '000'),
(1, 42, 36, 'Copia (2) de thumb200x100', 74, 0, '000', '000'),
(0, 43, 37, '12_baja', 75, 0, '28.83', '-105.'),
(2, 27, 37, 'costa3', 79, 1, '000', '000'),
(1, 28, 37, 'costa2', 78, 1, '000', '000'),
(0, 44, 38, 'foyer', 80, 0, '000', '000'),
(0, 45, 39, 'Copia (2) de thumb200x100', 81, 0, '000', '000'),
(0, 45, 40, 'Copia (2) de thumb200x100', 82, 1, '000', '000'),
(1, 44, 40, 'foyer', 83, 1, '000', '000'),
(0, 46, 41, 'Copia (2) de thumb200x100', 84, 0, '000', '000'),
(5, 98, 82, 'puerto2', 165, 0, '000', '000'),
(1, 74, 48, 'ricoh theta test_sharpened', 118, 0, '000', '000'),
(0, 50, 54, '12_baja ', 119, 1, '000', '000'),
(1, 43, 54, '12_baja', 120, 1, '000', '000'),
(0, 95, 82, 'Copia (2) de thumb200x100', 162, 0, '000', '000'),
(0, 81, 153, 'Copia de thumb200x100', 293, 1, '000', '000'),
(0, 88, 81, 'Copia (2) de thumb200x100', 155, 0, '000', '000'),
(0, 49, 48, 'yaddo_gardens_01 Panorama - patchwork', 92, 0, '000', '000'),
(6, 27, 19, 'costa3', 147, 1, '000', '000'),
(0, 116, 54, 'panoramica', 184, 1, '000', '000'),
(0, 25, 74, 'panoramica', 148, 1, '000', '000'),
(0, 82, 75, 'panoramica', 149, 0, '000', '000'),
(0, 83, 76, 'panoramica', 150, 0, '000', '000'),
(0, 84, 77, '_02_partyboat_cabin_10_11_9_fused Panorama', 151, 0, '000', '000'),
(1, 85, 77, '_01_party_boat_deck', 152, 0, '000', '000'),
(0, 126, 104, 'panoramica', 220, 0, '000', '000'),
(4, 99, 82, 'foyer', 166, 0, '000', '000'),
(2, 97, 82, 'Restaurant', 164, 0, '000', '000'),
(3, 96, 82, 'index', 163, 0, '000', '000'),
(1, 89, 81, 'Copia de thumb200x100', 156, 0, '000', '000'),
(2, 90, 81, 'index', 157, 0, '000', '000'),
(4, 91, 81, 'foyer', 158, 0, '000', '000'),
(3, 92, 81, 'Restaurant', 159, 0, '000', '000'),
(5, 93, 81, 'puerto2', 160, 0, '000', '000'),
(1, 94, 82, 'Copia de thumb200x100', 161, 0, '000', '000'),
(0, 119, 87, 'Restaurant', 203, 0, '000', '000'),
(0, 112, 50, 'foyer', 202, 1, '000', '000'),
(1, 102, 84, 'Copia de thumb200x100', 169, 0, '000', '000'),
(0, 103, 84, 'Copia (2) de thumb200x100', 170, 0, '000', '000'),
(2, 104, 84, 'b''ig', 171, 0, '000', '000'),
(3, 105, 84, 'index', 172, 0, '000', '000'),
(4, 106, 84, 'foyer', 173, 0, '000', '000'),
(0, 107, 85, 'Copia (2) de thumb200x100', 174, 0, '000', '000'),
(1, 108, 85, 'Copia de thumb200x100', 175, 0, '000', '000'),
(2, 109, 85, 'b''ig', 176, 0, '000', '000'),
(4, 110, 85, 'Restaurant', 177, 0, '000', '000'),
(3, 111, 85, 'index', 178, 0, '000', '000'),
(5, 112, 85, 'foyer', 179, 0, '000', '000'),
(6, 113, 85, 'puerto2', 180, 0, '000', '000'),
(3, 116, 19, 'panoramica', 183, 0, '000', '000'),
(1, 115, 54, 'panoramica', 185, 1, '000', '000'),
(5, 116, 79, 'panoramica', 188, 1, '000', '000'),
(1, 115, 79, 'panoramica', 189, 1, '000', '000'),
(2, 27, 79, 'costa3', 192, 1, '000', '000'),
(4, 29, 79, '12_baja', 191, 1, '000', '000'),
(6, 29, 79, '12_baja', 193, 1, '000', '000'),
(7, 114, 79, 'panoramica', 194, 1, '000', '000'),
(3, 87, 79, '12_baja', 195, 1, '000', '000'),
(0, 117, 79, '12_baja', 196, 0, '000', '000'),
(0, 118, 54, '12_baja', 201, 1, '000', '000'),
(0, 115, 54, 'panoramica', 200, 1, '000', '000'),
(0, 119, 88, 'Restaurant', 204, 1, '000', '000'),
(0, 119, 89, 'Restaurant', 205, 1, '000', '000'),
(0, 119, 90, 'Restaurant', 206, 1, '000', '000'),
(0, 119, 91, 'Restaurant', 207, 1, '000', '000'),
(0, 119, 92, 'Restaurant', 208, 1, '000', '000'),
(0, 119, 93, 'Restaurant', 209, 1, '000', '000'),
(0, 119, 94, 'Restaurant', 210, 1, '000', '000'),
(0, 120, 95, '12_baja', 211, 0, '16.64', '-97.1'),
(0, 119, 96, 'Restaurant', 212, 1, '000', '000'),
(0, 119, 97, 'Restaurant', 213, 1, '000', '000'),
(0, 119, 106, 'Restaurant', 222, 1, '000', '000'),
(0, 126, 105, 'panoramica', 221, 1, '000', '000'),
(0, 124, 102, 'panoramica', 218, 0, '000', '000'),
(0, 119, 107, 'Restaurant', 223, 1, '000', '000'),
(0, 119, 108, 'Restaurant', 224, 1, '000', '000'),
(0, 119, 109, 'Restaurant', 225, 1, '000', '000'),
(0, 119, 110, 'Restaurant', 226, 1, '000', '000'),
(0, 119, 111, 'Restaurant', 227, 1, '000', '000'),
(0, 119, 112, 'Restaurant', 228, 1, '000', '000'),
(0, 119, 113, 'Restaurant', 229, 1, '000', '000'),
(0, 119, 114, 'Restaurant', 230, 1, '000', '000'),
(0, 119, 115, 'Restaurant', 231, 1, '000', '000'),
(0, 119, 116, 'Restaurant', 232, 1, '000', '000'),
(0, 119, 117, 'Restaurant', 233, 1, '000', '000'),
(0, 119, 118, 'Restaurant', 234, 1, '000', '000'),
(0, 119, 119, 'Restaurant', 235, 1, '000', '000'),
(2, 144, 143, 'pano1', 263, 0, '000', '000'),
(1, 145, 143, 'pano3', 264, 0, '000', '000'),
(0, 146, 143, 'pano2', 265, 0, '000', '000'),
(0, 133, 123, '1', 242, 0, '000', '000'),
(3, 147, 144, 'bar', 266, 0, '000', '000'),
(0, 148, 144, 'pano1', 267, 0, '000', '000'),
(2, 149, 144, 'pano2', 268, 0, '000', '000'),
(1, 150, 144, 'pano3', 269, 0, '000', '000'),
(3, 151, 145, 'bar', 270, 0, '000', '000'),
(2, 152, 145, 'bar', 271, 0, '000', '000'),
(1, 153, 145, 'bar', 272, 0, '000', '000'),
(0, 154, 145, 'bar', 273, 0, '000', '000'),
(0, 155, 146, 'bar', 274, 0, '000', '000'),
(0, 156, 147, 'bar', 275, 0, '000', '000'),
(0, 81, 149, 'Copia de thumb200x100', 285, 1, '000', '000'),
(0, 81, 155, 'Copia de thumb200x100', 295, 1, '000', '000'),
(1, 81, 149, 'Copia de thumb200x100', 284, 1, '000', '000'),
(2, 81, 149, 'Copia de thumb200x100', 283, 1, '000', '000'),
(3, 81, 149, 'Copia de thumb200x100', 282, 1, '000', '000'),
(4, 81, 149, 'Copia de thumb200x100', 277, 1, '000', '000'),
(0, 81, 154, 'Copia de thumb200x100', 294, 1, '000', '000'),
(1, 81, 128, 'Copia de thumb200x100', 290, 1, '000', '000'),
(0, 81, 128, 'Copia de thumb200x100', 291, 1, '000', '000'),
(0, 156, 151, 'bar', 289, 1, '000', '000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skins`
--

CREATE TABLE IF NOT EXISTS `skins` (
  `id` int(11) NOT NULL,
  `skin` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `skins`
--

INSERT INTO `skins` (`id`, `skin`) VALUES
(0, 'black'),
(1, 'white');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `static_pages`
--

CREATE TABLE IF NOT EXISTS `static_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `privacy` varchar(50) NOT NULL,
  `text` varchar(10000) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Volcado de datos para la tabla `static_pages`
--

INSERT INTO `static_pages` (`id`, `title`, `privacy`, `text`, `date`) VALUES
(13, 'Page test', 'public', '<img src="http://dev.spinattic.com/images/posts/CajonDelAzul.jpg" /><p>page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;<strong>page test</strong> lalala la<a href="http://www.spinattic.com"> la lal</a> la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;page test lalala la la lal la lalal&nbsp;</p>', '2014-12-10'),
(14, '123', 'public', '<p>dasdas</p>\n\n<p><img src="http://dev.spinattic.com/images/posts/bar.jpg" /></p>\n', '2014-12-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`id`, `tag`) VALUES
(1, ''),
(2, 'Saratoga'),
(3, 'resort'),
(4, 'golf'),
(5, 'good times'),
(6, 'haha'),
(7, 'monumento'),
(8, 'argentina'),
(9, 'rosario'),
(10, 'bandera'),
(11, 'algonquin'),
(12, 'mountain'),
(13, 'summit'),
(14, 'peak'),
(15, 'Crane'),
(16, 'tour'),
(17, 'hola'),
(18, 'hernan'),
(19, 'meow'),
(20, 'tag1'),
(21, 'tag2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tours`
--

CREATE TABLE IF NOT EXISTS `tours` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `friendly_url` varchar(255) NOT NULL,
  `location` varchar(1000) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `category` varchar(255) NOT NULL,
  `tags` varchar(1000) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `allow_comments` varchar(2) NOT NULL,
  `allow_social` varchar(2) NOT NULL,
  `allow_embed` varchar(2) NOT NULL,
  `allow_votes` varchar(2) NOT NULL,
  `privacy` varchar(50) NOT NULL,
  `likes` int(11) NOT NULL,
  `views` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `comments` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `state` varchar(50) NOT NULL,
  `version_xml` int(11) NOT NULL,
  `brand_new` int(11) NOT NULL,
  `enable_avatar` varchar(2) NOT NULL,
  `skin_id` int(11) NOT NULL,
  `enable_title` varchar(2) NOT NULL,
  `thumb_width` double NOT NULL DEFAULT '200',
  `thumb_height` double NOT NULL DEFAULT '100',
  `thumb_margin` double NOT NULL DEFAULT '10',
  `priority` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tours`
--

INSERT INTO `tours` (`id`, `title`, `friendly_url`, `location`, `description`, `category`, `tags`, `lat`, `lon`, `allow_comments`, `allow_social`, `allow_embed`, `allow_votes`, `privacy`, `likes`, `views`, `iduser`, `user`, `comments`, `date`, `date_updated`, `state`, `version_xml`, `brand_new`, `enable_avatar`, `skin_id`, `enable_title`, `thumb_width`, `thumb_height`, `thumb_margin`, `priority`) VALUES
(8, 'Untitled 8', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 2, 11, 69, 'Ariel Micheletti', 8, '2014-10-10 14:54:56', '0000-00-00 00:00:00', 'publish', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(15, 'Untitled 15', '', '9450-9498 72nd Avenue Northeast, Virginia,  ND 58365, Rocklake,  ND, Towner County,  USA, North Dakota, United States', '', '', '', '48.783709888478846', '-99.140625', 'on', 'on', 'on', 'on', '_public', 3, 8, 96, 'RockandRule SwingBand', 0, '2014-10-10 16:39:13', '0000-00-00 00:00:00', 'publish', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(19, 'Untitled 19', '', 'Au. Ruta Nacional 174, Victoria Department, Entre Rios, Argentina', '', '', '', '-32.6671247331203', '-60.325927734375', 'on', 'on', 'on', 'on', '_public', 2, 18, 56, 'Ariel Micheletti', 30, '2014-11-13 15:15:30', '2015-02-03 15:10:09', 'publish', 13, 0, 'on', 0, 'on', 200, 100, 10, 4),
(16, 'Untitled 16', '', 'Futatsuya-88 Furukawasakuranome, Shinfutatsuya Furukawasakuranome, Furukawasakuranome, Osaki, Miyagi, Japan', '', '', '', '38.601410852871915', '140.95870971679688', 'on', 'on', 'on', '', '_public', 0, 1, 41, 'Maxi Falcone', 0, '2014-10-14 13:27:31', '0000-00-00 00:00:00', 'publish', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(18, 'Untitled 18', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 8, 41, 'Maxi Falcone', 5, '2014-10-14 13:36:40', '0000-00-00 00:00:00', 'publish', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(25, 'Untitled 25', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 4, 96, 'RockandRule SwingBand', 0, '2014-10-16 14:44:39', '0000-00-00 00:00:00', 'publish', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(36, 'Untitled 36', '', '39751 300th Street, Jefferson,  MO 64489, Stanberry,  MO, Nodaway County, Maryville,  USA, Missouri, United States', '', '', '', '40.28622887005148', '-94.6406078338623', 'on', 'on', 'on', 'on', '_public', 0, 2, 96, 'RockandRule SwingBand', 0, '2014-10-16 17:42:08', '2014-12-04 18:18:12', 'publish', 13, 0, 'on', 0, 'on', 200, 100, 10, 0),
(39, 'Untitled 39', '', ' MO 65702,  Macomb, Unnamed Road, Miller,  MO 65704, Mansfield,  MO, Douglas County,  USA, Missouri, United States', '', '', '', '36.99202169667759', '-92.5312328338623', 'on', 'on', 'on', 'on', '_public', 3, 1, 96, 'RockandRule SwingBand', 1, '2014-10-20 14:16:12', '2014-12-04 18:18:02', 'publish', 7, 0, 'on', 0, 'on', 200, 100, 10, 0),
(87, 'Untitled 87', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'Spinattic', 0, '2014-11-17 18:19:23', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(50, 'Untitl''-Ã¡ed 50', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 22, 96, 'RockandRule SwingBand', 43, '2014-11-17 13:28:22', '0000-00-00 00:00:00', 'publish', 7, 0, 'on', 1, 'on', 200, 100, 10, 6),
(48, 'Untitled 48', '', '6858-7600 Levi Road, Louisville,  KS 66547, Wamego, Pottawatomie County,  KS, Manhattan,  USA, Kansas, United States', '', '', '', '39.257778150283336', '-96.328125', 'on', 'on', 'on', 'on', '_public', 3, 10, 40, 'Derrick Clark', 10, '2014-10-31 19:50:08', '0000-00-00 00:00:00', 'publish', 11, 0, '', 1, 'on', 200, 100, 10, 0),
(37, 'titulo', '', 'Tanganyika, Katanga, Democratic Republic of the Congo', 'tvherhvr', 'Destinations', 'tour', '-7.852498637813016', '28.125', 'on', 'on', 'on', 'on', '_public', 3, 6, 56, 'Ariel Micheletti', 35, '2014-10-24 18:22:18', '0000-00-00 00:00:00', 'publish', 8, 0, 'on', 1, 'on', 200, 100, 10, 0),
(54, 'Untitled 54', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 7, 56, 'Ariel Micheletti', 0, '2014-11-18 15:07:04', '2014-11-25 19:24:51', 'publish', 21, 0, 'on', 1, 'on', 150, 75, 10, 0),
(88, 'Untitled 88', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 1, 1, 'Spinattic', 0, '2014-11-17 18:20:42', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(41, 'Untitled 41', '', '7247-7269 Smiths Grove- Scottsville Road,  KY 42171, Smiths Grove, Warren County,  KY, Bowling Green,  USA, Kentucky, United States', '', '', '', '36.99202169667759', '-86.2031078338623', 'on', 'on', 'on', 'on', '_public', 1, 1, 96, 'RockandRule SwingBand', 0, '2014-11-03 14:55:32', '2014-12-04 18:17:47', 'publish', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(40, 'Untitled 40', '', '501 Wildcat Creek Road,  TN 37079, Indian Mound,  TN, Stewart County, Clarksville,  USA, Tennessee, United States', '', '', '', '36.42835271917689', '-87.6093578338623', 'on', 'on', 'on', 'on', '_public', 3, 0, 96, 'RockandRule SwingBand', 0, '2014-11-03 14:55:35', '2014-12-04 18:17:56', 'publish', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(35, 'Untitled 35', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 2, 96, 'RockandRule SwingBand', 2, '2014-11-03 14:55:40', '0000-00-00 00:00:00', 'publish', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(34, 'Untitled 34', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 1, 96, 'RockandRule SwingBand', 2, '2014-11-03 14:55:44', '0000-00-00 00:00:00', 'publish', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(89, 'Untitled 89', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 1, 1, 'Spinattic', 0, '2014-11-17 18:22:43', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(77, 'Tour', '', '4516 California Road, Appanoose,  KS 66076, Pomona,  KS, Franklin County, Kansas City,  USA, Kansas, United States', 'this is a tour', 'Real Estate', 'meow', '38.71123253895224', '-95.47119140625', 'on', 'on', 'on', 'on', '_public', 3, 13, 40, 'Derrick Clark', 1, '2014-11-17 20:43:37', '0000-00-00 00:00:00', 'publish', 2, 0, 'on', 1, '', 200, 100, 10, 0),
(90, 'Untitled 90', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'Spinattic', 0, '2014-11-17 18:25:07', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(91, 'Untitled 91', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 1, 1, 'Spinattic', 0, '2014-11-17 18:27:17', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(92, 'Untitled 92', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'Spinattic', 0, '2014-11-17 18:29:41', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(93, 'Untitled 93', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 2, 1, 'Spinattic', 0, '2014-11-17 18:30:37', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 5),
(97, 'Untitled 97', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 2, 1, 'Spinattic', 0, '2014-11-17 22:32:23', '0000-00-00 00:00:00', 'publish', 2, 0, 'on', 0, 'on', 112, 224, 16, 0),
(106, 'test Å‚ test Å„', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 1, 1, 'Spinattic', 0, '2014-11-25 13:19:19', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(107, 'Untitled 107', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 1, 1, 'Spinattic', 0, '2014-11-25 13:21:30', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(108, 'Untitled 108', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'Spinattic', 0, '2014-11-25 13:22:18', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(109, 'Untitled 109', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 2, 2, 1, 'Spinattic', 0, '2014-11-25 13:23:04', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(110, 'Untitled 110', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'Spinattic', 0, '2014-11-25 13:35:23', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(111, 'Untitled 111', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'Spinattic', 0, '2014-11-25 13:37:52', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(112, 'Untitled 112', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'Spinattic', 0, '2014-11-25 13:39:04', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(113, 'Untitled 113', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 1, 1, 'Spinattic', 0, '2014-11-25 13:44:37', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(114, 'Untitled 114', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'Spinattic', 0, '2014-11-25 13:46:40', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(115, 'Untitled 115', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'Spinattic', 0, '2014-11-25 13:47:35', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(116, 'Untitled 116', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'Spinattic', 0, '2014-11-25 14:07:45', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(117, 'Untitled 117', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 2, 3, 1, 'Spinattic', 0, '2014-11-25 14:11:39', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(118, 'Untitled 118', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 2, 2, 1, 'Spinattic', 3, '2014-11-25 14:12:59', '0000-00-00 00:00:00', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 8),
(119, '123-123', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 13, 1, 'Spinattic', 11, '2014-11-25 14:32:08', '2014-11-25 00:00:00', 'publish', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(38, 'Untitled 38', '', '546 North 1300th Avenue, Western,  IL 61273, Orion,  IL, Henry County,  USA, Illinois, United States', '', '', '', '41.35042110463708', '-90.4218578338623', 'on', 'on', 'on', 'on', '_public', 1, 1, 96, 'RockandRule SwingBand', 0, '2014-10-24 15:33:10', '2014-12-04 18:18:07', 'publish', 7, 0, 'on', 0, 'on', 200, 100, 10, 0),
(95, 'Untitled 95', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_private', 0, 1, 56, 'Ariel Micheletti', 0, '2014-11-17 22:05:01', '2014-11-27 17:48:26', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(84, 'Untitled 84', '', 'County Road No 6319,  TN 37058, Dover,  TN, Stewart County, Clarksville,  USA, Tennessee, United States', '', '', '', '36.42835271917689', '-87.9726791381836', 'on', 'on', 'on', 'on', '_public', 0, 1, 96, 'RockandRule SwingBand', 0, '2014-11-12 17:11:32', '2014-12-04 18:16:55', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(82, 'Untitled 82', '', 'Unnamed Road,  MO 65449, Cook Station, Union,  MO, Crawford County,  USA, Missouri, United States', '', '', '', '37.82974298956329', '-91.4883041381836', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-11-12 16:27:53', '2014-12-04 18:17:32', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(81, 'Untitled 81', '', 'County Road 900N, Hickory Hill,  IL 62814, Bluford,  IL, Wayne County,  USA, Illinois, United States', '', '', '', '38.383003619894', '-88.6758041381836', 'on', 'on', 'on', 'on', '_public', 1, 1, 96, 'RockandRule SwingBand', 0, '2014-11-12 16:25:55', '2014-12-04 18:17:41', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 0),
(149, 'Untitled 149', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 2, 103, 'Jorge Rubiolo', 0, '2015-01-20 20:06:41', '2015-01-21 01:42:50', 'publish', 5, 0, 'on', 0, 'on', 200, 100, 10, 0),
(128, 'Untitled 128', '', 'Panamericana Norte, Sullana Province, Piura, Peru', '', '', '', '-4.9300622071746165', '-80.6901852786541', 'on', 'on', 'on', 'on', '_public', 0, 2, 103, 'Jorge Rubiolo', 0, '2014-12-23 12:02:55', '2015-01-22 22:10:11', 'publish', 12, 0, 'on', 0, 'on', 200, 100, 10, 0),
(85, '123456789012345678901234567890 123456789012345678901234567890 123456789012345678901234567890 123456789012345678901234567890 123456789012345678901234567890 123456789012345678901234567890 ', '', 'Tombouctou, Mali', 'description description description description description description description description description description description ', '', 'tag1,tag2,Saratoga', '22.398838131104032', '-2.5312328338623047', 'on', '', 'on', 'on', '_public', 2, 7, 96, 'RockandRule SwingBand', 2, '2014-11-18 14:33:14', '2015-01-20 18:00:16', 'publish', 19, 0, 'on', 0, 'on', 84, 42, 24, 0),
(155, 'Untitled 155', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 103, 'Jorge Rubiolo', 0, '2015-01-28 16:44:03', '2015-01-28 16:48:07', 'publish', 3, 0, 'on', 0, 'on', 200, 100, 10, 3),
(153, 'Untitled 153', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 103, 'Jorge Rubiolo', 0, '2015-01-28 15:49:24', '2015-01-28 15:59:52', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 1),
(154, 'Untitled 154', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 103, 'Jorge Rubiolo', 0, '2015-01-28 16:03:37', '2015-01-28 16:14:12', 'publish', 1, 1, 'on', 0, 'on', 200, 100, 10, 2),
(9, 'Untitled 9', '', 'ItaÃºba,  78510-000, State of Mato Grosso, Brazil', '', '', '', '-11.385265355838367', '-55.546875', 'on', 'on', 'on', 'on', '_public', 0, 2, 96, 'RockandRule SwingBand', 0, '2014-10-09 20:55:14', '2015-02-04 13:27:02', 'publish', 26, 0, 'on', 0, 'on', 200, 100, 10, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tours_draft`
--

CREATE TABLE IF NOT EXISTS `tours_draft` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `friendly_url` varchar(255) NOT NULL,
  `location` varchar(1000) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `category` varchar(255) NOT NULL,
  `tags` varchar(1000) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `allow_comments` varchar(2) NOT NULL DEFAULT 'on',
  `allow_social` varchar(2) NOT NULL DEFAULT 'on',
  `allow_embed` varchar(2) NOT NULL DEFAULT 'on',
  `allow_votes` varchar(2) NOT NULL DEFAULT 'on',
  `privacy` varchar(50) NOT NULL,
  `likes` int(11) NOT NULL,
  `views` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `comments` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `state` varchar(50) NOT NULL,
  `version_xml` int(11) NOT NULL,
  `brand_new` int(11) NOT NULL DEFAULT '1',
  `enable_avatar` varchar(2) NOT NULL,
  `skin_id` int(11) NOT NULL,
  `enable_title` varchar(2) NOT NULL,
  `thumb_width` double NOT NULL DEFAULT '200',
  `thumb_height` double NOT NULL DEFAULT '100',
  `thumb_margin` double NOT NULL DEFAULT '10',
  `priority` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=156 ;

--
-- Volcado de datos para la tabla `tours_draft`
--

INSERT INTO `tours_draft` (`id`, `title`, `friendly_url`, `location`, `description`, `category`, `tags`, `lat`, `lon`, `allow_comments`, `allow_social`, `allow_embed`, `allow_votes`, `privacy`, `likes`, `views`, `iduser`, `user`, `comments`, `date`, `date_updated`, `state`, `version_xml`, `brand_new`, `enable_avatar`, `skin_id`, `enable_title`, `thumb_width`, `thumb_height`, `thumb_margin`, `priority`) VALUES
(9, 'Untitled 9', '', 'ItaÃºba,  78510-000, State of Mato Grosso, Brazil', '', '', '', '-11.385265355838367', '-55.546875', 'on', 'on', 'on', 'on', '_public', 0, 2, 96, 'RockandRule SwingBand', 0, '2014-10-09 20:55:14', '2015-02-04 13:27:02', 'draft', 26, 0, 'on', 0, 'on', 200, 100, 10, 0),
(8, 'Untitled 8', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 9, 3, 69, 'Ariel Micheletti', 0, '2014-10-10 14:54:56', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 6),
(10, 'Untitled 10', '', 'Range Road 85,  AB T0J 3P0, Youngstown, Special Area No. 3,  AB, Division No. 4, Alberta T0J, Alberta, Canada', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-24 15:29:52', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(11, 'Untitled 11', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 1, 96, 'RockandRule SwingBand', 0, '2014-10-10 00:04:56', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(12, 'Untitled 12', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-10 00:05:29', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(13, 'Untitled 13', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-10 00:09:11', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(14, 'Untitled 14', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-10 00:11:46', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(15, 'Untitled 15', '', '9450-9498 72nd Avenue Northeast, Virginia,  ND 58365, Rocklake,  ND, Towner County,  USA, North Dakota, United States', '', '', '', '48.783709888478846', '-99.140625', 'on', 'on', 'on', 'on', '_public', 2, 1, 96, 'RockandRule SwingBand', 0, '2014-10-14 19:46:58', '0000-00-00 00:00:00', 'draft', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(16, 'Untitled 16', '', 'Futatsuya-88 Furukawasakuranome, Shinfutatsuya Furukawasakuranome, Furukawasakuranome, Osaki, Miyagi, Japan', '', '', '', '38.601410852871915', '140.95870971679688', 'on', 'on', 'on', '', '_public', 0, 1, 41, 'Maxi Falcone', 0, '2014-11-06 13:05:54', '2015-01-21 13:43:53', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(19, 'Untitled 19', '', 'Au. Ruta Nacional 174, Victoria Department, Entre Rios, Argentina', '', '', '', '-32.6671247331203', '-60.325927734375', 'on', 'on', 'on', 'on', '_public', 2, 18, 56, 'Ariel Micheletti', 30, '2014-11-13 15:15:30', '2015-02-03 15:10:09', 'draft', 13, 0, 'on', 0, 'on', 200, 100, 10, 4),
(18, 'Untitled 18', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 5, 41, 'Maxi Falcone', 5, '2014-10-31 21:54:22', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(20, 'Untitled 20', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-14 20:15:44', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(21, 'Untitled 21', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-14 20:20:14', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(22, 'Untitled 22', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 56, 'Ariel Micheletti', 0, '2014-10-14 20:35:13', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(23, 'Untitled 23', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 56, 'Ariel Micheletti', 0, '2014-10-14 20:35:59', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(24, 'Untitled 24', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-15 17:10:37', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(25, 'Untitled 25', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 1, 96, 'RockandRule SwingBand', 0, '2014-10-16 14:44:39', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(26, 'Untitled 26', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-16 16:37:35', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(27, 'Untitled 27', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-16 16:40:40', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(28, 'Untitled 28', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-16 16:43:13', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(29, 'Untitled 29', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-16 16:43:38', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(30, 'Untitled 30', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-16 16:45:46', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(31, 'Untitled 31', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-16 16:46:03', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(32, 'Untitled 32', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-16 16:46:23', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(33, 'Untitled 33', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-10-16 16:46:37', '0000-00-00 00:00:00', 'draft', 0, 0, 'on', 0, 'on', 200, 100, 10, 0),
(34, 'Untitled 34', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 1, 96, 'RockandRule SwingBand', 2, '2014-11-05 17:40:58', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(35, 'Untitled 35', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 2, 96, 'RockandRule SwingBand', 2, '2014-11-03 14:55:40', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(36, 'Untitled 36', '', '39751 300th Street, Jefferson,  MO 64489, Stanberry,  MO, Nodaway County, Maryville,  USA, Missouri, United States', '', '', '', '40.28622887005148', '-94.6406078338623', 'on', 'on', 'on', 'on', '_public', 0, 2, 96, 'RockandRule SwingBand', 0, '2014-10-16 17:42:08', '2014-12-04 18:18:12', 'draft', 13, 0, 'on', 0, 'on', 200, 100, 10, 0),
(37, 'titulo', '', 'Tanganyika, Katanga, Democratic Republic of the Congo', 'tvherhvr', 'Destinations', 'tour', '-7.852498637813016', '28.125', 'on', 'on', 'on', 'on', '_private', 3, 6, 56, 'Ariel Micheletti', 35, '2014-10-24 19:27:56', '0000-00-00 00:00:00', 'draft', 8, 0, 'on', 1, 'on', 200, 100, 10, 0),
(38, 'Untitled 38', '', '546 North 1300th Avenue, Western,  IL 61273, Orion,  IL, Henry County,  USA, Illinois, United States', '', '', '', '41.35042110463708', '-90.4218578338623', 'on', 'on', 'on', 'on', '_public', 1, 1, 96, 'RockandRule SwingBand', 0, '2014-10-24 15:33:10', '2014-12-04 18:18:07', 'draft', 7, 0, 'on', 0, 'on', 200, 100, 10, 0),
(40, 'Untitled 40', '', '501 Wildcat Creek Road,  TN 37079, Indian Mound,  TN, Stewart County, Clarksville,  USA, Tennessee, United States', '', '', '', '36.42835271917689', '-87.6093578338623', 'on', 'on', 'on', 'on', '_public', 3, 0, 96, 'RockandRule SwingBand', 0, '2014-11-03 14:55:35', '2014-12-04 18:17:56', 'draft', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(39, 'Untitled 39', '', ' MO 65702,  Macomb, Unnamed Road, Miller,  MO 65704, Mansfield,  MO, Douglas County,  USA, Missouri, United States', '', '', '', '36.99202169667759', '-92.5312328338623', 'on', 'on', 'on', 'on', '_public', 3, 1, 96, 'RockandRule SwingBand', 1, '2014-10-20 14:16:12', '2014-12-04 18:18:02', 'draft', 7, 0, 'on', 0, 'on', 200, 100, 10, 0),
(41, 'Untitled 41', '', '7247-7269 Smiths Grove- Scottsville Road,  KY 42171, Smiths Grove, Warren County,  KY, Bowling Green,  USA, Kentucky, United States', '', '', '', '36.99202169667759', '-86.2031078338623', 'on', 'on', 'on', 'on', '_public', 1, 1, 96, 'RockandRule SwingBand', 0, '2014-11-03 14:55:32', '2014-12-04 18:17:47', 'draft', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(48, 'Untitled 48', '', '6858-7600 Levi Road, Louisville,  KS 66547, Wamego, Pottawatomie County,  KS, Manhattan,  USA, Kansas, United States', '', '', '', '39.257778150283336', '-96.328125', 'on', 'on', 'on', 'on', '_public', 3, 10, 40, 'Derrick Clark', 10, '2014-10-31 19:50:08', '0000-00-00 00:00:00', 'draft', 11, 0, '', 1, 'on', 200, 100, 10, 0),
(49, 'Untitled 49', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 3, 56, 'Ariel Micheletti', 0, '2014-11-13 18:57:56', '2014-11-25 19:24:28', 'draft', 3, 0, 'on', 0, 'on', 160, 80, 10, 0),
(50, 'Untitl''-Ã¡ed 50', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 22, 96, 'RockandRule SwingBand', 43, '2014-11-17 13:28:22', '0000-00-00 00:00:00', 'draft', 7, 0, 'on', 1, 'on', 200, 100, 10, 6),
(54, 'Untitled 54', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 7, 56, 'Ariel Micheletti', 0, '2014-11-18 15:07:04', '2014-11-25 19:24:51', 'draft', 21, 0, 'on', 1, 'on', 150, 75, 10, 0),
(104, 'Untitled 104', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-18 18:35:33', '0000-00-00 00:00:00', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(76, 'Untitled 76', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-11 15:31:31', '0000-00-00 00:00:00', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(57, 'Untitled 57', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 41, 'Maxi Falcone', 0, '2014-10-31 20:17:40', '0000-00-00 00:00:00', 'draft', 0, 1, '', 0, '', 200, 100, 10, 0),
(87, 'Untitled 87', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'Spinattic', 0, '2014-11-17 18:19:23', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(59, 'Untitled 59', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 41, 'Maxi Falcone', 0, '2014-10-31 20:46:13', '0000-00-00 00:00:00', 'draft', 0, 1, '', 0, '', 200, 100, 10, 0),
(60, 'Untitled 60', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 41, 'Maxi Falcone', 0, '2014-10-31 20:51:02', '0000-00-00 00:00:00', 'draft', 0, 1, '', 0, '', 200, 100, 10, 0),
(79, 'Untitled 79', '', ' 678273, Suntarsky District, Sakha Republic, Russia', '', '', '', '62.201388691814294', '116.87255859375', 'on', 'on', 'on', 'on', '_public', 0, 0, 56, 'Ariel Micheletti', 0, '2014-11-13 18:55:00', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(72, 'Untitled 72', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-07 16:12:39', '0000-00-00 00:00:00', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(73, 'Untitled 73', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-07 19:38:40', '0000-00-00 00:00:00', 'draft', 0, 1, '', 0, '', 200, 100, 10, 0),
(74, 'Untitled 74', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-07 19:55:16', '0000-00-00 00:00:00', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(68, 'Untitled 68', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-03 18:33:47', '0000-00-00 00:00:00', 'draft', 0, 1, '', 0, '', 200, 100, 10, 0),
(75, 'Untitled 75', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-11 15:28:17', '0000-00-00 00:00:00', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(77, 'Tour', '', '4516 California Road, Appanoose,  KS 66076, Pomona,  KS, Franklin County, Kansas City,  USA, Kansas, United States', 'this is a tour', 'Real Estate', 'meow', '38.71123253895224', '-95.47119140625', 'on', 'on', 'on', 'on', '_public', 3, 13, 40, 'Derrick Clark', 1, '2014-11-17 20:43:37', '0000-00-00 00:00:00', 'draft', 2, 0, 'on', 1, '', 200, 100, 10, 0),
(90, 'Untitled 90', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'Spinattic', 0, '2014-11-17 18:25:07', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(81, 'Untitled 81', '', 'County Road 900N, Hickory Hill,  IL 62814, Bluford,  IL, Wayne County,  USA, Illinois, United States', '', '', '', '38.383003619894', '-88.6758041381836', 'on', 'on', 'on', 'on', '_public', 1, 1, 96, 'RockandRule SwingBand', 0, '2014-11-12 16:25:55', '2014-12-04 18:17:41', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(82, 'Untitled 82', '', 'Unnamed Road,  MO 65449, Cook Station, Union,  MO, Crawford County,  USA, Missouri, United States', '', '', '', '37.82974298956329', '-91.4883041381836', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2014-11-12 16:27:53', '2014-12-04 18:17:32', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(88, 'Untitled 88', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 1, 1, 'Spinattic', 0, '2014-11-17 18:20:42', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(84, 'Untitled 84', '', 'County Road No 6319,  TN 37058, Dover,  TN, Stewart County, Clarksville,  USA, Tennessee, United States', '', '', '', '36.42835271917689', '-87.9726791381836', 'on', 'on', 'on', 'on', '_public', 0, 1, 96, 'RockandRule SwingBand', 0, '2014-11-12 17:11:32', '2014-12-04 18:16:55', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(85, '123456789012345678901234567890 123456789012345678901234567890 123456789012345678901234567890 123456789012345678901234567890 123456789012345678901234567890 123456789012345678901234567890 ', '', 'Tombouctou, Mali', 'description description description description description description description description description description description ', '', 'tag1,tag2,Saratoga', '22.398838131104032', '-2.5312328338623047', 'on', '', 'on', 'on', '_public', 2, 7, 96, 'RockandRule SwingBand', 2, '2014-11-18 14:33:14', '2015-01-20 18:00:16', 'draft', 19, 0, 'on', 0, 'on', 84, 42, 24, 0),
(89, 'Untitled 89', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 1, 1, 'Spinattic', 0, '2014-11-17 18:22:43', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(91, 'Untitled 91', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 1, 1, 'Spinattic', 0, '2014-11-17 18:27:17', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(92, 'Untitled 92', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'Spinattic', 0, '2014-11-17 18:29:41', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(93, 'Untitled 93', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 2, 1, 'Spinattic', 0, '2014-11-17 18:30:37', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 5),
(94, 'Untitled 94', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 2, 1, 'Spinattic', 0, '2014-11-17 21:59:15', '0000-00-00 00:00:00', 'draft', 4, 0, 'on', 0, 'on', 211, 105.5, 26, 0),
(95, 'Untitled 95', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_private', 0, 1, 56, 'Ariel Micheletti', 0, '2014-11-17 22:05:01', '2014-12-05 20:22:08', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(96, 'Untitled 96', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'Spinattic', 0, '2014-11-17 22:25:39', '0000-00-00 00:00:00', 'draft', 0, 1, 'on', 0, 'on', 0, 0, 0, 0),
(97, 'Untitled 97', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 2, 1, 'Spinattic', 0, '2014-11-17 22:32:23', '0000-00-00 00:00:00', 'draft', 2, 0, 'on', 0, 'on', 112, 224, 16, 0),
(105, 'Untitled 105', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-21 18:00:15', '0000-00-00 00:00:00', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(102, 'Untitled 102', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 41, 'Maxi Falcone', 0, '2014-11-18 18:28:23', '0000-00-00 00:00:00', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(106, 'test Å‚ test Å„', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 1, 1, 'Spinattic', 0, '2014-11-25 13:19:19', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(107, 'Untitled 107', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 1, 1, 'Spinattic', 0, '2014-11-25 13:21:30', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(108, 'Untitled 108', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'Spinattic  PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 13:22:18', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(109, 'Untitled 109', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 2, 2, 1, 'SpinÃ¡ttic  PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 13:23:04', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(110, 'Untitled 110', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'SpinÃ¡ttic  PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 13:35:23', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(111, 'Untitled 111', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'SpinÃ¡ttic  PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 13:37:52', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(112, 'Untitled 112', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'SpinÃ¡ttic  PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 13:39:04', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(113, 'Untitled 113', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 1, 1, 'SpinÃ¡ttic Ð´Ð²Ð° PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 13:44:37', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(114, 'Untitled 114', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'SpinÃ¡ttic Ð´Ð²Ð° PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 13:46:40', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(115, 'Untitled 115', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 1, 'SpinÃ¡ttic Ð´Ð²Ð° PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 13:47:35', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(116, 'Untitled 116', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 1, 0, 1, 'SpinÃ¡ttic Ð´Ð²Ð° PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 14:07:45', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(117, 'Untitled 117', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 2, 3, 1, 'SpinÃ¡ttic Ð´Ð²Ð° PoÅ‚onina CaryÅ„ska', 0, '2014-11-25 14:11:39', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 0),
(118, 'Untitled 118', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 2, 2, 1, 'SpinÃ¡ttic Ð´Ð²Ð° PoÅ‚onina CaryÅ„ska', 3, '2014-11-25 14:12:59', '0000-00-00 00:00:00', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 8),
(119, '123-123', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 3, 13, 1, 'Spinattic', 11, '2014-11-25 14:32:08', '2014-11-25 00:00:00', 'draft', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(142, 'Untitled 142', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2015-01-12 21:08:51', '2015-01-12 21:13:07', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(143, 'Untitled 143', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2015-01-14 20:43:58', '2015-01-14 20:49:24', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(144, 'Untitled 144', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2015-01-14 21:08:35', '2015-01-19 16:43:05', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(123, 'Untitled 123', '', ' Namushakende, M10, Mongu, Western, Zambia', '', '', '', '-15.487564737654841', '23.121070861816406', 'on', 'on', 'on', 'on', '_public', 0, 1, 96, 'RockandRule SwingBand', 0, '2014-12-10 01:34:49', '2015-01-22 14:47:22', 'draft', 2, 0, 'on', 0, 'on', 200, 100, 10, 0),
(128, 'Untitled 128', '', 'Panamericana Norte, Sullana Province, Piura, Peru', '', '', '', '-4.9300622071746165', '-80.6901852786541', 'on', 'on', 'on', 'on', '_public', 0, 2, 103, 'Jorge Rubiolo', 0, '2014-12-23 12:02:55', '2015-01-22 22:10:11', 'draft', 12, 0, 'on', 0, 'on', 200, 100, 10, 0),
(148, 'Untitled 148', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2015-01-19 16:55:17', '2015-01-19 16:55:22', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(146, 'Untitled 146', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2015-01-19 16:52:29', '2015-01-19 16:52:42', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(147, 'Untitled 147', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2015-01-19 16:54:32', '2015-01-19 16:55:07', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(145, 'Untitled 145', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2015-01-19 16:43:33', '2015-01-19 16:49:08', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(149, 'Untitled 149', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 2, 103, 'Jorge Rubiolo', 0, '2015-01-20 20:06:41', '2015-01-21 01:42:50', 'draft', 5, 0, 'on', 0, 'on', 200, 100, 10, 0),
(155, 'Untitled 155', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 103, 'Jorge Rubiolo', 0, '2015-01-28 16:44:03', '2015-01-28 16:48:07', 'draft', 3, 0, 'on', 0, 'on', 200, 100, 10, 3),
(151, 'Untitled 151', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 96, 'RockandRule SwingBand', 0, '2015-01-22 15:05:45', '2015-01-22 15:05:46', 'draft', 0, 1, 'on', 0, 'on', 200, 100, 10, 0),
(153, 'Untitled 153', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 103, 'Jorge Rubiolo', 0, '2015-01-28 15:49:24', '2015-01-28 15:59:52', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 1),
(154, 'Untitled 154', '', '', '', '', '', '', '', 'on', 'on', 'on', 'on', '_public', 0, 0, 103, 'Jorge Rubiolo', 0, '2015-01-28 16:03:37', '2015-01-28 16:14:12', 'draft', 1, 0, 'on', 0, 'on', 200, 100, 10, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(500) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `website` varchar(500) NOT NULL,
  `twitter` varchar(500) NOT NULL,
  `facebook` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `sol_date` datetime NOT NULL,
  `hashregistro` varchar(500) NOT NULL,
  `hashdelete` varchar(500) NOT NULL,
  `fnac` varchar(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `avatar` varchar(500) NOT NULL DEFAULT 'avatar.jpg',
  `cover` varchar(500) NOT NULL DEFAULT 'profile.jpg',
  `reset_sol` int(11) NOT NULL DEFAULT '0',
  `confirm_sol` int(11) NOT NULL DEFAULT '0',
  `important_improvements` int(11) NOT NULL DEFAULT '1',
  `spinattic_blog` int(11) NOT NULL DEFAULT '1',
  `follow_me` int(11) NOT NULL DEFAULT '1',
  `comment_tour` int(11) NOT NULL DEFAULT '1',
  `new_tour` int(11) NOT NULL DEFAULT '1',
  `fb_name` varchar(100) NOT NULL,
  `gp_name` varchar(100) NOT NULL,
  `friendly_url` varchar(500) NOT NULL,
  `subscribe` int(11) NOT NULL,
  `admin` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=131 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nickname`, `username`, `email`, `country`, `state`, `city`, `website`, `twitter`, `facebook`, `password`, `sol_date`, `hashregistro`, `hashdelete`, `fnac`, `status`, `avatar`, `cover`, `reset_sol`, `confirm_sol`, `important_improvements`, `spinattic_blog`, `follow_me`, `comment_tour`, `new_tour`, `fb_name`, `gp_name`, `friendly_url`, `subscribe`, `admin`) VALUES
(1, 'spinattic', 'Spinattic', 'hbiancardi@hotmail.com', '', '', '', 'www.spinattic.com', 'spinattic', 'spinattic', 'e10adc3949ba59abbe56e057f20f883e', '2014-11-06 15:34:54', '084ee298d2e266ac90e137a83aab7a24', '', '10/11/1975', 1, 'v7um816s0w5tho3.jpg', 'poqne2g723304ws.jpg', 0, 0, 1, 1, 1, 1, 1, 'RockandRule SwingBand', 'Neo Swing', 'spina', 0, 1),
(54, 'charlesluyt', 'CharlesLuyt', 'charles.simplicityms@gmail.com', '', '', '', '', '', '', '2b16e6ebdb7c6447cecc4faaa33f8cb4', '2014-09-14 07:42:57', 'b36ddcf37d89d8cc0ffd72f6044369c8', '', '', 1, '4s6lf97zn22eqny.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'charlesluyt', 0, 0),
(55, 'derricktestaccount', 'Derrick Test Account', 'derrickrayclark@gmail.com', '', '', '', '', '', '', 'c978e1af82354f244be9f59a1cdc39cf', '2014-09-15 06:38:03', '56dae52402c7c1458e8d64da5e462d47', '', '', 1, 'avatar.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'derricktestaccount', 0, 0),
(56, 'ariel', 'Ariel Micheletti', 'ariel@ciudadesferica.com', '', '', '', '', '', '', '11b0f320e091e962df618163cef4e167', '2014-11-03 11:13:14', 'a8ba66871082d388b11c40dcb85222f0', '', '', 1, 'aun91o6ogbhr13o.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'arielmicheletti', 0, 1),
(57, 'kaelynbrennan', 'Kaelyn Brennan', 'kaelynwillyoumarryme@gmail.com', '', '', '', '', '', '', 'bfd01ee4c4a3ae477d7bc8014c60ae5c', '2014-09-17 12:06:47', 'ccbf64d37fdf2dc5eb803a6cf62d1d71', '', '', 1, 'avatar.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'kaelynbrennan', 0, 0),
(49, 'judithmessore', 'Judith Messore', 'jmessore@roadrunner.com', '', '', '', '', '', '', '335eaa42da902b67151b9f991d72ee6c', '2014-09-12 10:23:03', 'e23f77926b3ab2c8df36650d47ae5838', '', '', 0, 'avatar.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'judithmessore', 0, 0),
(50, 'timothymontgomery', 'Timothy Montgomery', 'TMontgomery@timitsolutions.com', '', '', '', '', '', '', '5255779cbee8fb174eb4849d86e61006', '2014-09-12 10:30:52', 'dcec5417658160e0a3bdeb3704d7d99e', '', '', 0, 'avatar.jpg', 'profile.jpg', 1, 0, 1, 1, 1, 1, 1, '', '', 'timothymontgomery', 0, 0),
(51, 'derrickclark', 'Derrick Clark', '', '', '', '', '', '', '', 'd41d8cd98f00b204e9800998ecf8427e', '2014-11-25 16:47:22', '684156957837', '', '', 1, 'avatar.jpg', 'profile.jpg', 0, 1, 1, 1, 1, 1, 1, 'Derrick Clark', '', 'derrickclark', 0, 0),
(52, 'anneliselachapelle', 'Annelise LaChapelle', 'lachapellea@yahoo.com', 'United States of America', 'NY', 'South Glens Falls', '', '', 'liveurlife2thefullest', 'babb9cde66c76c04f932ae1314947f68', '2014-09-13 05:50:38', 'f8bb5d01f488c6b29d91b23f6a520a9c', '', '07/08/1987', 1, '9mllgmrkf8jqoym.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'anneliselachapelle', 0, 0),
(48, 'susanmontgomery', 'Susan Montgomery', 'montgomerysu@gmail.com', '', '', '', '', '', '', 'f027db6795a4b9ba81824ece02ee4fcd', '2014-09-12 10:18:29', '6067ff217e7bfad5a1ff9c2c7c445b0c', '', '', 0, 'avatar.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'susanmontgomery', 0, 0),
(47, 'brittanymclamb', 'Brittany McLamb', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '713296262071813', '', '', 1, 'avatar.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, 'Brittany McLamb', '', 'brittanymclamb', 0, 0),
(43, 'arielm.', 'Ariel M.', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '100629036260847913393', '', '', 1, 'avatar.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, '', 'Ariel M.', 'arielm.', 0, 0),
(40, 'derrickclark', 'Derrick Clark', 'dclark@virtualmedia360.net', 'United States of America', 'NY', 'Glens Falls', 'virtualmedia360.net', 'derrick_clark_', 'derrick.clark.37', '06787233f0dd3c043cd5a61cba01a741', '2014-09-29 05:27:15', '6fed49ca9b47a88ad80383a8e47cd716', '', '3/10/1985', 1, '08xgssr1feqy807.jpg', '30spr1zga38pqp8.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'derrickclark', 0, 0),
(41, 'maxifalcone', 'Maxi Falcone', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '10152715474073395', '', '', 1, 'r8x0mwmyp8kofdm.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, 'Maxi Falcone', '', 'maxifalcone', 0, 1),
(42, 'rebeccasmith', 'Rebecca Smith', 'rsmith@virtualmedia360.net', 'United States of America', 'New York', 'Queensbury', 'virtualmedia360.net', 'rsmith5050', 'Rebecca Smith', 'a85cb8148823f2cd613147e67f7e000c', '2014-09-05 08:10:04', '841331be5b33405434472737d30d4992', '', '16/06/1957', 1, 'mtq6g39haxv99rt.jpg', 'yar8vbt5km5wy0y.jpg', 0, 0, 1, 1, 1, 1, 1, '', '', 'rebeccasmith', 0, 0),
(39, 'arielmikel', 'Ariel Mikel', '', 'Argentina', 'Santa Fe', 'Rosrio', 'www.ciudadesferica.com', 'arielmch', 'arielmch', '', '0000-00-00 00:00:00', '256844294502799', '', '03/10/1983', 1, 'cn8kniipb1k7a0y.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, 'Ariel Mikel', '', 'arielmikel', 0, 0),
(69, 'arielmicheletti', 'Ariel Micheletti', 'arielgmch@gmail.com', '', '', '', '', '', '', '11b0f320e091e962df618163cef4e167', '2014-09-25 17:08:53', 'eefa9467ada1647a081f31dd6d247b18', '', '', 1, '256844294502799.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, 'Ariel Mikel', '', 'arielmicheletti', 0, 0),
(96, 'rockandrules', 'RockandRule SwingBand', 'neoswingarg@gmail.com', 'Argentina', 'santa fe', '', 'www.rockandrule.com.ar', 'hernan', 'rockandrule.swingband', 'e10adc3949ba59abbe56e057f20f883e', '2014-11-10 19:25:54', '12a4049ce450ad7244ddc3264428cb87', '', '', 1, '787944841270681.jpg', 'timvqpkvfqn285n.jpg', 0, 0, 1, 1, 1, 1, 1, 'RockandRule SwingBand', 'Neo Swing', 'rockandrules', 0, 1),
(103, 'jorger', 'Jorge Rubiolo', 'jrubiolo@arnet.com.ar', 'Argentina', 'Santa Fe', 'Rosario', '', '', '1003963069620835', '', '0000-00-00 00:00:00', '1003963069620835', '338c44e574b4419cdaf1f0c6a6979cc9', '', 1, '1003963069620835.jpg', 'profile.jpg', 0, 0, 0, 1, 0, 1, 1, 'Jorge Rubiolo', '', 'jorger', 1, 1),
(110, 'maxif', 'Maxi Falcone', 'maxifalcone@gmail.com', '', '', '', '', '', '10152715474073395', '', '0000-00-00 00:00:00', '10152715474073395', '', '', 1, '10152715474073395.jpg', 'profile.jpg', 0, 0, 1, 1, 1, 1, 1, 'Maxi Falcone', '', 'maxif', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `views`
--

CREATE TABLE IF NOT EXISTS `views` (
  `idtour` int(11) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `views`
--

INSERT INTO `views` (`idtour`, `ip`, `date`) VALUES
(4, ' 200.3.95.36', '2014-10-09 17:48:07'),
(18, ' 190.2.100.45', '2014-10-09 19:53:22'),
(9, ' 190.2.100.45', '2014-10-09 19:53:26'),
(7, ' 190.2.100.45', '2014-10-09 19:53:32'),
(8, ' 200.3.94.38', '2014-10-10 17:50:37'),
(15, ' 190.192.38.253', '2014-10-11 13:08:35'),
(17, ' 190.225.61.185', '2014-10-13 23:48:22'),
(15, ' 190.225.61.185', '2014-10-13 23:50:25'),
(18, ' 190.2.100.45', '2014-10-14 14:59:54'),
(19, ' 200.3.95.35', '2014-10-15 14:20:17'),
(19, ' 190.192.44.51', '2014-10-15 14:26:38'),
(8, ' 200.3.94.34', '2014-10-15 15:08:43'),
(8, ' 200.3.95.35', '2014-10-15 15:12:36'),
(25, ' 72.43.12.186', '2014-10-16 15:37:25'),
(15, ' 200.3.94.34', '2014-10-16 17:52:18'),
(15, ' 200.3.95.35', '2014-10-16 17:56:41'),
(37, ' 190.2.100.45', '2014-10-16 18:53:58'),
(37, ' 72.43.12.186', '2014-10-16 19:41:25'),
(25, ' 190.2.100.45', '2014-10-17 00:05:18'),
(19, ' 190.2.100.45', '2014-10-17 05:03:40'),
(38, ' 72.43.12.186', '2014-10-17 18:31:04'),
(38, ' 190.2.100.45', '2014-10-17 19:31:58'),
(39, ' 72.43.12.186', '2014-10-17 20:36:28'),
(15, ' 72.43.12.186', '2014-10-17 20:37:03'),
(38, ' 190.192.38.253', '2014-10-17 20:55:23'),
(8, ' 190.2.100.45', '2014-10-17 22:55:42'),
(8, ' 190.192.38.253', '2014-10-18 00:45:59'),
(48, ' 72.43.12.186', '2014-10-19 19:17:55'),
(49, ' 190.2.100.45', '2014-10-19 22:10:35'),
(39, ' 200.3.95.120', '2014-10-20 13:44:46'),
(47, ' 200.3.95.120', '2014-10-20 13:46:30'),
(15, ' 190.192.44.51', '2014-10-20 16:17:32'),
(38, ' 190.192.44.51', '2014-10-21 14:34:26'),
(37, ' 190.192.44.51', '2014-10-21 14:34:51'),
(25, ' 190.192.44.51', '2014-10-21 15:08:12'),
(38, ' 190.2.100.45', '2014-10-21 16:03:02'),
(39, ' 190.192.44.51', '2014-10-21 16:43:33'),
(18, ' 190.2.100.45', '2014-10-21 17:22:54'),
(36, ' 190.192.38.253', '2014-10-21 22:22:59'),
(38, ' 190.192.38.253', '2014-10-22 01:19:37'),
(19, ' 190.192.38.253', '2014-10-22 01:22:35'),
(47, ' 190.192.38.253', '2014-10-22 01:37:36'),
(38, ' 72.43.12.186', '2014-10-22 13:02:16'),
(39, ' 190.2.100.45', '2014-10-22 13:14:00'),
(8, ' 200.3.95.120', '2014-10-22 13:31:06'),
(8, ' 200.3.94.119', '2014-10-22 13:38:11'),
(15, ' 200.3.95.120', '2014-10-22 13:53:42'),
(36, ' 200.3.95.120', '2014-10-22 13:56:00'),
(48, ' 200.3.94.119', '2014-10-23 17:09:24'),
(48, ' 190.2.100.45', '2014-10-23 17:11:54'),
(48, ' 190.192.44.51', '2014-10-24 13:40:33'),
(53, ' 200.43.32.41', '2014-10-24 15:48:14'),
(18, ' 190.192.44.51', '2014-10-24 15:53:55'),
(50, ' 200.43.32.41', '2014-10-24 16:01:13'),
(37, ' 190.2.100.45', '2014-10-24 16:16:45'),
(37, ' 24.103.176.42', '2014-10-24 16:22:15'),
(48, ' 24.103.176.42', '2014-10-24 16:22:56'),
(19, ' 24.103.176.42', '2014-10-24 16:23:31'),
(37, ' 72.43.12.186', '2014-10-24 16:50:07'),
(48, ' 72.43.12.186', '2014-10-24 16:51:22'),
(19, ' 190.2.100.45', '2014-10-24 17:51:08'),
(8, ' 200.43.32.41', '2014-10-24 18:06:51'),
(36, ' 72.43.12.186', '2014-10-24 20:43:19'),
(37, ' 200.69.246.61', '2014-10-27 15:13:11'),
(48, ' 190.2.100.45', '2014-10-27 15:31:21'),
(48, ' 200.69.246.61', '2014-10-27 16:41:39'),
(50, ' 200.69.246.61', '2014-10-27 16:42:21'),
(37, ' 190.2.100.45', '2014-10-27 20:00:31'),
(48, ' 72.43.12.186', '2014-10-28 23:12:41'),
(19, ' 190.2.100.45', '2014-10-29 23:16:35'),
(48, ' 190.192.38.253', '2014-10-30 15:14:16'),
(38, ' 190.192.38.253', '2014-10-30 17:52:45'),
(37, ' 190.192.38.253', '2014-10-30 18:01:27'),
(53, ' 190.192.38.253', '2014-10-30 18:02:46'),
(56, ' 190.192.38.253', '2014-10-31 01:30:52'),
(15, ' 190.192.38.253', '2014-10-31 03:01:16'),
(58, ' 190.192.38.253', '2014-10-31 20:25:33'),
(54, ' 190.2.100.45', '2014-10-31 21:37:53'),
(11, ' 190.2.100.45', '2014-10-31 23:08:06'),
(58, ' 190.2.100.45', '2014-10-31 23:08:14'),
(48, ' 190.2.100.45', '2014-11-02 23:34:10'),
(37, ' 190.2.100.45', '2014-11-02 23:35:07'),
(35, ' 200.43.32.41', '2014-11-03 17:14:57'),
(18, ' 190.2.100.45', '2014-11-03 19:59:02'),
(56, ' 190.192.44.51', '2014-11-04 12:47:46'),
(67, ' 190.2.100.45', '2014-11-04 14:12:48'),
(67, ' 200.3.95.39', '2014-11-04 15:18:54'),
(67, ' 200.43.32.41', '2014-11-04 15:56:27'),
(66, ' 200.43.32.41', '2014-11-04 16:11:42'),
(58, ' 201.253.0.212', '2014-11-04 23:53:12'),
(58, ' 190.192.44.51', '2014-11-05 14:36:55'),
(67, ' 190.192.44.51', '2014-11-05 14:38:55'),
(56, ' 200.43.32.41', '2014-11-05 14:53:52'),
(50, ' 200.43.32.41', '2014-11-05 14:54:46'),
(70, ' 200.43.32.41', '2014-11-05 15:14:44'),
(18, ' 190.192.44.51', '2014-11-05 16:06:19'),
(70, ' 200.3.95.35', '2014-11-05 16:54:58'),
(48, ' 200.43.32.41', '2014-11-06 16:58:32'),
(50, ' 190.2.100.45', '2014-11-06 18:22:10'),
(48, ' 190.2.100.45', '2014-11-06 18:24:00'),
(19, ' 190.2.100.45', '2014-11-06 18:28:02'),
(37, ' 190.2.100.45', '2014-11-06 18:28:20'),
(50, ' 72.43.12.186', '2014-11-06 19:41:43'),
(50, ' 201.253.0.212', '2014-11-06 23:03:21'),
(49, ' 190.2.100.45', '2014-11-06 23:10:57'),
(54, ' 190.2.100.45', '2014-11-07 03:13:56'),
(66, ' 200.3.95.39', '2014-11-07 13:52:46'),
(54, ' 200.3.95.39', '2014-11-07 13:53:26'),
(41, ' 200.3.95.39', '2014-11-07 13:53:37'),
(58, ' 200.3.95.39', '2014-11-07 14:00:54'),
(58, ' 200.43.32.41', '2014-11-07 14:08:21'),
(49, ' 200.43.32.41', '2014-11-07 14:31:08'),
(25, ' 200.43.32.41', '2014-11-07 14:31:21'),
(50, ' 190.192.44.51', '2014-11-07 14:53:27'),
(50, ' 200.3.95.39', '2014-11-10 16:54:27'),
(50, ' 200.43.32.41', '2014-11-10 18:17:32'),
(50, ' 190.195.223.87', '2014-11-10 21:08:10'),
(58, ' 190.195.223.87', '2014-11-10 21:17:59'),
(50, ' 190.231.161.19', '2014-11-10 21:19:33'),
(19, ' 200.3.95.39', '2014-11-11 13:48:34'),
(77, ' 72.43.12.186', '2014-11-11 15:52:46'),
(19, ' 200.43.32.41', '2014-11-11 16:45:37'),
(50, ' 200.3.94.34', '2014-11-11 17:06:11'),
(77, ' 190.2.100.45', '2014-11-11 17:09:30'),
(77, ' 190.192.44.51', '2014-11-11 17:20:24'),
(54, ' 190.192.44.51', '2014-11-11 17:20:57'),
(39, ' 200.3.95.35', '2014-11-11 17:33:37'),
(50, ' 24.103.176.42', '2014-11-11 17:35:08'),
(77, ' 24.103.176.42', '2014-11-11 17:35:50'),
(16, ' 24.103.176.42', '2014-11-11 17:36:38'),
(54, ' 190.2.100.45', '2014-11-11 19:35:08'),
(19, ' 190.2.100.45', '2014-11-11 20:14:41'),
(49, ' 190.2.100.45', '2014-11-11 22:15:56'),
(18, ' 190.192.44.51', '2014-11-12 14:54:38'),
(19, ' 190.192.44.51', '2014-11-12 15:51:29'),
(77, '200.3.95.39', '2014-11-12 15:51:42'),
(8, '200.43.32.41', '2014-11-12 18:06:39'),
(19, ' 190.195.223.87', '2014-11-13 21:27:11'),
(19, ' 200.3.95.39', '2014-11-14 16:29:19'),
(50, ' 200.3.95.39', '2014-11-14 17:32:57'),
(19, ' 200.43.32.41', '2014-11-14 18:53:17'),
(48, ' 200.3.95.39', '2014-11-14 18:56:45'),
(109, ' 190.2.100.45', '2014-11-14 19:01:35'),
(48, ' 72.43.12.186', '2014-11-14 19:12:18'),
(50, ' 190.195.223.87', '2014-11-14 20:39:52'),
(77, ' 190.2.100.45', '2014-11-14 20:48:58'),
(19, ' 190.2.100.45', '2014-11-14 20:49:18'),
(77, ' 190.192.44.51', '2014-11-14 21:02:29'),
(50, ' 190.2.100.45', '2014-11-14 21:50:38'),
(35, ' 200.3.95.39', '2014-11-17 13:25:39'),
(36, ' 200.3.95.39', '2014-11-17 13:27:18'),
(50, ' 200.3.95.35', '2014-11-17 18:08:12'),
(93, ' 200.3.94.34', '2014-11-17 18:30:48'),
(93, ' 200.3.95.35', '2014-11-17 18:31:40'),
(94, ' 200.3.94.34', '2014-11-17 18:33:31'),
(94, ' 200.3.95.35', '2014-11-17 18:33:33'),
(34, ' 190.195.223.87', '2014-11-17 20:47:03'),
(91, ' 190.195.223.87', '2014-11-17 21:29:01'),
(19, ' 190.2.100.45', '2014-11-17 22:08:34'),
(97, ' 190.195.223.87', '2014-11-17 22:32:27'),
(77, ' 190.195.223.87', '2014-11-17 22:33:58'),
(19, ' 190.195.223.87', '2014-11-17 22:34:30'),
(85, ' 190.195.223.87', '2014-11-17 22:35:41'),
(8, ' 200.3.95.35', '2014-11-18 13:23:40'),
(97, ' 190.192.44.51', '2014-11-18 17:26:56'),
(85, ' 200.3.95.35', '2014-11-19 13:25:10'),
(50, ' 190.192.44.51', '2014-11-19 17:13:12'),
(50, ' 190.2.100.45', '2014-11-19 17:38:43'),
(77, ' 190.192.44.51', '2014-11-20 13:16:10'),
(48, ' 190.192.44.51', '2014-11-20 14:43:04'),
(54, ' 190.192.44.51', '2014-11-20 14:45:44'),
(85, ' 190.192.44.51', '2014-11-25 19:20:19'),
(88, ' 190.192.44.51', '2014-11-25 19:22:09'),
(77, ' 190.192.44.51', '2014-11-25 19:23:49'),
(119, ' 190.192.50.87', '2014-11-25 22:28:50'),
(119, ' 190.192.44.51', '2014-11-26 16:53:51'),
(54, ' 190.192.44.51', '2014-11-26 17:52:33'),
(119, ' 200.3.95.35', '2014-11-26 18:08:31'),
(77, ' 200.3.95.35', '2014-11-26 18:17:38'),
(85, ' 200.3.95.35', '2014-11-26 18:20:13'),
(19, ' 190.192.50.87', '2014-11-26 19:22:21'),
(37, ' 190.192.50.87', '2014-11-26 19:26:04'),
(106, ' 190.192.50.87', '2014-11-26 20:32:54'),
(77, ' 190.192.50.87', '2014-11-26 20:59:15'),
(85, ' 190.192.50.87', '2014-11-26 20:59:29'),
(71, ' 190.137.81.248', '2014-11-27 00:24:08'),
(95, ' 190.2.100.45', '2014-11-27 17:48:48'),
(19, ' 200.3.95.35', '2014-11-27 18:09:10'),
(2222, ' 200.3.95.35', '2014-11-27 18:09:16'),
(84, ' 200.3.95.35', '2014-11-27 18:09:47'),
(50, ' 190.225.116.221', '2014-12-01 23:11:47'),
(119, ' 200.3.95.35', '2014-12-03 13:10:04'),
(18, '190.2.100.45', '2014-12-03 13:47:37'),
(117, ' 200.3.95.35', '2014-12-03 14:27:17'),
(113, ' 200.3.95.35', '2014-12-03 14:46:21'),
(109, ' 200.3.95.35', '2014-12-03 14:49:06'),
(107, ' 200.3.95.35', '2014-12-03 15:16:40'),
(81, ' 190.2.100.45', '2014-12-04 18:18:26'),
(119, ' 190.2.100.45', '2014-12-05 20:22:13'),
(119, ' 200.3.95.35', '2014-12-10 15:49:17'),
(119, ' 190.2.100.45', '2014-12-12 13:50:36'),
(119, ' 200.3.95.35', '2014-12-17 13:13:44'),
(50, ' 200.3.95.35', '2014-12-17 14:40:41'),
(128, ' 200.3.95.35', '2014-12-23 12:04:19'),
(119, ' 200.3.95.35', '2014-12-23 14:42:48'),
(123, ' 200.3.95.35', '2014-12-23 14:57:33'),
(19, ' 181.111.1.221', '2014-12-26 20:22:22'),
(131, ' 181.111.1.221', '2014-12-29 00:36:45'),
(133, ' 181.111.1.221', '2014-12-29 01:39:36'),
(119, ' 181.164.119.142', '2015-01-05 21:20:18'),
(117, ' 190.94.169.124', '2015-01-05 21:45:49'),
(117, ' 190.2.100.45', '2015-01-06 11:35:14'),
(19, ' 200.3.95.35', '2015-01-06 13:14:01'),
(128, ' 190.2.100.45', '2015-01-06 13:43:02'),
(119, ' 190.192.44.51', '2015-01-15 16:53:04'),
(119, ' 200.3.95.35', '2015-01-19 17:03:30'),
(85, ' 190.94.168.157', '2015-01-20 17:24:54'),
(85, ' 200.3.95.35', '2015-01-20 17:59:54'),
(119, ' 190.2.100.45', '2015-01-21 13:56:06'),
(150, ' 200.3.95.35', '2015-01-22 15:02:49'),
(149, ' 200.3.95.35', '2015-01-22 15:48:27'),
(149, '72.43.12.186', '2015-01-23 19:34:24'),
(89, ' 190.139.42.197', '2015-01-25 23:46:45'),
(109, ' 190.138.196.214', '2015-01-27 15:43:06'),
(18, ' 190.138.196.214', '2015-01-28 23:48:31'),
(19, ' 190.138.196.214', '2015-01-29 01:02:05'),
(19, ' 186.148.114.208', '2015-02-03 14:43:30'),
(118, ' 201.253.4.41', '2015-02-03 00:58:51'),
(50, ' 201.253.4.41', '2015-02-03 00:38:24'),
(118, ' 200.3.95.35', '2015-02-03 17:07:32'),
(9, ' 200.3.95.35', '2015-02-03 17:28:57'),
(9, ' 190.192.39.165', '2015-02-03 21:53:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `views_priority_steps`
--

CREATE TABLE IF NOT EXISTS `views_priority_steps` (
  `amount` int(11) DEFAULT NULL,
  `factor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `views_priority_steps`
--

INSERT INTO `views_priority_steps` (`amount`, `factor`) VALUES
(50, 1),
(100, 1),
(200, 1),
(500, 1),
(1000, 1),
(2000, 1),
(4000, 1),
(6000, 1),
(2000, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
