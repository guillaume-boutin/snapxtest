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

 * Clone this repository
 * Create `.env` and `env.testing` files by copying `.env.example`.
 * In `.env.testing`, `DB_DATABASE=snapxtest_test`.
 * Run `composer install` and `npm install` to install packages.
 * Run `php artisan migrate` to create database tables.
 * Run `php artisan db:seed` to populate the database.
 * Run `phpunit` to see if all the tests pass as an indicator that the app is working.
 * Run `npm run dev` to compile the React app.
 * Visit the domain you set up and you should be good to go.
 * Go to `/transactions` to see the Transactions page, or click on the link in the Nav bar.

## Technical overview

### Database

The Database consists of 3 tables, `transactions`, which contains the expenses with subtotal, taxes, `companies` which are the suppliers for the `transactions`, and `payment_methods` which so far contains only 3 rows for Cash, Credit Card and Debit Card. Transaction has a `company_id` and a `payment_method` column, and its relationships are `Transaction belons to Comapny` and `Transaction belons to PaymentMethod`.

### Actions

Typically in a MVC architecture, a route is associated with a method in a controller. However in this case, each api route is associated with one Class file called an Action. Not only can an Action be called from and http request, but it also can be instanciated and ran on its own, in a Cron Task for instance. The usage of Actions insures that the manipulations of any Resource will always be done the same, wether its from an http request, or from a Cron Task.

This package has been used for writing the Actions:
https://github.com/lorisleiva/laravel-actions

### Routing

Here is a table of the enpoints of the API so far, which might make it more explainatory of the conventions

| Method | URI                   | Name                | Action                          |
|--------|-----------------------|---------------------|---------------------------------|
| GET    | api/companies         | company.index       | App\Actions\Company\Index       |
| GET    | api/payment-methods   | paymentMethod.index | App\Actions\PaymentMethod\Index |
| GET    | api/transactions      | transaction.index   | App\Actions\Transaction\Index   |
| POST   | api/transactions      | transaction.create  | App\Actions\Transaction\Create  |
| GET    | api/transactions/{id} | transaction.show    | App\Actions\Transaction\Show    |
| PUT    | api/transactions/{id} | transaction.update  | App\Actions\Transaction\Update  |
| DELETE | api/transactions/{id} | transaction.delete  | App\Actions\Transaction\Delete  |

The name for a route is `${resource}.${action}`, and the associated action is always located in folder `app/Actions/${Resource}/${Action}`. For the frontend to ba able to consume the API, all the api routes are parsed into a JSON object that is then put in a `<meta>` tag in the home page to then be accessible to the React app. The parsing is located in `APP\Http\Controllers\WelcomeController::apiRoutes()`. Then the fronted can make api calls through a custom method `api(routeName, payload)` located in `ressources/js/lib/api.js` where `routeName` is the name of the route, and `payload` is either the data or the query params we want to send. The http method is deduced from the `routeName`.

### Further Notes

The app is very barebone with basic CRUD operations and since so far it is more of a MVP than a full app, a few things were overloked and should be improved if this would be taken to the next step.

For instance, the Table displaying the transactions have no pagination which is not a big deal given the amount in the Database, but will become an issue in the long run. Same for listing companies in the dropdown. It will simply grow as more companies get added. There is no endpoint for creating a new company, but they can be through the a transaction. When creating/updating a transaction with a company name, the Action checks by name if the company exists, and creates it if it doesn't. This means that if there is a typo in the submitted company name, a new company will be created.

Here are some of the next features, should this project be taken further:

 * Paginating resources for `Index` action.
 * Paginated DataTables, with possiility of ordering columns.
 * Enpoints for creating/updating/deleteing companies.
 * Implement an Autocomplete dropdown that queries companies that matches the input, both to prevent overpopulating the dropdown, and typos.
 * Login system with either JWT or Passport.
 * State manager for the React app, most-likely Redux.