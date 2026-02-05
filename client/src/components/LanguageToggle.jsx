import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिंदी' },
        // Add more languages as per requirements
    ];

    return (
        <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-nithish-orange transition-colors">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium uppercase">{i18n.language.split('-')[0]}</span>
            </button>

            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-orange-50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-nithish-orange transition-colors"
                    >
                        {lang.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageToggle;
