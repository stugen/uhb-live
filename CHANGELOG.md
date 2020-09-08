# Stugen stream interface

Please note that the API is subject to change in all 0.x minor-versions. 

## 0.2.0 :: 2020-09-08
**Added**:
 - Config option `reverseProxy` to fix problems with reverse-proxies
 - Missing environment variables in the `docker-compose.yaml`
 - Metadata about the software (version etc.) into the generated HTML

**Improved**:
 - Better caching and compression logic for static files
 - Admin interface only shows relevant buttons per stream and doesn't cache values too long anymore
 - View is more optimized for mobile devices
 - Smaller docker image size

**Fixed**:
 - Certain browsers couldn't connect to the WebSocket due to a bug in URL-protocol handling
 - Readme and example config both had yaml as file extension, although it should be yml.
 - An expired login token caused errors thrown in the console, token-timestamp evaluation solves that issue
 - An incorrect call to the login route caused an error because of not stopping evaluation after sending the HTTP 400
 - The docker build was failing due to a formatting error in the docker-compose.yaml
 - Usage of MariaDB backend resulted in app crash 

## 0.1.0 :: 2020-08-25
**Initial release**
