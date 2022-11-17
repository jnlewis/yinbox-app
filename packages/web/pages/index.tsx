import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import PageHead from '../components/PageHead/PageHead';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsChevronRight } from "react-icons/bs";
import Navigation from 'components/Navigation/Navigation';

const ComingSoon: NextPage = () => {

  return (
    <div className={styles.container}>
      <PageHead />
      <Navigation />
      <main className={styles.main}>
          <Container>
            <Row>
              <Col md={1} sm={12}></Col>
              <Col md={5} sm={12}>
                <div className={styles.introContainer}>
                  <h1><div className={styles.mainTitle}>Chat with anyone on NEAR.</div></h1>
                  <div className={styles.subtitle}>Secured. Integrated. Spam free.</div>
                  <p>Yinbox is the first fully integrated messenger app with end-to-end encryption and spam prevention on NEAR.</p>
                  <div style={{ paddingTop: 30 }}>
                    <Button href="#" className={styles.buttonHighlight}>
                      Start a conversation
                    </Button>
                    <Button className={styles.buttonDefault} href="https://youtu.be/gnYzLlfsFsY" target="_blank">
                      Learn more
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={5} sm={12}>
                <div className={styles.introImageContainer}>
                  <img className={styles.introImage} src="/assets/yinbox/ss-intro.png" />
                </div>
              </Col>
              <Col md={1} sm={12}></Col>
            </Row>
            {/* <Row>
              <Col md={12} sm={12}>
                <div id="demo" className={styles.demoContainer}>
                  <h2 className={styles.demoTitle}>Watch the Demo</h2>
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/gnYzLlfsFsY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </Col>
            </Row> */}
          </Container>
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  return {
    props: {
    }
  };
};

export default ComingSoon;
