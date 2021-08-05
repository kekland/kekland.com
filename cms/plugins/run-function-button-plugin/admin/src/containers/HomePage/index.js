/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import axios from 'axios'

// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const Button = ({ children, onClick }) => {
  return (
    <button className="btn btn-primary" style={{ padding: 12 }} onClick={onClick}>
      {children}
    </button>
  )
}

const HomePage = () => {
  const makeRequest = async (url) => {
    let token = localStorage.getItem('jwtToken')
    token = token.substring(1, token.length - 1)

    const { data } = await axios.post(`${strapi.backendURL}${url}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return data
  }

  const updatePhotos = async () => {
    try {
      const data = await makeRequest('/photos/update')

      if (!data.success) throw { error: 'failed' }
      strapi.notification.success('Successfully updated photos')
    }
    catch (e) {
      strapi.notification.error(JSON.stringify(e))
    }
  }

  const updateRepos = async () => {
    try {
      const data = await makeRequest('/repos/update')

      if (!data.success) throw { error: 'failed' }
      strapi.notification.success('Successfully updated repos')
    }
    catch (e) {
      strapi.notification.error(JSON.stringify(e))
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Run Google Photos function</h1>
      <Button onClick={updatePhotos}>Run</Button>
      <div style={{ height: 16 }} />
      <h1>Run GitHub function</h1>
      <Button onClick={updateRepos}>Run</Button>
    </div>
  );
};

export default memo(HomePage);
