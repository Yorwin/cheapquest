import "server-only"

const DEEPL_API_KEY = "decfa80b-e4fd-4bef-a672-27d5a6d46530:fx";

type TranslatorFunction = (text: string, method?: string) => Promise<string>;

export const Translator: TranslatorFunction = async (text, method = "POST") => {
    try {
        const response = await fetch("https://api-free.deepl.com/v2/translate", {
            method: method,
            headers: {
                "Authorization": `DeepL-Auth-Key ${DEEPL_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: [text],
                source_lang: "EN",
                target_lang: "ES",
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error en DeepL:", data);
        }

        return data.translations[0].text;
    } catch {
        return text;
    }
};

export const arrayTranslation = async (e: any) => {
    const translation = await Promise.all(
        e.map(async (e: any) => {
            const genresTranslation = await Translator(e.name);
            return genresTranslation;
        })
    );

    return translation;
};