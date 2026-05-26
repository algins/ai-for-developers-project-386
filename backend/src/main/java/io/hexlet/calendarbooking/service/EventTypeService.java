package io.hexlet.calendarbooking.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.hexlet.calendarbooking.dto.EventTypeCreateDTO;
import io.hexlet.calendarbooking.dto.EventTypeDTO;
import io.hexlet.calendarbooking.mapper.EventTypeMapper;
import io.hexlet.calendarbooking.model.EventType;
import io.hexlet.calendarbooking.repository.EventTypeRepository;

@Service
public class EventTypeService {

    @Autowired
    private EventTypeRepository eventTypeRepository;

    @Autowired
    private EventTypeMapper eventTypeMapper;

    public EventTypeDTO createEventType(EventTypeCreateDTO dto) {
        var eventType = eventTypeMapper.map(dto);
        return eventTypeMapper.map(eventTypeRepository.save(eventType));
    }

    public List<EventTypeDTO> listEventTypes() {
        var eventTypes = eventTypeRepository.findAll().stream()
            .sorted(Comparator.comparing(EventType::getName, String.CASE_INSENSITIVE_ORDER))
            .map(eventTypeMapper::map)
            .toList();

        return eventTypes;
    }
}
