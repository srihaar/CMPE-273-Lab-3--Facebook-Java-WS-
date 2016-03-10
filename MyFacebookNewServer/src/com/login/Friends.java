package com.login;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.simple.JSONObject;

public class Friends {

public String getPendingRequests(String email){
	
	String dbUrl = "jdbc:mysql://localhost:3306/test";
	System.out.println(email);
	 
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "srihaar");
	PreparedStatement stmt = con.prepareStatement("select u.email,u.firstName,u.lastName from users u JOIN friends f ON u.email=f.email1 where f.email2= ? and f.status=?");
	stmt.setString(1, email);
	stmt.setInt(2, 0);
	ResultSet rs = stmt.executeQuery();
	
	
	
	
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
	 
	 
		  
		    
		    PreparedStatement stmt1 = con.prepareStatement("select u.email,u.firstName,u.lastName from users u JOIN friends f ON u.email=f.email2 where f.email1= ? and f.status=?");
			stmt1.setString(1, email);
			stmt1.setInt(2, 1);
			ResultSet rs1 = stmt1.executeQuery();
			
			
			
			
			JSONArray jsonArray1 = new JSONArray();
			 while (rs1.next()) {
		         int total_rows = rs1.getMetaData().getColumnCount();
		         JSONObject obj1 = new JSONObject();
		         for (int i = 0; i < total_rows; i++) {
		             obj1.put(rs1.getMetaData().getColumnLabel(i + 1)
		                     .toLowerCase(), rs1.getObject(i + 1));
		             
		         }
		         jsonArray1.put(obj1);
		     }
			 
			 
		     
		    
			System.out.println(jsonArray);
		            obj = new JSONObject();
				    obj.put("statusCode",new Integer(200));
				    obj.put("pendingRequests",jsonArray);
				    obj.put("notifications",jsonArray1);
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




public String acceptRequest(String uEmail, String fEmail){
	
	String dbUrl = "jdbc:mysql://localhost:3306/test";
	
	 
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "srihaar");
	PreparedStatement stmt = con.prepareStatement("update friends set status=? where email1=? and email2=?");
	stmt.setInt(1, 1);
	stmt.setString(2, fEmail);
	stmt.setString(3, uEmail);
	int rs = stmt.executeUpdate();
	
	
	
	if(rs==1){
	
            obj = new JSONObject();
		    obj.put("statusCode",new Integer(200));
		    
		    
		    sr= obj.toString();
		    con.close();
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

public String addFriend(String uEmail, String fEmail){
	
	String dbUrl = "jdbc:mysql://localhost:3306/test";
	
	 
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "srihaar");
	PreparedStatement stmt = con.prepareStatement("insert into friends values(?,?,?)");
	
	stmt.setString(1, uEmail);
	stmt.setString(2, fEmail);
	stmt.setInt(3, 0);
	int rs = stmt.executeUpdate();
	
	
	
	if(rs==1){
	
            obj = new JSONObject();
		    obj.put("statusCode",new Integer(200));
		    
		    
		    sr= obj.toString();
		    con.close();
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


}
