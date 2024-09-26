import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function QueryProvider(props) {
  return (<QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>);
}