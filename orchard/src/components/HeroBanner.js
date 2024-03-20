import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalComponent from "./Modal";

class HeroBanner extends Component {
  state = {
    images: [
      {
        src: "./assets/images/component-01/Image-01.jpg",
        srcSet2x: "./assets/images/component-01/Image-01@2x.jpg",
        media: "(max-width: 380px)",
        media2x: "(min-width: 381px)",
        alt: "Component 1 - Image 1",
        showModal: false,
      },
      {
        src: "./assets/images/component-01/Image-02.jpg",
        srcSet2x: "./assets/images/component-01/Image-02@2x.jpg",
        media: "(max-width: 380px)",
        media2x: "(min-width: 381px)",
        alt: "Component 1 - Image 2",
        showModal: false,
      },
      {
        src: "./assets/images/component-01/Image-03.jpg",
        srcSet2x: "./assets/images/component-01/Image-03@2x.jpg",
        media: "(max-width: 380px)",
        media2x: "(min-width: 381px)",
        alt: "Component 1 - Image 3",
        showModal: false,
      },
    ],
    articles: [
      {
        title: "ANSWER YOUR BODY'S NEEDS",
        text: "Sourcing local or organic food is a good way to start being more mindful about what you're cooking and eating.",
      },
      {
        title: "BE MINDFUL",
        text: "Sourcing local or organic food is a good way to start being more mindful about what you're cooking and eating.",
      },
    ],
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 9000);
  }

  handleToggleModal = (index) => {
    const updatedImages = [...this.state.images];
    updatedImages[index].showModal = !updatedImages[index].showModal;
    this.setState({ images: updatedImages });
  };

  render() {
    const { images, articles, loading } = this.state;

    return (
      <Container id="heroBanner" fluid>
        <Row>
          {images.map((image, index) => (
            <Col md key={index} className={loading ? "loading-animation" : ""}>
              <div onClick={() => this.handleToggleModal(index)}>
                <picture>
                  <source srcSet={image.src} media={image.media} />
                  <source srcSet={image.srcSet2x} media={image.media2x} />
                  <Image src={image.src} alt={image.alt} fluid />
                </picture>
              </div>
              <ModalComponent
                show={image.showModal}
                onHide={() => this.handleToggleModal(index)}
                image={image}
              />
            </Col>
          ))}
          <Col md className={loading ? "loading-animation" : ""}>
            {articles.map((article, index) => (
              <article key={index}>
                <h3>{article.title}</h3>
                <p>{article.text}</p>
              </article>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HeroBanner;
