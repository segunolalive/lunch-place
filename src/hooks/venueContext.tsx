import React, { createContext, ReactChild, useState, useContext } from 'react';

type VenueContextType = {}

type VenueProviderProps = {
  children: ReactChild | ReactChild[]
}

const VenueContext = createContext<VenueContextType | null>(null);

export const useVenueContext = (): VenueContextType => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error('useVenueContext is used outside of VenueContext.Provider');
  }
  return context;
};

export function VenueProvider({ children }: VenueProviderProps): JSX.Element {
  

  return (
    <VenueContext.Provider value={{}}>
      {children}
    </VenueContext.Provider>
  );
}