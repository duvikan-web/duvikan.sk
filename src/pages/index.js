/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colors, colors2 } from '../consts/style';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';
import Logo from '../images/logo-black.svg';
import { SidePanel } from '../components/common/LayoutParts';
import Gallery from '../components/Gallery';

const HomePage = styled.article`
  color: ${colors.white};
`;

const MainPanelRow = styled.main`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
`;

const Section = styled.section`
  margin-top: 3rem;
  padding: 3rem 0;
  margin-bottom: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row;

  &.antialiased {
    -webkit-font-smoothing: antialiased;
  }
`;

const SectionInfo = styled.div`
  background: transparent;
  width: 200px;
`;

const SectionContent = styled.div`
  background: transparent;
  padding-top: 0.2em;
  flex: 1;
  p {
    font-size: 2.4rem;
    max-width: 720px;
  }
  .cta {
    letter-spacing: 0.2em;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.2rem;

    &:hover {
      opacity: 0.6;
    }

    svg {
      font-size: 1.6rem;
      vertical-align: middle;
      margin-top: -0.2rem;
    }
  }
`;

const SectionSeparator = styled.hr`
  width: 100%;
  height: 1px;
  opacity: 0.175;
  border: 0;
  margin: 0;
  background-color: #fff;
`;

const DarkSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${colors.black};
  opacity: 0.075;
  border: 0;
  margin: 0;
  overflow: visible;
`;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
  padding: 3rem 0;

  @media (min-width: 950px) {
    flex-direction: row;
  }
`;

const Main = styled.section`
  background: ${colors.lightWash};
  color: ${colors.black};
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  border-bottom: 1px solid #e5e8ed;

  @media (min-width: 950px) {
    padding-top: 500px;
  }
`;

const JapaneseTitle = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  writing-mode: vertical-rl;
  font-size: 4rem;
  display: none;

  @media (min-width: 950px) {
    display: block;
  }
`;

const CenteredTextBlock = styled.div`
  flex: 60%;
  font-size: 3rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;

  svg {
    color: #000;
    fill: currentColor;
  }
  .title {
    font-size: 6rem;
    text-transform: uppercase;
    font-weight: 1000;
    letter-spacing: 0.05em;
  }
  .japaneseTitle {
    font-weight: 400;
  }

  .subtitle {
    font-size: 2.4rem;
  }

  .bodyContent {
    font-size: 1.6rem;
    font-weight: 400;
    display: relative;
    margin-top: 3rem;
    text-align: justify;
    max-width: 575px;
    padding-right: 1rem;
    color: ${colors.black};
  }
`;

const SideGallery = styled.div`
  flex: 40%;
  align-self: center;
  padding: 2rem 0;
`;

const Newsfeed = styled.section`
  color: ${colors.white};
  background: ${colors.black};
  padding: 4rem 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  -webkit-font-smoothing: antialiased;
`;

const NewsfeedTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const BlogPostGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  padding: 2rem 0;
  margin: 0;
  position: relative;
  list-style-type: none;
  /* border: 1px solid #e5e8ed;
  background-color: ${colors.white};
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06); */
`;

const BlogPostItem = styled.li`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  > a {
    position: relative;
    padding: 1rem;
    color: ${colors.white};
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .timePosted {
      font-size: 1.4rem;
      width: auto;
      margin-right: 2rem;

      @media (min-width: 950px) {
        width: 200px;
        margin: 0;
      }
    }

    .title {
      font-size: 1.6rem;
      font-weight: 400;
    }

    .linkText {
      margin-left: auto;
      color: ${colors.white};
      font-weight: 400;
      font-size: 1.4rem;
      display: none;
      svg {
        margin-left: 2px;
        font-size: 1.2em;
        vertical-align: middle;
        position: relative;
        top: -1px;
        color: ${colors.white};
      }
      &:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 1px;
        background: ${colors.white};
        transition: opacity 0.25s linear;
      }

      @media (min-width: 950px) {
        display: block;
      }
    }

    &:hover {
      opacity: 0.5;
    }
  }
`;

const QuickLinkGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  justify-content: flex-start;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;

  @media (min-width: 950px) {
    margin-bottom: -50%;
  }
`;

const QuickLinkCard = styled.li`
  position: relative;
  min-width: 250px;
  width: 50%;
  margin-bottom: 2rem;

  a.card {
    display: block;
    position: relative;
    margin: 0 2rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
    border-radius: 3px;
    background: ${colors.white};
    transition: box-shadow 0.25s linear, -webkit-box-shadow 0.25s linear;
    color: ${colors.black};
    overflow: hidden;
    height: 100%;
    border-bottom: 1px solid #e5e8ed;

    .photo {
      position: relative;
      max-width: 720px;
      border-bottom: 1px solid #e5e8ed;
    }

    .title {
      font-size: 2.4rem;
      padding: 2rem;
      padding-bottom: 0.4rem;
    }

    .description {
      color: #5b6987;
      font-size: 1.8rem;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-bottom: 4rem;
    }

    .linkText {
      position: absolute;
      display: inline-block;
      bottom: 2rem;
      left: 2rem;
      color: ${colors.mediumBlue};
      font-weight: bold;
      &:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 1px;
        background: ${colors.mediumBlue};
        transition: opacity 0.25s linear;
        opacity: 0;
      }
    }

    &:hover {
      box-shadow: 0 10px 20px rgba(3, 27, 78, 0.1);
      .linkText {
        &:after {
          opacity: 1;
        }
      }
    }
  }

  @media (min-width: 720px) {
    max-width: 720px;
  }

  @media (min-width: 950px) {
    width: 33.33333%;

    /* &:first-child {
      > a.card {
        margin-left: 0;
      }
    }

    &:last-child {
      > a.card {
        margin-right: 0;
      }
    } */
  }
