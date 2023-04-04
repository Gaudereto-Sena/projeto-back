DROP TABLE if EXISTS operacoes;
DROP TABLE if EXISTS ativos_user;
DROP TABLE if EXISTS users_data;

CREATE TABLE users_data (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
username VARCHAR(30) NOT NULL
);

CREATE TABLE ativos_user (
id_ativo INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
codigo_ativo VARCHAR(10) NOT NULL,
nome_ativo VARCHAR(255) NOT NULL,
tipo VARCHAR(255) NOT NULL,
id_user INT NOT NULL,
FOREIGN KEY (id_user) REFERENCES users_data (id) ON DELETE CASCADE
);

CREATE TABLE operacoes (
id_operacao INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
quantidade INT NOT NULL,
data_operacao DATETIME NOT NULL,
valor DECIMAL(15,2) NOT NULL,
tipo_operacao VARCHAR(255),
ativos_user_id INT NOT NULl,
FOREIGN KEY (ativos_user_id) references ativos_user (id_ativo) ON DELETE cascade
);
