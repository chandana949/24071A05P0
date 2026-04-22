package com.example;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class DashboardServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // Get Session safely
        HttpSession session = request.getSession(false);

        if (session == null) {
            response.sendRedirect("index.html");
            return;
        }

        String user = (String) session.getAttribute("user");

        // Get Cookies
        Cookie[] cookies = request.getCookies();
        String cookieUser = "Not Found";

        if (cookies != null) {
            for (Cookie c : cookies) {
                if (c.getName().equals("username")) {
                    cookieUser = c.getValue();
                }
            }
        }

        // Output
        out.println("<h2>Welcome " + user + "</h2>");
        out.println("<h3>Session User: " + user + "</h3>");
        out.println("<h3>Cookie User: " + cookieUser + "</h3>");
        out.println("<a href='logout'>Logout</a>");
    }
}