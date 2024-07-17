insert into user (username,associationtype,fname,lname,emailid,mobileno,photo,usertype)
   values (:username,'CustomerUser',:fname,:lname,:emailid,:mobileno,:photo,'CustomerUser');

insert into client (fname,lname,emailid,mobileno,photo,createdby,clientno,userid, city,state,country,address,zipcode)
      values (:fname,:lname,:emailid,:mobileno,:photo,:createdby,:clientno,LAST_INSERT_ID(),:city,:state,:country,:address,:zipcode);

