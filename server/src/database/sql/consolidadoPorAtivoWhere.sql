with base AS (SELECT
id,
id_user,
username,
codigo_ativo,
SUM(case when tipo_operacao = 'compra' then quantidade ELSE -quantidade END) AS quantidade_total,
SUM(case when tipo_operacao = 'compra' then valor * quantidade ELSE valor * -quantidade END ) AS valor_total,
nome_ativo,
tipo,
ativos_user_id

FROM operacoes 
INNER JOIN ativos_user ON operacoes.ativos_user_id = ativos_user.id_ativo
INNER JOIN users_data ON users_data.id = ativos_user.id_user

GROUP BY ativos_user_id)

SELECT * , 
ROUND(valor_total / quantidade_total, 2) AS preco_medio

FROM base

WHERE id_user = ? and tipo = ?