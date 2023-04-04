with base AS (
SELECT
id,
id_user,
username,
SUM(case when tipo_operacao = 'compra' then valor * quantidade ELSE valor * -quantidade END ) AS valor_total_investido,
codigo_ativo,
ativos_user_id,
tipo

FROM operacoes 
inner JOIN ativos_user ON operacoes.ativos_user_id = ativos_user.id_ativo
INNER JOIN users_data ON users_data.id = ativos_user.id_user

GROUP BY ativos_user_id)

SELECT tipo,
username,
COUNT(codigo_ativo) AS quantidade_ativos,
SUM(valor_total_investido) AS total_investido

FROM base

where id_user = ?

GROUP BY tipo