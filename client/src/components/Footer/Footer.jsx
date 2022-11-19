import React from 'react';
import { Container } from 'react-bootstrap';
import { socialMedia } from '../../data/home.data';

const Footer = () => {
  return (
    <footer className="mt-5 bg-primary text-white">
      <Container className="text-center py-4">
        <div>
          {socialMedia?.map(({ id, icon: Icon, link }) => (
            <a
              href={link}
              key={id}
              className="d-inline-block p-2 mx-1 text-white"
            >
              <Icon />
            </a>
          ))}
        </div>
        <p className="mb-2 mt-3">
          &copy; {new Date().getFullYear()}{' '}
          {process.env.REACT_APP_SITE_NAME.toUpperCase()} all rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
