import React from 'react';

const InfoCard = ({ title, features, buttonText, iconClass, linkTo }) => {
  return (
    <div className="info-card">
      <div className="card-icon">
        <i className={iconClass}></i>
      </div>
      <h3>{title}</h3>
      <ul className="feature-list">
        {features.map((feature, index) => (
          <li key={index}>
            <i className="fas fa-circle-check"></i> {feature}
          </li>
        ))}
      </ul>
      <a href={linkTo} className="card-button">
        {buttonText}
      </a>
    </div>
  );
};

export default InfoCard;