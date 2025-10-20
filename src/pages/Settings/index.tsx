import { Gear } from '@phosphor-icons/react';
import { Footer } from '../../commons/components/Footer';
import { useSettingsHook } from './hooks';
import { EScreenState } from '../../enums';
import { ErrorApiComponent, LoadingComponent, NoContentComponent } from '../../commons/components/ApiFeedbacks';
import { stateKey } from '../../commons/utils/renders/screent-type';
import { THEME_OPTIONS, LANGUAGE_OPTIONS } from './constants';

export const Settings = () => {
  const useHook = useSettingsHook();
  const {
    settingsQuery,
    theme,
    selectedTheme,
    selectedLanguage,
    notificationsEnabled,
    saveTheme,
    saveLanguage,
    saveNotifications,
  } = useHook;

  const { data: settings, refetch } = settingsQuery;

  const containerClasses = 'min-[690px]:flex flex';

  const SettingsContent = () => (
    <div className="w-full p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" data-testid="settings-title">
          Settings
        </h1>

        {/* Theme Settings */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-testid="theme-section">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Gear size={24} />
            Theme Preferences
          </h2>
          <div className="space-y-3">
            {Object.entries(THEME_OPTIONS).map(([key, value]) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={value}
                  checked={selectedTheme === value}
                  onChange={(e) => saveTheme(e.target.value)}
                  data-testid={`theme-option-${value}`}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="capitalize">{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Language Settings */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-testid="language-section">
          <h2 className="text-xl font-semibold mb-4">Language</h2>
          <select
            value={selectedLanguage}
            onChange={(e) => saveLanguage(e.target.value)}
            data-testid="language-select"
            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            {Object.entries(LANGUAGE_OPTIONS).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Settings */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-testid="notifications-section">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => saveNotifications(e.target.checked)}
              data-testid="notifications-toggle"
              className="w-5 h-5 cursor-pointer"
            />
            <span>Enable push notifications</span>
          </label>
        </div>

        {/* API Status Section */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-testid="api-status-section">
          <h2 className="text-xl font-semibold mb-4">API Status</h2>
          <div className="space-y-2">
            <p>Connected: {settings ? 'Yes' : 'No'}</p>
            <p>Data loaded: {settings?.length || 0} items</p>
            {settings && settings.length > 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sample: {settings[0].name}
              </p>
            ) : null}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mt-8" data-testid="welcome-message">
          <h3 className="text-lg font-medium">
            Configure your preferences!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            All settings are saved automatically
          </p>
        </div>
      </div>
    </div>
  );

  const screenState: any = {
    [EScreenState.loading]: { render: () => <LoadingComponent /> },
    [EScreenState.error]: { render: () => <ErrorApiComponent onRetry={refetch} /> },
    [EScreenState.noCotent]: { render: () => <NoContentComponent /> },
    [EScreenState.success]: { render: () => <SettingsContent /> },
  };

  return (
    <>
      <div className={`w-full h-40 bg-gradient-to-r ${theme.styles.gradient}`} data-testid="settings-header">
        <div className="flex items-center justify-center h-full">
          <Gear size={48} className="text-white" />
        </div>
      </div>

      <div className="container mx-auto mt-[-128px] rounded-sm">
        <div className="py-6 min-h-screen">
          <div className={`shadow-lg rounded h-full ${containerClasses}`}>
            <div className="flex flex-col w-full bg-white dark:bg-gray-900">
              {screenState[`${stateKey(settingsQuery)}`]?.render() ?? LoadingComponent()}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Settings;
