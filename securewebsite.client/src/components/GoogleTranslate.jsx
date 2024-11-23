import React, { useEffect } from "react";

const GoogleTranslate = () => {
    useEffect(() => {
        if (!window.googleTranslateElementInit) {
            const script = document.createElement("script");
            script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);

            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    { pageLanguage: "en" },
                    "google_translate_element"
                );
            };
        }
    }, []);

    return <div id="google_translate_element" className="google-translate"></div>;
};

export default GoogleTranslate;
