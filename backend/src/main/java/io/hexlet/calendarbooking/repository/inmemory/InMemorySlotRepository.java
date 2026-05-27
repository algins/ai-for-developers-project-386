package io.hexlet.calendarbooking.repository.inmemory;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Repository;

import io.hexlet.calendarbooking.model.Slot;
import io.hexlet.calendarbooking.repository.SlotRepository;

@Repository
public class InMemorySlotRepository implements SlotRepository {
    private static final LocalTime WORK_DAY_START = LocalTime.of(9, 0);
    private static final LocalTime WORK_DAY_END = LocalTime.of(17, 0);
    private static final Duration SLOT_DURATION = Duration.ofMinutes(30);

    @Override
    public List<Slot> findAvailable(Instant fromInclusive, Instant toExclusive) {
        var availableSlots = new ArrayList<Slot>();

        var firstDay = fromInclusive.atZone(ZoneOffset.UTC).toLocalDate();
        var lastDay = toExclusive.atZone(ZoneOffset.UTC).toLocalDate();

        for (var day = firstDay; !day.isAfter(lastDay); day = day.plusDays(1)) {
            var workdayStart = day.atTime(WORK_DAY_START).toInstant(ZoneOffset.UTC);
            var workdayEnd = day.atTime(WORK_DAY_END).toInstant(ZoneOffset.UTC);

            for (
                var slotStart = workdayStart;
                !slotStart.plus(SLOT_DURATION).isAfter(workdayEnd);
                slotStart = slotStart.plus(SLOT_DURATION)
            ) {
                if (slotStart.isBefore(fromInclusive) || !slotStart.isBefore(toExclusive)) {
                    continue;
                }

                var slotEnd = slotStart.plus(SLOT_DURATION);

                if (slotEnd.isAfter(toExclusive)) {
                    continue;
                }

                availableSlots.add(new Slot(slotStart, slotEnd, true));
            }
        }

        availableSlots.sort(Comparator.comparing(Slot::getStartTime));
        return availableSlots;
    }
}
