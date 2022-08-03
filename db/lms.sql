-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 03 2022 г., 21:26
-- Версия сервера: 5.7.33
-- Версия PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lms`
--

-- --------------------------------------------------------

--
-- Структура таблицы `api_users`
--

CREATE TABLE `api_users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `api_users`
--

INSERT INTO `api_users` (`id`, `username`, `password`) VALUES
(1, 'test', '$2y$10$R6G5lJhBEnFbAWeczhrZ3.m9vzQtL0pTrYzrAdMAU4NK/Kmm58Iqa');

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `students`
--

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

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `api_users`
--
ALTER TABLE `api_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `api_users`
--
ALTER TABLE `api_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
