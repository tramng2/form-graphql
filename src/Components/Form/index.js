import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../Button';
import { TextField, FormControl, InputLabel, Select, MenuItem, Container, Grid, Typography, makeStyles } from '@material-ui/core';
import gpl from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/client';


const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine: '',
  country: '',
  countryState: ''
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  phone: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    .required('Required'),
  addressLine: Yup.string()
    .required('Required'),
  country: Yup.string()
    .required('Required'),
  countryState: Yup.string()
    .required('Required')
});

const CountriesQuery = gpl`
  query {
    countries {
    name
    code
    }
  }
`

const StatesQuery = gpl` 
  query getCities ($code: ID!) {
    country (code: $code) {
    states {
      name
    }
  }
}`

const Form = props => {
  const classes = useStyles();
  const { loadingCountries, errorCountries, data } = useQuery(CountriesQuery);
  const [getCountryState, query] = useLazyQuery(StatesQuery);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit } = props;

  useEffect(() => {
    getCountryState({ variables: { code: values.country } })
  }, [values.country, getCountryState])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    Your details
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    error={touched.lastName && errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="email"
                    label="Email"
                    value={values.email}
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="phone"
                    label="Phone"
                    value={values.phone}
                    error={touched.phone && errors.phone}
                    helperText={touched.phone && errors.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Address
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="addressLine"
                    label="Address Line"
                    error={touched.addressLine && errors.addressLine}
                    helperText={touched.addressLine && errors.addressLine}
                    value={values.addressLine}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth="true" >
                    <InputLabel>Choose country</InputLabel>
                    <Select name="country" value={values.country} onChange={handleChange} label="Choose country" error={touched.country && errors.country} helperText={touched.country && errors.country}>
                      {data && data.countries ? data.countries.map((countryObj, index) => (
                        <MenuItem value={countryObj.code} key={index}>
                          {countryObj.name}
                        </MenuItem>
                      )) : null}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  {values.country && query && query.data && query.data.country ? (
                    query.data.country.states.length !== 0 ? (
                      <FormControl variant="outlined" fullWidth="true" onSe>
                        <InputLabel>Choose state</InputLabel>
                        <Select name="countryState" value={values.countryState} onChange={handleChange} label="ChooseState" error={touched.State && errors.State} helperText={touched.State && errors.State}>
                          {query.data.country.states.map((state, index) => (
                            <MenuItem value={state.name} key={index}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : <>
                      <FormControl variant="outlined" fullWidth="true" >
                        <InputLabel>Sorry, states are not available.</InputLabel>
                        <Select name="countryState" disabled>
                        </Select>
                      </FormControl>
                    </>
                  ) : (<>
                    <FormControl variant="outlined" fullWidth="true" >
                      <InputLabel>Please choose country first.</InputLabel>
                      <Select name="countryState" disabled>
                      </Select>
                    </FormControl>
                  </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button>
                    Submit Form
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

const WrappedBaseFrom = withFormik({
  validationSchema: (props) => {
    return FORM_VALIDATION;
  },
  mapPropsToValues: () => (INITIAL_FORM_STATE),
  handleSubmit: (values) => {
    console.log(values);
  },
})(Form);

export default WrappedBaseFrom;
