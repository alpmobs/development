import React, { Component } from "react";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class HeroBanner extends Component {
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <picture>
                <source
                  srcSet="./assets/images/component-01/Image-01.jpg"
                  media="(max-width: 380px)"
                />
                <source
                  srcSet="./assets/images/component-01/Image-01@2x.jpg"
                  media="(min-width: 381px)"
                />
                <Image
                  src="./assets/images/component-01/Image-01.jpg"
                  alt="Component 2 - Image 1"
                  fluid
                />
              </picture>
            </Col>
            <Col>
              <Row>
                <Row>
                  <picture>
                    <source
                      srcSet="./assets/images/component-01/Image-02.jpg"
                      media="(max-width: 380px)"
                    />
                    <source
                      srcSet="./assets/images/component-01/Image-02@2x.jpg"
                      media="(min-width: 381px)"
                    />
                    <Image
                      src="./assets/images/component-01/Image-02.jpg"
                      alt="Component 2 - Image 1"
                      fluid
                    />
                  </picture>
                </Row>
                <Row><picture>
                    <source
                      srcSet="./assets/images/component-01/Image-03.jpg"
                      media="(max-width: 380px)"
                    />
                    <source
                      srcSet="./assets/images/component-01/Image-03@2x.jpg"
                      media="(min-width: 381px)"
                    />
                    <Image
                      src="./assets/images/component-01/Image-03.jpg"
                      alt="Component 2 - Image 1"
                      fluid
                    />
                  </picture></Row>
              </Row>
            </Col>
            <Col>
                <article>
                    <h3>ANSWER YOUR BODY'S NEEDS</h3>
                    <p>
                    Sourcing local or organic food is a good way
to start being more mindful about what
you're cooking and eating.
        </p>
                </article>
                <article>
                    <h4>Be Mindful</h4>
                    <p>Sourcing local or organic food is a good way
to start being more mindful about what
you're cooking and eating.
                    </p>
                </article>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default HeroBanner;
