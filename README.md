# Uni Bremen Live - video/stream interface

For more stable code see the "main"-branch or the releases.

## Docker setup
1. Ensure docker and docker-compose are installed.
2. Change the configuration in docker-compose.yaml
3. Start the application with `docker-compose up -d`

## Manual setup
1. Ensure node 12 or 14 is installed. If it's not, checkout [nvm](http://nvm.sh).
2. Ensure yarn is installed. If it's not run `npm i -g yarn`.
3. Clone this repository and change to that directory.
4. Install dependencies with `yarn install`.
5. Copy the settings template `config.example.yml` to `config.yml` and fill it.
6. Build this application with `yarn build`.
7. Start this application with `yarn start`.

## Database
By default, this application uses an SQLite datebase, stored in the data-directory.  
For better performance - especially with a higher amount of chat messages - you should consider using a MariaDB database.
Change the config values `dbType` and `dbUrl` accordingly.

For SQLite databases the URL consists of the prefix and the file-path: `sqlite:./stream.db`  
For MariaDB databases the URL looks as following: `mariadb://username:password@host:port/database`

## Configuration
Copy the file `config.example.yaml` to `config.yaml` and change the values accordingly to your environment.
You can find a minimal documentation and environment variables for reference in `src/config/schema.ts`.

## Development
1. Follow the steps 1-5 from the manual setup.
2. Run the server in dev-mode (rebuilding and restarting on changes) with `yarn watch-server`.
3. Run the webpack-dev-mode with `yarn watch-ui` to rebuild the UI on changes and enable dev-access for tools like VueDevtools.

You can lint the code with `yarn lint`.

## License
MIT
