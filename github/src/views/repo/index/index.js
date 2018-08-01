import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import { updateEntities } from '@/redux/modules/entities';
import { Nav, Panel } from 'rsuite';
import { selectRepo } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';

class Repository extends PureComponent {
  componentDidMount() {
    this.fetchReadme();
  }

  fetchReadme() {
    const { dispatch, params: { owner, name } } = this.props;
    return axios(`/repos/${owner}/${name}/readme`, {
      headers: {
        Accept: 'application/vnd.github.v3.html',
      },
    })
      .then(({ data }) => {
        dispatch(updateEntities({ repos: { [`${owner}/${name}`]: { readme: data } } }));
      });
  }

  renderReadme() {
    const { repository } = this.props;
    return repository.readme && (
      <Panel>
        <div dangerouslySetInnerHTML={{ __html: repository.readme }} />
      </Panel>
    );
  }

  render() {
    const { repository } = this.props;
    return (
      <Fragment>
        {
          repository && this.renderReadme()
        }
      </Fragment>
    );
  }
}

module.exports = connect(
  (state, { params: { owner, name } }) => ({
    repository: selectRepo(owner, name)(state),
  }),
)(ToJS(Repository));
