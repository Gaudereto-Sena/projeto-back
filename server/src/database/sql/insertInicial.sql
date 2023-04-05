INSERT INTO users_data (username)
VALUES ('Gustavo');

INSERT INTO ativos_user (codigo_ativo, nome_ativo, tipo, id_user)
VALUES ('mxrf11','Maxi rendafixa', 'fundosimobiliarios', 1);

INSERT INTO operacoes (quantidade, tipo_operacao, valor, data_operacao, ativos_user_id)
VALUES (200, 'compra', 10 , '2021-03-14', 1);

INSERT INTO ativos_user (codigo_ativo, nome_ativo, tipo, id_user)
VALUES ('bbse3','Seguros BB', 'acoes', 1);

INSERT INTO operacoes (quantidade, tipo_operacao, valor, data_operacao, ativos_user_id)
VALUES (200, 'compra', 22 , '2020-05-14', 2);
INSERT INTO operacoes (quantidade, tipo_operacao, valor, data_operacao, ativos_user_id)
VALUES (300, 'compra', 24 , '2019-05-14', 2);
INSERT INTO operacoes (quantidade, tipo_operacao, valor, data_operacao, ativos_user_id)
VALUES (200, 'venda', 27 , '2021-07-14', 2);

INSERT INTO ativos_user (codigo_ativo, nome_ativo, tipo, id_user)
VALUES ('bbas3','Banco do Brasil', 'acoes', 1);

INSERT INTO operacoes (quantidade, tipo_operacao, valor, data_operacao, ativos_user_id)
VALUES (200, 'compra', 35 , '2022-05-14', 3);
INSERT INTO operacoes (quantidade, tipo_operacao, valor, data_operacao, ativos_user_id)
VALUES (300, 'compra', 37 , '2018-05-14', 3);

INSERT INTO users_data (username)
VALUES ('Julia');

INSERT INTO ativos_user (codigo_ativo, nome_ativo, tipo, id_user)
VALUES ('bbas3','Banco do Brasil', 'acoes', 2);

INSERT INTO operacoes (quantidade, tipo_operacao, valor, data_operacao, ativos_user_id)
VALUES (100, 'compra', 35 , '2019-05-14', 4);
INSERT INTO operacoes (quantidade, tipo_operacao, valor, data_operacao, ativos_user_id)
VALUES (100, 'compra', 37 , '2023-05-14', 4);