`;

const QuickLink = props => {
  return (
    <QuickLinkCard>
      <Link className="card" to={props.url}>
        <Img className="photo" fluid={props.imgFluid} />
        <h3 className="title">{props.title}</h3>
        <p className="description">{props.description}</p>
        <span className="linkText">{props.linkText}</span>
      </Link>
    </QuickLinkCard>
  );
};

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query indexQuery {
      page: datoCmsHomePage {
        description
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        quickLink1Title
        quickLink2Title
        quickLink3Title
        quickLink1Cover {
          fluid(maxWidth: 720) {
            ...GatsbyDatoCmsFluid
          }
        }
        quickLink2Cover {
          fluid(maxWidth: 720) {
            ...GatsbyDatoCmsFluid
          }
        }
        quickLink3Cover {
          fluid(maxWidth: 720) {
            ...GatsbyDatoCmsFluid
          }
        }
        quickLink1Description
        quickLink1LinkText
        quickLink2Description
        quickLink2LinkText
        quickLink3Description
        quickLink3LinkText
        body
        imageGallery {
          fluid(maxWidth: 950) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
      posts: allDatoCmsBlogPost(
        sort: { fields: [meta___createdAt], order: DESC }
        limit: 5
      ) {
        edges {
          node {
            id
            title
            featured
            slug
            cover {
              fluid(maxWidth: 720) {
                ...GatsbyDatoCmsFluid
              }
            }
            author {
              name
              photo {
                fluid(maxWidth: 200) {
                  src
                  srcSet
                  base64
                  aspectRatio
                  sizes
                }
              }
            }
            meta {
              createdAt
            }
            contentNode {
              childMarkdownRemark {
                timeToRead
              }
            }
          }
        }
      }
    }
  `);

  const {
    description,
    seoMetaTags,
    quickLink1Title,
    quickLink2Title,
    quickLink3Title,
    quickLink1Cover,
    quickLink2Cover,
    quickLink3Cover,
    quickLink1Description,
    quickLink1LinkText,
    quickLink2Description,
    quickLink2LinkText,
    quickLink3Description,
    quickLink3LinkText,
    body,
    imageGallery,
  } = data.page;

  const { edges } = data.posts;

  return (
    <HomePage>
      <SEO meta={seoMetaTags} />
      <ScaleUp>
        <Container>
          <Section className="antialiased">
            <SectionInfo>O nás</SectionInfo>
            <SectionContent>
              <p>{description}</p>
              <Link className="cta" to="/about">
                Viac info{' '}
                <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
              </Link>
            </SectionContent>
          </Section>
          <SectionSeparator />
          <Section>
            <SectionContent>
              <QuickLinkGrid>
                <QuickLink
                  url="/treningy"
                  title={quickLink1Title}
                  imgFluid={quickLink1Cover.fluid}
                  description={quickLink1Description}
                  linkText={quickLink1LinkText}
                />
                <QuickLink
                  url="/dojo"
                  title={quickLink2Title}
                  imgFluid={quickLink2Cover.fluid}
                  description={quickLink2Description}
                  linkText={quickLink2LinkText}
                />
                <QuickLink
                  url="/historia"
                  title={quickLink3Title}
                  imgFluid={quickLink3Cover.fluid}
                  description={quickLink3Description}
                  linkText={quickLink3LinkText}
                />
              </QuickLinkGrid>
            </SectionContent>
          </Section>
        </Container>
      </ScaleUp>
      <Main>
        <Container>
          <SectionWrapper>
            <SidePanel>
              <JapaneseTitle>空手道場ドゥヴィ館ブラチスラバ</JapaneseTitle>
            </SidePanel>
            <MainPanelRow>
              <CenteredTextBlock>
                <Logo />
                <h4 className="japaneseTitle">
                  空手道場ドゥヴィ館ブラチスラバ
                </h4>
                <h3 className="title">Duvi-kan</h3>
                <div className="subtitle">
                  <strong>DUVI</strong> - okinawské meno šéftrénera MUDr.
                  Divinca
                </div>
                <div className="subtitle">
                  <strong>KAN</strong> - po japonsky škola
                </div>
                <div
                  className="bodyContent"
                  dangerouslySetInnerHTML={{
                    __html: body,
                  }}
                />
              </CenteredTextBlock>
              <SideGallery>
                <Gallery itemsPerRow={1} images={imageGallery} />
              </SideGallery>
            </MainPanelRow>
          </SectionWrapper>
          <SectionSeparator />
        </Container>
      </Main>
      <Newsfeed>
        <Container>
          <NewsfeedTitle>Najnovšie príspevky</NewsfeedTitle>
          <BlogPostGrid>
            {map(edges, post => (
              <BlogPostItem key={post.node.slug}>
                <SectionSeparator />
                <Link to={`/blog/${post.node.slug}/`}>
                  <div className="timePosted">
                    <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
                    <Moment format="DD.MM.YYYY">
                      {post.node.meta.createdAt}
                    </Moment>
                  </div>
                  <h3 className="title">{post.node.title}</h3>
                  <div className="linkText">
                    Otvoriť článok{' '}
                    <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />{' '}
                  </div>
                </Link>
              </BlogPostItem>
            ))}
          </BlogPostGrid>
        </Container>
      </Newsfeed>
    </HomePage>
  );
};

export default IndexPage;
