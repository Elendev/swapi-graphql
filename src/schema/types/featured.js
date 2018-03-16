/* @flow */
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 */

import { GraphQLUnionType } from 'graphql';

import { getSwapiTypeFromUrl } from '../apiHelper';

import PersonType from './person';
import PlanetType from './planet';
import VehicleType from './vehicle';
import StarshipType from './starship';
import SpeciesType from './species';

/**
 * GraphQL equivalent of every featured element in a movie in the SW univers (from SWAPI)
 */
const FeaturedType = new GraphQLUnionType({
  name: 'Featured',
  types: [PersonType, PlanetType, VehicleType, StarshipType, SpeciesType],
  resolveType: value => {
    const swapiType = getSwapiTypeFromUrl(value.url);

    switch (swapiType) {
      case 'people':
        return PersonType;
      case 'planets':
        return PlanetType;
      case 'vehicles':
        return VehicleType;
      case 'starships':
        return StarshipType;
      case 'species':
        return SpeciesType;
      default:
        throw new Error('Type `' + swapiType + '` not in Machine type.');
    }
  },
  description: 'Union of every featured Person, Planet, Vehicle, Starship and Species',
});

export default FeaturedType;
