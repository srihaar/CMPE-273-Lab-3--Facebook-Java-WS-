package com.login;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.simple.JSONObject;

public class Profile {

@SuppressWarnings("unchecked")
public String getProfile(String uEmail,String fEmail){
	
	String dbUrl = "jdbc:mysql://localhost:3306/test";
	
	 System.out.println(uEmail);
	 System.out.println(fEmail);
	
	
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "srihaar");
	PreparedStatement stmt = con.prepareStatement("select u.*,f.* from users u LEFT JOIN friends f On u.email = f.email1 where f.email1=? and f.email2=?");
	stmt.setString(1, fEmail);
	stmt.setString(2, uEmail);
	ResultSet rs = stmt.executeQuery();
	
	
	PreparedStatement stmt2 = con.prepareStatement("select u.*,f.* from users u LEFT JOIN friends f On u.email = f.email2 where f.email1=? and f.email2=?");
	stmt2.setString(1, uEmail);
	stmt2.setString(2, fEmail);
	ResultSet rs2 = stmt2.executeQuery();
	
	
	
	if(rs.next()){
		System.out.println("foun result set");
		JSONArray jsonArray = new JSONArray();
		
	         int total_rows = rs.getMetaData().getColumnCount();
	         JSONObject obj1 = new JSONObject();
	         for (int i = 0; i < total_rows; i++) {
	             obj1.put(rs.getMetaData().getColumnLabel(i + 1)
	                     .toLowerCase(), rs.getObject(i + 1));
	             System.out.println("in loop rows");
	         }
	         jsonArray.put(obj1);
             System.out.println("before status");
	         JSONObject   obj = new JSONObject();
			    obj.put("statusCode",new Integer(200));
			    obj.put("profile",jsonArray);
			    System.out.println("before status");
	         int status = rs.getInt("status");
	 		System.out.println(status);
	 		if(status==0){
	 		obj.put("status", "waiting2");
	 		System.out.println("status");
	 		} 
	 		else {
	 			obj.put("status", "friends");
	 		}
	 		
	 		sr= obj.toString();
	 	    
	     }
		 
		 
	else if(rs2.next()){
		
		System.out.println("foun result set");
		JSONArray jsonArray2 = new JSONArray();
		
	         int total_rows = rs2.getMetaData().getColumnCount();
	         JSONObject obj4 = new JSONObject();
	         for (int i = 0; i < total_rows; i++) {
	             obj4.put(rs2.getMetaData().getColumnLabel(i + 1)
	                     .toLowerCase(), rs2.getObject(i + 1));
	             System.out.println("in loop rows");
	         }
	         jsonArray2.put(obj4);
             System.out.println("before status");
	         JSONObject   obj5 = new JSONObject();
			    obj5.put("statusCode",new Integer(200));
			    obj5.put("profile",jsonArray2);
			    System.out.println("before status");
	         int status = rs2.getInt("status");
	 		System.out.println(status);
	 		if(status==0){
	 		obj5.put("status", "waiting1");
	 		System.out.println("status");
	 		} 
	 		else {
	 			obj5.put("status", "friends");
	 		}
	 		
	 		sr= obj5.toString();
		
	}
		  
	     
		
	
		    
	else{
		
		PreparedStatement stmt1 = con.prepareStatement("select * from users where email=?");
		stmt1.setString(1, fEmail);
		
		ResultSet rs1 = stmt1.executeQuery();
		JSONObject obj2 =  new JSONObject();
		
		JSONArray jsonArray1 = new JSONArray();
		while (rs1.next()) {
	         int total_rows = rs1.getMetaData().getColumnCount();
	         JSONObject obj3 = new JSONObject();
	         for (int i = 0; i < total_rows; i++) {
	             obj3.put(rs1.getMetaData().getColumnLabel(i + 1)
	                     .toLowerCase(), rs1.getObject(i + 1));
	             
	         }
	         jsonArray1.put(obj3);
	     }
		
		obj2.put("statusCode",new Integer(200));
		obj2.put("profile",jsonArray1);
		if(uEmail.equals(fEmail)){
		obj2.put("status", "25");
		
		}
		else{
		obj2.put("status", "nothing");
		}
		sr= obj2.toString();
		
		
		
		
		
		
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

public String getFriends(String email){

	String dbUrl = "jdbc:mysql://localhost:3306/test";
	System.out.println(email);
	 
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "srihaar");
	PreparedStatement stmt = con.prepareStatement("select u.* from users u   JOIN friends f On u.email = f.email1 where email2=? and status=?");
	stmt.setString(1, email);
	stmt.setInt(2,1);
	ResultSet rs = stmt.executeQuery();
	
	PreparedStatement stmt1 = con.prepareStatement("select u.* from users u   JOIN friends f On u.email = f.email2 where email1=? and status=?");
	stmt1.setString(1, email);
	stmt1.setInt(2,1);
	ResultSet rs1 = stmt1.executeQuery();
	
	
	
	
	
	JSONArray jsonArray = new JSONArray();
	 while (rs.next()) {
         int total_rows = rs.getMetaData().getColumnCount();
         JSONObject obj1 = new JSONObject();
         for (int i = 0; i < total_rows; i++) {
             obj1.put(rs.getMetaData().getColumnLabel(i + 1)
                     .toLowerCase(), rs.getObject(i + 1));
             
         }
         jsonArray.put(obj1);
     }
	 
	 JSONArray jsonArray1 = new JSONArray();
	 while (rs1.next()) {
         System.out.println("rs repeat");
		 int total_rows = rs1.getMetaData().getColumnCount();
         System.out.println("number of rows is"+total_rows);
         JSONObject obj2 = new JSONObject();
         for (int i = 1; i <= total_rows; i++) {
             obj2.put(rs1.getMetaData().getColumnLabel(i)
                     .toLowerCase(), rs1.getObject(i));
             System.out.println(obj2);
             
         }
         jsonArray1.put(obj2);
     }
	
     
    
	
            obj = new JSONObject();
		    obj.put("statusCode",new Integer(200));
		    obj.put("friends1",jsonArray);
		    obj.put("friends2",jsonArray1);
		    
		    sr= obj.toString();
		    con.close();
	}
	
	
	catch(ClassNotFoundException e) {
		e.printStackTrace();
	}

	catch(SQLException e) {
		e.printStackTrace();
	}
	
	
		return sr;



}


}
