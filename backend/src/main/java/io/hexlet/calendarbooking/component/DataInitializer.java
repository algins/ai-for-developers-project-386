package io.hexlet.calendarbooking.component;

import java.util.UUID;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import io.hexlet.calendarbooking.model.EventType;
import io.hexlet.calendarbooking.repository.EventTypeRepository;

@Component
public class DataInitializer implements ApplicationRunner {
    private final EventTypeRepository eventTypeRepository;

    public DataInitializer(EventTypeRepository eventTypeRepository) {
        this.eventTypeRepository = eventTypeRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        eventTypeRepository.save(new EventType(
            UUID.fromString("5e2cb43b-a9e0-4dda-a09f-040f11366549"),
                "Intro Call",
                "A short introduction call to discuss goals and context.",
                30
        ));

        eventTypeRepository.save(new EventType(
            UUID.fromString("977bd0fe-442e-4e9e-9150-b2356f137f80"),
                "Architecture Session",
                "A deep dive session for architecture and implementation decisions.",
                60
        ));
    }
}
