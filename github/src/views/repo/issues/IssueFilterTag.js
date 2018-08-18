import React, { PureComponent } from 'react';
import { Link, routerShape } from 'react-router';
import { Tag } from 'rsuite';
import { fromQ, toQ } from '@/utils/format';

class IssueFilterTag extends PureComponent {
  static contextTypes = {
    router: routerShape
  };

  render() {

    const { name } = this.props;


    const { router } = this.context;

    const qParams = fromQ(router.location.query.q);

    const q = toQ({
      ...qParams,
      [name]: null
    });

    const toLink = router.createPath({
      ...router.location,
      query: {
        ...router.location.query,
        q
      }
    });

    return (
      <Link to={toLink}>
        <Tag>
          {name}: {qParams[name]}
        </Tag>
      </Link>
    )
  }
}

export default IssueFilterTag;
