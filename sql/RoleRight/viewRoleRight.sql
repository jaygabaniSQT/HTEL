select user.fname,user.lname,user.username,user.roleid,roleright.roleid ,roleright.rightid ,roleright.isview, roleright.iscreate,  roleright.isupdate, roleright.isdelete ,role.rolename,right.rightname,right.displayname,right.path,right.isfunction ,right.islist ,right.isform ,right.modulename,right.parentid  ,right.orderno  from user 

left join roleright on roleright.roleid=user.roleid  

left join role on roleright.roleid = role.id

left join `right` on roleright.rightid=right.id

where user.id=:id;