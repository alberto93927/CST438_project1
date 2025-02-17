import * as React from 'react';
import renderer from 'react-test-renderer';

import FlexZoneHeader from '../FlexZoneHeader';

it(`renders correctly`, () => {
  const tree = renderer.create(<FlexZoneHeader />).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`contains the correct text`, () => {
    const tree = renderer.create(<FlexZoneHeader />).toJSON();
    
    expect(tree.children[0].children[0]).toBe('FlexZone:');
    expect(tree.children[1].children[0]).toBe('the fitness app');
});