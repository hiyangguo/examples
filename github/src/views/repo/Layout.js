import React, { PureComponent } from 'react';
import { Nav } from 'rsuite';
import { Link } from 'react-router';
import connect from 'react-redux/es/connect/connect';
import { selectRepo } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import Octicon from '@/components/Octicon';
import { bindActionCreators } from 'redux';
import { fetchRepo } from '@/redux/actions';

function NavTab(props) {
  return <Nav.Item componentClass={Link} {...props} />;
}

class RepositoryLayout extends PureComponent {

  componentDidMount() {
    this.fetchRepository();
  }

  fetchRepository() {
    return this.props.onFetchRepo();
  }

  render() {
    const { children, repo, params: { owner, name }, router: { isActive } } = this.props;
    const repoUrl = repo ? `/${repo.full_name}` : `/${owner}/${name}`;

    return (
      <div className="page-content">
        <Nav
          appearance="subtle"
        >
          <NavTab
            to={repoUrl}
            active={isActive(repoUrl, true)}
            icon={<Octicon name="file" />}
          >
            README
          </NavTab>
          <NavTab
            to={`${repoUrl}/commits${repo && `/${repo.default_branch}`}`}
            active={isActive(`${repoUrl}/commits`)}
            icon={<Octicon name="code" />}
          >
            Commits
          </NavTab>
          <NavTab
            to={`${repoUrl}/issues`}
            active={isActive(`${repoUrl}/issues`)}
            icon={<Octicon name="issue-opened" />}
          >Issues</NavTab>
          <NavTab
            to={`${repoUrl}/pulls`}
            active={isActive(`${repoUrl}/pulls`)}
            icon={<Octicon name="git-pull-request" />}
          >
            Pull requests</NavTab>
          <NavTab
            to={`${repoUrl}/projects`}
            active={isActive(`${repoUrl}/projects`)}
            icon={<Octicon name="project" />}
          >
            Projects
          </NavTab>
          <NavTab
            to={`${repoUrl}/wiki`}
            active={isActive(`${repoUrl}/wiki`)}
            icon={<Octicon name="book" />}
          >
            Wiki
          </NavTab>
          <NavTab
            to={`${repoUrl}/pulse`}
            active={isActive(`${repoUrl}/pulse`)}
            icon={<Octicon name="graph" />}
          >
            Insights
          </NavTab>
          <NavTab
            to={`${repoUrl}/settings`}
            active={isActive(`${repoUrl}/settings`)}
            icon={<Octicon name="gear" />}
          >
            Settings
          </NavTab>
        </Nav>
        {
          repo &&
          <div className="repository-content">
            {children}
          </div>
        }
      </div>
    );
  }
}

function mapState2Props(state, { params: { owner, name }, }) {
  return {
    repo: selectRepo(state)(owner, name)
  }
}

function mapDispatch2Props(dispatch, { location, params: { owner, name } }) {
  const actions = bindActionCreators({
    fetchRepo
  }, dispatch);

  const onFetchRepo = params =>
    actions.fetchRepo(owner, name, params);

  return {
    onFetchRepo
  }
}


module.exports = connect(
  mapState2Props,
  mapDispatch2Props
)(ToJS(RepositoryLayout));
