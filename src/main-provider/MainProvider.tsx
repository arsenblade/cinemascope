import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import Layout from '../components/layout/Layout'
import { store } from '../store/store'


interface MainProviderProps {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const MainProvider:FC<MainProviderProps> = ({children}) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          {children}
        </Layout>
      </QueryClientProvider>
    </Provider>
  )
}

export default MainProvider