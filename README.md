
# Currencyconverter

This web application:
- takes User's shopping items as input (price in USD)
- converts the price of the items to PLN (using NBP api)
- saves items' informations in the database (Docker needed)
- displays the table which contains all the items (lets User to sort the table and search it for specific item/s by name and/or accounting date)
- lets User to save the table (also sorted / searched table) as a .xml file


# Quick Start
1. Install Node.js (v16.14.0) and Docker, clone the repository
2. From the repo's folder run `npm install` - this will install all required node dependencies
3. Run `npm run startup` - this will build docker compose and run both projects (api & front) in parallel
4. Open `localhost:4200`
