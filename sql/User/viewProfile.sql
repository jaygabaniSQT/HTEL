SELECT client.*, user.isblock, user.id,user.username
FROM user
LEFT JOIN client ON client.userid = user.id
WHERE user.id = :id;
