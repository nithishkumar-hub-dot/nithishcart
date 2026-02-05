import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "welcome": "Welcome to NithishCart",
            "shop_now": "Shop Now",
            "categories": "Categories",
            "featured_products": "Featured Products",
            "cart": "Cart",
            "login": "Login"
        }
    },
    hi: {
        translation: {
            "welcome": "नीतीशकार्ट में आपका स्वागत है",
            "shop_now": "अभी खरीदें",
            "categories": "श्रेणियां",
            "featured_products": "विशेष उत्पाद",
            "cart": "कार्ट",
            "login": "लॉगिन"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
