import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useStoreHook } from "../../../store/hooks/use-store";
import { CommunityModel } from "../../../models/community";
import { MOCK_COMMUNITIES } from "../constants";

export const useCommunityHook = () => {
  const useStore = useStoreHook((state: any) => state);
  const { theme } = useStore;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Simulate API call to fetch communities
  async function fetchCommunities(): Promise<CommunityModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_COMMUNITIES);
      }, 500);
    });
  }

  const communitiesQuery = useQuery({
    queryKey: ['communities', selectedCategory, sortBy],
    queryFn: async () => {
      const data = await fetchCommunities();
      console.log('Communities loaded: ', data);
      return data;
    },
  });

  // Filter communities based on search and category
  const filteredCommunities = communitiesQuery.data?.filter((community) => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  // Sort communities
  const sortedCommunities = [...filteredCommunities].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.membersCount - a.membersCount;
      case 'members':
        return b.membersCount - a.membersCount;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return {
    communitiesQuery,
    communities: sortedCommunities,
    theme,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
  };
};
