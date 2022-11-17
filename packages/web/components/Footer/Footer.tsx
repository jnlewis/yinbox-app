import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <Container>
        <Row>
          <Col lg={4} md={4}>
            <div className={styles.brand}>Yinbox</div>
            <p className={styles.appDescription}>
              Yinbox is the first fully integrated messenger app with end-to-end encryption and spam prevention on NEAR
            </p>
            <div className={styles.label}>Connect with us</div>
            <p>
              <a
                className={styles.link}
                target="_blank"
                href="https://github.com/jnlewis/yinbox-contracts"
                rel="noreferrer"
              >
                Find us on Github
              </a>
            </p>
          </Col>
          <Col lg={8} md={8}>
            <Container>
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
