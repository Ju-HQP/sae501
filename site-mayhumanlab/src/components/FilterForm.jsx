import React, { Fragment, useState } from "react";
import { Form } from "react-final-form";
import FilterRow from "./FilterRow.jsx";
import {
  filterProperty,
  filterDate,
  filterCompetence,
} from "../utils/filters.js";

const FilterForm = ({ onFilter, width }) => {
  const [conditions, setConditions] = useState([]);

  const mappingFilters = {
    nom_b: filterProperty,
    prenom_b: filterProperty,
    competences: filterCompetence,
  };

  const handleAddCondition = () => {
    setConditions([...conditions, { property: "nom_b", search: "" }]);
  };

  const handleRemoveCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);

    // Appliquer immédiatement les nouveaux filtres
    const filterFunctions = newConditions.map((condition) =>
      mappingFilters[condition.property](condition.property)(condition.search)
    );
    onFilter(filterFunctions);
  };

  const handleSubmit = (values) => {
    const filteredConditions = values.conditions.filter(
      (condition) => condition.search.trim() !== ""
    );

    setConditions(filteredConditions);

    // Appliquer uniquement les filtres valides
    const filterFunctions = filteredConditions.map((condition) =>
      mappingFilters[condition.property](condition.property)(condition.search)
    );

    onFilter(filterFunctions);
  };

  const handleReset = (form) => {
    setConditions([]);
    onFilter([]);
    form.reset();
  };

  return width < 750 ? (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      initialValues={{ conditions }}
      render={({ handleSubmit, form }) => (
        <form
          onSubmit={handleSubmit}
          onReset={() => handleReset(form)}
          className="space-y-4 p-6 border-t-2 border-b-2 border-solid m-4"
        >
          <fieldset>
            <div className="flex items-center space-x-4 justify-between w-full">
              <legend className="text-lg font-semibold">Filtres</legend>
              <button
                type="button"
                onClick={handleAddCondition}
                className="flex items-center justify-center px-4 py-2 primary-btn-small"
              ><b>+</b></button>
            </div>

            {conditions.map((condition, index) => (
              <Fragment key={index}>
                <FilterRow
                  conditions={conditions}
                  index={index}
                  width={width}
                  onRemove={handleRemoveCondition}
                />
              </Fragment>
            ))}
            {conditions.length > 0 && (
              <div className="flex items-center space-x-4 mt-4 justify-between w-full">
                <button
                  type="reset"
                  className="px-4 py-2 secondary-btn-small w-full"
                >
                  Réinitialiser
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 primary-btn-small mx-2 w-full"
                >
                  Appliquer
                </button>
              </div>
            )}
          </fieldset>
        </form>
      )}
    />
  ) : (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      initialValues={{ conditions }}
      render={({ handleSubmit, form }) => (
        <form
          onSubmit={handleSubmit}
          onReset={() => handleReset(form)}
          className={`space-y-4 p-4 mx-16 ${conditions.length === 0 && 'border-t-2 border-b-2'}`}
        >
          <fieldset>
            <div className="flex items-center space-x-4 justify-between">
              <legend className="text-lg font-semibold">Filtres</legend>
              <button
                type="button"
                onClick={handleAddCondition}
                className="flex items-center justify-center px-4 py-2 primary-btn-small"
              >
                Ajouter un filtre
              </button>
            </div>

            {conditions.map((condition, index) => (
              <Fragment key={index}>
                <FilterRow
                  conditions={conditions}
                  index={index}
                  width={width}
                  onRemove={handleRemoveCondition}
                />
              </Fragment>
            ))}

            {conditions.length > 0 && (
              <div className="flex items-center space-x-4 mt-4 justify-end">
                <button type="reset" className="px-4 py-2 secondary-btn-small">
                  Réinitialiser
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 primary-btn-small mx-2"
                >
                  Appliquer
                </button>
              </div>
            )}
          </fieldset>
        </form>
      )}
    />
  );
};

export default FilterForm;
