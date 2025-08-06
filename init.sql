-- ./init.sql

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'rasmy4535';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS digitinary;
USE digitinary;