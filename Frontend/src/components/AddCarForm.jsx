import React, { useState } from 'react';

const AddCarForm = ({ onCarAdded }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price_per_day: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const newCar = await response.json();
        onCarAdded(newCar); // עדכון הרשימה במסך ללא רענון
        setFormData({ brand: '', model: '', year: '', price_per_day: '' });
      }
    } catch (err) {
      console.error("Error adding car:", err);
    }
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '1vh',
    margin: '1vh 0',
    borderRadius: '8px',
    border: '1px solid #7879F1',
    fontSize: '1rem'
  };

  return (
    <div style={{ 
      padding: '3vh', 
      border: '2px solid #EF5DA8', 
      borderRadius: '15px', 
      maxWidth: '400px',
      margin: '2vh auto',
      direction: 'rtl'
    }}>
      <h3 style={{ color: '#7879F1', textAlign: 'center' }}>הוספת רכב חדש</h3>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} placeholder="יצרן" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required />
        <input style={inputStyle} placeholder="דגם" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} required />
        <input style={inputStyle} type="number" placeholder="שנה" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required />
        <input style={inputStyle} type="number" placeholder="מחיר ליום" value={formData.price_per_day} onChange={e => setFormData({...formData, price_per_day: e.target.value})} required />
        <button type="submit" style={{
          width: '100%',
          padding: '1.5vh',
          backgroundColor: '#EF5DA8',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>הוסף רכב</button>
      </form>
    </div>
  );
};

export default AddCarForm;