import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <Container>
        <Row>
          <Col lg={4} md={4}>
            <div className={styles.brand}>
              <img src="/assets/yinbox/yinbox-logo-dark.svg" alt="Yinbox" />
            </div>
            <p className={styles.appDescription}>
              Yinbox is the first fully integrated messenger app with end-to-end encryption and spam prevention on NEAR
            </p>
            <div className={styles.label}>Connect with us</div>
            <div className={styles.followUs}>
              <a href='https://github.com/jnlewis/yinbox-contracts' className={styles.iconWhite}>
                <img src='/assets/icons8-github.svg' alt='Github' />
              </a>
              <a href='mailto:contact@swapstation.io'>
                <img src='/assets/email.svg' alt='Email' className={styles.iconWhite} />
              </a>
            </div>
          </Col>
          <Col lg={8} md={8}>
            <Container style={{ paddingTop: 12 }}>
              <Row>
                <Col lg={4} md={4}>
                  <b>My Account</b>
                  <ul className={styles.list}>
                    <li>
                      <a className={styles.link} href="/">
                        New Conversation
                      </a>
                    </li>
                    <li>
                      <a className={styles.link} href="/">
                        Chats
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col lg={4} md={4}>
                  <b>Platform</b>
                  <ul className={styles.list}>
                    <li>
                      <a className={styles.link} href="/">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a className={styles.link} href="/">
                        About
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
