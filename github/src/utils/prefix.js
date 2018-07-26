import _ from 'lodash';
import classNames from 'classnames';

function prefix(pre, className) {
  if (!pre || !className) {
    return '';
  }

  if (_.isArray(className)) {
    return classNames(className.filterProps(name => !!name).map(name => `${pre}-${name}`));
  }

  return `${pre}-${className}`;
}

export default _.curry(prefix);
