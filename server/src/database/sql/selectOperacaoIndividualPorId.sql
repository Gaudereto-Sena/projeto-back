SELECT
id_user,
codigo_ativo,
quantidade,
valor,
tipo_operacao,
tipo,
id_ativo,
id_operacao,
valor * quantidade AS valor_total_operacao,
data_operacao

FROM operacoes INNER JOIN ativos_user ON operacoes.ativos_user_id = ativos_user.id_ativo 

WHERE id_operacao = ?