import "server-only";
import { Currency } from "@/types/types";

const currencyRateCalculator = async (from: Currency, to: Currency, amount: number) => {

    const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`, {
        cache: "force-cache"
    })

    if (!response.ok) {
        throw new Error("Error when trying to fetch the rate");
    }

    const data = await response.json();
    const result = amount * data.rates[to].toFixed(2);

    return result;
}

export default currencyRateCalculator;