import React from 'react';

// שימי לב שקיבלנו את cars בתוך הסוגריים של הפונקציה
const CarList = ({ cars }) => {
  return (
    <div style={{ padding: '4vh 4vw', direction: 'rtl' }}>
      <h1 style={{ color: '#7879F1', marginBottom: '3vh' }}>רכבים זמינים להשכרה</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '2vw' 
      }}>
        {/* בדיקה אם יש רכבים ברשימה */}
        {cars && cars.length > 0 ? (
          cars.map(car => (
            <div key={car.id} style={{
              border: '2px solid #EF5DA8', // הוורוד המקורי שלך
              borderRadius: '12px',
              padding: '2vh',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#7879F1' }}>{car.brand} {car.model}</h3>
              <p>שנה: {car.year}</p>
              <p style={{ fontWeight: 'bold' }}>₪{car.price_per_day} ליום</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#666' }}>טוען נתונים או שאין רכבים להצגה...</p>
        )}
      </div>
    </div>
  );
};

export default CarList;