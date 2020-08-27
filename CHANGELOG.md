# Stugen stream interface

## Unreleased
**Added**:
 - config option `reverseProxy` to fix problems with reverse-proxies
 - missing environment variables in the `docker-compose.yaml`

**Improved**:
 - better caching and compression logic for static files
 - Admin interface only shows relevant buttons per stream and doesn't cache values too long anymore
 - mobile devices use the mobile view

**Fixed**:
 - certain browsers couldn't connect to the WebSocket due to a bug in URL-protocol handling
 - Readme and example config both had yaml as file extension, although it should be yml.

## 0.1.0 :: 2020-08-25
**Initial release**
