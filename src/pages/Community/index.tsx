import { Users, MagnifyingGlass, CheckCircle } from '@phosphor-icons/react';
import { Footer } from '../../commons/components/Footer';
import { useCommunityHook } from './hooks';
import { EScreenState } from '../../enums';
import { ErrorApiComponent, LoadingComponent, NoContentComponent } from '../../commons/components/ApiFeedbacks';
import { stateKey } from '../../commons/utils/renders/screent-type';
import { COMMUNITY_CATEGORIES } from './constants';
import { CommunityModel } from '../../models/community';

export const Community = () => {
  const {
    communitiesQuery,
    communities,
    theme,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
  } = useCommunityHook();

  const { refetch } = communitiesQuery;

  const CommunityCard = ({ community }: { community: CommunityModel }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      data-testid={`community-card-${community.id}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
          data-testid="community-image"
        />
        {community.isVerified && (
          <div
            className="absolute top-2 right-2 bg-blue-500 rounded-full p-1"
            data-testid="verified-badge"
          >
            <CheckCircle size={24} weight="fill" className="text-white" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3
            className="text-xl font-bold text-gray-800 dark:text-white"
            data-testid="community-name"
          >
            {community.name}
          </h3>
        </div>

        <p
          className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2"
          data-testid="community-description"
        >
          {community.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2" data-testid="members-count">
            <Users size={20} className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {community.membersCount.toLocaleString()} members
            </span>
          </div>
          <span
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 capitalize"
            data-testid="community-category"
          >
            {community.category}
          </span>
        </div>

        <a
          href={community.link}
          className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          data-testid="join-button"
        >
          Join Community
        </a>
      </div>
    </div>
  );

  const CommunitiesContent = () => (
    <div className="w-full p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-bold mb-8 text-center"
          data-testid="communities-title"
        >
          Discover Communities
        </h1>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative" data-testid="search-section">
            <MagnifyingGlass
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="search-input"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4" data-testid="filters-section">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="category-filter"
            >
              <option value="all">All Categories</option>
              {Object.entries(COMMUNITY_CATEGORIES).map(([key, value]) => (
                <option key={value} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="sort-filter"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="members">Most Members</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Communities Grid */}
        {communities.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="communities-grid"
          >
            {communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-12"
            data-testid="no-results"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No communities found. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Stats */}
        <div
          className="mt-12 text-center"
          data-testid="communities-stats"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Showing {communities.length} {communities.length === 1 ? 'community' : 'communities'}
          </p>
        </div>
      </div>
    </div>
  );

  const screenState: any = {
    [EScreenState.loading]: { render: () => <LoadingComponent /> },
    [EScreenState.error]: { render: () => <ErrorApiComponent onRetry={refetch} /> },
    [EScreenState.noCotent]: { render: () => <NoContentComponent /> },
    [EScreenState.success]: { render: () => <CommunitiesContent /> },
  };

  return (
    <>
      <div
        className={`w-full h-40 bg-gradient-to-r ${theme.styles.gradient}`}
        data-testid="community-header"
      >
        <div className="flex items-center justify-center h-full">
          <Users size={48} className="text-white" />
        </div>
      </div>

      <div className="container mx-auto mt-[-128px] rounded-sm">
        <div className="py-6 min-h-screen">
          <div className="shadow-lg rounded h-full">
            <div className="flex flex-col w-full bg-white dark:bg-gray-900">
              {screenState[`${stateKey(communitiesQuery)}`]?.render() ?? LoadingComponent()}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Community;
