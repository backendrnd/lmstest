SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `api_users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `api_users` (`id`, `username`, `password`) VALUES
(1, 'test', '$2y$10$R6G5lJhBEnFbAWeczhrZ3.m9vzQtL0pTrYzrAdMAU4NK/Kmm58Iqa');

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `students` (`id`, `login`, `name`) VALUES
(1, 'kctest00202', 'Bernardo Santini'),
(2, 'Daway2001', 'James Pearsall'),
(3, 'Cassenthe', 'John Johnson'),
(4, 'Forebole', 'David C. Lent'),
(5, 'Onamix', 'Matthew C. Maynard'),
(6, 'Milied', 'Jennifer J. Swanson'),
(7, 'Surefus', 'James J. Navarrete'),
(8, 'Forde1949', 'Thomas J. Card'),
(9, 'Decorichiggy1974', 'Terry K. Walls'),
(10, 'Yestoorse88', 'Maria R. Mincey'),
(11, 'Careas', 'Dorothy D. Harper'),
(12, 'Cumbefted', 'Octavia J. Knight'),
(13, 'Dreatenty', 'Natalie K. Kovacs');

ALTER TABLE `api_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `api_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;
