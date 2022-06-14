### api project
# in api Ordner wechseln
composer install
# db konfigurieren in .env 
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
php bin/console server:run

### react-app project
# in react-app Ordner wechseln
yarn install
yarn start
