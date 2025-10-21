import { ArrowLineLeft } from '@phosphor-icons/react';

import { Footer } from '../../commons/components/Footer';
import { ErrorApiComponent, LoadingComponent, NoContentComponent } from '../../commons/components/ApiFeedbacks';
import { stateKey } from '../../commons/utils/renders/screent-type';
import { EScreenState } from '../../enums';
import { useGroupsPage } from './hooks';

const resolveScreenType = () => {
  if (typeof window === 'undefined') {
    return 'default';
  }

  return window.innerWidth <= 690 ? 'mobile' : 'default';
};

export const Groups = () => {
  const { peopleQuery, theme } = useGroupsPage();
  const { data: groups, refetch } = peopleQuery;

  const hasSelectedGroup = false;

  // Layout mirrors the Chat page and keeps the responsive behaviour driven purely by viewport width.
  const containerClasses: Record<string, string> = {
    mobile: 'flex flex-col',
    default: 'flex',
  };

  const messagesContainerClasses: Record<string, string> = {
    mobile: 'w-full',
    default: 'flex-1 w-full',
  };

  const screenType = resolveScreenType();

  const SuccessComponent = () => (
    <section className="space-y-3 text-zinc-100" data-testid="groups-success">
      <h1 className="text-3xl font-semibold">Collaborate with your groups</h1>
      <p className="text-sm leading-6">
        Api : Response
        <br />
        total: {groups?.length ?? 0}
        <br />
        first group: {groups && groups.length > 0 ? groups[0].name : '—'}
      </p>
    </section>
  );

  const screenState: Record<EScreenState, { render: () => JSX.Element }> = {
    [EScreenState.loading]: { render: () => <LoadingComponent /> },
    [EScreenState.error]: { render: () => <ErrorApiComponent onRetry={refetch} /> },
    [EScreenState.noCotent]: { render: () => <NoContentComponent /> },
    [EScreenState.success]: { render: () => <SuccessComponent /> },
  };

  return (
    <>
      <div
        className={`w-full h-40 bg-gradient-to-r ${theme.styles.gradient}`}
        data-testid="groups-header"
      >
        <ArrowLineLeft
          size={48}
          className={`mx-2 py-2 cursor-pointer ${hasSelectedGroup ? 'block' : 'hidden'}`}
          data-testid="groups-back-button"
        />
      </div>

      <div className="container mx-auto mt-[-128px] rounded-sm" data-testid="groups-container">
        <div className="py-6 h-screen">
          <div
            className={`shadow-lg rounded h-full gap-6 px-6 py-8 ${containerClasses[screenType]}`}
            data-testid="groups-layout"
          >
            {!hasSelectedGroup && (
              <section className="flex-1 space-y-6 text-zinc-100" data-testid="groups-welcome">
                <header>
                  <h2 className="text-3xl font-bold">Welcome to Groups</h2>
                  <p className="text-base text-zinc-100/90">
                    Organize collaborations and keep every squad aligned while fetching live data on the right.
                  </p>
                </header>
                <Footer />
              </section>
            )}

            <div
              className={`shadow-sm flex flex-col gap-4 p-6 bg-white/10 backdrop-blur ${messagesContainerClasses[screenType]}`}
              data-testid="groups-content"
            >
              {screenState[stateKey(peopleQuery)]?.render() ?? <LoadingComponent />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;
