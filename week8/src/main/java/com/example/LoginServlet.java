package com.example;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String user = request.getParameter("username");

        // Create HTTP Session
        HttpSession session = request.getSession();
        session.setAttribute("user", user);

        // Create Cookie
        Cookie cookie = new Cookie("username", user);
        cookie.setMaxAge(60 * 60); // 1 hour
        response.addCookie(cookie);

        // Redirect to Dashboard
        response.sendRedirect("dashboard");
    }
}
