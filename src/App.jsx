import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Calendar from './components/calendar/Calendar'
import EventForm from './components/eventForm/EventForm'
import EventList from './components/eventList/EventList'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import About from './pages/About'
import Contact from './pages/Contact'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Conference',
      date: new Date(2023, 11, 15),
      location: 'Convention Center',
      description: 'Annual technology conference with industry leaders',
      attendees: 150
    },
    {
      id: 2,
      title: 'Product Launch',
      date: new Date(2023, 11, 20),
      location: 'Downtown Theater',
      description: 'New product line reveal and demonstrations',
      attendees: 75
    },
    {
      id: 3,
      title: 'Team Building Event',
      date: new Date(2023, 11, 28),
      location: 'City Park',
      description: 'Annual team building and networking event',
      attendees: 45
    },
    {
      id: 4,
      title: 'Workshop by Chanchal Rao',
      date: new Date(2024, 3, 12),
      location: 'To be determined',
      description: 'Interactive workshop focusing on leadership and innovation',
      attendees: 25 
    }
  ]);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventSubmit = (eventData) => {
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      date: selectedDate
    };
    
    setEvents([...events, newEvent]);
    setBookingSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false);
    }, 3000);
  };

  const MainBookingSystem = () => (
    <main className="container main-content booking-page">
      {/* Decorative Shapes for Booking Page */}
      <div className="booking-shapes">
        <div className="booking-shape booking-shape-1"></div>
        <div className="booking-shape booking-shape-2"></div>
        <div className="booking-shape booking-shape-3"></div>
        <div className="booking-shape booking-shape-4"></div>
        <div className="dots-pattern"></div>
      </div>
      
      {/* Additional wavy shapes */}
      <div className="wavy-shapes">
        <div className="wavy-shape wavy-shape-1"></div>
        <div className="wavy-shape wavy-shape-2"></div>
      </div>
      
      <div className="page">
        <h1 className="page-title">Event Booking System</h1>
        
        <div className="booking-section">
          <div className="calendar-container">
            <h2>Select Event Date</h2>
            <Calendar 
              events={events} 
              selectedDate={selectedDate} 
              onDateSelect={handleDateSelect} 
            />
          </div>
          
          <div className="form-container">
            <h2>Book Your Event</h2>
            {bookingSuccess ? (
              <div className="success-message">
                <p>Your event has been successfully booked!</p>
              </div>
            ) : (
              <EventForm 
                onSubmit={handleEventSubmit} 
                selectedDate={selectedDate} 
              />
            )}
          </div>
        </div>
        
        <div className="events-section">
          <h2>Upcoming Events</h2>
          <EventList events={events} />
        </div>
      </div>
    </main>
  );
  
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <div className="page-transition">
            {/* Background Decorative Shapes */}
            <div className="bg-shape bg-shape-1"></div>
            <div className="bg-shape bg-shape-2"></div>
            <div className="bg-shape bg-shape-3"></div>
            <div className="bg-shape bg-shape-4"></div>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events events={events} />} />
              <Route path="/booking" element={<MainBookingSystem />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
