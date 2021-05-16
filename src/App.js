import React from 'react';
import Header from './Components/Header';
import { Formik, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import TextField from './Components/FormsUI/TextField'
import Select from './Components/FormsUI/Select'


const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  }
}))

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine: '',
  country: '',
  region: '',
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
  region: Yup.string()
    .required('Required'),
});

function App() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                console.log(values)
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      Your details
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="firstname"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="lastname"
                      label="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="phone"
                      label="Phone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="addressLine"
                      label="Address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select />
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  )

}

export default App;
