import React, { useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SelectWrapper = () => {
    const [countries, setCountries] = React.useState([]);
    const [country, setCountry] = React.useState("");
    const [states, setStates] = React.useState([]);
    const [state, setState] = React.useState([]);


    useEffect(() => {
        fetch("https://countries.trevorblades.com/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                query {
                    countries {
                     name
                     code
                    }
                   }
                `
            })
        })
            .then(res => res.json())
            .then(data => { setCountries(data.data.countries) })
    }, [])

    useEffect(() => {
        fetch("https://countries.trevorblades.com/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                query getCities ($code: ID!){
                    country (code: $code) {
                    states {
                      name
                    }
                  }
                  }
                `,
                variables: { code: country }
            })
        })
            .then(res => res.json())
            .then(data => { setStates(data.data.country.states) })
            .catch(er => console.log("Error", er))
    }, [country])



    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };
    const handleChangeState = (event) => {
        setState(event.target.value);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth="true">
                    <InputLabel>Country</InputLabel>
                    <Select value={country} onChange={handleChangeCountry} label="country" displayEmpty="false">
                        {countries.map((countryObj, index) => (
                            <MenuItem value={countryObj.code} key={index}>
                                {countryObj.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth="true">
                    <InputLabel>State</InputLabel>
                    <Select value={state} onChange={handleChangeState} label="state" >
                        {country ? (states.map((state, index) => (
                            <MenuItem key={index} value={state.name}>{state.name}</MenuItem>
                        ))) : <MenuItem>Please choose your country</MenuItem> }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default SelectWrapper;