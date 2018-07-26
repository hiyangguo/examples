import React, { PureComponent } from 'react';
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
    this.fetchRepository();
    this.fetchReadme();
  }

  fetchRepository() {
    const { dispatch, params: { owner, name, } } = this.props;
    return axios(`/repos/${owner}/${name}`)
      .then(({ data }) => {
        const { result, entities } = normalize(data, Entity.Repository);
        dispatch(updateEntities(entities));
      });
  }

  fetchReadme() {
    const { dispatch, params: { owner, name, } } = this.props;
    return axios(`/repos/${owner}/${name}/readme`, {
      headers: {
        Accept: 'application/vnd.github.v3.html'
      }
    })
      .then(({ data }) => {
        dispatch(updateEntities({ repos: { [`${owner}/${name}`]: { readme: data } } }));
      });
  }

  renderNav() {
    const { repository } = this.props;
    return (
      <Nav
        appearance="subtle"
        activeKey="code"
      >
        <Nav.Item eventKey="code">Code</Nav.Item>
        <Nav.Item eventKey="issues">Issues</Nav.Item>
        <Nav.Item eventKey="pulls">Pull requests</Nav.Item>
        <Nav.Item eventKey="projects">Projects</Nav.Item>
        <Nav.Item eventKey="wiki">Wiki</Nav.Item>
        <Nav.Item eventKey="insights">Insights</Nav.Item>
        <Nav.Item eventKey="settings">Settings</Nav.Item>
      </Nav>
    )
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
    return repository ? (
      <div className="page-content">
        {this.renderNav()}
        {this.renderReadme()}
      </div>
    ) : null;
  }
}

module.exports = connect(
  (state, { params: { owner, name } }) => ({
    repository: selectRepo(`${owner}/${name}`)(state)
  })
)(ToJS(Repository));
