package com.un1.ecommerce.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.un1.ecommerce.dto.ColorDto;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

/**
 * Converts List<ColorDto> ↔ JSON string for storage in a single TEXT column.
 *
 * Example stored value:
 * [{"name":"Trắng","hex":"#FFFFFF"},{"name":"Đen","hex":"#000000"}]
 */
@Converter
public class ColorDtoListConverter implements AttributeConverter<List<ColorDto>, String> {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<ColorDto> colors) {
        if (colors == null || colors.isEmpty())
            return "[]";
        try {
            return MAPPER.writeValueAsString(colors);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Failed to serialize colors to JSON", e);
        }
    }

    @Override
    public List<ColorDto> convertToEntityAttribute(String json) {
        if (json == null || json.isBlank() || json.equals("[]"))
            return new ArrayList<>();
        try {
            return MAPPER.readValue(json, new TypeReference<List<ColorDto>>() {
            });
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Failed to deserialize colors from JSON: " + json, e);
        }
    }
}