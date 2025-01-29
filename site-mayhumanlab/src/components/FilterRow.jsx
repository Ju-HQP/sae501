import React from 'react';
import { Field } from 'react-final-form';
import { required } from '../utils/validators';

const FilterRow = ({ conditions, index }) => {
  return (
    <div className="my-4 bg-white flex flex-row gap-4 items-center">
      <Field
        initialValue={conditions[index].property}
        name={`conditions[${index}].property`}
      >
        {({ input }) => (
          <div className="min-w-[200px]">
            <select
              {...input}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="nom_b">Nom</option>
              <option value="prenom_b">Prénom</option>
            </select>
          </div>
        )}
      </Field>

      <Field
        initialValue={conditions[index].search}
        name={`conditions[${index}].search`}
      >
        {({ input, meta: { touched, invalid, error } }) => (
          <div className="flex-1">
            <input
              {...input}
              type="text"
              placeholder="Recherche"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                touched && invalid ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched && error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default FilterRow;
