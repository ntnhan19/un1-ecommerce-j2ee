package com.un1.ecommerce.exception;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.un1.ecommerce.dto.response.ErrorResponse;

import lombok.extern.slf4j.Slf4j;
import java.time.LocalDateTime;

@RestController
@Slf4j
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<ErrorResponse> handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        Object exception = request.getAttribute(RequestDispatcher.ERROR_EXCEPTION);
        
        int statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
        String message = "Internal Server Error";

        if (status != null) {
            statusCode = Integer.parseInt(status.toString());
            // Map common statuses to messages
            message = switch (statusCode) {
                case 404 -> "Endpoint not found";
                case 401 -> "Unauthorized access";
                case 403 -> "Access forbidden";
                case 400 -> "Bad Request";
                default -> "Server Error";
            };
        }

        log.error("Error occurred [Status: {}]: {} - Exception: {}", statusCode, message, exception);

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(statusCode)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(statusCode).body(errorResponse);
    }
}
