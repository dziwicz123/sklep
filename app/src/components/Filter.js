import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Input,
  Typography,
} from '@mui/material';

const Filter = ({ onFilterChange, categoryId }) => {
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
  });

  const previousFiltersRef = useRef(filters);

  const debouncedOnFilterChange = useCallback(debounce(onFilterChange, 300), [onFilterChange]);

  useEffect(() => {
    const updatedFilters = {
      ...filters,
    };

    if (JSON.stringify(updatedFilters) !== JSON.stringify(previousFiltersRef.current)) {
      debouncedOnFilterChange(updatedFilters);
      previousFiltersRef.current = updatedFilters;
    }
  }, [filters, debouncedOnFilterChange]);

  useEffect(() => {
    // Reset filters when category changes
    setFilters({
      priceFrom: '',
      priceTo: '',
    });
  }, [categoryId]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
      <Box sx={{ padding: 2, width: 300, backgroundColor: '#E2F3F7', borderRadius: 4, marginLeft: 2 }}>
        <Typography variant="h6">Filtry</Typography>

        <Box mt={2}>
          <Typography variant="subtitle1">Cena</Typography>
          <Box display="flex" justifyContent="space-between">
            <Input
                placeholder="od"
                type="number"
                name="priceFrom"
                value={filters.priceFrom}
                onChange={handleInputChange}
            />
            <Input
                placeholder="do"
                type="number"
                name="priceTo"
                value={filters.priceTo}
                onChange={handleInputChange}
            />
          </Box>
        </Box>
      </Box>
  );
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default Filter;
