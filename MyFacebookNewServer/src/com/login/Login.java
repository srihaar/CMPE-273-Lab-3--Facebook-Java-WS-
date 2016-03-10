package com.login;

import java.sql.*;

import org.json.JSONArray;
import org.json.simple.JSONObject;

import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;

public class Login {

public String loginCheck(String email,String password)
{
	String dbUrl = "jdbc:mysql://localhost:3306/test";
	System.out.println(email);
	 
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "srihaar");
	PreparedStatement stmt = con.prepareStatement("Select * FROM users where email=? and password=?");
	stmt.setString(1, email);
	stmt.setString(2, password);
	ResultSet rs = stmt.executeQuery();
	System.out.println(con);
	System.out.println("srui");
	
	

    
	if(rs.next()){
		JSONArray jsonArray = new JSONArray();
		
        int total_rows = rs.getMetaData().getColumnCount();
        JSONObject obj1 = new JSONObject();
        for (int i = 0; i < total_rows; i++) {
            obj1.put(rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase(), rs.getObject(i + 1));
            System.out.println("in loop rows");
        }
        jsonArray.put(obj1); 
		
		
		
		obj = new JSONObject();
		    
		    
		    obj.put("statusCode",new Integer(200));
		    obj.put("msg","success");
		    obj.put("email", rs.getString(1));
		    obj.put("userProfile", jsonArray);
		    sr= obj.toString();
	
	}
	else
	{
         obj = new JSONObject();
	    
	    
	    obj.put("statusCode",new Integer(401));
	    obj.put("msg","Incorrect Username or password");
	    obj.put(email, null);
	    sr= obj.toString();
	    
	}
	
	
	
	}



	catch(ClassNotFoundException e) {
		e.printStackTrace();
	}

	catch(SQLException e) {
		e.printStackTrace();
	}
	
	
		return sr;


}





public String signup(String email,String firstname,String lastname,String password,String gender,String dob)
{
	String dbUrl = "jdbc:mysql://localhost:3306/test";
	System.out.println(email);
	 
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "srihaar");
	PreparedStatement stmt = con.prepareStatement("insert into users(email,firstName,lastName,password,gender,dob) values(?,?,?,?,?,?)");
	stmt.setString(1, email);
	stmt.setString(2, firstname);
	stmt.setString(3, lastname);
	stmt.setString(4, password);
	stmt.setString(5, gender);
	stmt.setString(6, dob);
	int rs = stmt.executeUpdate();
	System.out.println(con);
	System.out.println("srui");
	
	

    
	if(rs==1){
		JSONArray jsonArray = new JSONArray();
		
        
		
		
		
		obj = new JSONObject();
		    
		    
		    obj.put("statusCode",new Integer(200));
		    obj.put("msg","success");
		  
		    sr= obj.toString();
	
	}
	else
	{
         obj = new JSONObject();
	    
	    
	    obj.put("statusCode",new Integer(401));
	    obj.put("msg","Incorrect Username or password");
	  
	    sr= obj.toString();
	    
	}
	
	
	
	}



	catch(ClassNotFoundException e) {
		e.printStackTrace();
	}

	catch(SQLException e) {
		e.printStackTrace();
		obj = new JSONObject();
	    
	    
	    obj.put("statusCode",new Integer(400));
	    obj.put("msg","success");
	  
	    sr= obj.toString();
		
		return sr;
	}
	

	
	
		return sr;


}



}