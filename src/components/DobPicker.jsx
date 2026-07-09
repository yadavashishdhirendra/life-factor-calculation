import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

function DobPicker({ selectedDate, error, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleDateChange(date) {
    onChange(date);
    setIsOpen(false);
  }

  return (
    <section className="dob-card">
      <div>
        <p className="section-kicker">DOB Input</p>
        <h2>Select birth date</h2>
        <p>Values auto-generate instantly. Odd days favor Mother, even days favor Father.</p>
      </div>

      <label className="date-field">
        <span>Date of Birth</span>
        <div className="input-wrap">
          <CalendarDays size={19} />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            maxDate={new Date()}
            open={isOpen}
            onInputClick={() => setIsOpen(true)}
            onClickOutside={() => setIsOpen(false)}
            onCalendarClose={() => setIsOpen(false)}
            shouldCloseOnSelect
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Select date of birth"
            dateFormat="dd MMMM yyyy"
            className="date-picker-input"
          />
        </div>
      </label>

      {error && <p className="error-message">{error}</p>}
    </section>
  );
}

export default DobPicker;
