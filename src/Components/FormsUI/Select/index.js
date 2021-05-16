import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CountryRegionData } from "react-country-region-selector";

const SelectWrapper = ({
    name,
    options,
    ...otherProps
}) => {

    // const configSelect = {
    //     select: true,
    //     variant: 'outlined',
    //     fullWidth: true,
    // };

    const [country, setCountry] = React.useState("");
    const [regions, setRegions] = React.useState([]);
    const [city, setCity] = React.useState("");

    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
        setRegions(getRegions(event.target.value));
    };
    const handleChangeCity = (event) => {
        console.log(event.target.value)
        setCity(event.target.value);
    };

    const getRegions = (country) => {
        if (!country) {
            console.log("No country yet");
            return []
        } else {
            let [cityArr] = CountryRegionData.filter((el) => el[0] === country);
            if (cityArr) {
                return cityArr[2].split("|").map((regionPair) => {
                    let [regionName, regionShortCode = null] = regionPair.split("~");
                    return regionName;
                });
            }
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth= "true">
                    <InputLabel>Country</InputLabel>
                    <Select value={country} onChange={handleChangeCountry} label="country">
                        {CountryRegionData.map((countryArr, index) => (
                            <MenuItem value={countryArr[0]} key={index}>
                                {countryArr[0]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                {country ? (
                    <FormControl variant="outlined" fullWidth= "true">
                        <InputLabel>City</InputLabel>
                        <Select value={city} onChange={handleChangeCity} label="city">
                            {regions.map((city, index) => (
                                <MenuItem key={index} value={city}>{city}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : null}
            </Grid>
        </Grid>

    );
};

export default SelectWrapper;