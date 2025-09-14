// src/components/tourist/SafetyScore.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import hook

const SafetyScore = ({ score }) => {
  const { t } = useTranslation(); // Initialize hook
  // ... (getScoreColor and scoreStyle remain the same) ...
  const getScoreColor = () => {
    if (score > 75) return 'var(--success-color)';
    if (score > 40) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  const scoreStyle = {
    background: `conic-gradient(${getScoreColor()} ${score * 3.6}deg, #ededed 0deg)`
  };

  return (
    <div className="safety-score-card">
      <h4>{t('safetyScoreTitle')}</h4>
      <div className="score-circle" style={scoreStyle}>
        <div className="score-value">{score}</div>
      </div>
      <p>{t('safetyScoreDesc')}</p>
    </div>
  );
};

export default SafetyScore;