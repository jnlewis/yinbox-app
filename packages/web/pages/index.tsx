import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import PageHead from '../components/PageHead/PageHead';
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';

const ComingSoon: NextPage = () => {
  return (
    <div className={styles.container}>
      <PageHead />
      <Navigation />
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
                  <Button href="#" className={styles.buttonHighlight}>
                    Start a conversation
                  </Button>
                  <Button
                    className={styles.buttonDefault}
                    href="#learn-more"
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <div id="learn-more" style={{ background: '#eff5f5' }} className="mt-5">
            <Row className="section-container advanced-section">
              <Col md={6} sm={6}>
                <div className="feature-image">
                  <img src="screenshot-devices.png" alt="screenshot" />
                </div>
              </Col>
              <Col md={6} sm={6}>
                <div className="advanced-description">
                  <h2>Fully integrated messaging experience on <img src="/assets/icons/near-protocol-near-logo.svg" style={{ width: 26 }} /> NEAR.</h2>
                  <h3 className="muted">
                    Just connect your wallet and you're good to go.
                  </h3>
                  <p className="paragraph">
                    You have full control over your workspaces and documents. Create workspaces and
                    any number of documents you want, modify them at any time and on the go. Style
                    and format the way you like. Delete the ones you no longer want to keep.
                    <b>This is your space, use it however you will.</b>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <Row className="section-container" style={{ minHeight: 'auto' }}>
            <Col md={12} sm={12}>
              <h2>Privacy You Can Trust</h2>
              <h4 className="usability-subtitle">
                Your messages are end-to-end encrypted. No one can see them, not even Yinbox.
              </h4>
            </Col>
            <Col md={3} sm={6} xs={12}>
              <Card className="card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">To-Do List</Card.Title>
                  <div className="divider"></div>
                  <Card.Text className="card-description">
                    Keep track of things you need to do or make a grocery shopping list.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <Card className="card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">How-to Articles</Card.Title>
                  <div className="divider"></div>
                  <Card.Text className="card-description">
                    Provide step by step guidance for completing a task.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <Card className="card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">Marketing Campaign</Card.Title>
                  <div className="divider"></div>
                  <Card.Text className="card-description">
                    Plan and track your marketing campaign tasks and results.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <Card className="card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">Brainstorming</Card.Title>
                  <div className="divider"></div>
                  <Card.Text className="card-description">
                    Plan, run and document a remote brainstorming session for your next great idea.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div style={{ background: '#eff5f5' }}>
            <Row className="section-container advanced-section">
              <Col md={6} sm={6}>
                <div className="advanced-description">
                  <h2>No Spams. Period.</h2>
                  <h3 className="muted">
                    Just connect your wallet and you're good to go.
                  </h3>
                  <p className="paragraph">
                    You have full control over your workspaces and documents. Create workspaces and
                    any number of documents you want, modify them at any time and on the go. Style
                    and format the way you like. Delete the ones you no longer want to keep.
                    <b>This is your space, use it however you will.</b>
                  </p>
                </div>
              </Col>
              <Col md={6} sm={6}>
                <div className="feature-image">
                  <img src="screenshot-devices.png" alt="screenshot" />
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

export default ComingSoon;
