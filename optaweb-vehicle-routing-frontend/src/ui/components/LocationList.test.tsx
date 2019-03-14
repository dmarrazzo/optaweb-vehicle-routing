/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import Location from './Location';
import LocationList, { ILocationListProps } from './LocationList';

describe('Location List Component', () => {
  it('should render correctly with no routes', () => {
    const props: ILocationListProps = {
      clearHandler: jest.fn(),
      isDemoLoading: false,
      loadHandler: jest.fn(),
      locations: [],
      removeHandler: jest.fn(),
      selectHandler: jest.fn(),
    };
    expect.assertions(2);
    const locationList = shallow(<LocationList {...props} />);
    expect(toJson(locationList)).toMatchSnapshot();

    locationList.find('Button').simulate('click');

    expect(props.loadHandler).toHaveBeenCalledTimes(1);
  });

  it('should render correctly with a few routes', () => {
    const props: ILocationListProps = {
      clearHandler: jest.fn(),
      depot: {
        id: 1,
        lat: 1.345678,
        lng: 1.345678,
      },
      isDemoLoading: false,
      loadHandler: jest.fn(),
      locations: [
        {
          id: 2,
          lat: 2.345678,
          lng: 2.345678,
        },
        {
          id: 3,
          lat: 3.676111,
          lng: 3.568333,
        },
      ],
      removeHandler: jest.fn(),
      selectHandler: jest.fn(),
    };
    expect.assertions(2);
    const locationList = shallow(<LocationList {...props} />);
    expect(toJson(locationList)).toMatchSnapshot();

    expect(locationList.find(Location)).toHaveLength(props.locations.length + 1);
  });
});
