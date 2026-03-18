package com.un1.ecommerce.exception;

import com.un1.ecommerce.dto.ErrorResponse;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<ErrorResponse> handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        int statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
        String message = "Internal Server Error";

        if (status != null) {
            statusCode = Integer.parseInt(status.toString());
            if(statusCode == HttpStatus.NOT_FOUND.value()) {
                message = "Endpoint not found";
            } else if(statusCode == HttpStatus.UNAUTHORIZED.value()) {
                message = "Unauthorized access";
            } else if(statusCode == HttpStatus.FORBIDDEN.value()) {
                message = "Access forbidden";
            } else if(statusCode == HttpStatus.BAD_REQUEST.value()) {
                message = "Bad Request";
            }
        }

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(statusCode)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
                
        return ResponseEntity.status(statusCode).body(errorResponse);
    }
}
