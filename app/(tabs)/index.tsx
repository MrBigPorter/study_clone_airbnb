import Home from '@/app/screens/home';
import { ExploreFilterProvider } from '@/context/exploreFilterContext';

export default function Index() {
  return (
    <ExploreFilterProvider>
        <Home />
    </ExploreFilterProvider>
  );
}
