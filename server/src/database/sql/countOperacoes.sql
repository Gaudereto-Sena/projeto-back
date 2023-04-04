
SELECT COUNT(*) AS numeroOperacoes FROM operacoes 
INNER JOIN ativos_user ON operacoes.ativos_user_id = ativos_user.id_ativo
INNER JOIN users_data ON users_data.id = ativos_user.id_user

WHERE id_user = ?