import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const EXCHANGE_RATES = gql`
  {
  rate(id: ["DKK", "SEK", "NOK"]) {
    rate,
    code
  }
}
`;

const Image = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) { return <p>Loading...</p>; }
  if (error) {
    console.error('error', error);
    return <p>Error :(</p>;
  }

  return data.rate.map(({ code, rate }: any) => (
    <div key={code}>
      <p>
        {code}: {rate}
      </p>
    </div>
  ));

  /* const imgData = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return <Img fluid={imgData.placeholderImage.childImageSharp.fluid} />; */
};

export default Image;
