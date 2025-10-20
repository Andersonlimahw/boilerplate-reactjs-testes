import { useState, useEffect } from "react";
import { useStoreHook } from "../../../store/hooks/use-store";
import { SWApiPeopleService } from '../../../services/swapi/people/index';
import { PeopleModel } from "../../../models";
import { useQuery } from "@tanstack/react-query";
import { SETTINGS_THEME_KEY, SETTINGS_LANGUAGE_KEY, SETTINGS_NOTIFICATIONS_KEY } from "../constants";

export const useSettingsHook = () => {
  const useStore = useStoreHook((state: any) => state);
  const swApiPeopleService = new SWApiPeopleService();
  const { dispatch, theme } = useStore;

  // Local settings state
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem(SETTINGS_THEME_KEY) || 'auto'
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem(SETTINGS_LANGUAGE_KEY) || 'en'
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem(SETTINGS_NOTIFICATIONS_KEY) === 'true'
  );

  // Fetch user settings from API (example using the existing people service)
  async function fetchUserSettings() {
    return await swApiPeopleService.getPeople()
      .then((data: PeopleModel[]) => {
        return data as PeopleModel[];
      })
      .catch((error) => console.error('fetchUserSettings error: ', error));
  }

  const settingsQuery = useQuery({
    queryKey: ['user-settings'],
    queryFn: async () => {
      const data = await fetchUserSettings();
      console.log('Settings data loaded: ', data);
      return data;
    },
  });

  // Persist settings to localStorage
  const saveTheme = (theme: string) => {
    setSelectedTheme(theme);
    localStorage.setItem(SETTINGS_THEME_KEY, theme);
  };

  const saveLanguage = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem(SETTINGS_LANGUAGE_KEY, language);
  };

  const saveNotifications = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    localStorage.setItem(SETTINGS_NOTIFICATIONS_KEY, enabled.toString());
  };

  return {
    settingsQuery,
    theme,
    dispatch,
    selectedTheme,
    selectedLanguage,
    notificationsEnabled,
    saveTheme,
    saveLanguage,
    saveNotifications,
  };
};
