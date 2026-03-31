package Servlet1;

import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Servlet1 extends HttpServlet {

    // Display form
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html><body>");
        out.println("<h1>Add Student</h1>");

        out.println("<form method='post' action='Servlet1'>");
        out.println("Roll Number: <input type='number' name='roll' required><br><br>");
        out.println("Name: <input type='text' name='name' required><br><br>");
        out.println("Email: <input type='email' name='email' required><br><br>");
        out.println("Marks: <input type='number' name='marks' required><br><br>");
        out.println("<input type='submit' value='Add Student'>");
        out.println("</form>");

        out.println("</body></html>");
    }

    // Handle form submission + DB insert + DISPLAY TABLE
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String roll = request.getParameter("roll");
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String marks = request.getParameter("marks");

        try {
            // Load driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect DB
            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/csestudents",
                "root",
                "admin"
            );

            // INSERT
            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO student (roll, name, email, marks) VALUES (?, ?, ?, ?)"
            );

            ps.setInt(1, Integer.parseInt(roll));
            ps.setString(2, name);
            ps.setString(3, email);
            ps.setInt(4, Integer.parseInt(marks));

            ps.executeUpdate();

            // SELECT ALL RECORDS
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM student");

            // DISPLAY TABLE
            out.println("<html><body>");
            out.println("<h2>Student Records</h2>");

            out.println("<table border='1' cellpadding='10' style='border-collapse:collapse;'>");
            out.println("<tr><th>Roll</th><th>Name</th><th>Email</th><th>Marks</th></tr>");

            while (rs.next()) {
                out.println("<tr>");
                out.println("<td>" + rs.getInt("roll") + "</td>");
                out.println("<td>" + rs.getString("name") + "</td>");
                out.println("<td>" + rs.getString("email") + "</td>");
                out.println("<td>" + rs.getInt("marks") + "</td>");
                out.println("</tr>");
            }

            out.println("</table>");

            out.println("<br><a href='Servlet1'>Add Another Student</a>");
            out.println("</body></html>");

            con.close();

        } catch (Exception e) {
            out.println("<h3 style='color:red;'>Database Error: " + e.getMessage() + "</h3>");
        }
    }
}