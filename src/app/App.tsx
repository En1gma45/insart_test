import { QueryClient, useQuery, QueryClientProvider } from '@tanstack/react-query';
import { CenteredLayout } from '~/components';
import { ExchangerComponent } from '~/components/ExchangerComponent';
import { TableComponent } from '~/components/TableComponent';
import { ApiCall } from '~/utils/api';
import { Header } from './Header';

const queryClient = new QueryClient();

const MainPage = () => {
  const { data, isSuccess } = useQuery({
    queryFn: () => ApiCall(),
    queryKey: ['currencies'],
  });

  return (
    <div className="App">
      <Header />
      <CenteredLayout className="gap-4 w-9/12 m-auto">
        {data instanceof Error ? (
          <>{data.message}</>
        ) : (
          <>
            {isSuccess && (
              <>
                <TableComponent data={data} />
                <ExchangerComponent data={data} />
              </>
            )}
          </>
        )}
      </CenteredLayout>
    </div>
  );
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
};
