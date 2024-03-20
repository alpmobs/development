// dependencies
import React, { Component } from "react";
import PropTypes from 'prop-types';

// includes
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Styles/LatestItems.css";

class LatestItems extends Component {
  static propTypes = {
    heading: PropTypes.string
  };

  static defaultProps = {
    heading: "ALL THE LATEST FROM AEG"
  };
  
  componentDidMount() {
    const anchorElements = document.querySelectorAll('a');
    anchorElements.forEach(anchor => {
      anchor.addEventListener('click', this.handleAnchorClick);
    });
  }

  componentWillUnmount() {
    const anchorElements = document.querySelectorAll('a');
    anchorElements.forEach(anchor => {
      anchor.removeEventListener('click', this.handleAnchorClick);
    });
  }

  handleAnchorClick = (event) => {
    event.preventDefault();
    console.log("Clicked element:", event.target);
  }

  state = {
    latestItems: [
      {
        id: 1,
        image: {
          srcSet: "./assets/images/component-02/Image-01.jpg",
          media: "(max-width: 380px)",
          alt: "Component 2 - Image 1",
          src: "./assets/images/component-02/Image-01.jpg"
        },
        title: "Summer Lunch Menu By Mark Best",
        description:
          "AEG ambassador Mark Best's summer eats are guaranteed to help you make the most of the warmer weather and entertaining at home.",
          link: "#",
          linKTitle: "READ MORE"
      },
      {
        id: 2,
        image: {
          srcSet: "./assets/images/component-02/Image-02.jpg",
          media: "(max-width: 380px)",
          alt: "Component 2 - Image 2",
          src: "./assets/images/component-02/Image-02.jpg"
        },
        title: "A Traditional Christmas Eve, Mark Best Style",
        description:
          "One of Australia's best chefs and AEG ambassador, Mark Best, shares his favourite Christmas Eve menu which is sure to impress your guests.",
          link: "#",
          linKTitle: "READ MORE"
      },
      {
        id: 3,
        image: {
          srcSet: "./assets/images/component-02/Image-03.jpg",
          media: "(max-width: 380px)",
          alt: "Component 2 - Image 3",
          src: "./assets/images/component-02/Image-03.jpg"
        },
        title: "Taking Taste Further",
        description:
          "This exclusive cookbook gives you all the know-how you need. We've designed it to make sure you get the most out of our products - and the best out of your food.",
        link: "#",
        linKTitle: "READ MORE"
      }
    ]
  };

  render() {
    const { heading } = this.props;
    const { latestItems } = this.state;

    return (
      <Container id="latestItemsContainer">
        <h2 className="text-center">{heading}</h2>
        <Row>
          {latestItems.map(item => (
            <Col md key={item.id}>
              <picture>
                <source srcSet={item.image.srcSet} media={item.image.media} />
                <Image src={item.image.src} alt={item.image.alt} fluid />
              </picture>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.link}>{item.linKTitle}</a>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default LatestItems;
