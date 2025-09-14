// src/components/common/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="hi">हिन्दी (Hindi)</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;