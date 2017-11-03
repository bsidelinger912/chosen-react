/* eslint-env node, mocha */
/* eslint-disable react/jsx-filename-extension*/

import React from 'react';
import { shallow } from 'enzyme';

import Chosen from '../src/index';

const expect = require('expect');

describe('Shiitake', () => {
  it('work', () => {
    const el = shallow(<Chosen>Hello world</Chosen>);
    expect(el.text()).toContain('Hello world');
  });
});
