import React from 'react';
import { Container } from 'react-bootstrap';
import { socialMedia } from '../../data/home.data';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <Container className="text-center pt-5 pb-4">
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
