import React, { Component } from "react";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class LatestItems extends Component {
  render() {
    return (
      <>
        <Container>
          <h2 class="text-center">ALL THE LATEST FROM AEG</h2>
          <Row>
            <Col md>
              <picture>
                <source
                  srcSet="./assets/images/component-02/Image-01.jpg"
                  media="(max-width: 380px)"
                />
                <source
                  srcSet="./assets/images/component-02/Image-01@2x.jpg"
                  media="(min-width: 381px)"
                />
                <Image
                  src="./assets/images/component-02/Image-01.jpg"
                  alt="Component 2 - Image 1"
                  fluid
                />
              </picture>
              <h3>Summer Lunch Menu By Mark Best</h3>
              <p>
                AEG ambassador Mark Best's summer eats are guaranteed to help
                you make the most of the warmer weather and entertaining at
                home.
              </p>
              <a href="javascript:;">Read More</a>
            </Col>
            <Col md>
              <picture>
                <source
                  srcSet="./assets/images/component-02/Image-02.jpg"
                  media="(max-width: 380px)"
                />
                <source
                  srcSet="./assets/images/component-02/Image-02@2x.jpg"
                  media="(min-width: 381px)"
                />
                <Image
                  src="./assets/images/component-02/Image-02.jpg"
                  alt="Component 2 - Image 2"
                  fluid
                />
              </picture>
              <h3>A Traditional Christmas Eve, Mark Best Style</h3>
              <p>
                One of Australia's best chefs and AEG ambassador, Mark Best,
                shares his favourite Christmas Eve menu which is sure to impress
                your guests.
              </p>
              <a href="javascript:;">Read More</a>
            </Col>
            <Col md>
              <picture>
                <source
                  srcSet="./assets/images/component-02/Image-03.jpg"
                  media="(max-width: 380px)"
                />
                <source
                  srcSet="./assets/images/component-02/Image-03@2x.jpg"
                  media="(min-width: 381px)"
                />
                <Image
                  src="./assets/images/component-02/Image-03.jpg"
                  alt="Component 2 - Image 3"
                  fluid
                />
              </picture>
              <h3>Taking Taste Further</h3>
              <p>
                This exclusive cookbook gives you all the know-how you need.
                We've designed it to make sure you get the most out of our
                products - and the best out of your food.
              </p>
              <a href="javascript:;">Read More</a>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default LatestItems;
