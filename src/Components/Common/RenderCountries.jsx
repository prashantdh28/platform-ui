const RenderCountries = ({ countries }) => {
    if (!countries || !countries.length > 0) {
        return null;
    }
    const MAX_NORMAL_COUNT = 3;

    const normalCountries = countries.slice(0, MAX_NORMAL_COUNT);
    const restCount = countries.length - MAX_NORMAL_COUNT;

    const normalCountryNames = normalCountries.map((country) => country.country);
    const restCountries = restCount > 0 ? `... ${restCount}+` : "";

    const formattedCountries = normalCountryNames.join(", ");

    return (
        <>
            {formattedCountries}
            <span
                style={{
                    color: "#0082F9",
                }}
            >
                {restCountries}
            </span>
        </>
    );
};

export default RenderCountries;
