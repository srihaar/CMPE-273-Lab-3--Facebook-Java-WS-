package com.login;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.simple.JSONObject;

public class Search {

public String getSearchResults(String searchTerm){
	
	String dbUrl = "jdbc:mysql://localhost:3306/test";
	System.out.println(searchTerm);
	 
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "srihaar");
	PreparedStatement stmt = con.prepareStatement("select email,firstName,lastName from users where firstName like ? or lastName like ?");
	stmt.setString(1, "%"+searchTerm+"%");
	stmt.setString(2, "%"+searchTerm+"%");
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
	 
	 
     
    
	System.out.println(jsonArray);
            obj = new JSONObject();
		    obj.put("statusCode",new Integer(200));
		    obj.put("userResults",jsonArray);
		    
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
