import React, { Component } from 'react';
import Link from './Link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LinkList extends Component {
  render() {
    console.log('propes', this.props);

    // 1
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>;
    }

    // 2
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>;
    }

    // 3
    const linksToRender = this.props.feedQuery.feed.links;

    return <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>;
  }
}

// 1
/**
 * First, you create the JavaScript constant called FEED_QUERY that stores the query.
 * The gql function is used to parse the plain string that contains the GraphQL code
 */
const FEED_QUERY = gql`
  # 2
  # Now you define the actual GraphQL query.
  # FeedQuery is the operation name and will be used by Apollo to refer to this query under the hood.
  query FeedQuery {
    feed {
      links {
        id
        url
        description
      }
    }
  }
`;

// 3
/**
 * graphql container wraps the LinkList component with the FEED_QUERY.
 */
export default graphql(FEED_QUERY, { name: 'feedQuery' })(LinkList);

// export default LinkList;
