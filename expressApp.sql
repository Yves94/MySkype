-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mer 31 Mai 2017 à 11:41
-- Version du serveur :  5.7.18-0ubuntu0.16.04.1
-- Version de PHP :  7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `expressApp`
--

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `message`
--

INSERT INTO `message` (`id`, `id_user`, `message`) VALUES
(47, 1, 'Bonjour Hugo !'),
(48, 2, 'Salut Yves');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('2eNIRDg-TkQ3qJXrVXy6pqbLJyTsenvX', 1496323201, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"passport":{"user":1}}'),
('5-QSVUOghZq9MwcGoJV5EIfd6I6Q7f5y', 1496274100, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"passport":{"user":1}}'),
('G3RljSaqJHZCbW6nS2VnUqztuS8tGBUf', 1496274376, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"passport":{"user":3}}'),
('mU5AJaQ8vdrG2MoBgoDPy-8vJkFNVJM7', 1496323182, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"passport":{"user":2}}'),
('uaZKyoxqIp1nAuPLZWVP6l8YaI0L7iIc', 1496274097, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"passport":{"user":2}}');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'Yves', '$2a$10$du1nQ71muPssOx2p6KgY5edGW7dpxcH4aurq9NPm7lIusm2hvnz7u'),
(2, 'Hugo', '$2a$10$GVmpydCZbhfS87Dds6NpX.Dgpf7fmdIejCvKFpTd9POWCsotqESYa'),
(3, 'Jean', '$2a$10$h1jtxRa7NTmPm0/3UntQcOrvLB4PhK0P.jBkoVU/dBRRHZQn1SHLe');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
