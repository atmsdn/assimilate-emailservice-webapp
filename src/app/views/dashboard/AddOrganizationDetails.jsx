import { Typography, Grid, TextField, IconButton, Box, Card, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import "../../styles/addOrganization.scss";
import "../../styles/reactToastify.scss"
import { ToastContainer, toast } from 'react-toastify';
import { addressLength, emailValidator, mobileCharLength, nameCharLength, numberValidator, validateDomain, validateHost, validatePort, validateUrl } from '../../utils/constant';
import { LoadingButton } from '@mui/lab';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const AddOrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organizationDetails, setOrganizationDetails] = useState();
  console.log(organizationDetails, "....")
  const [userValue, setUserValue] = useState({
    name: "",
    contactNo: '',
    username: '',
    url: '',
    emailId: '',
    address: '',
    domain: '',
    host: '',
    port: '',
    password: ''
  });
  const [userValueError, setUserValueError] = useState({
    username: '',
    name: "",
    contactNo: '',
    url: '',
    emailId: '',
    address: '',
    domain: '',
    host: '',
    port: '',
    password: ''
  });

  const onOrganizationChange = (e, name) => {
    const value = e.target.value;
    const startsWithSpace = /^\s/.test(value);
    const isValidValue = !startsWithSpace;
    setUserValue({
      ...userValue,
      [name]: isValidValue ? value : userValue[name],
    });
    setUserValueError({
      ...userValueError,
      [name]: startsWithSpace ? '*Organization name should not start with a space' : '',
    });
  };
  
  const onUserNameChange = (e, name) => {
    const value = e.target.value;
    const startsWithSpace = /^\s/.test(value);
    const isValidValue = !startsWithSpace;
    setUserValue({
      ...userValue,
      [name]: isValidValue ? value : userValue[name],
    });
    setUserValueError({
      ...userValueError,
      [name]: startsWithSpace ? '*User name should not start with a space' : '',
    });
  }

  const onAddressChange = (e, name) => {
    const value = e.target.value;
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({ ...userValueError, [name]: "" })
  }
  const onMobileNumberChange = (e, name, regex) => {
    const value = e.target.value;
    const isValidMobileNumber = numberValidator(value);
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({ ...userValueError, contactNo: isValidMobileNumber ? '' : '*Invalid mobile number format' });
  }

  const onEmailChange = (e, name) => {
    const value = e.target.value;
    const isValidEmail = emailValidator(value);
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({ ...userValueError, emailId: isValidEmail ? '' : '*Invalid email format' });
  }
  const onWebsiteLinkChange = (e, name) => {
    const value = e.target.value;
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({ ...userValueError, [name]: "" })
  }
  const onUrlChange = (e, name) => {
    const value = e.target.value;
    const isValidUrl = validateUrl(value);
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({ ...userValueError, [name]: isValidUrl ? '' : '*Invalid URL format' });
  };

  const onDomainChange = (e, name) => {
    const value = e.target.value;
    const isValidDomain = validateDomain(value);
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({ ...userValueError, [name]: isValidDomain ? '' : '*Invalid domain format' });
  };

  const onHostChange = (e, name) => {
    const value = e.target.value;
    const isValidHost = validateHost(value);
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({ ...userValueError, [name]: isValidHost ? '' : '*Invalid host format' });
  };

  const onPortChange = (e, name) => {
    const value = e.target.value;
    const isValidPort = /^\d{3}$/.test(value);
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({
      ...userValueError,
      [name]: isValidPort ? '' : '*Invalid port format',
    });
  };

  const onPasswordChange = (e, name) => {
    const value = e.target.value;
    setUserValue({ ...userValue, [name]: value });
    setUserValueError({ ...userValueError, [name]: isValidPassword ? '' : '*Invalid password format' });
  };

  useEffect(() => {
    if (id) {
      getOrganizationDetailsById()
    }
  }, [])
  const getOrganizationDetailsById = async () => {
    try {
      const res = await api.getOrganizationDetailsById({ id });
      setOrganizationDetails(res?.data)
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (organizationDetails) {
      setUserValue({
        name: organizationDetails.organizationName || '',
        contactNo: organizationDetails.contactNo || '',
        username: organizationDetails.userName || '',
        url: organizationDetails.url || '',
        emailId: organizationDetails.email || '',
        address: organizationDetails.address || '',
        domain: organizationDetails.domain || '',
        host: organizationDetails.host || '',
        port: organizationDetails.port || '',
        password: organizationDetails.password || '',
      });
    }
  }, [organizationDetails]);
  const addOrganizationDetails = async (e) => {
    e.preventDefault();
    const isNameValid = userValue?.name.length > 0 ? true : false;
    const isUserNameValid = userValue?.username.length > 0 ? true : false;
    const isEmailValid = userValue?.emailId;
    const isAddressOneValid = userValue?.address.length > 0 ? true : false;
    const isMobileNumberValid = numberValidator(userValue?.contactNo);
    const isUrlValid = userValue?.url.length > 0 ? true : false;
    const isDomainValid = userValue?.domain.length > 0 ? true : false;
    const isHostValid = userValue?.host.length > 0 ? true : false;
    const isPortValid = userValue?.port.length > 0 ? true : false;
    const isPasswordValid = userValue?.password.length > 0 ? true : false;
    if (isNameValid && isEmailValid && isAddressOneValid && isMobileNumberValid && isUrlValid && isDomainValid && isHostValid && isPortValid && isPasswordValid && isUserNameValid) {
      const requestBody = {
        organizationName: userValue.name,
        userName: userValue.username,
        address: userValue.address,
        contactNo: userValue.contactNo,
        email: userValue.emailId,
        url: userValue.url,
        domain: userValue.domain,
        host: userValue.host,
        port: userValue.port,
        password: userValue.password
      };
      if (id) {
        try {
          const payload = {
            id: id,
            organizationName: userValue.name,
            userName: userValue.username,
            address: userValue.address,
            contactNo: userValue.contactNo,
            email: userValue.emailId,
            url: userValue.url,
            domain: userValue.domain,
            host: userValue.host,
            port: userValue.port,
            password: userValue.password
          };
          const response = await api.updateOrganizationDetails(payload);
          if (response) {
            navigate(`/dashboard`);
            toast.success("Organization updated successfully",
            {
              position: toast.POSITION.TOP_RIGHT,
              className: "Toastify__toast--success",
            });
          } else {
            toast.error('Failed to update organization');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      } else {
        const response = await api.addOrganization(requestBody)
        if (response) {
          navigate(`/dashboard`)
          toast.success('Organization added successfully');
        } else {
        toast.err('Failed to add organization');
        }
      }
    } else {
      setUserValueError((prevState) => ({
        ...prevState,
        name: !isNameValid ? '* Organization name is required' : '',
        emailId: !isEmailValid ? '*Email is required' : '',
        address: !isAddressOneValid ? '*Address is required' : '',
        username: !isUserNameValid ? '* User name is required' : '',
        contactNo: !isMobileNumberValid ? '*Mobile No. is required' : '',
        password: !isPasswordValid ? '*Password is required' : '',
        url: !isUrlValid ? '*Url is required' : '',
        domain: !isDomainValid ? '*Domain is required' : '',
        host: !isHostValid ? '*Host is required' : '',
        port: !isPortValid ? '*Port is required' : '',
      }));
    }
  };
  return (
    <>
      <Box className="organizationDetails-details">
      <ToastContainer autoClose={2000} toastClassName="custom-toast" />
        <Card className='organizationDetails-card'>
          <Grid item xs={4} className='organizationDetails-grid'>
            <IconButton onClick={() => navigate('/dashboard')}>
              <ArrowBackIcon />
            </IconButton>
            {id ? < Typography className='organizationDetails-titles'>Update Organization Details</Typography> : < Typography className='organizationDetails-titles'>Add Organization Details</Typography>}
          </Grid>
          <Card className='profile-card'>
            <Grid container item xs={11} spacing={2} className='organizationDetails-field' mt={3}>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="Organization Name"
                  size='small'
                  type="text"
                  name="name"
                  fullWidth
                  value={userValue?.name || ""}
                  onChange={(e) => onOrganizationChange(e, 'name', /^[a-zA-Z]$/)}
                  inputProps={{
                    className: "all-field",
                    maxLength: nameCharLength,
                  }}
                  helperText={userValueError?.name}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="User Name"
                  size='small'
                  type="text"
                  name="name"
                  fullWidth
                  value={userValue?.username || ""}
                  onChange={(e) => onUserNameChange(e, 'username', /^[a-zA-Z]$/)}
                  inputProps={{
                    className: "all-field",
                    maxLength: nameCharLength,
                  }}
                  helperText={userValueError?.username}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="Address"
                  size='small'
                  type="text"
                  name='address'
                  id='address'
                  fullWidth
                  value={userValue?.address}
                  onChange={(e) => onAddressChange(e, 'address')}
                  inputProps={{
                    maxLength: addressLength,
                  }}
                  helperText={userValueError?.address}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="Contact No"
                  type='contactNo'
                  name='contactNo'
                  size='small'
                  fullWidth
                  value={userValue?.contactNo || ""}
                  onChange={(e) => onMobileNumberChange(e, 'contactNo', (/^[0-9\b]+$/))}
                  helperText={userValueError?.contactNo}
                  inputProps={{
                    maxLength: mobileCharLength,
                  }}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="Email"
                  type='emailId'
                  name='emailId'
                  size='small'
                  value={userValue?.emailId || ""}
                  onChange={(e) => onEmailChange(e, 'emailId')}
                  fullWidth
                  helperText={userValueError?.emailId}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="url"
                  size='small'
                  value={userValue?.url || ""}
                  onChange={(e) => onUrlChange(e, 'url')}
                  fullWidth
                  helperText={userValueError?.url}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="Domain"
                  size='small'
                  value={userValue?.domain || ""}
                  onChange={(e) => onDomainChange(e, 'domain')}
                  fullWidth
                  helperText={userValueError?.domain}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="Host"
                  type='email'
                  name='email'
                  size='small'
                  value={userValue?.host || ""}
                  onChange={(e) => onHostChange(e, 'host')}
                  fullWidth
                  helperText={userValueError?.host}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="Port"
                  size='small'
                  maxLength={3}
                  value={userValue?.port || ""}
                  inputProps={{
                    maxLength: 3,
                    pattern: "[0-9]*",
                  }}
                  onChange={(e) => onPortChange(e, 'port')}
                  fullWidth
                  helperText={userValueError?.port}
                />
              </Grid>
              <Grid item xs={10} lg={4} md={5} sm={10}>
                <TextField
                  className='organizationDetails-fields-value'
                  label="Password"
                  inputProps={{
                    maxLength: 25,
                  }}
                  size='small'
                  value={userValue?.password || ""}
                  onChange={(e) => onPasswordChange(e, 'password')}
                  fullWidth
                  helperText={userValueError?.password}
                />
              </Grid>
            </Grid>
          </Card>
          <Grid container item xs={12} className="addOrganization-btn">
            <Grid>
              {id ? <LoadingButton
                className="update-button"
                type="submit"
                variant="contained"
                onClick={(e) => addOrganizationDetails(e)}
              >
                Update
              </LoadingButton> :
                <LoadingButton
                  className="update-button"
                  type="submit"
                  variant="contained"
                  onClick={(e) => addOrganizationDetails(e)}
                >
                  Add
                </LoadingButton>}
            </Grid>
            <Grid >
              <Button
                className="cancle-button"
                type="Cancel"
                variant="outlined"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default AddOrganizationDetails;
