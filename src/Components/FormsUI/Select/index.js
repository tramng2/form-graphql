import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SelectWrapper = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("");
    const [states, setStates] = useState([]);
    const [state, setState] = useState([]);

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
            .then(data => {
                setStates(data.data.country.states)
            })
            .catch(er => console.log("Error", er))
    }, [country, states.length])

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
                    <InputLabel>Choose country</InputLabel>
                    <Select value={country} onChange={handleChangeCountry} label="Choose country">
                        {countries.map((countryObj, index) => (
                            <MenuItem value={countryObj.code} key={index}>
                                {countryObj.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth="true" >
                    {country && states ? (
                        states.length !== 0 ? (
                            <>
                                <InputLabel>Choose state</InputLabel>
                                <Select value={state} onChange={handleChangeState} label="Choose state">
                                    {states.map((state, index) => (
                                        <MenuItem value={state.name} key={index}>
                                            {state.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </>
                        ) : <>
                            <InputLabel>Sorry, states are not available.</InputLabel>
                            <Select>
                            </Select>
                        </>
                    ) : (<>
                        <InputLabel>Sorry, please choose country first.</InputLabel>
                        <Select>
                        </Select>
                    </>
                    )}
                </FormControl>
            </Grid>
        </Grid>
    );
}
export default SelectWrapper;