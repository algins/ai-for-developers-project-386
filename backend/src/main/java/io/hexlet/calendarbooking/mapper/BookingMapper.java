package io.hexlet.calendarbooking.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import io.hexlet.calendarbooking.dto.BookingCreateDTO;
import io.hexlet.calendarbooking.dto.BookingDTO;
import io.hexlet.calendarbooking.model.Booking;

@Mapper(
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    componentModel = MappingConstants.ComponentModel.SPRING,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class BookingMapper {
    public abstract Booking map(BookingCreateDTO dto);
    public abstract BookingDTO map(Booking model);
}