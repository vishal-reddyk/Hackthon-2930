// src/components/Timetable.jsx
import React, { useState, useEffect } from 'react';
import './Timetable.css';

const Timetable = () => {
  const [events, setEvents] = useState(() => {
    try {
      const storedEvents = localStorage.getItem('timetableEvents');
      return storedEvents ? JSON.parse(storedEvents) : [];
    } catch (e) {
      console.error("Could not load timetable events from Local Storage", e);
      return [];
    }
  });
  const [newEvent, setNewEvent] = useState({
    name: '',
    day: 'Monday',
    time: '09:00',
    description: ''
  });
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('timetableEvents', JSON.stringify(events));
    } catch (e) {
      console.error("Could not save timetable events to Local Storage", e);
    }
  }, [events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEventId !== null) {
      setEvents(events.map(event =>
        event.id === editingEventId ? { ...newEvent, id: editingEventId } : event
      ));
      setEditingEventId(null);
    } else {
      setEvents(prevEvents => [...prevEvents, { ...newEvent, id: Date.now() }]);
    }
    setNewEvent({
      name: '',
      day: 'Monday',
      time: '09:00',
      description: ''
    });
  };

  const handleEdit = (event) => {
    setNewEvent({ ...event });
    setEditingEventId(event.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="timetable-container">
      <h2>Create Your Timetable</h2>
      <form onSubmit={handleSubmit} className="timetable-form">
        <div className="form-group">
          <label>Event Name</label>
          <input type="text" name="name" value={newEvent.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Day</label>
          <select name="day" value={newEvent.day} onChange={handleChange}>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Time</label>
          <input type="time" name="time" value={newEvent.time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={newEvent.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="timetable-submit-button">
          {editingEventId !== null ? 'Update Event' : 'Add Event'}
        </button>
      </form>
      
      {daysOfWeek.map(day => (
        <div key={day} className="day-schedule">
          <h3>{day}</h3>
          {events.filter(event => event.day === day).length > 0 ? (
            <ul className="event-list">
              {events.filter(event => event.day === day).sort((a, b) => a.time.localeCompare(b.time)).map(event => (
                <li key={event.id} className="event-item">
                  <div className="event-details">
                    <h4>{event.name} ({event.time})</h4>
                    <p>{event.description}</p>
                  </div>
                  <div className="event-actions">
                    <button className="edit-button" onClick={() => handleEdit(event)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(event.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-events">No events scheduled for this day.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timetable;