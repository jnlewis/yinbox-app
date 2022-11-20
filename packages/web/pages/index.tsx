import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import PageHead from '../components/PageHead/PageHead';
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';
import { useState } from 'react';
import WalletManager from 'modules/walletManager/walletManager';

const MainLanding: NextPage = () => {
  const [showConnectWallet, setShowConnectWallet] = useState<boolean>(false);

  const handleStartConversationClick = () => {
    if (WalletManager.isSignedIn()) {
      location.href = '/chat';
    } else {
      setShowConnectWallet(true);
    }
  };

  return (
    <div className={styles.container}>
      <PageHead />
      <Navigation showConnectWallet={showConnectWallet} />
      <main className={styles.main}>
        <Container fluid>
          <Row className={styles.intro}>
            <Col md={1} sm={12}></Col>
            <Col md={5} sm={12}>
              <div className={styles.introContainer}>
                <h1>
                  <div className={styles.mainTitle}>Chat with anyone on NEAR.</div>
                </h1>
                <div className={styles.subtitle}>Secured. Integrated. Spam free.</div>
                <p>
                  Yinbox is the first fully integrated messenger app with end-to-end encryption and
                  spam prevention on NEAR.
                </p>
                <div style={{ paddingTop: 30 }}>
                  <Button
                    className={styles.buttonHighlight}
                    onClick={() => handleStartConversationClick()}
                  >
                    Start a conversation
                  </Button>

                  <Button className={styles.buttonDefault} href="#learn-more">
                    Learn more
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={5} sm={12}>
              <div className="intro-illustration">
                <img src="/assets/illustrations/9.svg" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <div id="learn-more" style={{ background: '#eff5f5' }} className="mt-5">
            <Row className="section-container advanced-section">
              <Col md={7} sm={7}>
                <div className="feature-image">
                  <img
                    src="/assets/images/screenshot-chat-2-mid.png"
                    alt="screenshot"
                    className="framed-image"
                  />
                </div>
              </Col>
              <Col md={5} sm={5}>
                <div className="advanced-description">
                  <h2>
                    Fully integrated messaging experience on{' '}
                    <img src="/assets/icons/near-protocol-near-logo.svg" style={{ width: 26 }} />{' '}
                    NEAR.
                  </h2>
                  <h3 className="muted">Just connect your wallet and you're good to go.</h3>
                  <p className="paragraph">
                    Yinbox integrates seemlessly with NEAR ecosystem. Send messages to anyone, link
                    any NFTs via chat commands, communicate and interact intuitively. Just connect your
                    wallet and you're good to go, no signups required.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <Row className="section-container" style={{ minHeight: 'auto', marginBottom: '60px' }}>
            <Col md={12} sm={12}>
              <h2>Privacy You Can Trust</h2>
              <h4 className="usability-subtitle">
                Your messages are end-to-end encrypted. No one can see them, not even Yinbox.
              </h4>
            </Col>
            <Col md={12} sm={12}>
              <div className="feature-image">
                <img
                  src="/assets/images/end-to-end-encryption.jpg"
                  alt="end-to-end encryption"
                  className="long-image"
                />
              </div>
            </Col>
          </Row>
          <div style={{ background: '#f8eeff' }}>
            <Row className="section-container advanced-section">
              <Col md={1} sm={1}></Col>
              <Col md={5} sm={5}>
                <div className="advanced-description">
                  <h2>No Spams. Period.</h2>
                  <h3 className="muted">Fee based spam prevention built on the blockchain.</h3>
                  <p className="paragraph">
                    To prevent spams in our community, we impose a one time fee whenever you send a
                    message to someone new for the first time.
                  </p>
                </div>
              </Col>
              <Col md={5} sm={5}>
                <div className="illustration">
                  <img src="/assets/illustrations/37.svg" alt="" />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Footer />
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};

export default MainLanding;
