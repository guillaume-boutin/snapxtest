# Snapx-Test

## Introduction

This is my personal solution to Snapx Technical test. It consists of an small API written in Laravel, that can fetch transactions by ID, date, supplier or date purchased, create transactions, update and delete transactions by ID. The frontent is a single page application written with React, and using React-Bootstrap for the layout and styling.

### Tech Stack
 * MySQL 5.7
 * PHP 7.2
 * Laravel 6.2
 * React 6.12

### Installation

Clone this repository, then create both `.env` and `.env.testing` files by copying `.env.example` file. Suggestions for `APP_NAME`, `APP_KEY` and database credentials are already included and could be left as is. However for `env.testing`, `DB_DATABASE` should be modified for a name of your choosing. Create the app and the testing databases according to each environment variable.

 * Run `composer install` and `npm install` to install packages.
 * Run `php artisan migrate` to create database tables.
 * Run `php artisan db:seed` to populate the database.
 * Run `npm run dev` to compile the React app.
 * Visit the domain you set up and you should be good to go.