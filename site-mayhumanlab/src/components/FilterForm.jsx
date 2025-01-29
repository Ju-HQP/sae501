import React, { Fragment, useState } from 'react';
import { Form } from 'react-final-form';
import FilterRow from './FilterRow.jsx';
import { filterProperty, filterDate } from '../utils/filters.js';

const FilterForm = ({ onFilter }) => {
  const [conditions, setConditions] = useState([]);

  const mappingFilters = {
    nom_b: filterProperty,
    prenom_b: filterProperty,
  };

  const handleAddCondition = () => {
    setConditions([...conditions, { property: 'nom_b', search: '' }]);
  };

  const handleSubmit = (values) => {
    setConditions(values.conditions);

    const filterFunctions = values.conditions.map((condition) =>
      mappingFilters[condition.property](condition.property)(condition.search)
    );

    onFilter(filterFunctions);
  };

  const handleReset = (form) => {
    setConditions([]);
    form.reset();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      render={({ handleSubmit, form }) => (
        <form
          onSubmit={handleSubmit}
          onReset={() => handleReset(form)}
          className="space-y-4 rounded-lg p-4 mx-16"
        >
          <fieldset>
            <legend className="text-lg font-semibold">Filtres</legend>

            {conditions.map((condition, index) => (
              <Fragment key={index}>
                <FilterRow conditions={conditions} index={index} />
              </Fragment>
            ))}

            <div className="flex items-center space-x-4 mt-4">
              <button
                type="button"
                onClick={handleAddCondition}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Ajouter un filtre
              </button>

              {conditions.length > 0 && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Appliquer
                </button>
              )}

              {conditions.length > 0 && (
                <button
                  type="reset"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </fieldset>
        </form>
      )}
    />
  );
};

export default FilterForm;