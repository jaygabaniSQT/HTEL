select client.*,user.password,user.id,user.isblock,user.username,user.associationtype,user.associationid,user.usertype,user.roleid from user left join client on client.userid=user.id  where  user.emailid=:emailid and user.isactive=1 and user.isblock=0; 