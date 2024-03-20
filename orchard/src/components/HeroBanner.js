import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalComponent from "./Modal";

import "../Styles/HeroBanner.css";

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
        text: "The way ingredients are sourced affects the way we nourish our bodies. Author Mark Schatzer believes our body naturally develops an appetite for the foods and nutrients it needs to be healthy, but that artificial flavorings are getting in the way. This can be reversed by focusing on high-quality ingredients and being mindful as your appetite guides you to consume according to your body's needs.",
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
          <Col md className={loading ? "loading-animation" : ""}>
            {/* First column with the first image */}
            <div onClick={() => this.handleToggleModal(0)}>
              <picture>
                <source srcSet={images[0].src} media={images[0].media} />
                <source srcSet={images[0].srcSet2x} media={images[0].media2x} />
                <Image src={images[0].src} alt={images[0].alt} fluid />
              </picture>
            </div>
            <ModalComponent
              show={images[0].showModal}
              onHide={() => this.handleToggleModal(0)}
              image={images[0]}
            />
          </Col>
          <Col md className={loading ? "loading-animation" : ""}>
            <Row>
              {images.slice(1, 3).map((image, index) => (
                <aside key={index}>
                  <div onClick={() => this.handleToggleModal(index + 1)}>
                    <picture>
                      <source srcSet={image.src} media={image.media} />
                      <source srcSet={image.srcSet2x} media={image.media2x} />
                      <Image src={image.src} alt={image.alt} fluid />
                    </picture>
                  </div>
                  <ModalComponent
                    show={image.showModal}
                    onHide={() => this.handleToggleModal(index + 1)}
                    image={image}
                  />
                </aside>
              ))}
            </Row>
          </Col>
          <Col md className={loading ? "loading-animation" : ""}>
            {articles.map((article, index) => (
              <article key={index}>
                <h3 className="title">{article.title}</h3>
                <p className="description">{article.text}</p>
              </article>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HeroBanner;
